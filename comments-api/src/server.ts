import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { makePool, migrate } from "./db.js";

function required(name: string): string {
  const v = process.env[name];
  if (!v) { console.error(`Missing required env var ${name}`); process.exit(1); }
  return v;
}

const list = (v: string | undefined, d: string) => (v ?? d).split(",").map((s) => s.trim()).filter(Boolean);

const pool = makePool(required("DATABASE_URL"), process.env.PGSSLMODE);
const adminToken = required("ADMIN_TOKEN");
const salt = required("IP_HASH_SALT");
if (adminToken.length < 24) console.warn("ADMIN_TOKEN is short; use a long random value.");

await migrate(pool);
const app = createApp(pool, {
  adminToken,
  salt,
  allowedOrigins: list(process.env.ALLOWED_ORIGINS, "https://alphapick.in,https://www.alphapick.in"),
  allowedSlugs: list(process.env.ALLOWED_SLUGS, "three-lower-closes"),
});
const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, () => console.log(`comments-api listening on :${port}`));
const shutdown = () => { pool.end().finally(() => process.exit(0)); };
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
