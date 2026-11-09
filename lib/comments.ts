/** Client for the self-hosted comments API (comments-api/ in this repo, a Render web service). */
export const COMMENTS_API = (process.env.NEXT_PUBLIC_COMMENTS_API || "https://alphapick-comments.onrender.com").replace(/\/+$/, "");

export const NAME_MAX = 60;
export const BODY_MAX = 2000;

export type PublicComment = {
  id: string;
  parentId: string | null;
  name: string;
  body: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  replies?: PublicComment[];
};

export type AdminComment = PublicComment & { study: string; hidden: boolean; ipHash: string };

export class ApiError extends Error {
  constructor(public code: string, message: string, public status: number) { super(message); }
}

/** The API may run on a free Render instance that sleeps when idle; its first request can take ~50s.
 *  Requests therefore wait up to 90s, and idempotent GETs retry a couple of times on network errors. */
const TIMEOUT_MS = 90_000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function api<T>(path: string, init: RequestInit & { json?: unknown; retries?: number } = {}): Promise<T> {
  const { json, headers, retries = 0, ...rest } = init;
  let res: Response | undefined;
  for (let attempt = 0; ; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      res = await fetch(`${COMMENTS_API}${path}`, {
        ...rest,
        signal: ctrl.signal,
        headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...(headers || {}) },
        body: json !== undefined ? JSON.stringify(json) : rest.body,
      });
    } catch {
      res = undefined;
    } finally {
      clearTimeout(timer);
    }
    // Render returns 502/503 for a moment while a sleeping instance boots.
    const retryable = !res || res.status === 502 || res.status === 503 || res.status === 504;
    if (!retryable || attempt >= retries) break;
    await sleep(3000 * (attempt + 1));
  }
  if (!res) {
    throw new ApiError("network", "Could not reach the comments service. Please check your connection and try again.", 0);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = (data as { error?: { code?: string; message?: string } } | null)?.error;
    throw new ApiError(e?.code || "http_" + res.status, e?.message || "Something went wrong. Please try again.", res.status);
  }
  return data as T;
}

const VOTER_KEY = "ap.voter";
export function voterToken(): string {
  try {
    let v = localStorage.getItem(VOTER_KEY);
    if (!v || !/^[A-Za-z0-9_-]{16,128}$/.test(v)) {
      const bytes = new Uint8Array(24);
      crypto.getRandomValues(bytes);
      v = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      localStorage.setItem(VOTER_KEY, v);
    }
    return v;
  } catch {
    return "anon" + Math.random().toString(36).slice(2).padEnd(16, "0");
  }
}

export function relativeTime(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function fullTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
