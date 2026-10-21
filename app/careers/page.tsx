import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, R, Arrow } from "@/components/ui";
import { ROLE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Alphapick. We are hiring a US Equity Trader, full-time and on-site in India, 6:30 PM to 2:00 AM IST.",
  alternates: { canonical: "/careers/" },
};

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Your approach. <em className="text-gold">Our capital.</em></>}
        lead="We back talented traders with capital, tools, and a team that wants to see them succeed. If you have built an approach that works, we would like to hear from you." />

      <section className="wrap py-24 md:py-32" aria-labelledby="why-h">
        <div className="grid gap-12 md:grid-cols-12">
          <R className="md:col-span-4">
            <p className="eyebrow">Why Alphapick</p>
            <h2 id="why-h" className="mt-6 text-4xl md:text-5xl">What the desk offers.</h2>
          </R>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:col-span-8">
            {ROLE.offer.map((o, i) => (
              <R as="li" key={o} d={(i % 2) * 80} className={`bg-ink p-7 md:p-8 ${i === ROLE.offer.length - 1 ? "sm:col-span-2" : ""}`}>
                <span className="font-display text-gold">0{i + 1}</span>
                <p className="mt-4 text-ivory md:text-lg">{o}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line/60 bg-char/40 py-24 md:py-32" aria-labelledby="open-h">
        <div className="wrap">
          <R className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow">Open roles</p><h2 id="open-h" className="mt-6 text-5xl md:text-6xl">One seat, <em className="text-gold">open now.</em></h2></div>
            <p className="text-sm text-faint">1 open position</p>
          </R>
          <R d={100}>
            <Link href="/careers/us-equity-trader/" className="group mt-14 block border-y border-line py-10 transition-colors hover:border-gold/60 md:py-14">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <h3 className="text-4xl transition-colors group-hover:text-gold-soft md:col-span-5 md:text-6xl">{ROLE.title}</h3>
                <div className="flex flex-wrap gap-2 md:col-span-5">
                  {["Full-time", "On-site in India", "6:30 PM – 2:00 AM IST", "US equities"].map((t) => (
                    <span key={t} className="rounded-full border border-line px-4 py-1.5 text-xs tracking-wide text-mute">{t}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[.18em] text-gold md:col-span-2 md:justify-end">
                  Read role <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </R>
        </div>
      </section>

      <section className="wrap py-24 md:py-32" aria-labelledby="how-h">
        <R className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How to apply</p>
          <h2 id="how-h" className="mt-6 text-4xl md:text-6xl">Send your resume and a short note on <em className="text-gold">how you trade.</em></h2>
          <a href={`mailto:${SITE.emailCareers}?subject=${encodeURIComponent("Application: US Equity Trader")}`} className="btn btn-gold mt-12">{SITE.emailCareers} <Arrow /></a>
        </R>
      </section>
    </>
  );
}
