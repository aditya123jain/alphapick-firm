import type { Metadata } from "next";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import Clocks from "@/components/Clocks";
import { R, Arrow, CTA } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const PRINCIPLES = [
  { n: "01", t: "Process before prediction", b: "We favour clear, rule-based approaches that can be written down, tested, and reviewed, over opinions about where the market is going." },
  { n: "02", t: "Risk is the first decision", b: "Every position starts with what we are prepared to lose. Risk is managed within agreed limits, every session." },
  { n: "03", t: "Capital follows consistency", b: "Traders are backed with the firm's capital, and allocation grows as results prove repeatable." },
  { n: "04", t: "Built together", b: "Ideas, results, and what is working in the market are talked through openly. The best work comes from working closely." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grain relative isolate overflow-hidden" aria-labelledby="hero-h">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_0%,#262a30_0%,#16181c_60%)]" />
        <div className="absolute inset-0 -z-10 opacity-90 [mask-image:linear-gradient(180deg,transparent,black_25%,black_70%,transparent)]">
          <HeroCanvas />
        </div>
        <div className="wrap flex min-h-[100svh] flex-col justify-end pt-32 pb-14 md:pb-20">
          <p className="eyebrow rise">Proprietary trading · US equities</p>
          <h1 id="hero-h" className="rise mt-7 max-w-5xl text-[3.1rem] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[7.4rem]" style={{ ["--d" as string]: "90ms" }}>
            Our own capital.<br />
            <em className="font-normal text-gold">Traded with discipline.</em>
          </h1>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <p className="rise max-w-xl text-lg text-mute md:text-xl" style={{ ["--d" as string]: "180ms" }}>
                Alphapick is a proprietary trading firm. We trade US stocks and ETFs with the firm&apos;s own capital, working the full US session every evening.
              </p>
              <div className="rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "260ms" }}>
                <Link href="/careers/" className="btn btn-gold">Careers <Arrow /></Link>
                <Link href="/what-we-do/" className="btn btn-ghost">What we do</Link>
              </div>
            </div>
            <div className="rise md:col-span-5 md:col-start-8" style={{ ["--d" as string]: "340ms" }}>
              <div className="card p-6 backdrop-blur-sm md:p-7">
                <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[.65rem] font-semibold uppercase tracking-[.24em] text-mute">Desk hours</p>
                  <p className="text-xs text-faint">US regular session · 9:30 AM – 4:00 PM ET</p>
                </div>
                <Clocks />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="wrap py-24 md:py-36" aria-labelledby="firm-h">
        <div className="grid gap-12 md:grid-cols-12">
          <R className="md:col-span-4"><p className="eyebrow">The firm</p><div className="gold-rule mt-6" /></R>
          <R d={80} className="md:col-span-8">
            <h2 id="firm-h" className="text-4xl leading-[1.08] md:text-6xl">
              A focused trading desk. No clients, no outside money, no recommendations. <span className="text-mute">Just the work of trading our own book well.</span>
            </h2>
          </R>
        </div>
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {[
            { t: "Proprietary capital", b: "Every position is taken with the firm's own capital. We do not manage money for anyone else." },
            { t: "US equities", b: "We trade US stocks and ETFs, across intraday and swing horizons." },
            { t: "Trader-led", b: "Traders run their own rule-based approaches, backed with capital, data, and tools." },
          ].map((c, i) => (
            <R key={c.t} d={i * 90} className="bg-ink p-8 md:p-10">
              <p className="font-display text-sm text-gold">0{i + 1}</p>
              <h3 className="mt-6 text-3xl">{c.t}</h3>
              <p className="mt-4 text-mute">{c.b}</p>
            </R>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative border-y border-line/60 bg-char/40 py-24 md:py-36" aria-labelledby="pr-h">
        <div className="wrap">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <R className="md:col-span-7">
              <p className="eyebrow">How we think</p>
              <h2 id="pr-h" className="mt-6 text-5xl md:text-7xl">Four principles <em className="text-gold">on the desk.</em></h2>
            </R>
            <R d={100} className="md:col-span-4 md:col-start-9">
              <Link href="/about/" className="link-u inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[.18em] text-ivory">About Alphapick <Arrow /></Link>
            </R>
          </div>
          <ol className="mt-16 md:mt-24">
            {PRINCIPLES.map((p, i) => (
              <R as="li" key={p.n} d={i * 60} className="group grid gap-4 border-t border-line py-9 md:grid-cols-12 md:gap-10 md:py-12">
                <span className="font-display text-xl text-gold md:col-span-1">{p.n}</span>
                <h3 className="text-3xl transition-colors group-hover:text-gold-soft md:col-span-5 md:text-4xl">{p.t}</h3>
                <p className="text-mute md:col-span-5 md:col-start-8 md:text-lg">{p.b}</p>
              </R>
            ))}
          </ol>
        </div>
      </section>

      {/* SESSION */}
      <section className="wrap py-24 md:py-36" aria-labelledby="ses-h">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <R className="md:col-span-5">
            <p className="eyebrow">When we trade</p>
            <h2 id="ses-h" className="mt-6 text-5xl md:text-6xl">While our evening runs, <em className="text-gold">New York is open.</em></h2>
            <p className="mt-6 max-w-md text-mute md:text-lg">The desk works on-site from 6:30 PM to 2:00 AM IST, covering the full US regular session from the open to the close.</p>
          </R>
          <R d={120} className="md:col-span-7">
            <svg viewBox="0 0 600 340" className="w-full" role="img" aria-label="A 24-hour dial showing the desk's evening shift in IST overlapping US market hours">
              <defs>
                <linearGradient id="arc" x1="0" x2="1"><stop offset="0" stopColor="#d4a251" stopOpacity=".5" /><stop offset="1" stopColor="#e6c48a" /></linearGradient>
              </defs>
              <g transform="translate(300 300)">
                {Array.from({ length: 25 }).map((_, i) => {
                  const a = Math.PI + (i / 24) * Math.PI; const r1 = 240, r2 = i % 6 === 0 ? 222 : 232;
                  return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke="#3a3f47" strokeWidth={i % 6 === 0 ? 2 : 1} />;
                })}
                <path d="M-200 0A200 200 0 0 1 200 0" fill="none" stroke="#2e333a" strokeWidth="18" strokeLinecap="round" />
                {/* 12 PM IST (left) to 4 AM IST (right): 16h over 180deg. Shift 18:30-02:00 => 6.5h..14h */}
                {(() => {
                  const ang = (h: number) => Math.PI + (h / 16) * Math.PI;
                  const p = (h: number, r: number) => `${(Math.cos(ang(h)) * r).toFixed(1)} ${(Math.sin(ang(h)) * r).toFixed(1)}`;
                  return (
                    <>
                      <path d={`M${p(6.5, 200)}A200 200 0 0 1 ${p(14, 200)}`} fill="none" stroke="url(#arc)" strokeWidth="18" strokeLinecap="round" />
                      <path d={`M${p(7, 168)}A168 168 0 0 1 ${p(13.5, 168)}`} fill="none" stroke="#d4a251" strokeOpacity=".55" strokeWidth="2" strokeDasharray="2 6" />
                      <text x="0" y="-70" textAnchor="middle" fill="#f4efe6" fontFamily="var(--font-serif), Georgia, serif" fontSize="44">6:30 PM – 2:00 AM</text>
                      <text x="0" y="-36" textAnchor="middle" fill="#b4ada1" fontFamily="var(--font-inter), sans-serif" fontSize="13" letterSpacing="3">DESK SHIFT · IST</text>
                      <text x="0" y="-8" textAnchor="middle" fill="#d4a251" fontFamily="var(--font-inter), sans-serif" fontSize="12" letterSpacing="2">US SESSION 9:30 AM – 4:00 PM ET</text>
                      <text x="-252" y="24" fill="#8f897f" fontSize="12" fontFamily="var(--font-inter), sans-serif">12 PM</text>
                      <text x="218" y="24" fill="#8f897f" fontSize="12" fontFamily="var(--font-inter), sans-serif">4 AM</text>
                    </>
                  );
                })()}
              </g>
            </svg>
          </R>
        </div>
      </section>

      <CTA title={<>Trade US equities <em className="text-gold">with us.</em></>}
        body="We are hiring a US Equity Trader to trade the firm's capital using their own approach, on-site."
        href="/careers/us-equity-trader/" label="View the role" />
    </>
  );
}
