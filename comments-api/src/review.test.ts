import { test } from "node:test";
import assert from "node:assert/strict";
import { review, normaliseWords } from "./review.js";

const base = { name: "Asha", recentFromIp: 0, approvedFromIp: 0, duplicateElsewhere: false };
const r = (body: string, extra: Partial<typeof base> = {}) => review({ ...base, body, ...extra });

test("clean comments are approved", () => {
  for (const body of [
    "Interesting study. Did you test a 2x ATR stop as well?",
    "Nice!",
    "The assessment of drawdowns was useful; I wonder how this does in a bear market.",
    "Is SPY's win rate above 70% after 2010 too?",
    "Does this give guaranteed results? I doubt any backtest can.",
  ]) assert.equal(r(body).status, "approved", body);
});

test("links go to review, safe domain is fine", () => {
  const one = r("See my notes at https://example.com/notes");
  assert.equal(one.status, "pending");
  assert.ok(one.reasons.some((x) => x.startsWith("link")));
  assert.equal(r("Discussed on https://alphapick.in/knowledge/").status, "approved");
  assert.equal(r("Bare domain spam.xyz here", { approvedFromIp: 1 }).status, "pending");
});

test("abuse and slurs are rejected, including Hinglish and leetspeak", () => {
  assert.equal(r("This is f*ck1ng useless, you fuck").status, "rejected");
  assert.equal(r("bhenchod kya bakwas hai").status, "rejected");
  assert.equal(r("chutiyaaa study").status, "rejected");
  assert.equal(r("teri maa ki").status, "rejected");
  assert.equal(r("Nice work", { name: "madarchod" }).status, "rejected");
  // mild profanity only -> review, not reject
  assert.equal(r("this is crap", { approvedFromIp: 2 }).status, "pending");
});

test("scam pitches are rejected", () => {
  assert.equal(r("Guaranteed returns of 5% weekly, join my telegram group for VIP signals").status, "rejected");
  assert.equal(r("Earn $500 per day with forex signals, DM me").status, "rejected");
  assert.equal(r("Lost crypto? Our fund recovery team can help").status, "rejected");
  assert.equal(r("Free trading signals daily", { approvedFromIp: 3 }).status, "pending");
});

test("phone numbers, emails and handles are caught", () => {
  const ph = r("Call me on +91 98765 43210 for tips");
  assert.notEqual(ph.status, "approved");
  assert.ok(ph.reasons.includes("contact:phone"));
  assert.ok(r("mail me at someone@example.com").reasons.includes("contact:email"));
  assert.ok(r("ping on whatsapp").reasons.includes("contact:messenger"));
  assert.equal(r("Great study").status, "approved"); // numbers in study text are fine:
  assert.equal(r("SPY 373 trades, QQQ 350 trades, 1998 to 2026").status, "approved");
});

test("all caps, repeated characters, junk and duplicates", () => {
  assert.ok(r("THIS IS THE BEST STUDY EVER WOW").reasons.includes("shape:all_caps"));
  assert.equal(r("THIS IS THE BEST STUDY EVER WOW").status, "pending");
  assert.equal(r("SPY QQQ XLE", { approvedFromIp: 1 }).status, "approved"); // short tickers are not "caps shouting"
  assert.ok(r("niceeeeeeee").reasons.includes("shape:repeated_chars"));
  assert.equal(r("??").status, "pending");
  assert.equal(r("sdfghjkl").status, "pending");
  assert.equal(r("Great study", { duplicateElsewhere: true }).status, "pending");
  assert.equal(r("Great study", { recentFromIp: 4 }).status, "pending");
});

test("finance abbreviations are not abuse", () => {
  assert.equal(r("MF vs ETF: which is cheaper bc of costs?").status !== "rejected", true);
  assert.equal(r("I hold an MF and SPY").status, "approved");
});

test("normaliser", () => {
  assert.deepEqual(normaliseWords("H3llo W0rld!!"), ["hello", "world"]);
});
