import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const LIMITS = {
  nameMax: 60,
  bodyMax: 2000,
  maxLinks: 2,
  postsPerWindow: 5,
  postWindowMs: 10 * 60 * 1000,
  likesPerWindow: 60,
  likeWindowMs: 10 * 60 * 1000,
} as const;

/** Remove control characters (keep \n), anything that looks like an HTML tag, normalise newlines. */
export function cleanText(input: string, { multiline }: { multiline: boolean }): string {
  let s = input.normalize("NFC").replace(/\r\n?/g, "\n");
  s = s.replace(/<\/?[a-z!][^>]*>/gi, "");
  // eslint-disable-next-line no-control-regex
  s = s.replace(/[\u0000-\u0009\u000B-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, "");
  if (!multiline) s = s.replace(/\n+/g, " ").replace(/\s+/g, " ");
  else s = s.split("\n").map((l) => l.replace(/[ \t]+$/g, "")).join("\n").replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

export function countLinks(s: string): number {
  return (s.match(/(https?:\/\/|www\.)\S+/gi) ?? []).length;
}

export const newCommentSchema = z.object({
  name: z.string(),
  body: z.string(),
  parentId: z.string().uuid().nullish(),
  website: z.string().optional(),
});

export type ValidComment = { name: string; body: string; parentId: string | null };
export type ValidationResult =
  | { ok: true; value: ValidComment }
  | { ok: false; code: string; message: string; status: number };

/** Validate + clean a new comment payload. Pure, so it is unit-tested. */
export function validateComment(raw: unknown): ValidationResult {
  const parsed = newCommentSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, code: "invalid_request", message: `Invalid field: ${issue?.path.join(".") || "body"}`, status: 400 };
  }
  const { website } = parsed.data;
  if (website && website.trim() !== "") {
    return { ok: false, code: "spam_detected", message: "Comment rejected.", status: 400 };
  }
  const name = cleanText(parsed.data.name, { multiline: false });
  const body = cleanText(parsed.data.body, { multiline: true });
  if (name.length < 1 || name.length > LIMITS.nameMax) {
    return { ok: false, code: "invalid_name", message: `Name must be 1 to ${LIMITS.nameMax} characters.`, status: 400 };
  }
  if (body.length < 1 || body.length > LIMITS.bodyMax) {
    return { ok: false, code: "invalid_body", message: `Comment must be 1 to ${LIMITS.bodyMax} characters.`, status: 400 };
  }
  if (countLinks(name) > 0) {
    return { ok: false, code: "too_many_links", message: "Names cannot contain links.", status: 400 };
  }
  if (countLinks(body) > LIMITS.maxLinks) {
    return { ok: false, code: "too_many_links", message: `Comments can contain at most ${LIMITS.maxLinks} links.`, status: 400 };
  }
  return { ok: true, value: { name, body, parentId: parsed.data.parentId ?? null } };
}

export const voterSchema = z.object({ voter: z.string().regex(/^[A-Za-z0-9_-]{16,128}$/) });

export function hashWithSalt(salt: string, value: string): string {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb) && a.length === b.length;
}

/** Client IP behind Render's proxy (Cloudflare in front): True-Client-IP, then CF-Connecting-IP,
 *  then the first X-Forwarded-For entry, then the socket address. */
export function clientIp(xff: string | undefined, fallback: string | undefined, trueClientIp?: string): string {
  const first = xff?.split(",")[0]?.trim();
  return trueClientIp?.trim() || first || fallback || "unknown";
}

/** Fixed-window in-memory limiter (per process). Used for likes; posts are limited in the DB. */
export class MemoryRateLimiter {
  private hits = new Map<string, number[]>();
  constructor(private max: number, private windowMs: number, private now: () => number = Date.now) {}
  allow(key: string): boolean {
    const t = this.now();
    const arr = (this.hits.get(key) ?? []).filter((x) => t - x < this.windowMs);
    if (arr.length >= this.max) { this.hits.set(key, arr); return false; }
    arr.push(t);
    this.hits.set(key, arr);
    if (this.hits.size > 50_000) this.hits.clear();
    return true;
  }
}

/** Decide whether a new post is allowed given how many posts this IP made in the window. */
export function postAllowed(recentCount: number, max: number = LIMITS.postsPerWindow): boolean {
  return recentCount < max;
}

export function isAllowedOrigin(origin: string | undefined, allowed: string[]): boolean {
  if (!origin) return false;
  if (allowed.includes(origin)) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}
