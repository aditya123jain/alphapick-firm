/* Desk shift 9:00 AM to 4:30 PM ET, around the US regular session (9:30 AM to 4:00 PM ET).
   Positions are minutes from 9:00 AM ET over a 450-minute shift. */
const SPAN = 450;
const pct = (m: number) => `${(m / SPAN) * 100}%`;
const TICKS = [
  { m: 0, et: "9:00 AM" },
  { m: 90, et: "10:30 AM" },
  { m: 210, et: "12:30 PM" },
  { m: 330, et: "2:30 PM" },
  { m: 450, et: "4:30 PM" },
];
const PHASES = [
  { from: 0, to: 30, name: "Before the open", et: "9:00 – 9:30 AM ET", note: "Prepare and plan" },
  { from: 30, to: 420, name: "US regular session", et: "9:30 AM – 4:00 PM ET", note: "Open to close", main: true },
  { from: 420, to: 450, name: "After the close", et: "4:00 – 4:30 PM ET", note: "Review the day" },
];

export default function ShiftTimeline() {
  return (
    <figure className="card relative overflow-hidden p-6 md:p-10" aria-labelledby="shift-cap">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="eyebrow">The shift</p>
        <p className="font-display text-2xl md:text-3xl"><span className="text-gold">9:00 AM</span> to <span className="text-gold">4:30 PM</span> <span className="text-mute">ET</span></p>
      </div>

      {/* Desktop / tablet: horizontal track */}
      <div className="relative mt-14 hidden sm:block" aria-hidden="true">
        <div className="relative h-16">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          {PHASES.map((p) => (
            <div key={p.name} className={`absolute top-1/2 -translate-y-1/2 rounded-full ${p.main ? "h-3 bg-gradient-to-r from-gold/70 via-gold to-gold-soft shadow-[0_0_24px_rgba(212,162,81,.35)]" : "h-1.5 bg-gold/30"}`}
              style={{ left: pct(p.from), width: pct(p.to - p.from) }} />
          ))}
          <span className="pulse absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft" style={{ left: pct(30) }} />
          <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-ink" style={{ left: pct(420) }} />
          <span className="absolute -top-6 -translate-x-1/2 whitespace-nowrap text-[.65rem] font-semibold uppercase tracking-[.2em] text-gold" style={{ left: pct(30) }}>US open</span>
          <span className="absolute -top-6 -translate-x-1/2 whitespace-nowrap text-[.65rem] font-semibold uppercase tracking-[.2em] text-gold" style={{ left: pct(420) }}>US close</span>
        </div>
        <div className="relative mt-3 h-12 text-xs">
          {TICKS.map((t, i) => (
            <div key={t.m} className={`absolute top-0 whitespace-nowrap ${i === 0 ? "" : i === TICKS.length - 1 ? "-translate-x-full text-right" : "-translate-x-1/2 text-center"}`} style={{ left: pct(t.m) }}>
              <div className="font-medium text-ivory tabular-nums">{t.et}</div>
              <div className="mt-1 text-faint">ET</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phases (also the accessible description, and the layout on phones) */}
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-8 md:grid-cols-[1fr_1.5fr_1fr]">
        {PHASES.map((p) => (
          <li key={p.name} className={`bg-char/90 p-5 ${p.main ? "bg-char" : ""}`}>
            <p className={`text-[.65rem] font-semibold uppercase tracking-[.22em] ${p.main ? "text-gold" : "text-faint"}`}>{p.name}</p>
            <p className="mt-2 font-display text-xl text-ivory tabular-nums md:text-[1.35rem]">{p.et}</p>
            <p className="mt-1 text-sm text-mute">{p.note}</p>
          </li>
        ))}
      </ol>
      <figcaption id="shift-cap" className="mt-6 text-xs leading-relaxed text-faint">
        All times are US Eastern Time (New York).
      </figcaption>
    </figure>
  );
}
