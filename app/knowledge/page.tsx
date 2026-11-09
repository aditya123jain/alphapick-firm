import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, R, Arrow } from "@/components/ui";
import { STUDIES } from "@/lib/knowledge";

export const metadata: Metadata = {
  title: "Knowledge",
  description: "Studies and notes from Alphapick, shared to pass on what we learn about markets.",
  alternates: { canonical: "/knowledge/" },
  openGraph: {
    title: "Knowledge | Alphapick",
    description: "Studies and notes from Alphapick, shared to pass on what we learn about markets.",
    url: "/knowledge/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alphapick, proprietary trading & investing firm" }],
  },
};

export default function Knowledge() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge"
        title={<>Notes from the <em className="text-gold">desk.</em></>}
        lead="Studies and notes we share simply to pass on what we learn. Each one is a historical test of a rule, not a track record and not investment advice."
      />

      <section className="wrap py-20 md:py-28" aria-labelledby="studies-h">
        <R className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Studies</p>
            <h2 id="studies-h" className="mt-6 text-5xl md:text-6xl">
              Shared <em className="text-gold">knowledge.</em>
            </h2>
          </div>
          <p className="text-sm text-faint">
            {STUDIES.length} {STUDIES.length === 1 ? "study" : "studies"}
          </p>
        </R>

        <ul className="mt-14 border-t border-line">
          {STUDIES.map((s, i) => (
            <R as="li" key={s.slug} d={80 + i * 80}>
              <Link
                href={`/knowledge/${s.slug}/`}
                className="group block border-b border-line py-10 transition-colors hover:border-gold/60 md:py-14"
              >
                <div className="grid gap-5 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[.18em] text-faint">
                      <time dateTime={s.date}>{s.dateLabel}</time>
                      <span aria-hidden className="text-line">·</span>
                      <span>{s.author}</span>
                    </div>
                    <h3 className="mt-4 text-3xl transition-colors group-hover:text-gold-soft md:text-5xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-mute md:text-lg">{s.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-mute">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[.18em] text-gold md:col-span-4 md:justify-end">
                    Read study <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </R>
          ))}
        </ul>
      </section>
    </>
  );
}
