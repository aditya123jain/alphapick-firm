"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ApiError, api, fullTime, type AdminComment, type CommentStatus } from "@/lib/comments";
import { STUDIES } from "@/lib/knowledge";

const KEY = "ap.adminToken";
type Tab = "pending" | "approved" | "removed" | "all";
const TABS: { id: Tab; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "removed", label: "Hidden / rejected" },
  { id: "all", label: "All" },
];
const inTab = (t: Tab, s: CommentStatus) =>
  t === "all" || (t === "removed" ? s === "hidden" || s === "rejected" : s === t);

const REASON_LABELS: Record<string, string> = {
  abuse: "Abusive language", profanity: "Profanity", link: "Link", "contact:email": "Email address",
  "contact:phone": "Phone number", "contact:messenger": "Messenger handle", "name:contact_or_link": "Link in name",
  "shape:all_caps": "All caps", "shape:repeated_chars": "Repeated characters", "shape:too_short": "Too short",
  "shape:gibberish": "Gibberish", duplicate_text: "Duplicate text", "burst:many_posts": "Many posts quickly",
  new_poster: "New poster", pitch: "Sales / scam pitch",
};
function reasonLabel(r: string) {
  if (REASON_LABELS[r]) return REASON_LABELS[r];
  const [head, tail] = r.split(":");
  const base = REASON_LABELS[head!] ?? head;
  return tail ? `${base}: ${tail.replace(/_/g, " ")}` : base;
}
const STATUS_STYLE: Record<CommentStatus, string> = {
  approved: "border-emerald-300/50 text-emerald-300",
  pending: "border-gold/60 text-gold",
  rejected: "border-red-300/50 text-red-300",
  hidden: "border-line text-faint",
};

export default function ModerationPanel() {
  const [token, setToken] = useState("");
  const [draft, setDraft] = useState("");
  const [items, setItems] = useState<AdminComment[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("pending");

  useEffect(() => { try { setToken(sessionStorage.getItem(KEY) || ""); } catch { /* ignore */ } }, []);

  const load = useCallback(async (t: string) => {
    if (!t) return;
    setError(""); setItems(null);
    try {
      const res = await api<{ comments: AdminComment[] }>("/v1/admin/comments", { headers: { Authorization: `Bearer ${t}` }, retries: 2 });
      setItems(res.comments);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load comments.");
      if (err instanceof ApiError && err.status === 401) { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setToken(""); }
      setItems([]);
    }
  }, []);
  useEffect(() => { load(token); }, [token, load]);

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    // Sent exactly as typed (no trimming), so passwords with any characters work.
    if (!draft) return;
    try { sessionStorage.setItem(KEY, draft); } catch { /* ignore */ }
    setToken(draft); setDraft("");
  };
  const signOut = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setToken(""); setItems(null); };

  const act = async (c: AdminComment, action: "approve" | "hide" | "reject") => {
    setBusy(c.id + action); setError("");
    try {
      const res = await api<{ status: CommentStatus }>(`/v1/admin/comments/${c.id}/${action}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      setItems((l) => l?.map((x) => (x.id === c.id ? { ...x, status: res.status, hidden: res.status !== "approved" } : x)) ?? l);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally { setBusy(null); }
  };

  const title = (slug: string) => STUDIES.find((s) => s.slug === slug)?.title ?? slug;
  const list = items ?? [];
  const shown = list.filter((c) => inTab(tab, c.status));
  const count = (t: Tab) => list.filter((c) => inTab(t, c.status)).length;
  const byId = new Map(list.map((c) => [c.id, c]));
  const inputCls = "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

  if (!token) {
    return (
      <form onSubmit={signIn} className="card mt-10 max-w-xl p-6">
        <label htmlFor="admin-token" className="text-xs font-semibold uppercase tracking-[.16em] text-mute">Admin password</label>
        <input id="admin-token" type="password" autoComplete="current-password" spellCheck={false} autoCapitalize="off" autoCorrect="off"
          value={draft} onChange={(e) => setDraft(e.target.value)} className={`${inputCls} mt-2`} />
        <button type="submit" className="btn btn-gold mt-5">Open moderation</button>
        {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      </form>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Filter comments">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] ${tab === t.id ? "border-gold text-gold" : "border-line text-mute hover:text-ivory"}`}>
            {t.label} <span className="tabular-nums opacity-80">({items ? count(t.id) : "…"})</span>
          </button>
        ))}
        <div className="ml-auto flex gap-3">
          <button type="button" onClick={() => load(token)} className="btn btn-ghost">Refresh</button>
          <button type="button" onClick={signOut} className="btn btn-ghost">Sign out</button>
        </div>
      </div>
      {error && <p role="alert" className="mt-6 text-sm text-red-300">{error}</p>}
      {items === null ? (
        <p role="status" className="mt-8 text-mute">Loading comments… (the server may take up to a minute to wake up)</p>
      ) : shown.length === 0 ? (
        <p className="mt-8 text-faint">{tab === "pending" ? "Nothing waiting for review." : "No comments here."}</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {shown.map((c) => (
            <li key={c.id} className="card p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-ivory">{c.name}</span>
                <span className="text-faint">{fullTime(c.createdAt)}</span>
                <span className="text-faint">· {c.likes} {c.likes === 1 ? "like" : "likes"}</span>
                <span className="text-faint">· ip {c.ipHash}</span>
                <span className={`rounded-full border px-2 py-0.5 text-xs uppercase tracking-wider ${STATUS_STYLE[c.status]}`}>{c.status}</span>
              </div>
              <p className="mt-1 text-xs text-faint">
                {title(c.study)}{c.parentId ? ` · reply to ${byId.get(c.parentId)?.name ?? "a comment"}` : ""}
              </p>
              <p className={`mt-3 whitespace-pre-wrap break-words ${c.status === "approved" ? "text-mute" : "text-faint"}`}>{c.body}</p>
              {c.reasons?.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-faint">Auto-review:</span>
                  {c.reasons.map((r) => <span key={r} className="rounded-full bg-char-2 px-2.5 py-1 text-mute">{reasonLabel(r)}</span>)}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {c.status !== "approved" && (
                  <button type="button" disabled={!!busy} onClick={() => act(c, "approve")} className="btn btn-gold disabled:opacity-60">
                    {busy === c.id + "approve" ? "Saving…" : "Approve"}
                  </button>
                )}
                {c.status !== "hidden" && (
                  <button type="button" disabled={!!busy} onClick={() => act(c, "hide")} className="btn btn-ghost disabled:opacity-60">
                    {busy === c.id + "hide" ? "Saving…" : "Hide"}
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button type="button" disabled={!!busy} onClick={() => act(c, "reject")} className="btn btn-ghost disabled:opacity-60">
                    {busy === c.id + "reject" ? "Saving…" : "Reject"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
