"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const active = (href: string) => path === href || path?.startsWith(href);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "border-b border-line/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="relative z-10 -ml-1 rounded p-1" aria-label="Alphapick, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-light.svg" alt="" width={146} height={34} className="h-7 w-auto md:h-8" />
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={active(n.href) ? "page" : undefined}
                  className={`link-u text-[.8rem] font-medium uppercase tracking-[.18em] transition-colors ${active(n.href) ? "text-gold" : "text-mute hover:text-ivory"}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-ivory transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-6 bg-ivory transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink md:hidden">
        <nav aria-label="Mobile" className="wrap flex flex-col pt-8 pb-12">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`rise border-b border-line/70 py-5 font-display text-4xl ${active(n.href) ? "text-gold" : "text-ivory"}`}
              style={{ ["--d" as string]: `${i * 60}ms` }}>
              {n.label}
            </Link>
          ))}
          <a href="mailto:careers@alphapick.in" className="btn btn-gold mt-10 self-start">careers@alphapick.in</a>
        </nav>
      </div>
    </header>
  );
}
