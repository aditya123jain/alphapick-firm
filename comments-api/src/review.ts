/**
 * Automatic review for new comments. Pure and synchronous so it is unit-tested.
 *
 * Outcome:
 *  - "rejected": clear abuse or clear spam (score >= REJECT_AT). The poster sees the same neutral
 *    "will appear after review" message as for pending, so the filter is never revealed.
 *  - "pending":  borderline (any spam signal, mild profanity, links). Waits for a moderator.
 *  - "approved": clean. Shown immediately.
 */
export type ReviewStatus = "approved" | "pending" | "rejected";
export type ReviewInput = {
  name: string;
  body: string;
  /** Posts from this IP hash in the last 10 minutes (before this one). */
  recentFromIp: number;
  /** Approved comments this IP hash has ever had. 0 = new poster. */
  approvedFromIp: number;
  /** Same body already posted (by anyone) in the last 7 days. */
  duplicateElsewhere: boolean;
};
export type ReviewResult = { status: ReviewStatus; reasons: string[]; score: number };

export const REJECT_AT = 4;

// Domains that may be linked without review (case-insensitive, subdomains included).
const SAFE_DOMAINS = ["alphapick.in"];

/** Strong abuse and slurs (English + common Hinglish). Any match -> rejected. Matched on normalised whole words. */
const SEVERE_WORDS = [
  "fuck", "fucker", "fucking", "fucked", "fck", "fuk", "motherfucker", "cunt", "bitch", "bastard", "whore", "slut",
  "dick", "dickhead", "asshole", "retard", "retarded", "faggot", "fag", "nigger", "nigga", "chink", "paki", "kike", "spic", "tranny",
  "madarchod", "maderchod", "madarchot", "behenchod", "bhenchod", "benchod", "bhenchodd", "bhosdike", "bhosdi", "bhosdika", "bhosadi",
  "bhosda", "chutiya", "chutiye", "chutia", "chootiya", "choot", "chut", "lund", "lauda", "lavda", "lawda", "loda", "lodu", "gaand",
  "gaandu", "gandu", "randi", "randwa", "harami", "haramzada", "haramkhor", "kutta", "kutte", "kutiya", "kamina", "kamine", "jhaant",
  "jhatu", "suar", "bkl", "mkc", "bsdk", "tmkc",
];
/** Phrases that are abuse regardless of words around them. */
const SEVERE_PHRASES = ["kill yourself", "kys", "teri maa", "teri ma ki", "maa ki", "behen ki", "go die"];
/** Mild profanity -> pending (a moderator decides). */
const MILD_WORDS = ["shit", "bullshit", "crap", "damn", "wtf", "stfu", "idiot", "stupid", "moron", "scam", "fraud", "bakwas", "bewakoof", "pagal", "ullu", "bc", "mc"];

/** Investment-scam and solicitation pitches. Each match adds weight. */
const PITCH_PATTERNS: [RegExp, string, number][] = [
  [/\bguarant(?:ee|eed)\s+(?:returns?|profits?|income|gains?)\b/i, "pitch:guaranteed_returns", 3],
  [/\b(?:100|200|300)\s?%\s*(?:profit|returns?|accuracy|sure)\b/i, "pitch:percent_promise", 3],
  [/\bdouble\s+(?:your|ur)\s+(?:money|capital|investment)\b/i, "pitch:double_money", 3],
  [/\b(?:risk[-\s]?free|no\s+risk)\s+(?:profits?|returns?|trading|income)\b/i, "pitch:risk_free", 3],
  [/\bjoin\s+(?:my|our|the)?\s*(?:telegram|whatsapp|vip|premium|paid|free)?\s*(?:group|channel|community)\b/i, "pitch:join_group", 3],
  [/\b(?:dm|pm|inbox|message|msg|text|ping|contact)\s+(?:me|us)\b/i, "pitch:dm_me", 2],
  [/\b(?:sure\s?shot|jackpot|multibagger)\s+(?:calls?|tips?|stocks?|trades?)\b/i, "pitch:tips", 3],
  [/\b(?:free|paid|vip|premium|daily|accurate|best)\s+(?:trading\s+)?(?:signals?|calls?|tips)\b/i, "pitch:signals", 3],
  [/\b(?:crypto|forex|bitcoin|btc|binary\s+options?|usdt)\b.{0,40}\b(?:signals?|profit|earn|invest(?:ment)?|returns?|mining|recovery)\b/i, "pitch:crypto_forex", 2],
  [/\b(?:account|fund|wallet)\s+recovery\b|\brecover\s+(?:your|lost)\s+(?:funds|crypto|money)\b/i, "pitch:recovery_scam", 4],
  [/\b(?:earn|make)\s+(?:rs\.?|₹|\$)?\s?\d[\d,]*k?\s*(?:per|a|\/)\s*(?:day|week|month)\b/i, "pitch:earn_per_day", 3],
  [/\b(?:work\s+from\s+home|part[-\s]?time\s+job|investment\s+plan|account\s+handling)\b/i, "pitch:job_or_plan", 2],
];

const URL_RE = /\b(?:https?:\/\/|www\.)[^\s<>()]+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|io|in|co|xyz|top|info|biz|me|ly|gg|app|site|online|live|club|vip|link|ru|cn)\b(?:\/[^\s]*)?/gi;
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
// 10+ digits, allowing spaces, dots, dashes and a leading +, e.g. +91 98765 43210 or 987-654-3210
const PHONE_RE = /(?:\+?\d[\s.-]?){10,}/;
const MESSENGER_RE = /\b(?:telegram|whatsapp|whats\s?app|wa\.me|t\.me|signal\s+app|wechat|snapchat|insta(?:gram)?\s+id)\b|(?:^|\s)@[a-z0-9_]{4,}/i;

const LEET: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s" };

/** Lower-case, undo common leetspeak, squeeze runs of 3+ identical letters to 1, split into words. */
export function normaliseWords(s: string): string[] {
  const low = s.toLowerCase().replace(/[013457@$]/g, (c) => LEET[c] ?? c);
  return low
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/(.)\1{2,}/g, "$1"));
}

function findWord(words: string[], list: string[]): string | undefined {
  const set = new Set(list);
  for (const w of words) {
    if (set.has(w)) return w;
    // also catch doubled final letters ("fuckk", "chutiyaa")
    const squeezed = w.replace(/(.)\1+/g, "$1");
    if (set.has(squeezed)) return w;
  }
  // a few long words are matched inside other words too (they never occur innocently)
  const joined = words.join("");
  for (const long of ["motherfucker", "madarchod", "behenchod", "bhenchod", "bhosdike", "chutiya"]) {
    if (list.includes(long) && joined.includes(long)) return long;
  }
  return undefined;
}

function hostOf(u: string): string {
  return u.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[/?#:]/)[0]!.toLowerCase();
}

export function review(input: ReviewInput): ReviewResult {
  const reasons: string[] = [];
  let score = 0;
  const add = (reason: string, weight: number) => { reasons.push(reason); score += weight; };
  const text = `${input.name}\n${input.body}`;
  const words = normaliseWords(text);
  const flat = ` ${words.join(" ")} `;

  // 1. Abuse
  const severe = findWord(words, SEVERE_WORDS) ?? SEVERE_PHRASES.find((p) => flat.includes(` ${p} `));
  if (severe) add(`abuse:${severe}`, REJECT_AT);
  const mild = findWord(words, MILD_WORDS);
  if (mild) add(`profanity:${mild}`, 1);

  // 2. Links and contact details
  const urls = text.match(URL_RE) ?? [];
  const unknown = urls.filter((u) => {
    const h = hostOf(u);
    return !SAFE_DOMAINS.some((d) => h === d || h.endsWith(`.${d}`));
  });
  if (unknown.length) add(`link:${unknown.length}`, unknown.length >= 2 ? 2 : 1);
  if (EMAIL_RE.test(text)) add("contact:email", 2);
  if (PHONE_RE.test(text)) add("contact:phone", 2);
  if (MESSENGER_RE.test(text)) add("contact:messenger", 2);
  if (/(?:https?:\/\/|www\.|@)/i.test(input.name) || EMAIL_RE.test(input.name)) add("name:contact_or_link", 2);

  // 3. Scam / solicitation pitches
  for (const [re, reason, weight] of PITCH_PATTERNS) if (re.test(text)) add(reason, weight);

  // 4. Shape of the text
  const letters = input.body.replace(/[^A-Za-z]/g, "");
  const upper = input.body.replace(/[^A-Z]/g, "").length;
  if (letters.length >= 12 && upper / letters.length > 0.7) add("shape:all_caps", 1);
  if (/(.)\1{5,}/.test(input.body.replace(/\s/g, ""))) add("shape:repeated_chars", 1);
  const alnum = input.body.replace(/[^\p{L}\p{N}]/gu, "");
  if (alnum.length < 3) add("shape:too_short", 1);
  else if (!/[aeiouy]/i.test(alnum) && /^[a-z]+$/i.test(alnum) && alnum.length >= 5) add("shape:gibberish", 1);
  if (input.duplicateElsewhere) add("duplicate_text", 2);

  // 5. Poster behaviour
  if (input.recentFromIp >= 3) add("burst:many_posts", 1);
  if (input.approvedFromIp === 0 && score > 0) add("new_poster", 1);

  const status: ReviewStatus = score >= REJECT_AT ? "rejected" : score > 0 ? "pending" : "approved";
  return { status, reasons, score };
}
