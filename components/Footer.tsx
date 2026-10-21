import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line/70 bg-ink">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-light.svg" alt="Alphapick" width={172} height={40} className="h-9 w-auto" />
          <p className="mt-6 max-w-sm text-sm text-mute">
            A proprietary <span className="font-medium text-gold">trading</span> &amp; investing firm, active in financial markets with its own capital.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow">Firm</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="link-u text-mute hover:text-ivory">{n.label}</Link></li>
            ))}
            <li><Link href="/careers/us-equity-trader/" className="link-u text-mute hover:text-ivory">US Equity Trader</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow">Write to us</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li><span className="block text-faint">General</span><a className="link-u text-ivory" href={`mailto:${SITE.emailGeneral}`}>{SITE.emailGeneral}</a></li>
            <li><span className="block text-faint">Applications</span><a className="link-u text-ivory" href={`mailto:${SITE.emailCareers}`}>{SITE.emailCareers}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap pb-10">
        <div className="rule" />
        <div className="flex flex-col gap-3 pt-8 text-xs leading-relaxed text-faint md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Alphapick. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Alphapick trades solely its own capital. It does not manage money for others,
            provide investment recommendations, or offer financial products or services to the public.
          </p>
        </div>
      </div>
    </footer>
  );
}
