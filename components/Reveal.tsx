"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One observer for the whole page: elements with [data-reveal] fade up once when scrolled into view.
 *  Re-scans on every route change and whenever new [data-reveal] nodes appear, so client-side
 *  navigation never leaves content hidden. Does nothing under prefers-reduced-motion. */
export default function RevealController() {
  const pathname = usePathname();
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const seen = new WeakSet<Element>();
    const scan = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Already on screen: show immediately (no flash, no LCP delay).
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
        else io.observe(el);
      });
    };
    scan();
    root.classList.add("reveal-ready");
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety net: nothing stays hidden if an observer callback is missed.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    }, 1500);
    return () => { io.disconnect(); mo.disconnect(); window.clearTimeout(fallback); };
  }, [pathname]);
  return null;
}
