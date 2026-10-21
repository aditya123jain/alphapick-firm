import type { ReactNode } from "react";
import Link from "next/link";
import { R, Arrow } from "@/components/ui";
import { SITE, roleMail, type Role } from "@/lib/site";

function List({ id, eyebrow, title, items }: { id: string; eyebrow: string; title: string; items: string[] }) {
  return (
    <section aria-labelledby={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-5 text-4xl md:text-5xl">{title}</h2>
      <ol className="mt-10 border-t border-line">
        {items.map((it, i) => (
          <R as="li" key={it} d={i * 60} className="flex gap-6 border-b border-line py-6">
            <span className="w-7 shrink-0 font-display text-lg text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-ivory/90 md:text-lg">{it}</span>
          </R>
        ))}
      </ol>
    </section>
  );
}

export default function RolePage({ role: ROLE, shift, shiftLabel = "See the shift" }: { role: Role; shift: ReactNode; shiftLabel?: string }) {
  const mail = roleMail(ROLE);
  return (
    <>
      <header className="relative overflow-hidden border-b border-line/60 pt-32 pb-16 md:pt-44 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute -top-48 left-[-15%] h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-[130px]" />
        <div className="wrap relative">
          <nav aria-label="Breadcrumb" className="rise text-xs uppercase tracking-[.2em] text-faint">
            <Link href="/careers/" className="link-u hover:text-ivory">Careers</Link><span aria-hidden className="mx-3 text-line">/</span><span className="text-mute" aria-current="page">Open role</span>
          </nav>
          <h1 className="rise mt-8 text-[3.4rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[8.5rem]" style={{ ["--d" as string]: "80ms" }}>
            {ROLE.titleLead} <em className="text-gold">{ROLE.titleEm}</em>
          </h1>
          <p className="rise mt-8 max-w-3xl text-lg text-mute md:text-xl" style={{ ["--d" as string]: "160ms" }}>{ROLE.meta}</p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
            <a href={mail} className="btn btn-gold">Apply by email <Arrow /></a>
            <a href="#shift" className="btn btn-ghost">{shiftLabel}</a>
          </div>
        </div>
      </header>

      <div className="wrap grid gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <aside className="lg:col-span-4" aria-label="Role summary">
          <div className="card p-7 lg:sticky lg:top-28">
            <dl className="space-y-5 text-sm">
              {[["Role", ROLE.title], ["Type", "Full-time"], ["Location", "On-site"], ["Hours", ROLE.hours], ["Markets", ROLE.markets]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line/70 pb-4 last:border-0 last:pb-0">
                  <dt className="text-faint">{k}</dt><dd className="text-right text-ivory">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={mail} className="btn btn-gold mt-8 w-full justify-center">Apply <Arrow /></a>
            <p className="mt-4 text-center text-xs text-faint">{SITE.emailCareers}</p>
          </div>
        </aside>

        <article className="space-y-24 md:space-y-32 lg:col-span-8">
          <section aria-labelledby="about-h">
            <R><p className="eyebrow">About the role</p><h2 id="about-h" className="sr-only">About the role</h2></R>
            <R d={60}>
              <p className="mt-6 font-display text-[1.75rem] leading-[1.3] text-ivory md:text-[2.4rem] md:leading-[1.25]">
                <span className="float-left mt-1 mr-3 font-display text-[4.4rem] leading-[.8] text-gold md:text-[5.6rem]">W</span>
                {ROLE.about.slice(1)}
              </p>
            </R>
          </section>

          <R as="section" className="scroll-mt-28" ><div id="shift" className="scroll-mt-28">{shift}</div></R>

          <div className="grid gap-20 xl:grid-cols-2 xl:gap-12">
            <List id="do-h" eyebrow="The work" title="What you'll do" items={ROLE.do} />
            <List id="look-h" eyebrow="The fit" title="What we're looking for" items={ROLE.lookFor} />
          </div>

          <section aria-labelledby="offer-h">
            <R><p className="eyebrow">In return</p><h2 id="offer-h" className="mt-5 text-4xl md:text-5xl">What we offer</h2></R>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {ROLE.offer.map((o, i) => (
                <R as="li" key={o} d={(i % 2) * 80} className={`bg-ink p-7 ${i === ROLE.offer.length - 1 ? "sm:col-span-2" : ""}`}>
                  <span aria-hidden className="block h-px w-8 bg-gold" /><p className="mt-5 text-ivory/90">{o}</p>
                </R>
              ))}
            </ul>
          </section>

          <section aria-labelledby="apply-h">
            <R className="card grain relative overflow-hidden p-8 md:p-14">
              <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 h-96 w-96 rounded-full bg-gold/20 blur-[100px]" />
              <p className="eyebrow relative">How to apply</p>
              <h2 id="apply-h" className="relative mt-6 text-4xl md:text-6xl">Tell us <em className="text-gold">how you trade.</em></h2>
              <p className="relative mt-6 max-w-xl text-mute md:text-lg">
                Email your resume to <a href={mail} className="link-u text-ivory">careers@alphapick.in</a>, along with a short note about your trading approach.
              </p>
              <a href={mail} className="btn btn-gold relative mt-10 text-[.75rem] sm:text-[.8rem]">careers@alphapick.in <Arrow /></a>
            </R>
          </section>
        </article>
      </div>
    </>
  );
}
