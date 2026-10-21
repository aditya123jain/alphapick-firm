/* 9:00 AM to 4:00 PM IST, aligned to the NSE regular session (9:15 AM to 3:30 PM IST).
   Positions are minutes from 9:00 AM IST over a 420-minute day. */
const SPAN = 420;
const pct = (m: number) => `${(m / SPAN) * 100}%`;
const TICKS = [
  { m: 0, ist: "9:00 AM" },
  { m: 120, ist: "11:00 AM" },
  { m: 240, ist: "1:00 PM" },
  { m: 420, ist: "4:00 PM" },
];
const PHASES = [
  { from: 0, to: 15, name: "Before the open", ist: "9:00 – 9:15 AM IST", note: "Pre-open and planning" },
  { from: 15, to: 390, name: "NSE session", ist: "9:15 AM – 3:30 PM IST", note: "Live trading", main: true },
  { from: 390, to: 420, name: "After the close", ist: "3:30 – 4:00 PM IST", note: "Review and journal" },
];

export default function NseHours() {
  return (
    <figure className="card relative overflow-hidden p-6 md:p-10" aria-labelledby="hours-cap">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="eyebrow">The hours</p>
        <p className="font-display text-2xl md:text-3xl"><span className="text-gold">9:00 AM</span> to <span className="text-gold">4:00 PM</span> <span className="text-mute">IST</span></p>
      </div>

      <div className="relative mt-14 hidden sm:block" aria-hidden="true">
        <div className="relative h-16">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          {PHASES.map((p) => (
            <div key={p.name} className={`absolute top-1/2 -translate-y-1/2 rounded-full ${p.main ? "h-3 bg-gradient-to-r from-gold/70 via-gold to-gold-soft shadow-[0_0_24px_rgba(212,162,81,.35)]" : "h-1.5 bg-gold/30"}`}
              style={{ left: pct(p.from), width: pct(p.to - p.from) }} />
          ))}
          <span className="pulse absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft" style={{ left: pct(15) }} />
          <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-ink" style={{ left: pct(390) }} />
          <span className="absolute -top-6 whitespace-nowrap text-[.65rem] font-semibold uppercase tracking-[.2em] text-gold" style={{ left: pct(15) }}>NSE open</span>
          <span className="absolute -top-6 -translate-x-full whitespace-nowrap text-[.65rem] font-semibold uppercase tracking-[.2em] text-gold" style={{ left: pct(390) }}>NSE close</span>
        </div>
        <div className="relative mt-3 h-8 text-xs">
          {TICKS.map((t, i) => (
            <div key={t.m} className={`absolute top-0 whitespace-nowrap ${i === 0 ? "" : i === TICKS.length - 1 ? "-translate-x-full text-right" : "-translate-x-1/2 text-center"}`} style={{ left: pct(t.m) }}>
              <div className="font-medium text-ivory tabular-nums">{t.ist}</div>
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-8 md:grid-cols-[1fr_1.5fr_1fr]">
        {PHASES.map((p) => (
          <li key={p.name} className={`bg-char/90 p-5 ${p.main ? "bg-char" : ""}`}>
            <p className={`text-[.65rem] font-semibold uppercase tracking-[.22em] ${p.main ? "text-gold" : "text-faint"}`}>{p.name}</p>
            <p className="mt-2 font-display text-xl text-ivory tabular-nums md:text-[1.35rem]">{p.ist}</p>
            <p className="mt-1 text-sm text-mute">{p.note}</p>
          </li>
        ))}
      </ol>
      <figcaption id="hours-cap" className="mt-6 text-xs leading-relaxed text-faint">
        Full market hours on-site, covering the NSE regular session for index and stock futures and options.
      </figcaption>
    </figure>
  );
}
