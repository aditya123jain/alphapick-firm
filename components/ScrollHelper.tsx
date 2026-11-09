"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Floating "Go to bottom / Go to discussion / Back to top" pill.
 *  Shows only on pages taller than 1.5 viewports, after ~300px of scrolling. */
type Mode = "hidden" | "down" | "up";

function Arrow({ up }: { up: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${up ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ScrollHelper() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("hidden");
  const [hasDiscussion, setHasDiscussion] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const compute = useCallback(() => {
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const y = window.scrollY;
    const discussion = document.getElementById("discussion");
    setHasDiscussion(!!discussion);
    // Keep out of the way while someone is typing (mobile keyboard) or when it would sit on a submit button.
    const active = document.activeElement;
    const typing = !!active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
    let overlaps = false;
    const b = btnRef.current?.getBoundingClientRect();
    if (b && b.width) {
      document.querySelectorAll<HTMLElement>('main button[type="submit"]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.right > b.left - 8 && r.left < b.right + 8 && r.bottom > b.top - 8 && r.top < b.bottom + 8) overlaps = true;
      });
    }
    if (docH < vh * 1.5 || y < 300 || typing || overlaps) { setMode("hidden"); return; }
    const nearEnd = y + vh >= docH - vh;
    const discussionInView = !!discussion && discussion.getBoundingClientRect().top < vh * 0.85;
    setMode(nearEnd || discussionInView ? "up" : "down");
  }, []);

  useEffect(() => {
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", schedule);
    document.addEventListener("focusout", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", schedule);
      document.removeEventListener("focusout", schedule);
      ro.disconnect();
    };
  }, [compute, pathname]);

  const go = () => {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (mode === "up") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const discussion = document.getElementById("discussion");
    if (discussion) discussion.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
  };

  const up = mode === "up";
  const long = up ? "Back to top" : hasDiscussion ? "Go to discussion" : "Go to bottom";
  const short = up ? "Top" : hasDiscussion ? "Discussion" : "Bottom";
  const visible = mode !== "hidden";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={go}
      aria-label={long}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-scroll-helper={up ? "up" : "down"}
      className={`print-hide fixed right-4 z-40 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-gold/50 bg-char/90 px-4 py-2.5 text-xs font-semibold uppercase tracking-[.14em] text-gold-soft shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-char-2 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <Arrow up={up} />
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{long}</span>
    </button>
  );
}
