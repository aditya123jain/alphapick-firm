import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import type pg from "pg";
import {
  LIMITS, MemoryRateLimiter, clientIp, hashWithSalt, isAllowedOrigin, postAllowed,
  safeEqual, validateComment, voterSchema,
} from "./logic.js";

export type Config = {
  adminToken: string;
  salt: string;
  allowedOrigins: string[];
  allowedSlugs: string[];
};

type Row = {
  id: string; study_slug: string; parent_id: string | null; name: string; body: string;
  created_at: Date; hidden: boolean; likes: number; liked?: boolean;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function err(c: Context, status: number, code: string, message: string) {
  return c.json({ error: { code, message } }, status as 400);
}

function publicComment(r: Row) {
  return {
    id: r.id, parentId: r.parent_id, name: r.name, body: r.body,
    createdAt: new Date(r.created_at).toISOString(), likes: Number(r.likes), liked: Boolean(r.liked),
  };
}

export function createApp(pool: pg.Pool, cfg: Config) {
  const app = new Hono();
  const likeLimiter = new MemoryRateLimiter(LIMITS.likesPerWindow, LIMITS.likeWindowMs);

  app.use("*", async (c, next) => {
    await next();
    c.header("X-Content-Type-Options", "nosniff");
    c.header("Cache-Control", "no-store");
    c.header("Referrer-Policy", "no-referrer");
  });
  app.use("/v1/*", cors({
    origin: (origin) => (isAllowedOrigin(origin, cfg.allowedOrigins) ? origin : null),
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Voter"],
    maxAge: 600,
  }));
  app.use("/v1/*", bodyLimit({ maxSize: 16 * 1024, onError: (c) => err(c, 413, "payload_too_large", "Request body too large.") }));

  const ipHash = (c: Context) => {
    const addr = (c.env as { incoming?: { socket?: { remoteAddress?: string } } } | undefined)?.incoming?.socket?.remoteAddress;
    return hashWithSalt(cfg.salt, clientIp(c.req.header("x-forwarded-for"), addr, c.req.header("true-client-ip") || c.req.header("cf-connecting-ip")));
  };
  const voterHash = (v: string | undefined) => (v && /^[A-Za-z0-9_-]{16,128}$/.test(v) ? hashWithSalt(cfg.salt, `voter:${v}`) : null);
  const slugOk = (s: string) => cfg.allowedSlugs.includes(s);
  async function readJson(c: Context): Promise<unknown | undefined> {
    try { return await c.req.json(); } catch { return undefined; }
  }

  app.get("/", (c) => c.json({ service: "alphapick-comments-api", docs: "See README in the alphapick-firm repo." }));
  app.get("/health", async (c) => {
    try { await pool.query("SELECT 1"); return c.json({ ok: true, db: "up" }); }
    catch { return c.json({ ok: false, db: "down" }, 503); }
  });

  // Public: visible comments for a study, threaded one level deep.
  app.get("/v1/studies/:slug/comments", async (c) => {
    const slug = c.req.param("slug");
    if (!slugOk(slug)) return err(c, 404, "unknown_study", "No such study.");
    const vh = voterHash(c.req.header("x-voter"));
    const { rows } = await pool.query<Row>(
      `SELECT c.id, c.study_slug, c.parent_id, c.name, c.body, c.created_at, c.hidden,
              (SELECT count(*) FROM likes l WHERE l.comment_id = c.id)::int AS likes,
              ${vh ? "EXISTS (SELECT 1 FROM likes l WHERE l.comment_id = c.id AND l.voter_hash = $2)" : "false"} AS liked
         FROM comments c
        WHERE c.study_slug = $1 AND c.hidden = false
          AND (c.parent_id IS NULL OR EXISTS (SELECT 1 FROM comments p WHERE p.id = c.parent_id AND p.hidden = false))
        ORDER BY c.created_at ASC LIMIT 1000`,
      vh ? [slug, vh] : [slug],
    );
    const top = rows.filter((r) => !r.parent_id).map((r) => ({ ...publicComment(r), replies: [] as ReturnType<typeof publicComment>[] }));
    const byId = new Map(top.map((t) => [t.id, t]));
    for (const r of rows) if (r.parent_id) byId.get(r.parent_id)?.replies.push(publicComment(r));
    top.reverse(); // newest threads first, replies oldest first
    return c.json({ study: slug, count: rows.length, comments: top });
  });

  // Public: post a comment or a reply.
  app.post("/v1/studies/:slug/comments", async (c) => {
    const slug = c.req.param("slug");
    if (!slugOk(slug)) return err(c, 404, "unknown_study", "No such study.");
    const raw = await readJson(c);
    if (raw === undefined) return err(c, 400, "invalid_json", "Request body must be JSON.");
    const v = validateComment(raw);
    if (!v.ok) return err(c, v.status, v.code, v.message);
    const ih = ipHash(c);
    const { rows: [recent] } = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM comments WHERE ip_hash = $1 AND created_at > now() - ($2::int * interval '1 millisecond')`,
      [ih, LIMITS.postWindowMs],
    );
    if (!postAllowed(recent?.n ?? 0)) {
      return err(c, 429, "rate_limited", "Too many comments in a short time. Please try again in a few minutes.");
    }
    const { rows: [dup] } = await pool.query(
      `SELECT 1 FROM comments WHERE ip_hash = $1 AND study_slug = $2 AND body = $3 AND created_at > now() - interval '1 day' LIMIT 1`,
      [ih, slug, v.value.body],
    );
    if (dup) return err(c, 409, "duplicate", "You have already posted this comment.");
    if (v.value.parentId) {
      const { rows: [parent] } = await pool.query<{ parent_id: string | null }>(
        `SELECT parent_id FROM comments WHERE id = $1 AND study_slug = $2 AND hidden = false`, [v.value.parentId, slug],
      );
      if (!parent) return err(c, 404, "parent_not_found", "The comment you are replying to no longer exists.");
      if (parent.parent_id) return err(c, 400, "nesting_too_deep", "Replies can only be made to top-level comments.");
    }
    const { rows: [row] } = await pool.query<Row>(
      `INSERT INTO comments (study_slug, parent_id, name, body, ip_hash) VALUES ($1, $2, $3, $4, $5)
       RETURNING id, study_slug, parent_id, name, body, created_at, hidden, 0 AS likes`,
      [slug, v.value.parentId, v.value.name, v.value.body, ih],
    );
    return c.json({ comment: { ...publicComment(row!), replies: [] } }, 201);
  });

  // Public: toggle a like. Idempotent per (comment, voter) thanks to the composite primary key.
  app.post("/v1/comments/:id/like", async (c) => {
    const id = c.req.param("id");
    if (!UUID.test(id)) return err(c, 404, "not_found", "Comment not found.");
    const raw = await readJson(c);
    const parsed = voterSchema.safeParse(raw);
    if (!parsed.success) return err(c, 400, "invalid_voter", "A voter token is required.");
    const want = (raw as { like?: unknown }).like;
    if (want !== undefined && typeof want !== "boolean") return err(c, 400, "invalid_request", "like must be a boolean.");
    if (!likeLimiter.allow(ipHash(c))) return err(c, 429, "rate_limited", "Too many likes. Please slow down.");
    const { rows: [target] } = await pool.query<{ study_slug: string }>(
      `SELECT study_slug FROM comments WHERE id = $1 AND hidden = false`, [id],
    );
    if (!target || !slugOk(target.study_slug)) return err(c, 404, "not_found", "Comment not found.");
    const vh = voterHash(parsed.data.voter)!;
    let liked: boolean;
    if (want === true) {
      await pool.query(`INSERT INTO likes (comment_id, voter_hash) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [id, vh]);
      liked = true;
    } else if (want === false) {
      await pool.query(`DELETE FROM likes WHERE comment_id = $1 AND voter_hash = $2`, [id, vh]);
      liked = false;
    } else {
      const del = await pool.query(`DELETE FROM likes WHERE comment_id = $1 AND voter_hash = $2`, [id, vh]);
      if (del.rowCount) liked = false;
      else { await pool.query(`INSERT INTO likes (comment_id, voter_hash) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [id, vh]); liked = true; }
    }
    const { rows: [cnt] } = await pool.query<{ n: number }>(`SELECT count(*)::int AS n FROM likes WHERE comment_id = $1`, [id]);
    return c.json({ id, liked, likes: cnt?.n ?? 0 });
  });

  // Admin (moderation).
  app.use("/v1/admin/*", async (c, next) => {
    const h = c.req.header("authorization") ?? "";
    const token = h.startsWith("Bearer ") ? h.slice(7).trim() : "";
    if (!cfg.adminToken || !token || !safeEqual(token, cfg.adminToken)) {
      return err(c, 401, "unauthorized", "Missing or invalid admin token.");
    }
    await next();
  });
  app.get("/v1/admin/comments", async (c) => {
    const slug = c.req.query("slug");
    const { rows } = await pool.query<Row & { ip_short: string }>(
      `SELECT c.id, c.study_slug, c.parent_id, c.name, c.body, c.created_at, c.hidden, left(c.ip_hash, 8) AS ip_short,
              (SELECT count(*) FROM likes l WHERE l.comment_id = c.id)::int AS likes
         FROM comments c ${slug ? "WHERE c.study_slug = $1" : ""}
        ORDER BY c.created_at DESC LIMIT 2000`,
      slug ? [slug] : [],
    );
    return c.json({
      count: rows.length,
      comments: rows.map((r) => ({ ...publicComment(r), study: r.study_slug, hidden: r.hidden, ipHash: r.ip_short })),
    });
  });
  const setHidden = (hidden: boolean) => async (c: Context) => {
    const id = c.req.param("id") ?? "";
    if (!UUID.test(id)) return err(c, 404, "not_found", "Comment not found.");
    const r = await pool.query(`UPDATE comments SET hidden = $2 WHERE id = $1`, [id, hidden]);
    if (!r.rowCount) return err(c, 404, "not_found", "Comment not found.");
    return c.json({ id, hidden });
  };
  app.post("/v1/admin/comments/:id/hide", setHidden(true));
  app.post("/v1/admin/comments/:id/unhide", setHidden(false));

  app.notFound((c) => err(c, 404, "not_found", "Route not found."));
  app.onError((e, c) => {
    console.error("[error]", c.req.method, c.req.path, e instanceof Error ? e.message : e);
    return err(c, 500, "internal_error", "Something went wrong. Please try again.");
  });
  return app;
}
