import type { Metadata } from "next";
import { PageHero, R, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Alphapick is a proprietary trading & investing firm that trades and invests in financial markets with its own capital.",
  alternates: { canonical: "/about/" },
};

const VALUES = [
  { t: "Own capital only", b: "Alphapick trades its own book. We do not take clients, manage money for others, or sell research or recommendations." },
  { t: "Process over prediction", b: "Approaches should be clear and rule-based, so they can be tested, refined, and reviewed honestly." },
  { t: "Risk, thoughtfully", b: "Risk is managed within agreed limits. Protecting capital comes before chasing any single trade." },
  { t: "Partnership", b: "Traders work closely with the firm's leadership: talking through ideas, results, and what is working in the market." },
  { t: "Review, always", b: "Every trader keeps a trade journal, and performance is reviewed together regularly." },
  { t: "Room to grow", b: "As results prove consistent, capital allocation grows, and so does the scope of the role." },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Alphapick" title={<>A <span className="text-gold">trading</span> &amp; investing firm, <em className="text-gold">in the plainest sense.</em></>}
        lead={<>Alphapick is a proprietary <span className="font-medium text-gold">trading</span> &amp; investing firm. We trade and invest in financial markets with the firm&apos;s own capital, and that is the whole of our business.</>} />

      <section className="wrap py-24 md:py-32" aria-labelledby="who-h">
        <div className="grid gap-12 md:grid-cols-12">
          <R className="md:col-span-4"><p className="eyebrow">Who we are</p><div className="gold-rule mt-6" /></R>
          <div className="space-y-8 text-lg text-mute md:col-span-7 md:text-xl">
            <R><h2 id="who-h" className="text-4xl text-ivory md:text-5xl">Small by design. Serious by habit.</h2></R>
            <R d={60}><p>We are a growing firm built around a simple idea: give capable traders capital, good tools, and close support, and hold everyone to a clear, rule-based process.</p></R>
            <R d={120}><p>We trade liquid, listed markets, and we care more about how a result was achieved than about any single good day.</p></R>
            <R d={180}><p>Because we only trade our own capital, there is no one to sell to and nothing to market. Our attention stays on the work.</p></R>
          </div>
        </div>
      </section>

      <section className="border-y border-line/60 bg-char/40 py-24 md:py-32" aria-labelledby="val-h">
        <div className="wrap">
          <R><p className="eyebrow">What we hold to</p><h2 id="val-h" className="mt-6 text-5xl md:text-6xl">How the desk <em className="text-gold">operates.</em></h2></R>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <R key={v.t} d={(i % 3) * 80} className="bg-ink p-8 md:p-10">
                <span aria-hidden className="block h-px w-8 bg-gold" />
                <h3 className="mt-8 text-3xl">{v.t}</h3>
                <p className="mt-4 text-mute">{v.b}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32" aria-labelledby="not-h">
        <div className="grid gap-10 md:grid-cols-12">
          <R className="md:col-span-4"><p className="eyebrow">For clarity</p></R>
          <R d={80} className="md:col-span-8">
            <h2 id="not-h" className="text-4xl md:text-5xl">What Alphapick is not.</h2>
            <ul className="mt-10 divide-y divide-line border-y border-line text-lg">
              {["Not an advisory or research service", "Not a broker, and not a platform for outside traders", "Not open to client money or external capital", "Not a provider of tips, signals, or recommendations"].map((x) => (
                <li key={x} className="flex items-start gap-4 py-5"><span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" /><span className="text-mute">{x}</span></li>
              ))}
            </ul>
          </R>
        </div>
      </section>

      <CTA title={<>Want to trade <em className="text-gold">on the desk?</em></>} body="See our open roles and how to apply." href="/careers/" label="Careers" />
    </>
  );
}
