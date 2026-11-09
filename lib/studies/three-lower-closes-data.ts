/* Auto-structured study tables. Figures match the Nov 9, 2026 note. INDA label scrubbed of location word. */


export const GLANCE = [
  { m: "Trades (per year)", spy: "373 (13)", qqq: "350 (13)" },
  { m: "Win rate", spy: "73%", qqq: "74%" },
  { m: "Average trade", spy: "+0.38%", qqq: "+0.77%" },
  { m: "t-stat, and 90% range for the average", spy: "3.2, +0.18% to +0.57%", qqq: "4.4, +0.48% to +1.06%" },
  { m: "Average win / average loss", spy: "+1.26% / −2.03%", qqq: "+2.00% / −2.78%" },
  { m: "Profit factor", spy: "1.70", qqq: "2.07" },
  { m: "Average days held", spy: "3.2", qqq: "3.2" },
  { m: "Time in the market", spy: "17%", qqq: "16%" },
  { m: "Return per year: strategy / buy-and-hold", spy: "4.8% / 7.3%", qqq: "9.4% / 10.1%" },
  { m: "Worst drawdown: strategy / buy-and-hold", spy: "−21.6% / −56.5%", qqq: "−25.1% / −83.0%" },
  { m: "Same exit, entered on any day (control)", spy: "+0.04% per trade", qqq: "+0.04% per trade" },
] as const;

export const STABILITY = [
  { period: "Through 2012", spyTrades: "200", spyAvg: "+0.37%", spyT: "1.9", qqqTrades: "191", qqqAvg: "+1.06%", qqqT: "3.7" },
  { period: "2013 onward", spyTrades: "173", spyAvg: "+0.40%", spyT: "3.1", qqqTrades: "159", qqqAvg: "+0.41%", qqqT: "2.5" },
  { period: "2024 onward", spyTrades: "38", spyAvg: "+0.48%", spyT: "1.9", qqqTrades: "32", qqqAvg: "+0.43%", qqqT: "1.3" },
] as const;

export const CONDITIONS = [
  { c: "Price below its 200-day average", spy: "134, +0.63%", qqq: "127, +1.63% (t 4.4)" },
  { c: "Price above its 200-day average", spy: "229, +0.23%", qqq: "217, +0.26%" },
  { c: "VIX above 30", spy: "34, +0.81%", qqq: "35, +2.23% (t 3.2)" },
  { c: "VIX 15 to 20", spy: "85, +0.22%", qqq: "87, +0.22%" },
  { c: "Three-day drop of 3% to 5%", spy: "85, +0.80% (t 3.2)", qqq: "89, +0.84% (t 3.1)" },
  { c: "Three-day drop of more than 5%", spy: "36, +0.38%", qqq: "92, +1.55% (t 2.8)" },
  { c: "Entry gaps down from the signal close", spy: "128, +0.60%", qqq: "141, +1.23%" },
  { c: "Entry gaps up", spy: "245, +0.27%", qqq: "209, +0.46%" },
] as const;

export const CATEGORIES = [
  { cat: "Broad US", etfs: "14", pos: "14", t2: "9", avg: "+0.34%", best: "4.8" },
  { cat: "Style and factor", etfs: "15", pos: "15", t2: "6", avg: "+0.26%", best: "2.7" },
  { cat: "US sectors", etfs: "17", pos: "17", t2: "6", avg: "+0.28%", best: "5.5" },
  { cat: "Industries and themes", etfs: "25", pos: "18", t2: "6", avg: "+0.16%", best: "4.0" },
  { cat: "International developed", etfs: "18", pos: "17", t2: "1", avg: "+0.16%", best: "2.2" },
  { cat: "Emerging markets", etfs: "8", pos: "8", t2: "2", avg: "+0.17%", best: "3.0" },
  { cat: "Bonds", etfs: "15", pos: "8", t2: "4", avg: "+0.01%", best: "3.8" },
  { cat: "Commodities and currencies", etfs: "14", pos: "3", t2: "0", avg: "-0.10%", best: "0.4" },
  { cat: "Leveraged (2x/3x)", etfs: "12", pos: "12", t2: "9", avg: "+1.17%", best: "4.4" },
  { cat: "All", etfs: "138", pos: "112", t2: "43", avg: "+0.25%", best: "5.5" },
] as const;

export const BROAD_US = [
  { etf: "QQQ · Nasdaq-100", since: "1999", trades: "347", win: "76%", avg: "+0.81%", t: "4.8", perYear: "10.0% / 10.4%", worst: "−15.5%", read: "Strong" },
  { etf: "SPY · S&P 500 (SPDR)", since: "1993", trades: "440", win: "74%", avg: "+0.41%", t: "3.8", perYear: "5.1% / 10.7%", worst: "−18.8%", read: "Strong" },
  { etf: "IVV · S&P 500 (iShares)", since: "2000", trades: "343", win: "75%", avg: "+0.39%", t: "3.4", perYear: "4.9% / 8.4%", worst: "−13.7%", read: "Good" },
  { etf: "VOO · S&P 500 (Vanguard)", since: "2010", trades: "204", win: "72%", avg: "+0.39%", t: "3.4", perYear: "4.9% / 14.5%", worst: "−7.1%", read: "Good" },
  { etf: "IWB · Russell 1000", since: "2000", trades: "337", win: "74%", avg: "+0.41%", t: "3.4", perYear: "5.0% / 8.4%", worst: "−18.6%", read: "Good" },
  { etf: "IWV · Russell 3000", since: "2000", trades: "346", win: "73%", avg: "+0.32%", t: "2.6", perYear: "3.8% / 8.4%", worst: "−20.2%", read: "Good" },
  { etf: "OEF · S&P 100", since: "2000", trades: "316", win: "71%", avg: "+0.30%", t: "2.4", perYear: "3.4% / 8.3%", worst: "−21.0%", read: "Moderate" },
  { etf: "IJR · S&P SmallCap 600", since: "2000", trades: "351", win: "75%", avg: "+0.35%", t: "2.3", perYear: "4.1% / 9.8%", worst: "−20.6%", read: "Moderate" },
  { etf: "VTI · Total US market", since: "2001", trades: "316", win: "70%", avg: "+0.27%", t: "2.1", perYear: "3.1% / 9.5%", worst: "−14.2%", read: "Moderate" },
  { etf: "IWM · Russell 2000 small caps", since: "2000", trades: "349", win: "71%", avg: "+0.27%", t: "1.8", perYear: "3.1% / 8.4%", worst: "−20.9%", read: "Weak, not significant" },
  { etf: "MDY · S&P MidCap 400", since: "1995", trades: "423", win: "70%", avg: "+0.23%", t: "1.7", perYear: "2.5% / 11.0%", worst: "−18.5%", read: "Weak, not significant" },
  { etf: "DIA · Dow Jones 30", since: "1998", trades: "370", win: "68%", avg: "+0.18%", t: "1.6", perYear: "2.1% / 9.0%", worst: "−13.6%", read: "Weak, not significant" },
  { etf: "RSP · S&P 500 equal weight", since: "2003", trades: "289", win: "70%", avg: "+0.24%", t: "1.6", perYear: "2.6% / 11.2%", worst: "−19.2%", read: "Weak, not significant" },
  { etf: "IJH · S&P MidCap 400 (iShares)", since: "2000", trades: "360", win: "71%", avg: "+0.17%", t: "1.1", perYear: "1.7% / 9.6%", worst: "−18.8%", read: "Weak, not significant" },
] as const;

export const STYLE = [
  { etf: "VUG · Vanguard Growth", since: "2004", trades: "275", win: "72%", avg: "+0.39%", t: "2.7", perYear: "4.4% / 11.8%", worst: "−18.0%", read: "Good" },
  { etf: "IVW · S&P 500 Growth", since: "2000", trades: "330", win: "73%", avg: "+0.33%", t: "2.5", perYear: "3.9% / 8.6%", worst: "−15.6%", read: "Good" },
  { etf: "MTUM · Momentum factor", since: "2013", trades: "169", win: "75%", avg: "+0.41%", t: "2.4", perYear: "4.9% / 13.9%", worst: "−9.0%", read: "Moderate" },
  { etf: "USMV · Minimum volatility", since: "2011", trades: "171", win: "74%", avg: "+0.24%", t: "2.3", perYear: "2.6% / 11.7%", worst: "−5.8%", read: "Moderate: faded recently (+0.06% last 3 yrs)" },
  { etf: "IWN · Russell 2000 Value", since: "2000", trades: "346", win: "71%", avg: "+0.34%", t: "2.1", perYear: "4.0% / 9.2%", worst: "−17.4%", read: "Moderate" },
  { etf: "QUAL · Quality factor", since: "2013", trades: "168", win: "74%", avg: "+0.31%", t: "2.1", perYear: "3.8% / 13.3%", worst: "−8.3%", read: "Moderate" },
  { etf: "VTV · Vanguard Value", since: "2004", trades: "271", win: "69%", avg: "+0.28%", t: "2.0", perYear: "3.0% / 9.7%", worst: "−16.7%", read: "Weak, not significant" },
  { etf: "IWF · Russell 1000 Growth", since: "2000", trades: "334", win: "70%", avg: "+0.26%", t: "1.9", perYear: "2.7% / 7.9%", worst: "−16.3%", read: "Weak, not significant" },
  { etf: "IWD · Russell 1000 Value", since: "2000", trades: "327", win: "67%", avg: "+0.23%", t: "1.6", perYear: "2.4% / 8.3%", worst: "−15.6%", read: "Weak, not significant" },
  { etf: "SDY · Dividend aristocrats", since: "2005", trades: "261", win: "71%", avg: "+0.23%", t: "1.6", perYear: "2.5% / 9.1%", worst: "−21.3%", read: "Weak, not significant: lost money in the last 3 yrs (−0.02%)" },
  { etf: "DVY · Dividend (select)", since: "2003", trades: "282", win: "74%", avg: "+0.24%", t: "1.5", perYear: "2.5% / 8.9%", worst: "−24.3%", read: "Weak, not significant: lost money in the last 3 yrs (−0.05%)" },
  { etf: "IVE · S&P 500 Value", since: "2000", trades: "319", win: "65%", avg: "+0.20%", t: "1.4", perYear: "2.0% / 7.7%", worst: "−16.3%", read: "Weak, not significant" },
  { etf: "IWO · Russell 2000 Growth", since: "2000", trades: "354", win: "72%", avg: "+0.22%", t: "1.3", perYear: "2.4% / 6.6%", worst: "−20.3%", read: "Weak, not significant" },
  { etf: "VIG · Dividend growth", since: "2006", trades: "245", win: "76%", avg: "+0.17%", t: "1.2", perYear: "1.8% / 10.2%", worst: "−16.0%", read: "Weak, not significant" },
  { etf: "SCHD · Dividend equity", since: "2011", trades: "175", win: "64%", avg: "+0.03%", t: "0.2", perYear: "0.1% / 13.6%", worst: "−7.3%", read: "No edge: lost money in the last 3 yrs (−0.17%)" },
] as const;

export const SECTORS = [
  { etf: "VGT · Vanguard technology", since: "2004", trades: "290", win: "75%", avg: "+0.67%", t: "5.5", perYear: "8.3% / 14.4%", worst: "−7.0%", read: "Strong" },
  { etf: "XLK · Technology", since: "1998", trades: "349", win: "75%", avg: "+0.63%", t: "3.7", perYear: "7.2% / 9.9%", worst: "−17.1%", read: "Strong" },
  { etf: "XLF · Financials", since: "1998", trades: "364", win: "72%", avg: "+0.51%", t: "3.1", perYear: "6.1% / 6.1%", worst: "−24.9%", read: "Good" },
  { etf: "XLP · Consumer staples", since: "1998", trades: "325", win: "74%", avg: "+0.28%", t: "2.5", perYear: "3.0% / 7.0%", worst: "−12.5%", read: "Good" },
  { etf: "XLV · Health care", since: "1998", trades: "367", win: "70%", avg: "+0.26%", t: "2.3", perYear: "3.1% / 9.0%", worst: "−12.8%", read: "Moderate" },
  { etf: "VNQ · Real estate (Vanguard)", since: "2004", trades: "284", win: "71%", avg: "+0.37%", t: "2.1", perYear: "4.2% / 7.5%", worst: "−23.7%", read: "Moderate: lost money in the last 3 yrs (−0.40%)" },
  { etf: "XLY · Consumer discretionary", since: "1998", trades: "391", win: "72%", avg: "+0.24%", t: "1.8", perYear: "2.9% / 9.5%", worst: "−20.5%", read: "Weak, not significant" },
  { etf: "XLI · Industrials", since: "1998", trades: "346", win: "72%", avg: "+0.26%", t: "1.8", perYear: "2.8% / 9.1%", worst: "−17.3%", read: "Weak, not significant" },
  { etf: "VFH · Vanguard financials", since: "2004", trades: "293", win: "71%", avg: "+0.31%", t: "1.6", perYear: "3.2% / 6.8%", worst: "−34.4%", read: "Weak, not significant: fell 48% at worst" },
  { etf: "IYR · Real estate (iShares)", since: "2000", trades: "334", win: "69%", avg: "+0.21%", t: "1.3", perYear: "2.2% / 8.2%", worst: "−22.5%", read: "Weak, not significant: lost money in the last 3 yrs (−0.21%)" },
  { etf: "XLE · Energy", since: "1998", trades: "380", win: "69%", avg: "+0.21%", t: "1.2", perYear: "1.9% / 8.9%", worst: "−22.9%", read: "Weak, not significant: fell 58% at worst" },
  { etf: "XLRE · Real estate", since: "2015", trades: "141", win: "65%", avg: "+0.16%", t: "1.0", perYear: "1.8% / 7.0%", worst: "−6.7%", read: "No edge: lost money in the last 3 yrs (−0.40%); short history" },
  { etf: "VHT · Vanguard health care", since: "2004", trades: "304", win: "72%", avg: "+0.13%", t: "1.0", perYear: "1.4% / 10.3%", worst: "−13.8%", read: "No edge" },
  { etf: "XLU · Utilities", since: "1998", trades: "348", win: "71%", avg: "+0.15%", t: "1.0", perYear: "1.4% / 7.5%", worst: "−13.0%", read: "No edge: lost money in the last 3 yrs (−0.01%)" },
  { etf: "XLC · Communication services", since: "2018", trades: "110", win: "69%", avg: "+0.15%", t: "0.7", perYear: "1.6% / 10.3%", worst: "−7.0%", read: "No edge: short history" },
  { etf: "VDE · Vanguard energy", since: "2004", trades: "310", win: "69%", avg: "+0.12%", t: "0.5", perYear: "0.4% / 8.3%", worst: "−25.2%", read: "No edge: fell 68% at worst" },
  { etf: "XLB · Materials", since: "1998", trades: "373", win: "66%", avg: "+0.04%", t: "0.3", perYear: "−0.1% / 8.3%", worst: "−14.4%", read: "No edge: lost money in the last 3 yrs (−0.02%)" },
] as const;

export const INDUSTRIES = [
  { etf: "IGV · Software", since: "2001", trades: "337", win: "72%", avg: "+0.60%", t: "4.0", perYear: "7.7% / 9.6%", worst: "−15.9%", read: "Strong" },
  { etf: "KRE · Regional banks", since: "2006", trades: "286", win: "69%", avg: "+0.66%", t: "3.4", perYear: "8.9% / 4.5%", worst: "−12.8%", read: "Good: beat buy-and-hold" },
  { etf: "SMH · Semiconductors", since: "2000", trades: "374", win: "68%", avg: "+0.59%", t: "2.9", perYear: "7.5% / 9.5%", worst: "−17.8%", read: "Good: fell 52% at worst" },
  { etf: "XRT · Retail", since: "2006", trades: "281", win: "74%", avg: "+0.49%", t: "2.6", perYear: "6.2% / 9.4%", worst: "−18.7%", read: "Good: faded recently (+0.09% last 3 yrs)" },
  { etf: "KBE · Banks", since: "2005", trades: "293", win: "69%", avg: "+0.53%", t: "2.5", perYear: "6.7% / 3.7%", worst: "−16.6%", read: "Good: beat buy-and-hold" },
  { etf: "SOXX · Semiconductors (iShares)", since: "2001", trades: "351", win: "69%", avg: "+0.48%", t: "2.5", perYear: "5.9% / 12.7%", worst: "−16.0%", read: "Moderate" },
  { etf: "XSD · Semiconductors (equal weight)", since: "2006", trades: "277", win: "70%", avg: "+0.31%", t: "1.5", perYear: "3.1% / 14.8%", worst: "−14.8%", read: "Weak, not significant" },
  { etf: "IYT · Transportation", since: "2004", trades: "316", win: "69%", avg: "+0.21%", t: "1.4", perYear: "2.4% / 9.3%", worst: "−16.4%", read: "Weak, not significant" },
  { etf: "GDX · Gold miners", since: "2006", trades: "286", win: "63%", avg: "+0.35%", t: "1.2", perYear: "3.3% / 5.1%", worst: "−14.1%", read: "Weak, not significant" },
  { etf: "ARKK · ARK Innovation", since: "2014", trades: "165", win: "69%", avg: "+0.37%", t: "1.1", perYear: "3.4% / 12.5%", worst: "−11.7%", read: "Weak, not significant" },
  { etf: "XHB · Homebuilders", since: "2006", trades: "297", win: "69%", avg: "+0.21%", t: "0.9", perYear: "1.9% / 5.0%", worst: "−25.7%", read: "No edge: lost money in the last 3 yrs (−0.64%); fell 65% at worst" },
  { etf: "ITB · Home construction", since: "2006", trades: "273", win: "69%", avg: "+0.22%", t: "0.9", perYear: "1.7% / 4.0%", worst: "−27.8%", read: "No edge: lost money in the last 3 yrs (−0.33%); fell 62% at worst" },
  { etf: "XBI · Biotech (equal weight)", since: "2006", trades: "277", win: "69%", avg: "+0.18%", t: "0.8", perYear: "1.4% / 11.6%", worst: "−14.7%", read: "No edge: fell 60% at worst" },
  { etf: "JETS · Airlines", since: "2015", trades: "167", win: "69%", avg: "+0.21%", t: "0.7", perYear: "2.0% / 2.0%", worst: "−13.8%", read: "No edge" },
  { etf: "GDXJ · Junior gold miners", since: "2009", trades: "244", win: "62%", avg: "+0.26%", t: "0.7", perYear: "1.4% / 2.4%", worst: "−14.3%", read: "No edge: fell 49% at worst" },
  { etf: "XME · Metals and mining", since: "2006", trades: "284", win: "64%", avg: "+0.12%", t: "0.5", perYear: "0.2% / 4.9%", worst: "−24.4%", read: "No edge: fell 56% at worst" },
  { etf: "IBB · Biotech (Nasdaq)", since: "2001", trades: "362", win: "67%", avg: "+0.07%", t: "0.4", perYear: "0.2% / 7.5%", worst: "−15.9%", read: "No edge: lost money in the last 3 yrs (−0.15%); fell 55% at worst" },
  { etf: "ITA · Aerospace and defense", since: "2006", trades: "275", win: "69%", avg: "+0.06%", t: "0.4", perYear: "0.3% / 11.8%", worst: "−16.8%", read: "No edge" },
  { etf: "XOP · Oil and gas exploration", since: "2006", trades: "293", win: "66%", avg: "−0.10%", t: "−0.3", perYear: "−3.5% / 2.5%", worst: "−31.1%", read: "No edge: fell 87% at worst" },
  { etf: "LIT · Lithium and batteries", since: "2010", trades: "244", win: "66%", avg: "−0.09%", t: "−0.5", perYear: "−2.0% / 5.3%", worst: "−10.1%", read: "No edge: fell 50% at worst" },
  { etf: "ICLN · Clean energy", since: "2008", trades: "258", win: "66%", avg: "−0.14%", t: "−0.6", perYear: "−2.8% / −4.3%", worst: "−21.6%", read: "No edge: fell 68% at worst" },
  { etf: "OIH · Oil services", since: "2001", trades: "369", win: "62%", avg: "−0.22%", t: "−0.9", perYear: "−4.9% / −0.4%", worst: "−31.1%", read: "No edge: fell 89% at worst" },
  { etf: "PBW · Clean energy (Invesco)", since: "2005", trades: "306", win: "63%", avg: "−0.35%", t: "−1.3", perYear: "−6.3% / −3.4%", worst: "−21.0%", read: "Negative: fell 86% at worst" },
  { etf: "TAN · Solar", since: "2008", trades: "282", win: "61%", avg: "−0.45%", t: "−1.5", perYear: "−8.4% / −7.4%", worst: "−19.9%", read: "Negative: fell 88% at worst" },
  { etf: "URA · Uranium", since: "2010", trades: "252", win: "56%", avg: "−0.48%", t: "−2.0", perYear: "−8.6% / −4.4%", worst: "−15.1%", read: "Negative: fell 85% at worst" },
] as const;

export const INTL = [
  { etf: "EWJ · Japan", since: "1996", trades: "388", win: "70%", avg: "+0.24%", t: "2.2", perYear: "2.8% / 2.7%", worst: "−17.4%", read: "Moderate" },
  { etf: "EWS · Singapore", since: "1996", trades: "364", win: "67%", avg: "+0.30%", t: "1.9", perYear: "3.1% / 4.1%", worst: "−17.1%", read: "Weak, not significant: faded recently (+0.10% last 3 yrs)" },
  { etf: "EWA · Australia", since: "1996", trades: "367", win: "72%", avg: "+0.25%", t: "1.8", perYear: "2.6% / 7.7%", worst: "−24.0%", read: "Weak, not significant" },
  { etf: "EWU · United Kingdom", since: "1996", trades: "364", win: "69%", avg: "+0.19%", t: "1.4", perYear: "1.9% / 6.0%", worst: "−20.9%", read: "Weak, not significant" },
  { etf: "EWP · Spain", since: "1996", trades: "378", win: "68%", avg: "+0.21%", t: "1.4", perYear: "2.1% / 8.7%", worst: "−18.5%", read: "Weak, not significant" },
  { etf: "EZU · Eurozone", since: "2000", trades: "347", win: "66%", avg: "+0.21%", t: "1.4", perYear: "2.2% / 4.6%", worst: "−15.9%", read: "Weak, not significant" },
  { etf: "VGK · Europe (Vanguard)", since: "2005", trades: "279", win: "68%", avg: "+0.21%", t: "1.4", perYear: "2.3% / 6.3%", worst: "−19.6%", read: "Weak, not significant" },
  { etf: "EWT · Taiwan", since: "2000", trades: "363", win: "67%", avg: "+0.16%", t: "1.1", perYear: "1.6% / 6.7%", worst: "−12.1%", read: "Weak, not significant" },
  { etf: "EWG · Germany", since: "1996", trades: "394", win: "66%", avg: "+0.15%", t: "1.1", perYear: "1.4% / 6.2%", worst: "−20.3%", read: "Weak, not significant" },
  { etf: "EWY · South Korea", since: "2000", trades: "370", win: "65%", avg: "+0.17%", t: "1.0", perYear: "1.7% / 9.0%", worst: "−17.1%", read: "Weak, not significant" },
  { etf: "EWI · Italy", since: "1996", trades: "380", win: "70%", avg: "+0.14%", t: "1.0", perYear: "1.2% / 6.7%", worst: "−17.8%", read: "No edge" },
  { etf: "EFA · EAFE developed markets", since: "2001", trades: "319", win: "66%", avg: "+0.11%", t: "0.9", perYear: "1.1% / 6.3%", worst: "−19.3%", read: "No edge" },
  { etf: "EWW · Mexico", since: "1996", trades: "426", win: "66%", avg: "+0.15%", t: "0.8", perYear: "1.0% / 9.1%", worst: "−29.2%", read: "No edge: fell 53% at worst" },
  { etf: "EWQ · France", since: "1996", trades: "400", win: "65%", avg: "+0.10%", t: "0.7", perYear: "0.8% / 7.1%", worst: "−19.5%", read: "No edge: lost money in the last 3 yrs (−0.04%)" },
  { etf: "EWC · Canada", since: "1996", trades: "361", win: "69%", avg: "+0.09%", t: "0.6", perYear: "0.6% / 8.9%", worst: "−19.0%", read: "No edge: fell 47% at worst" },
  { etf: "EWZ · Brazil", since: "2000", trades: "356", win: "67%", avg: "+0.12%", t: "0.6", perYear: "0.6% / 5.9%", worst: "−17.5%", read: "No edge: fell 60% at worst" },
  { etf: "VEA · Developed markets (Vanguard)", since: "2007", trades: "242", win: "67%", avg: "+0.05%", t: "0.3", perYear: "0.3% / 4.9%", worst: "−18.9%", read: "No edge" },
  { etf: "EWH · Hong Kong", since: "1996", trades: "402", win: "61%", avg: "−0.02%", t: "−0.1", perYear: "−0.7% / 5.1%", worst: "−16.5%", read: "No edge: fell 47% at worst" },
] as const;

export const EMERGING = [
  { etf: "EZA · South Africa", since: "2003", trades: "324", win: "70%", avg: "+0.48%", t: "3.0", perYear: "6.1% / 9.2%", worst: "−14.6%", read: "Good" },
  { etf: "ASHR · China A-shares", since: "2013", trades: "198", win: "68%", avg: "+0.30%", t: "2.3", perYear: "4.4% / 4.7%", worst: "−7.2%", read: "Moderate" },
  { etf: "EEM · Emerging markets (iShares)", since: "2003", trades: "313", win: "67%", avg: "+0.20%", t: "1.6", perYear: "2.4% / 9.4%", worst: "−10.4%", read: "Weak, not significant" },
  { etf: "INDA", since: "2012", trades: "211", win: "64%", avg: "+0.14%", t: "1.2", perYear: "1.8% / 5.5%", worst: "−11.2%", read: "Weak, not significant" },
  { etf: "FXI · China large caps", since: "2004", trades: "322", win: "66%", avg: "+0.18%", t: "1.0", perYear: "1.9% / 5.3%", worst: "−13.5%", read: "Weak, not significant" },
  { etf: "VWO · Emerging markets (Vanguard)", since: "2005", trades: "279", win: "66%", avg: "+0.06%", t: "0.5", perYear: "0.5% / 6.4%", worst: "−10.1%", read: "No edge" },
  { etf: "MCHI · China (MSCI)", since: "2011", trades: "241", win: "62%", avg: "+0.03%", t: "0.2", perYear: "−0.2% / 2.0%", worst: "−12.4%", read: "No edge" },
  { etf: "THD · Thailand", since: "2008", trades: "255", win: "62%", avg: "+0.01%", t: "0.1", perYear: "−0.4% / 4.1%", worst: "−16.6%", read: "No edge" },
] as const;

export const BONDS = [
  { etf: "TLT · Treasuries 20+ years", since: "2002", trades: "328", win: "73%", avg: "+0.26%", t: "3.8", perYear: "3.5% / 3.5%", worst: "−7.8%", read: "Strong: faded recently (+0.06% last 3 yrs)" },
  { etf: "TLH · Treasuries 10-20 years", since: "2007", trades: "276", win: "73%", avg: "+0.16%", t: "2.9", perYear: "2.3% / 2.7%", worst: "−5.3%", read: "Good" },
  { etf: "IEF · Treasuries 7-10 years", since: "2002", trades: "317", win: "66%", avg: "+0.07%", t: "2.2", perYear: "0.8% / 3.5%", worst: "−2.4%", read: "Moderate" },
  { etf: "BND · Total bond market", since: "2007", trades: "245", win: "67%", avg: "+0.07%", t: "2.1", perYear: "0.8% / 2.9%", worst: "−2.7%", read: "Moderate" },
  { etf: "TIP · Inflation-protected Treasuries", since: "2003", trades: "310", win: "68%", avg: "+0.07%", t: "1.8", perYear: "0.9% / 3.4%", worst: "−5.0%", read: "Weak, not significant: faded recently (+0.01% last 3 yrs)" },
  { etf: "AGG · US aggregate bonds", since: "2003", trades: "290", win: "66%", avg: "+0.04%", t: "1.4", perYear: "0.5% / 3.0%", worst: "−3.2%", read: "Weak, not significant" },
  { etf: "MBB · Mortgage-backed", since: "2007", trades: "230", win: "65%", avg: "+0.03%", t: "1.0", perYear: "0.4% / 2.6%", worst: "−3.6%", read: "No edge" },
  { etf: "IEI · Treasuries 3-7 years", since: "2007", trades: "265", win: "62%", avg: "+0.00%", t: "0.1", perYear: "0.0% / 2.8%", worst: "−1.6%", read: "No edge: lost money in the last 3 yrs (−0.00%)" },
  { etf: "BNDX · International bonds", since: "2013", trades: "146", win: "56%", avg: "−0.02%", t: "−0.5", perYear: "−0.2% / 2.3%", worst: "−2.3%", read: "No edge: short history" },
  { etf: "HYG · High-yield corporates", since: "2007", trades: "275", win: "63%", avg: "−0.06%", t: "−0.5", perYear: "−1.0% / 4.8%", worst: "−15.3%", read: "No edge" },
  { etf: "LQD · Investment-grade corporates", since: "2002", trades: "295", win: "63%", avg: "−0.07%", t: "−1.0", perYear: "−0.9% / 4.5%", worst: "−7.3%", read: "No edge" },
  { etf: "JNK · High-yield (SPDR)", since: "2007", trades: "268", win: "65%", avg: "−0.09%", t: "−1.0", perYear: "−1.5% / 4.8%", worst: "−13.6%", read: "No edge" },
  { etf: "EMB · Emerging-market bonds", since: "2007", trades: "277", win: "58%", avg: "−0.09%", t: "−1.2", perYear: "−1.4% / 4.4%", worst: "−9.8%", read: "Negative" },
  { etf: "SHY · Treasuries 1-3 years", since: "2002", trades: "229", win: "46%", avg: "−0.02%", t: "−2.2", perYear: "−0.2% / 2.0%", worst: "−1.0%", read: "Negative" },
  { etf: "MUB · Municipal bonds", since: "2007", trades: "235", win: "46%", avg: "−0.23%", t: "−4.7", perYear: "−2.8% / 3.0%", worst: "−3.8%", read: "Negative" },
] as const;

export const COMMODITIES = [
  { etf: "UUP · US dollar index", since: "2007", trades: "255", win: "69%", avg: "+0.02%", t: "0.4", perYear: "0.2% / 1.8%", worst: "−3.2%", read: "No edge" },
  { etf: "IAU · Gold (iShares)", since: "2005", trades: "257", win: "64%", avg: "+0.03%", t: "0.2", perYear: "0.1% / 10.6%", worst: "−9.0%", read: "No edge: lost money in the last 3 yrs (−0.32%)" },
  { etf: "FXB · British pound", since: "2006", trades: "327", win: "63%", avg: "+0.00%", t: "0.0", perYear: "−0.0% / −0.7%", worst: "−4.7%", read: "No edge: lost money in the last 3 yrs (−0.01%)" },
  { etf: "GLD · Gold (SPDR)", since: "2004", trades: "274", win: "64%", avg: "−0.01%", t: "−0.1", perYear: "−0.4% / 10.2%", worst: "−8.9%", read: "No edge" },
  { etf: "CPER · Copper", since: "2011", trades: "183", win: "62%", avg: "−0.07%", t: "−0.3", perYear: "−1.4% / 2.7%", worst: "−30.4%", read: "No edge" },
  { etf: "FXE · Euro", since: "2005", trades: "311", win: "59%", avg: "−0.02%", t: "−0.4", perYear: "−0.3% / −0.0%", worst: "−5.5%", read: "No edge" },
  { etf: "FXA · Australian dollar", since: "2006", trades: "280", win: "66%", avg: "−0.03%", t: "−0.4", perYear: "−0.5% / 1.6%", worst: "−7.1%", read: "No edge" },
  { etf: "UNG · Natural gas", since: "2007", trades: "311", win: "64%", avg: "−0.12%", t: "−0.4", perYear: "−4.0% / −28.4%", worst: "−22.7%", read: "No edge: fell 72% at worst" },
  { etf: "DBA · Agriculture", since: "2007", trades: "283", win: "65%", avg: "−0.04%", t: "−0.4", perYear: "−0.9% / 1.2%", worst: "−9.7%", read: "No edge" },
  { etf: "PDBC · Diversified commodities", since: "2014", trades: "152", win: "60%", avg: "−0.13%", t: "−0.7", perYear: "−2.1% / 4.4%", worst: "−7.5%", read: "No edge" },
  { etf: "FXY · Japanese yen", since: "2007", trades: "309", win: "63%", avg: "−0.05%", t: "−1.0", perYear: "−0.8% / −1.8%", worst: "−3.6%", read: "No edge" },
  { etf: "DBC · Broad commodities", since: "2006", trades: "287", win: "65%", avg: "−0.15%", t: "−1.1", perYear: "−2.5% / 2.4%", worst: "−13.5%", read: "Negative: fell 58% at worst" },
  { etf: "SLV · Silver", since: "2006", trades: "245", win: "58%", avg: "−0.36%", t: "−1.5", perYear: "−5.0% / 6.1%", worst: "−19.4%", read: "Negative: fell 73% at worst" },
  { etf: "USO · Crude oil", since: "2006", trades: "271", win: "59%", avg: "−0.49%", t: "−1.6", perYear: "−7.9% / −6.1%", worst: "−37.2%", read: "Negative: fell 90% at worst" },
] as const;

export const LEVERAGED = [
  { etf: "TECL · Technology 3x", since: "2008", trades: "224", win: "79%", avg: "+1.85%", t: "4.3", perYear: "21.2% / 42.3%", worst: "−26.5%", read: "Strong: fell 47% at worst" },
  { etf: "TQQQ · Nasdaq-100 3x", since: "2010", trades: "212", win: "76%", avg: "+1.71%", t: "4.2", perYear: "21.1% / 39.2%", worst: "−25.4%", read: "Strong" },
  { etf: "QLD · Nasdaq-100 2x", since: "2006", trades: "251", win: "73%", avg: "+1.16%", t: "3.7", perYear: "13.6% / 23.6%", worst: "−21.0%", read: "Strong" },
  { etf: "UPRO · S&P 500 3x", since: "2009", trades: "220", win: "73%", avg: "+1.30%", t: "3.6", perYear: "15.7% / 31.4%", worst: "−21.2%", read: "Strong: fell 46% at worst" },
  { etf: "FAS · Financials 3x", since: "2008", trades: "219", win: "74%", avg: "+1.49%", t: "3.5", perYear: "16.9% / 15.8%", worst: "−21.9%", read: "Good: fell 46% at worst; beat buy-and-hold" },
  { etf: "SPXL · S&P 500 3x (Direxion)", since: "2008", trades: "232", win: "72%", avg: "+1.24%", t: "3.3", perYear: "14.8% / 27.2%", worst: "−31.8%", read: "Good" },
  { etf: "TMF · Treasuries 20+ 3x", since: "2009", trades: "239", win: "71%", avg: "+0.70%", t: "2.8", perYear: "8.9% / −6.4%", worst: "−22.0%", read: "Good: faded recently (+0.25% last 3 yrs); fell 47% at worst; beat buy-and-hold" },
  { etf: "SSO · S&P 500 2x", since: "2006", trades: "254", win: "73%", avg: "+0.78%", t: "2.8", perYear: "8.8% / 15.1%", worst: "−34.8%", read: "Good" },
  { etf: "TNA · Russell 2000 3x", since: "2008", trades: "236", win: "73%", avg: "+1.31%", t: "2.6", perYear: "13.5% / 14.2%", worst: "−52.1%", read: "Good: fell 78% at worst" },
  { etf: "UWM · Russell 2000 2x", since: "2007", trades: "260", win: "72%", avg: "+0.71%", t: "1.9", perYear: "7.0% / 6.3%", worst: "−39.0%", read: "Weak, not significant: fell 67% at worst; beat buy-and-hold" },
  { etf: "UDOW · Dow 3x", since: "2010", trades: "216", win: "70%", avg: "+0.62%", t: "1.8", perYear: "6.5% / 25.0%", worst: "−22.4%", read: "Weak, not significant" },
  { etf: "SOXL · Semiconductors 3x", since: "2010", trades: "215", win: "69%", avg: "+1.18%", t: "1.7", perYear: "5.1% / 29.7%", worst: "−59.1%", read: "Weak, not significant: fell 85% at worst" },
] as const;

export const RISKS = [
  { fund: "SPY", entry: "7 Oct 2008", loss: "−18.8%", days: "4", stop: "16.3%" },
  { fund: "SPY", entry: "18 Feb 2009", loss: "−10.3%", days: "9", stop: "10.3%" },
  { fund: "QQQ", entry: "31 Mar 2000", loss: "−15.9%", days: "3", stop: "15.9%" },
  { fund: "QQQ", entry: "6 Oct 2008", loss: "−15.8%", days: "5", stop: "15.7%" },
  { fund: "QQQ", entry: "31 Aug 2001", loss: "−13.3%", days: "7", stop: "12.4%" },
  { fund: "XLK", entry: "6 Oct 2008", loss: "−16.0%", days: "5", stop: "16.0%" },
  { fund: "XLE", entry: "6 Oct 2008", loss: "−22.9%", days: "5", stop: "21.9%" },
  { fund: "XLE", entry: "10 Mar 2020", loss: "−20.9%", days: "4", stop: "20.8%" },
] as const;

export const ROBUSTNESS = [
  { v: "Base case: 3 lower closes, 3× ATR stop", spy: "+0.38% (3.2)", qqq: "+0.77% (4.4)" },
  { v: "2 lower closes", spy: "+0.28% (3.4)", qqq: "+0.36% (3.2)" },
  { v: "4 lower closes", spy: "+0.62% (3.2)", qqq: "+0.83% (3.4)" },
  { v: "Stop at 2× ATR", spy: "+0.36% (3.0)", qqq: "+0.59% (3.1)" },
  { v: "Stop at 4× ATR", spy: "+0.37% (2.8)", qqq: "+0.82% (4.9)" },
  { v: "No stop", spy: "+0.38% (3.7)", qqq: "+0.90% (5.6)" },
  { v: "Exit above the 5-day average instead", spy: "+0.29% (2.4)", qqq: "+0.64% (3.6)" },
  { v: "Exit on any up close instead", spy: "+0.19% (2.1)", qqq: "+0.43% (3.3)" },
  { v: "Exit after two days instead", spy: "+0.11% (1.2)", qqq: "+0.33% (2.3)" },
] as const;