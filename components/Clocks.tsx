"use client";
import { useEffect, useState } from "react";

const fmt = (tz: string) => new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });

/** Real local times only (no market data). Placeholder text keeps width fixed so nothing shifts on hydrate. */
export default function Clocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  const rows = [
    { city: "India", tz: "Asia/Kolkata", label: "IST" },
    { city: "New York", tz: "America/New_York", label: "ET" },
  ];
  return (
    <dl className="grid grid-cols-2 divide-x divide-line/70">
      {rows.map((r) => (
        <div key={r.tz} className="px-5 first:pl-0">
          <dt className="text-[.65rem] font-semibold uppercase tracking-[.24em] text-faint">{r.city}</dt>
          <dd className="mt-2 font-display text-4xl tabular-nums text-ivory">
            <span suppressHydrationWarning>{now ? fmt(r.tz).format(now) : "--:--"}</span>
            <span className="ml-2 align-middle font-sans text-xs tracking-[.2em] text-gold">{r.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
