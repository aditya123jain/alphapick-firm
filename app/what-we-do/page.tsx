import type { Metadata } from "next";
import { PageHero, R, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "What we do",
  description: "Alphapick trades US stocks and ETFs with its own capital, through a clear research, risk and review process.",
  alternates: { canonical: "/what-we-do/" },
};

const CYCLE = [
  { k: "Research", b: "Generate and study trading ideas, with full support for data and tools." },
  { k: "Test", b: "Pressure-test each idea against clear rules before capital goes behind it." },
  { k: "Trade", b: "Execute through the US session within agreed risk limits." },
  { k: "Review", b: "Journal every trade, and review performance together, regularly." },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero eyebrow="What we do" title={<>We trade US equities. <em className="text-gold">That is the job.</em></>}
        lead="Alphapick trades US stocks and ETFs with the firm's own capital. Traders run clear, rule-based approaches, across intraday and swing horizons, backed by data, tools and close support." />

      <section className="wrap py-24 md:py-32" aria-label="Areas">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { e: "Markets", t: "US stocks & ETFs", b: "Our focus is US-listed stocks and ETFs, traded during the US regular session from India." },
            { e: "Approach", t: "Rule-based, trader-led", b: "Intraday, swing, or something of the trader's own. What matters is that the approach is clear, disciplined, and repeatable." },
            { e: "Capital", t: "Proprietary only", b: "Every position uses the firm's own capital. Allocation to a trader grows as they deliver consistent results." },
            { e: "Risk", t: "Within agreed limits", b: "Limits are set and agreed in advance. Risk is managed thoughtfully, every session, by every trader." },
          ].map((c, i) => (
            <R key={c.t} d={(i % 2) * 90} className="card group relative overflow-hidden p-8 md:p-12">
              <div aria-hidden className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/15" />
              <p className="eyebrow relative">{c.e}</p>
              <h2 className="relative mt-8 text-4xl md:text-5xl">{c.t}</h2>
              <p className="relative mt-5 max-w-md text-mute md:text-lg">{c.b}</p>
            </R>
          ))}
        </div>
      </section>

      <section className="border-y border-line/60 bg-char/40 py-24 md:py-32" aria-labelledby="cyc-h">
        <div className="wrap">
          <R><p className="eyebrow">The process</p><h2 id="cyc-h" className="mt-6 max-w-3xl text-5xl md:text-6xl">A cycle we repeat <em className="text-gold">every session.</em></h2></R>
          <div className="relative mt-16">
          <div aria-hidden className="absolute top-[1.15rem] left-0 hidden h-px w-full bg-gradient-to-r from-gold via-line to-gold/40 md:block" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {CYCLE.map((c, i) => (
              <R as="li" key={c.k} d={i * 110} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-ink font-display text-gold">{i + 1}</span>
                <h3 className="mt-6 text-3xl">{c.k}</h3>
                <p className="mt-3 text-mute">{c.b}</p>
              </R>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32" aria-labelledby="inf-h">
        <div className="grid gap-12 md:grid-cols-12">
          <R className="md:col-span-5">
            <p className="eyebrow">The desk</p>
            <h2 id="inf-h" className="mt-6 text-5xl md:text-6xl">Set up so traders can <em className="text-gold">focus.</em></h2>
          </R>
          <R d={100} className="md:col-span-6 md:col-start-7">
            <dl className="divide-y divide-line border-y border-line">
              {[
                ["Data & tools", "Data, tools, and platform costs are fully covered by the firm."],
                ["Workspace", "A dedicated trading setup for each trader at the office, on-site in India."],
                ["Hours", "6:30 PM to 2:00 AM IST, covering US market hours."],
                ["Collaboration", "Ideas and results are discussed openly with the firm's leadership."],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-2 py-6 sm:grid-cols-3">
                  <dt className="text-[.7rem] font-semibold uppercase tracking-[.22em] text-gold">{k}</dt>
                  <dd className="text-mute sm:col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
          </R>
        </div>
      </section>

      <CTA title={<>Bring your approach <em className="text-gold">to the desk.</em></>} body="We are hiring a US Equity Trader." href="/careers/us-equity-trader/" label="View the role" />
    </>
  );
}
