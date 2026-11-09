import pg from "pg";

/** Works with Render's internal URL (no TLS) or any external Postgres such as Neon
 *  (put ?sslmode=require in DATABASE_URL, or set PGSSLMODE=require). */
export function makePool(url: string, sslMode?: string) {
  const pool = new pg.Pool({
    connectionString: url,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 15_000,
    ssl: sslMode === "require" && !/[?&]sslmode=/.test(url) ? { rejectUnauthorized: true } : undefined,
  });
  // Serverless Postgres (e.g. Neon) closes idle connections; don't let that crash the process.
  pool.on("error", (e) => console.error("[pg] idle client error:", e.message));
  return pool;
}

export async function migrate(pool: pg.Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      study_slug text NOT NULL,
      parent_id uuid NULL REFERENCES comments(id) ON DELETE CASCADE,
      name varchar(60) NOT NULL,
      body varchar(2000) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      hidden boolean NOT NULL DEFAULT false,
      ip_hash char(64) NOT NULL
    );
    CREATE INDEX IF NOT EXISTS comments_slug_idx ON comments (study_slug, created_at);
    CREATE INDEX IF NOT EXISTS comments_ip_idx ON comments (ip_hash, created_at);
    CREATE TABLE IF NOT EXISTS likes (
      comment_id uuid NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
      voter_hash char(64) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (comment_id, voter_hash)
    );
  `);
}
