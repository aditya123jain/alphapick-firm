export type Study = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  author: string;
  summary: string;
  metaDescription: string;
  tags: string[];
};

export const STUDIES: Study[] = [
  {
    slug: "three-lower-closes",
    title: "Buying Three Lower Closes in US Equity ETFs",
    date: "2026-11-09",
    dateLabel: "Nov 9, 2026",
    author: "@adi",
    summary:
      "Buying an ETF after three straight lower closes and selling when it closes above the prior day's high won about three trades in four on SPY and QQQ over 28 years.",
    metaDescription:
      "A study on buying US equity ETFs after three lower closes. Backtest results for SPY, QQQ and 138 ETFs — not a track record, not investment advice.",
    tags: ["US equities", "ETFs", "Backtest"],
  },
];

export function getStudy(slug: string) {
  return STUDIES.find((s) => s.slug === slug);
}
