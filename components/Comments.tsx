"use client";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ApiError, BODY_MAX, NAME_MAX, api, fullTime, relativeTime, voterToken, type PostResponse, type PublicComment } from "@/lib/comments";

type ListResponse = { count: number; comments: PublicComment[] };
const NAME_KEY = "ap.commentName";

function plural(n: number, one: string, many: string) { return `${n} ${n === 1 ? one : many}`; }

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" strokeLinejoin="round" />
    </svg>
  );
}

function CommentForm({ slug, parentId, replyTo, onPosted, onCancel, autoFocus }: {
  slug: string; parentId?: string; replyTo?: string; onPosted: (c: PublicComment) => void; onCancel?: () => void; autoFocus?: boolean;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [message, setMessage] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { try { setName(localStorage.getItem(NAME_KEY) || ""); } catch { /* ignore */ } }, []);
  useEffect(() => { if (autoFocus) bodyRef.current?.focus(); }, [autoFocus]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    if (!name.trim() || !body.trim()) { setState("error"); setMessage("Please add your name and a comment."); return; }
    setState("sending"); setMessage("");
    const slowTimer = setTimeout(() => setMessage("Still working, the discussion server may be waking up…"), 4000);
    try {
      const res = await api<PostResponse>(`/v1/studies/${slug}/comments`, {
        method: "POST", json: { name, body, parentId: parentId ?? null, website },
      });
      try { localStorage.setItem(NAME_KEY, name.trim()); } catch { /* ignore */ }
      setBody(""); setState("done");
      if (res.status === "approved") {
        setMessage(parentId ? "Reply posted." : "Thanks, your comment is posted.");
        onPosted(res.comment);
      } else {
        setMessage(res.message || "Thanks. Your comment will appear after a quick review.");
      }
    } catch (err) {
      setState("error");
      setMessage(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearTimeout(slowTimer);
    }
  };

  const left = BODY_MAX - body.length;
  const inputCls = "mt-2 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory placeholder:text-faint/80 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
  return (
    <form onSubmit={submit} noValidate className={parentId ? "mt-4 rounded-2xl border border-line/80 bg-char/40 p-4 sm:p-5" : "card p-5 sm:p-7"} aria-label={parentId ? `Reply to ${replyTo}` : "Add a comment"}>
      {replyTo && <p className="mb-3 text-sm text-faint">Replying to <span className="text-ivory">{replyTo}</span></p>}
      <div className="grid gap-4">
        <div>
          <label htmlFor={`${uid}-name`} className="text-xs font-semibold uppercase tracking-[.16em] text-mute">Name</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" required maxLength={NAME_MAX} value={name}
            onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${uid}-body`} className="text-xs font-semibold uppercase tracking-[.16em] text-mute">{parentId ? "Reply" : "Comment"}</label>
            <span id={`${uid}-count`} className={`text-xs tabular-nums ${left < 100 ? "text-gold" : "text-faint"}`} aria-live="polite">
              {body.length}/{BODY_MAX}
            </span>
          </div>
          <textarea id={`${uid}-body`} ref={bodyRef} name="body" required maxLength={BODY_MAX} rows={parentId ? 3 : 5} value={body}
            onChange={(e) => setBody(e.target.value)} aria-describedby={`${uid}-count`}
            className={`${inputCls} min-h-28 resize-y leading-relaxed`} placeholder={parentId ? "Write a reply" : "Questions, ideas or results from your own testing"} />
        </div>
        {/* Honeypot: hidden from people, bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={state === "sending"} className="btn btn-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-70">
          {state === "sending" ? "Posting…" : parentId ? "Post reply" : "Post comment"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-ghost focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Cancel</button>
        )}
        <p role="status" aria-live="polite" className={`text-sm ${state === "error" ? "text-red-300" : state === "sending" ? "text-mute" : "text-gold-soft"}`}>{message}</p>
      </div>
    </form>
  );
}

function CommentItem({ c, onLike, children, isReply }: { c: PublicComment; onLike: (c: PublicComment) => void; children?: React.ReactNode; isReply?: boolean }) {
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 60_000); return () => clearInterval(t); }, []);
  return (
    <div className={isReply ? "border-l border-gold/40 pl-4 sm:pl-5" : ""} id={`comment-${c.id}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-semibold text-ivory">{c.name}</span>
        <time dateTime={c.createdAt} title={fullTime(c.createdAt)} className="text-xs text-faint">{relativeTime(c.createdAt)}</time>
      </div>
      <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-mute">{c.body}</p>
      <div className="mt-3 flex items-center gap-5 text-sm">
        <button type="button" onClick={() => onLike(c)} aria-pressed={c.liked}
          aria-label={`${c.liked ? "Unlike" : "Like"} comment by ${c.name}. ${plural(c.likes, "like", "likes")}`}
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 -mx-2 transition hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-gold ${c.liked ? "text-gold" : "text-faint"}`}>
          <HeartIcon filled={c.liked} /> <span className="tabular-nums">{c.likes}</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Comments({ slug }: { slug: string }) {
  const [items, setItems] = useState<PublicComment[] | null>(null);
  const [count, setCount] = useState(0);
  const [loadError, setLoadError] = useState("");
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [likeError, setLikeError] = useState("");
  const [slow, setSlow] = useState(false);

  const load = useCallback(async () => {
    setLoadError("");
    setSlow(false);
    const slowTimer = setTimeout(() => setSlow(true), 3500);
    try {
      const res = await api<ListResponse>(`/v1/studies/${slug}/comments`, { headers: { "X-Voter": voterToken() }, retries: 2 });
      setItems(res.comments); setCount(res.count);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Could not load comments.");
      setItems((prev) => prev ?? []);
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
    }
  }, [slug]);
  useEffect(() => { load(); }, [load]);

  const update = (id: string, fn: (c: PublicComment) => PublicComment) =>
    setItems((list) => list?.map((t) => t.id === id ? fn(t) : { ...t, replies: t.replies?.map((r) => (r.id === id ? fn(r) : r)) }) ?? list);

  const onLike = async (c: PublicComment) => {
    setLikeError("");
    const want = !c.liked;
    update(c.id, (x) => ({ ...x, liked: want, likes: Math.max(0, x.likes + (want ? 1 : -1)) }));
    try {
      const res = await api<{ liked: boolean; likes: number }>(`/v1/comments/${c.id}/like`, { method: "POST", json: { voter: voterToken(), like: want } });
      update(c.id, (x) => ({ ...x, liked: res.liked, likes: res.likes }));
    } catch (err) {
      update(c.id, (x) => ({ ...x, liked: c.liked, likes: c.likes }));
      setLikeError(err instanceof ApiError ? err.message : "Could not save your like.");
    }
  };

  const added = (c: PublicComment) => {
    setCount((n) => n + 1);
    if (c.parentId) {
      setItems((list) => list?.map((t) => (t.id === c.parentId ? { ...t, replies: [...(t.replies ?? []), c] } : t)) ?? list);
      setReplyFor(null);
    } else {
      setItems((list) => [{ ...c, replies: [] }, ...(list ?? [])]);
    }
  };

  return (
    <section id="discussion" aria-labelledby="discussion-h" className="mx-auto mt-20 max-w-3xl scroll-mt-28 border-t border-line pt-14 md:mt-24 md:pt-16">
      <p className="eyebrow">Discussion</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 id="discussion-h" className="text-[2rem] leading-tight text-ivory md:text-5xl">Feedback on this study</h2>
        <p className="text-sm uppercase tracking-[.16em] text-faint" aria-live="polite">
          {items === null ? "Loading…" : plural(count, "comment", "comments")}
        </p>
      </div>
      <p className="mt-4 max-w-2xl text-mute">
        Questions, critiques or your own results are welcome. Comments are public and shown as plain text. Some comments are reviewed before they appear. Please keep it civil; off-topic or promotional posts are not published.
      </p>

      <div className="mt-8"><CommentForm slug={slug} onPosted={added} /></div>

      {loadError && (
        <div role="alert" className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-char/40 p-4 text-sm text-mute">
          <span>{loadError}</span>
          <button type="button" onClick={load} className="link-u text-gold hover:text-gold-soft">Try again</button>
        </div>
      )}
      {likeError && <p role="alert" className="mt-4 text-sm text-red-300">{likeError}</p>}

      {items === null ? (
        <div className="mt-10" role="status" aria-live="polite">
          <p className="flex items-center gap-3 text-sm text-mute">
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            {slow ? "Waking up the discussion server. The first load can take up to a minute…" : "Loading discussion…"}
          </p>
        <div className="mt-6 space-y-6" aria-hidden>
          {[0, 1].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-4 w-32 rounded bg-char-2" /><div className="h-4 w-full rounded bg-char-2/70" /><div className="h-4 w-2/3 rounded bg-char-2/70" />
            </div>
          ))}
        </div>
        </div>
      ) : items.length === 0 && !loadError ? (
        <p className="mt-10 text-faint">No comments yet. Be the first to share feedback.</p>
      ) : (
        <ol className="mt-10 divide-y divide-line/70" aria-label="Comments">
          {items.map((t) => (
            <li key={t.id} className="py-7 first:pt-0">
              <CommentItem c={t} onLike={onLike}>
                <button type="button" onClick={() => setReplyFor(replyFor === t.id ? null : t.id)} aria-expanded={replyFor === t.id}
                  className="link-u text-faint hover:text-ivory focus-visible:outline-2 focus-visible:outline-gold">Reply</button>
              </CommentItem>
              {(t.replies?.length ?? 0) > 0 && (
                <ol className="mt-5 space-y-5 sm:ml-6" aria-label={`Replies to ${t.name}`}>
                  {t.replies!.map((r) => <li key={r.id}><CommentItem c={r} onLike={onLike} isReply /></li>)}
                </ol>
              )}
              {replyFor === t.id && (
                <div className="sm:ml-6">
                  <CommentForm slug={slug} parentId={t.id} replyTo={t.name} onPosted={added} onCancel={() => setReplyFor(null)} autoFocus />
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
