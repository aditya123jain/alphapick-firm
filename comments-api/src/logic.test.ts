import { test } from "node:test";
import assert from "node:assert/strict";
import { MemoryRateLimiter, cleanText, countLinks, isAllowedOrigin, postAllowed, safeEqual, validateComment } from "./logic.js";

test("valid comment is cleaned and accepted", () => {
  const r = validateComment({ name: "  Asha  <b>K</b> ", body: "Nice study.\r\n\r\n\r\n\r\n<script>alert(1)</script>Thanks", website: "" });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.name, "Asha K");
    assert.equal(r.value.body, "Nice study.\n\nalert(1)Thanks");
    assert.equal(r.value.parentId, null);
  }
});

test("honeypot rejects", () => {
  const r = validateComment({ name: "Bot", body: "Buy now", website: "http://spam.example" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.code, "spam_detected");
});

test("length limits", () => {
  const empty = validateComment({ name: "A", body: "   " });
  assert.equal(!empty.ok && empty.code, "invalid_body");
  const long = validateComment({ name: "x".repeat(61), body: "ok" });
  assert.equal(!long.ok && long.code, "invalid_name");
  const big = validateComment({ name: "A", body: "y".repeat(2001) });
  assert.equal(!big.ok && big.code, "invalid_body");
  const tagOnly = validateComment({ name: "<i></i>", body: "ok" });
  assert.equal(!tagOnly.ok && tagOnly.code, "invalid_name");
});

test("bad types and parent ids are rejected", () => {
  assert.equal(validateComment({ name: 1, body: "x" }).ok, false);
  assert.equal(validateComment({ name: "A", body: "x", parentId: "not-a-uuid" }).ok, false);
  assert.equal(validateComment(null).ok, false);
});

test("link spam limit", () => {
  assert.equal(countLinks("see https://a.com and www.b.com"), 2);
  const r = validateComment({ name: "A", body: "http://a.com http://b.com http://c.com" });
  assert.equal(!r.ok && r.code, "too_many_links");
  const n = validateComment({ name: "www.spam.com", body: "hi" });
  assert.equal(!n.ok && n.code, "too_many_links");
});

test("cleanText keeps plain comparisons", () => {
  assert.equal(cleanText("a < b and c > d", { multiline: false }), "a < b and c > d");
});

test("rate limiting", () => {
  assert.equal(postAllowed(4), true);
  assert.equal(postAllowed(5), false);
  let now = 0;
  const rl = new MemoryRateLimiter(2, 1000, () => now);
  assert.equal(rl.allow("k"), true);
  assert.equal(rl.allow("k"), true);
  assert.equal(rl.allow("k"), false);
  assert.equal(rl.allow("other"), true);
  now = 1001;
  assert.equal(rl.allow("k"), true);
});

test("origins and token compare", () => {
  const allowed = ["https://alphapick.in", "https://www.alphapick.in"];
  assert.equal(isAllowedOrigin("https://alphapick.in", allowed), true);
  assert.equal(isAllowedOrigin("http://localhost:3000", allowed), true);
  assert.equal(isAllowedOrigin("https://evil.example", allowed), false);
  assert.equal(isAllowedOrigin("https://alphapick.in.evil.example", allowed), false);
  assert.equal(safeEqual("abc", "abc"), true);
  assert.equal(safeEqual("abc", "abd"), false);
  assert.equal(safeEqual("abc", "abcd"), false);
});
