import type { ReactNode, CSSProperties } from "react";

export function R({ children, d = 0, className = "", as: Tag = "div" }: { children: ReactNode; d?: number; className?: string; as?: "div" | "section" | "li" | "article" | "header" }) {
  return <Tag data-reveal className={className} style={{ ["--d" as string]: `${d}ms` } as CSSProperties}>{children}</Tag>;
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line/60 pt-36 pb-20 md:pt-48 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-[120px]" />
      <div className="wrap relative">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="rise mt-6 max-w-4xl text-[2.9rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]" style={{ ["--d" as string]: "80ms" } as CSSProperties}>{title}</h1>
        {lead && <p className="rise mt-8 max-w-2xl text-lg text-mute md:text-xl" style={{ ["--d" as string]: "160ms" } as CSSProperties}>{lead}</p>}
        <div className="sweep mt-14 h-px w-full max-w-md bg-gradient-to-r from-gold to-transparent" style={{ ["--d" as string]: "250ms" } as CSSProperties} />
      </div>
    </header>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
  );
}

export function CTA({ title, body, href, label }: { title: ReactNode; body: ReactNode; href: string; label: string }) {
  return (
    <section className="wrap py-24 md:py-32" aria-labelledby="cta-h">
      <R className="card grain relative overflow-hidden px-7 py-14 md:px-16 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 h-96 w-96 rounded-full bg-gold/15 blur-[100px]" />
        <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 id="cta-h" className="text-4xl md:text-6xl">{title}</h2>
            <p className="mt-6 max-w-xl text-mute md:text-lg">{body}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a href={href} className="btn btn-gold">{label}<Arrow /></a>
          </div>
        </div>
      </R>
    </section>
  );
}
