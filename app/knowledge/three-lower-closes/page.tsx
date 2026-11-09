import type { Metadata } from "next";
import Link from "next/link";
import { R, Arrow } from "@/components/ui";
import { Callout, Figure, StudyTable } from "@/components/StudyTable";
import { getStudy } from "@/lib/knowledge";
import Comments from "@/components/Comments";
import {
  GLANCE, STABILITY, CONDITIONS, CATEGORIES,
  BROAD_US, STYLE, SECTORS, INDUSTRIES, INTL, EMERGING, BONDS, COMMODITIES, LEVERAGED,
  RISKS, ROBUSTNESS,
} from "@/lib/studies/three-lower-closes-data";

const study = getStudy("three-lower-closes")!;

export const metadata: Metadata = {
  title: { absolute: `${study.title} | Alphapick` },
  description: study.metaDescription,
  alternates: { canonical: `/knowledge/${study.slug}/` },
  openGraph: {
    type: "article",
    url: `/knowledge/${study.slug}/`,
    siteName: "Alphapick",
    title: study.title,
    description: study.metaDescription,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alphapick, proprietary trading & investing firm" }],
  },
  twitter: {
    card: "summary_large_image",
    title: study.title,
    description: study.metaDescription,
    images: ["/og.png"],
  },
};

const ETF_COLS = [
  { key: "etf", label: "ETF" },
  { key: "since", label: "Since", align: "right" as const },
  { key: "trades", label: "Trades", align: "right" as const },
  { key: "win", label: "Win", align: "right" as const },
  { key: "avg", label: "Avg trade", align: "right" as const },
  { key: "t", label: "t", align: "right" as const },
  { key: "perYear", label: "Per year: rule / hold", align: "right" as const },
  { key: "worst", label: "Worst trade", align: "right" as const },
  { key: "read", label: "Read" },
];

function EtfTable({ caption, rows }: { caption: string; rows: readonly { etf: string; since: string; trades: string; win: string; avg: string; t: string; perYear: string; worst: string; read: string }[] }) {
  return (
    <StudyTable
      caption={caption}
      columns={ETF_COLS}
      rows={rows.map((r) => ({ ...r }))}
      rowKey={(r) => String(r.etf)}
    />
  );
}

export default function ThreeLowerCloses() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line/60 pt-32 pb-16 md:pt-44 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute -top-48 left-[-15%] h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-[130px]" />
        <div className="wrap relative">
          <nav aria-label="Breadcrumb" className="rise text-xs uppercase tracking-[.2em] text-faint">
            <Link href="/knowledge/" className="link-u hover:text-ivory">Knowledge</Link>
            <span aria-hidden className="mx-3 text-line">/</span>
            <span className="text-mute" aria-current="page">Study</span>
          </nav>
          <p className="rise mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[.18em] text-faint" style={{ ["--d" as string]: "40ms" }}>
            <time dateTime={study.date}>{study.dateLabel}</time>
            <span aria-hidden>·</span>
            <span>{study.author}</span>
          </p>
          <h1 className="rise mt-6 max-w-5xl text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ ["--d" as string]: "80ms" }}>
            Strategy 2: Buying Three Lower Closes in <em className="text-gold">US Equity ETFs</em>
          </h1>
          <p className="rise mt-8 max-w-3xl text-lg text-mute md:text-xl" style={{ ["--d" as string]: "160ms" }}>
            Buying an ETF after three straight lower closes and selling when it closes above the prior day&apos;s high won 73% of trades on SPY and QQQ over 28 years, averaging +0.38% and +0.77% per trade after costs (t-stats 3.2 and 4.4). It trades only about 13 times a year, and its worst trades lost 16% to 19%. This is a backtest, not a track record, and it is not investment advice.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
            <a href="#study" className="btn btn-gold">Read the study <Arrow /></a>
            <a href="/knowledge/three-lower-closes/study.pdf" className="btn btn-ghost" download>Download PDF</a>
          </div>
        </div>
      </header>

      <article id="study" className="wrap py-16 md:py-24">
        <div className="study-prose mx-auto">
          <Callout>
            <strong className="text-gold">Backtest only.</strong>{" "}
            The figures below are a historical test of a rule. They are not a track record of Alphapick, not a forecast, and not investment advice.
          </Callout>

          <R as="section" aria-labelledby="glance-h">
            <h2 id="glance-h">At a glance</h2>
            <p>
              SPY and QQQ both won about three trades in four, and the strategy gave up far less in drawdowns than buy-and-hold, though it earned less in total.
            </p>
          </R>
        </div>

        <R d={60}>
          <StudyTable
            caption="SPY and QQQ headline results, Oct 1998 / Mar 1999 to Oct 2026, net of costs"
            columns={[
              { key: "m", label: "Measure (Oct 1998 / Mar 1999 to Oct 2026, net of costs)" },
              { key: "spy", label: "SPY", align: "right" },
              { key: "qqq", label: "QQQ", align: "right" },
            ]}
            rows={[...GLANCE]}
            rowKey={(r) => String(r.m)}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <p>
              The strategy sits in cash 83% to 84% of the time, and these figures count that cash as earning nothing. Prices exclude dividends.
            </p>
          </R>
        </div>

        <R d={80}>
          <Figure
            src="/knowledge/three-lower-closes/spy-qqq-equity.png"
            alt="SPY and QQQ: growth of $1 on a log scale for Strategy 2 versus buy-and-hold, plus histograms of individual trade returns"
            caption="Top: growth of $1 on a log scale, net of costs, against buy-and-hold (price only). Bottom: how individual trade returns are spread, with most small gains and a thin tail of large losses."
          />
        </R>

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="rule-h">
            <h2 id="rule-h">The rule</h2>
            <p>
              Buy after three lower closes in a row, sell on the first close above the previous day&apos;s high, and cut the loss at three average daily ranges below the entry.
            </p>
            <ol className="study-steps">
              <li><strong className="text-ivory">Signal:</strong> at the close, each of the last three closes is lower than the one before it.</li>
              <li><strong className="text-ivory">Entry:</strong> buy at the next day&apos;s open.</li>
              <li><strong className="text-ivory">Exit:</strong> sell at the close of the first day (the entry day counts) that closes above the previous day&apos;s high.</li>
              <li><strong className="text-ivory">Stop:</strong> the entry open minus 3 times the 14-day average true range (ATR), measured on the signal day. If a day&apos;s low touches it, exit at the stop, or at the open if the market gaps below it. The average stop sits 4.5% below the entry on SPY and 7.1% on QQQ.</li>
              <li><strong className="text-ivory">Position:</strong> long only, one position at a time. A new signal can be taken at the close of the exit day.</li>
            </ol>
            <p>
              The entry matters, not just the exit. Buying on any day with the same exit and stop earns only +0.04% per trade, against +0.38% (SPY) and +0.77% (QQQ) after three lower closes. Per day held, the signal earns about 8 times as much on SPY (0.119% vs 0.014%) and 16 times as much on QQQ (0.241% vs 0.015%).
            </p>
          </R>

          <R as="section" aria-labelledby="stab-h">
            <h2 id="stab-h">Stability over time</h2>
            <p>SPY&apos;s average trade has been steady for 28 years, while QQQ&apos;s was much stronger before 2013.</p>
          </R>
        </div>

        <R>
          <StudyTable
            caption="Average trade by period for SPY and QQQ"
            columns={[
              { key: "period", label: "Period" },
              { key: "spyTrades", label: "SPY trades", align: "right" },
              { key: "spyAvg", label: "SPY average", align: "right" },
              { key: "spyT", label: "SPY t-stat", align: "right" },
              { key: "qqqTrades", label: "QQQ trades", align: "right" },
              { key: "qqqAvg", label: "QQQ average", align: "right" },
              { key: "qqqT", label: "QQQ t-stat", align: "right" },
            ]}
            rows={[...STABILITY]}
            rowKey={(r) => String(r.period)}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <p>
              SPY lost money in 5 of 29 calendar years (2003, 2005, 2015, 2018, 2019). QQQ lost money in 6 of 28 (2006, 2015, 2016, 2019, 2020, and the partial year 2026). QQQ&apos;s best years were the dot-com bust, 2000 to 2002, at about +1.9% to +2.2% per trade, which is why its long-run average is higher than its recent one.
            </p>
          </R>

          <R as="section" aria-labelledby="where-h">
            <h2 id="where-h">Where it works best</h2>
            <p>The edge is largest in corrections: when price is below its 200-day average and fear is high, the bounce is bigger.</p>
          </R>
        </div>

        <R>
          <StudyTable
            caption="Condition at the signal versus average trade"
            columns={[
              { key: "c", label: "Condition at the signal" },
              { key: "spy", label: "SPY: trades, average", align: "right" },
              { key: "qqq", label: "QQQ: trades, average", align: "right" },
            ]}
            rows={[...CONDITIONS]}
            rowKey={(r) => String(r.c)}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <p className="note">
              Some of this is a larger sample doing the work in one bucket, so read the pattern, not each number. Day-of-week differences (for example, QQQ trades entered on a Friday lost 0.05%) looked like noise given how many buckets were checked, and are left out of the table.
            </p>
          </R>

          <R as="section" aria-labelledby="other-h">
            <h2 id="other-h">Other ETFs</h2>
            <p>
              Across 138 ETFs the rule had a positive average trade on 112 (81%) and was statistically significant (t-stat above 2) on 43, nearly all of them US stock funds. The full list, fund by fund, is in the next section; this one looks at the two sectors that differ the most.
            </p>
            <p>
              XLK and XLE show how different two sectors can be. XLK averaged +0.61% per trade after costs (t-stat 3.6, profit factor 1.77) and was positive in 22 of 28 years. XLE averaged only +0.17% (t-stat 0.9, 90% range −0.12% to +0.45%), earned 1.3% a year against 6.2% for buy-and-hold, and its equity curve fell as much as 60% from a peak. XLE only worked when it was above its 200-day average (+0.51% per trade, against −0.26% below it).
            </p>
          </R>
        </div>

        <R>
          <Figure
            src="/knowledge/three-lower-closes/xle-xlk-equity.png"
            alt="XLE and XLK: growth of $1 for Strategy 2 versus buy-and-hold, plus trade-return histograms"
            caption="The same two views for XLE (left) and XLK (right), through 5 Nov 2026."
          />
        </R>

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="etf-h">
            <h2 id="etf-h">ETF-by-ETF results</h2>
            <p>
              The dip-buy effect shows up across US stock funds and in long-term Treasuries, and not in commodities, currencies or most other bonds: 112 of 138 ETFs had a positive average trade and 43 had a t-stat above 2.
            </p>
          </R>
        </div>

        <R>
          <StudyTable
            caption="Results by ETF category"
            columns={[
              { key: "cat", label: "Category" },
              { key: "etfs", label: "ETFs", align: "right" },
              { key: "pos", label: "With a positive average", align: "right" },
              { key: "t2", label: "t-stat above 2", align: "right" },
              { key: "avg", label: "Average of the ETFs' average trade", align: "right" },
              { key: "best", label: "Best t-stat", align: "right" },
            ]}
            rows={[...CATEGORIES]}
            rowKey={(r) => String(r.cat)}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <Callout>
              <p className="!mt-0"><strong className="text-gold">How to read the tables below.</strong> Each table lists one category, best t-stat first. &quot;Avg trade&quot; is after costs, &quot;Per year&quot; compares the rule&apos;s return with buy-and-hold over the same years, and &quot;fell X% at worst&quot; is the rule&apos;s own deepest drawdown. The &quot;Read&quot; column grades the t-stat: Strong (3.5 or more), Good (2.5 to 3.5), Moderate (2 to 2.5), Weak (1 to 2), No edge (−1 to 1) and Negative (below −1).</p>
              <p><strong className="text-ivory">Not 43 independent results.</strong> By chance alone, about three of 138 funds would reach a t-stat of 2, so 43 is far more than luck. But many of these funds hold the same stocks, so the number of truly separate confirmations is much smaller.</p>
              <p><strong className="text-ivory">The effect is fading.</strong> Across the 127 ETFs with history on both sides, the average trade fell from +0.36% through 2012 to +0.20% from 2013 onward.</p>
              <p><strong className="text-ivory">Costs end the story for quiet funds.</strong> Short-term Treasuries and municipal bonds (SHY, MUB) move so little each day that 2 basis points per side exceeds their normal range, so they lose.</p>
              <p><strong className="text-ivory">Leveraged funds earn more per trade but fall further.</strong> Their average trades are +0.6% to +1.9%, with drawdowns of 36% to 85% and a worst single trade of −59% (SOXL). Inverse funds were not tested.</p>
              <p className="!mb-0"><strong className="text-ivory">Different data from the sections above.</strong> These runs use Yahoo Finance prices adjusted for dividends, and 2 basis points per side, so figures for SPY (+0.41%), QQQ (+0.81%), XLK (+0.63%) and XLE (+0.21%) differ slightly from those earlier.</p>
            </Callout>
          </R>

          <R as="section" aria-labelledby="broad-h">
            <h3 id="broad-h">Broad US</h3>
            <p>All 14 broad US funds had a positive average trade (+0.34% on average) and nine were significant, with the Nasdaq-100 and S&amp;P 500 funds strongest and small and mid caps weaker.</p>
          </R>
        </div>
        <EtfTable caption="Broad US ETF results" rows={BROAD_US} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="style-h">
            <h3 id="style-h">Style and factor</h3>
            <p>All 15 style funds were positive (+0.26% on average), with growth and momentum funds ahead of value and dividend funds, and three dividend funds (SDY, DVY, SCHD) losing money over the last three years.</p>
          </R>
        </div>
        <EtfTable caption="Style and factor ETF results" rows={STYLE} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="sec-h">
            <h3 id="sec-h">US sectors</h3>
            <p>All 17 sector funds were positive (+0.28% on average); technology and financials were the strongest, and utilities, materials, energy and communications the weakest.</p>
          </R>
        </div>
        <EtfTable caption="US sector ETF results" rows={SECTORS} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="ind-h">
            <h3 id="ind-h">Industries and themes</h3>
            <p>18 of 25 industry and theme funds were positive (+0.16% on average); software, banks, semiconductors and retail worked, while energy, solar and uranium funds lost.</p>
          </R>
        </div>
        <EtfTable caption="Industry and theme ETF results" rows={INDUSTRIES} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="intl-h">
            <h3 id="intl-h">International developed</h3>
            <p>17 of 18 country and region funds were positive, but the average is small (+0.16%) and only Japan reached a t-stat above 2; the edge is weaker abroad than in US stocks.</p>
          </R>
        </div>
        <EtfTable caption="International developed ETF results" rows={INTL} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="em-h">
            <h3 id="em-h">Emerging markets</h3>
            <p>All 8 emerging-market funds were positive (+0.17% on average), with South Africa and China A-shares significant and the large broad funds (EEM, VWO) not.</p>
          </R>
        </div>
        <EtfTable caption="Emerging markets ETF results" rows={EMERGING} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="bonds-h">
            <h3 id="bonds-h">Bonds</h3>
            <p>Only longer-term Treasury funds worked (TLT t-stat 3.8, TLH 2.9, IEF 2.2); corporate, high-yield and municipal funds did not, and short-term and municipal bonds lose to costs.</p>
          </R>
        </div>
        <EtfTable caption="Bond ETF results" rows={BONDS} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="cmd-h">
            <h3 id="cmd-h">Commodities and currencies</h3>
            <p>Only 3 of 14 were positive and none was significant: the rule did not work on gold, silver, oil, other commodities or currencies.</p>
          </R>
        </div>
        <EtfTable caption="Commodities and currencies ETF results" rows={COMMODITIES} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="lev-h">
            <h3 id="lev-h">Leveraged (2x and 3x)</h3>
            <p>All 12 leveraged funds were positive and 9 were significant, with average trades of +0.6% to +1.9%, but each carries large drawdowns, and TNA and SOXL fell 78% and 85% at worst.</p>
          </R>
        </div>
        <EtfTable caption="Leveraged ETF results" rows={LEVERAGED} />

        <div className="study-prose mx-auto">
          <R as="section" aria-labelledby="risks-h">
            <h2 id="risks-h">Risks</h2>
            <p>The rule wins small and loses large: every one of its worst trades was a stop-out, and they came in market crashes.</p>
          </R>
        </div>

        <R>
          <StudyTable
            caption="Worst trades"
            columns={[
              { key: "fund", label: "Fund" },
              { key: "entry", label: "Entry date" },
              { key: "loss", label: "Loss", align: "right" },
              { key: "days", label: "Days held", align: "right" },
              { key: "stop", label: "Stop distance", align: "right" },
            ]}
            rows={[...RISKS]}
            rowKey={(r, i) => `${r.fund}-${r.entry}-${i}`}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <p>
              The stop is three average daily ranges away, so it is wide exactly when volatility is high, and a gap can take the loss past it. Stop-outs are 7% to 11% of trades but average −5% to −7%, which cancels a large part of the gains from the winners.
            </p>
            <p>
              Strategy drawdowns were shallower than buy-and-hold: −21.6% on SPY (Aug 2008 to Mar 2009) and −25.1% on QQQ (Mar to Apr 2000), against −56.5% and −83.0%.
            </p>
            <p>
              A trade that is already losing rarely recovers. In the XLK and XLE tests, trades whose worst close was 4% or more below the entry finished positive only 8% (XLK, 38 trades) and 11% (XLE, 64 trades) of the time, and about half hit the stop. Only about one winning trade in ten was ever down 2% or more at a close, so the rule depends on the bounce coming almost at once. Because stops sit 5% to 9% away, size each trade by its stop distance, not by a fixed amount.
            </p>
          </R>

          <R as="section" aria-labelledby="rob-h">
            <h2 id="rob-h">Robustness and costs</h2>
            <p>The result does not hinge on one setting: two to four lower closes and stops from 2 to 4 times ATR (or no stop) all stay positive.</p>
          </R>
        </div>

        <R>
          <StudyTable
            caption="Robustness checks"
            columns={[
              { key: "v", label: "Variation" },
              { key: "spy", label: "SPY: average (t-stat)", align: "right" },
              { key: "qqq", label: "QQQ: average (t-stat)", align: "right" },
            ]}
            rows={[...ROBUSTNESS]}
            rowKey={(r) => String(r.v)}
          />
        </R>

        <div className="study-prose mx-auto">
          <R>
            <p>
              The stop did not add return in this sample: with no stop the averages are the same or higher, and the worst drawdowns are about the same. It limits how far a single trade can fall, not how much the strategy makes.
            </p>
            <p>
              Costs are not the problem. The average SPY trade falls from +0.41% with no costs to +0.38% at 1.5 basis points (0.015%) per side, +0.21% at 10 basis points and about zero at 20. QQQ goes from +0.80% to +0.77% at 1.5 basis points and +0.40% at 20. The rule also decides on the closing price, which cannot be traded exactly. Using the 15:55 price for both the signal and the exit changed the 2010 to 2026 average by only 0.03 points (SPY +0.44% instead of +0.47%, QQQ +0.49% instead of +0.52%).
            </p>
          </R>

          <R as="section" aria-labelledby="lim-h">
            <h2 id="lim-h">Limits</h2>
            <p>A backtest cannot show that the edge will last, and several points here could make live results worse than the table.</p>
            <ol className="study-steps">
              <li><strong className="text-ivory">Few trades.</strong> About 13 a year, so a bad stretch can last years before the statistics recover. QQQ&apos;s average since 2013 is +0.41%, and since 2024 its t-stat is only 1.3.</li>
              <li><strong className="text-ivory">A rising market.</strong> ETFs climbed strongly over 1998 to 2026, and buying dips works best in rising markets. The data has no long, grinding decline.</li>
              <li><strong className="text-ivory">Chosen settings.</strong> The 3× ATR stop and the exit rule were picked after comparing variants. The flat results across settings suggest a plateau, but live results will probably be worse than the best row.</li>
              <li><strong className="text-ivory">Many tests.</strong> Dozens of variants and 138 ETFs were examined, and many of the ETFs move together, so some good-looking results are expected by chance.</li>
              <li><strong className="text-ivory">Tail losses.</strong> The worst trades lost 16% to 23%, with stops up to 22% away in a crash. Gaps can go through a stop.</li>
              <li><strong className="text-ivory">Idle cash and dividends.</strong> Cash earns nothing here, dividends and taxes are ignored, so the true return of a combined plan depends on what the idle money does.</li>
              <li><strong className="text-ivory">Fills.</strong> The test assumes trades at the next open and at the close, and half a cent to a cent of spread. That is realistic for SPY and QQQ and is optimistic for smaller sector ETFs.</li>
            </ol>
            <p>This is a historical test of a rule, not investment advice or a forecast.</p>
          </R>

          <R as="section" aria-labelledby="data-h">
            <h2 id="data-h">Data and method</h2>
            <p>Everything here comes from daily and 1-minute price data and one script per test, with no outside forecasts.</p>
            <ol className="study-steps">
              <li><strong className="text-ivory">Daily prices:</strong> Interactive Brokers historical data for SPY (from Oct 1998), QQQ (from Mar 1999) and 14 other ETFs, to 14 Oct 2026. Unadjusted for dividends. About 40 corrupt SPY bars from 2004 to 2008 and an unadjusted IWM split were repaired; the headline results moved by about 0.01 points.</li>
              <li><strong className="text-ivory">Recent weeks and the 15:55 check:</strong> Databento 1-minute bars (EQUS.MINI) and Interactive Brokers 1-minute bars (2010 to 2026).</li>
              <li><strong className="text-ivory">Fear and trend context:</strong> the VIX index (2005 onward, so earlier trades have no VIX reading) and each fund&apos;s 200-day average.</li>
              <li><strong className="text-ivory">Costs:</strong> 1.5 basis points (0.015%) of price per side, about the cost of a half-cent spread on SPY or QQQ.</li>
              <li><strong className="text-ivory">Statistics:</strong> the t-stat is the average trade divided by its standard error. Ranges around averages come from 5,000 random resamples of the trades.</li>
              <li><strong className="text-ivory">Assumptions:</strong> buys at the next open, sells at the close, one position at a time, and if a stop and an exit could both happen on a day the stop is assumed to hit first.</li>
              <li><strong className="text-ivory">ETF universe (138 funds):</strong> Yahoo Finance daily prices adjusted for splits and dividends (so bond and income funds are not distorted by monthly payouts), with 2 basis points per side. Inverse funds and funds with under about six years of history were left out.</li>
            </ol>
          </R>

          <R className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
            <Link href="/knowledge/" className="link-u text-sm uppercase tracking-[.18em] text-mute hover:text-ivory">
              ← All knowledge
            </Link>
            <a href="/knowledge/three-lower-closes/study.pdf" className="btn btn-ghost" download>
              Download PDF <Arrow />
            </a>
          </R>
        </div>

        <Comments slug={study.slug} />
      </article>
    </>
  );
}
