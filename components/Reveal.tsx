"use client";
import { useEffect } from "react";

/** One observer for the whole page: elements with [data-reveal] fade up once when scrolled into view.
 *  Does nothing under prefers-reduced-motion (content stays fully visible; no JS = visible too). */
export default function RevealController() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    // Elements already on screen at load are shown immediately (no flash, no LCP delay).
    els.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in"); });
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => { if (!el.classList.contains("is-in")) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return null;
}
