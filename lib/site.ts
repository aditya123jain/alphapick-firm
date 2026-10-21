export const SITE = {
  name: "Alphapick",
  url: "https://alphapick.in",
  description:
    "Alphapick is a proprietary trading & investing firm that trades and invests in financial markets with its own capital.",
  emailGeneral: "info@alphapick.in",
  emailCareers: "careers@alphapick.in",
};

export const NAV = [
  { href: "/about/", label: "About" },
  { href: "/what-we-do/", label: "What we do" },
  { href: "/careers/", label: "Careers" },
  { href: "/contact/", label: "Contact" },
];

/* Approved job text (careers_us_equity_trader.md), with location details removed and fund->firm edits. */
export type Role = {
  slug: string;
  title: string;
  titleLead: string;
  titleEm: string;
  subject: string;
  meta: string;
  hours: string;
  chipHours: string;
  chipMarket: string;
  markets: string;
  shareDescription: string;
  about: string;
  do: string[];
  lookFor: string[];
  offer: string[];
  apply: string;
};

export const ROLE: Role = {
  slug: "us-equity-trader",
  title: "US Equity Trader",
  titleLead: "US Equity",
  titleEm: "Trader",
  subject: "Application: US Equity Trader",
  hours: "6:30 PM to 2:00 AM IST",
  chipHours: "6:30 PM – 2:00 AM IST",
  chipMarket: "US equities",
  markets: "US stocks and ETFs",
  shareDescription:
    "Full-time, on-site US equity trader role at Alphapick, 6:30 PM to 2:00 AM IST. Competitive fixed pay plus profit share.",
  meta: "Full-time, on-site, 6:30 PM to 2:00 AM IST (covering US market hours)",
  about:
    "We're a growing firm looking for a talented US equity trader to grow with us. If you've built an approach that works, or you love researching and refining new ideas, we'll back you with capital, tools, and a team that wants to see you succeed. We believe the best results come from working closely together, so you'll be a true partner in how the firm trades and grows.",
  do: [
    "Trade US stocks and ETFs using your own approach, backed by the firm's capital",
    "Research, test, and refine trading ideas, with full support for data and tools",
    "Work closely with the firm's founder, talking through ideas, results, and what's working in the market",
    "Manage risk thoughtfully within agreed limits",
    "Keep a trade journal and review performance together regularly",
  ],
  lookFor: [
    "2+ years of live trading experience in US equities",
    "A clear, rule-based approach to trading, whether it's intraday, swing, or something of your own",
    "Discipline, patience, and a collaborative mindset",
    "Comfortable working the evening shift on-site",
  ],
  offer: [
    "Competitive fixed pay plus a generous profit share on what you generate",
    "Capital allocation that grows as you deliver consistent results",
    "Data, tools, and platform costs fully covered, with a dedicated trading setup at the office",
    "A collaborative, open environment where your ideas shape how the firm trades",
    "Room to grow into a senior or lead trading role as the firm expands",
  ],
  apply:
    "Email your resume to careers@alphapick.in, along with a short note about your trading approach.",
};

/* Approved job text (job_post_fno_trader.md), with location words removed and fund->firm edits. */
export const FNO_ROLE: Role = {
  slug: "fno-trader",
  title: "F&O Trader",
  titleLead: "F&O",
  titleEm: "Trader",
  subject: "Application: F&O Trader",
  meta: "Full-time, on-site, 9:00 AM to 4:00 PM IST (covering NSE market hours)",
  hours: "9:00 AM to 4:00 PM IST",
  chipHours: "9:00 AM – 4:00 PM IST",
  chipMarket: "NSE F&O",
  markets: "NSE index and stock F&O",
  shareDescription:
    "Full-time, on-site F&O trader role at Alphapick, 9:00 AM to 4:00 PM IST. Competitive fixed pay plus profit share.",
  about:
    "We're a growing firm looking for a talented futures and options trader in NSE markets to grow with us. If you've built an approach that works, or you love researching and refining new ideas, we'll back you with capital, tools, and a team that wants to see you succeed. We believe the best results come from working closely together, so you'll be a true partner in how the firm trades and grows.",
  do: [
    "Trade NSE index and stock futures and options using your own approach, backed by the firm's capital",
    "Research, test, and refine trading ideas, with full support for data and tools",
    "Work closely with the firm's founder, talking through ideas, results, and what's working in the market",
    "Manage risk thoughtfully within agreed limits, including margin and position limits",
    "Keep a trade journal and review performance together regularly",
  ],
  lookFor: [
    "2+ years of live trading experience in NSE F&O (Nifty, Bank Nifty, Fin Nifty, or stock derivatives)",
    "A clear, rule-based approach to trading, whether it's intraday, positional, option selling, option buying, or something of your own",
    "Solid understanding of options pricing, Greeks, and margin requirements",
    "Discipline, patience, and a collaborative mindset",
    "Comfortable working full market hours on-site",
  ],
  offer: [
    "Competitive fixed pay plus a generous profit share on what you generate",
    "Capital allocation that grows as you deliver consistent results",
    "Data, tools, and platform costs fully covered, with a dedicated trading setup at the office",
    "A collaborative, open environment where your ideas shape how the firm trades",
    "Room to grow into a senior or lead trading role as the firm expands",
  ],
  apply:
    "Email your resume to careers@alphapick.in, along with a short note about your trading approach.",
};

export const ROLES: Role[] = [ROLE, FNO_ROLE];

export const roleMail = (r: Role) => `mailto:${SITE.emailCareers}?subject=${encodeURIComponent(r.subject)}`;

export function roleMetadata(r: Role) {
  const title = `We're hiring: ${r.title} | Alphapick`;
  const url = `/careers/${r.slug}/`;
  return {
    title: { absolute: title },
    description: r.shareDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const, url, siteName: "Alphapick", title, description: r.shareDescription, locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alphapick, proprietary trading & investing firm" }],
    },
    twitter: { card: "summary_large_image" as const, title, description: r.shareDescription, images: ["/og.png"] },
  };
}
