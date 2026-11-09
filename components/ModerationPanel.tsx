"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ApiError, api, fullTime, type AdminComment } from "@/lib/comments";
import { STUDIES } from "@/lib/knowledge";

const KEY = "ap.adminToken";

export default function ModerationPanel() {
  const [token, setToken] = useState("");
  const [draft, setDraft] = useState("");
  const [items, setItems] = useState<AdminComment[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");

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
    const t = draft.trim();
    if (!t) return;
    try { sessionStorage.setItem(KEY, t); } catch { /* ignore */ }
    setDraft(""); setToken(t);
  };
  const signOut = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setToken(""); setItems(null); };

  const toggle = async (c: AdminComment) => {
    setBusy(c.id); setError("");
    try {
      const res = await api<{ hidden: boolean }>(`/v1/admin/comments/${c.id}/${c.hidden ? "unhide" : "hide"}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      setItems((l) => l?.map((x) => (x.id === c.id ? { ...x, hidden: res.hidden } : x)) ?? l);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally { setBusy(null); }
  };

  const title = (slug: string) => STUDIES.find((s) => s.slug === slug)?.title ?? slug;
  const shown = (items ?? []).filter((c) => filter === "all" || (filter === "hidden" ? c.hidden : !c.hidden));
  const byId = new Map((items ?? []).map((c) => [c.id, c]));
  const inputCls = "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

  if (!token) {
    return (
      <form onSubmit={signIn} className="card mt-10 max-w-xl p-6">
        <label htmlFor="admin-token" className="text-xs font-semibold uppercase tracking-[.16em] text-mute">Admin token</label>
        <input id="admin-token" type="password" autoComplete="off" value={draft} onChange={(e) => setDraft(e.target.value)} className={`${inputCls} mt-2`} />
        <button type="submit" className="btn btn-gold mt-5">Open moderation</button>
        {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      </form>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-3">
        {(["all", "visible", "hidden"] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] ${filter === f ? "border-gold text-gold" : "border-line text-mute hover:text-ivory"}`}>
            {f}
          </button>
        ))}
        <button type="button" onClick={() => load(token)} className="btn btn-ghost ml-auto">Refresh</button>
        <button type="button" onClick={signOut} className="btn btn-ghost">Sign out</button>
      </div>
      {error && <p role="alert" className="mt-6 text-sm text-red-300">{error}</p>}
      {items === null ? (
        <p role="status" className="mt-8 text-mute">Loading comments… (the server may take up to a minute to wake up)</p>
      ) : shown.length === 0 ? (
        <p className="mt-8 text-faint">No comments here.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {shown.map((c) => (
            <li key={c.id} className={`card p-5 ${c.hidden ? "border-red-300/30" : ""}`}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-ivory">{c.name}</span>
                <span className="text-faint">{fullTime(c.createdAt)}</span>
                <span className="text-faint">· {c.likes} {c.likes === 1 ? "like" : "likes"}</span>
                <span className="text-faint">· ip {c.ipHash}</span>
                {c.hidden && <span className="rounded-full border border-red-300/50 px-2 py-0.5 text-xs uppercase tracking-wider text-red-300">Hidden</span>}
              </div>
              <p className="mt-1 text-xs text-faint">
                {title(c.study)}{c.parentId ? ` · reply to ${byId.get(c.parentId)?.name ?? "a comment"}` : ""}
              </p>
              <p className={`mt-3 whitespace-pre-wrap break-words ${c.hidden ? "text-faint line-through decoration-faint/50" : "text-mute"}`}>{c.body}</p>
              <button type="button" disabled={busy === c.id} onClick={() => toggle(c)} className={`btn mt-4 ${c.hidden ? "btn-gold" : "btn-ghost"} disabled:opacity-60`}>
                {busy === c.id ? "Saving…" : c.hidden ? "Unhide" : "Hide"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
