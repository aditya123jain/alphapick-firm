// Full-page screenshots of the local static build (serve out/ on :4010 first).
import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:4010';
const pages = [['home', '/'], ['what-we-do', '/what-we-do/'], ['careers', '/careers/'], ['careers-us-equity-trader', '/careers/us-equity-trader/'], ['about', '/about/'], ['contact', '/contact/']];
const widths = [1440, 390];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const report = [];
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 800 ? 900 : 844 }, deviceScaleFactor: w > 800 ? 1 : 2 });
  for (const [name, path] of pages) {
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(String(e)));
    p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    // scroll through so scroll-reveal content is triggered, then back to top
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(90); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1300);
    const overflowX = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await p.screenshot({ path: `docs/screens/${name}-${w}.png`, fullPage: true });
    report.push({ w, name, overflowX, errors });
    await p.close();
  }
  await ctx.close();
}
// reduced-motion sanity check: content visible, canvas static
const rm = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const rp = await rm.newPage(); await rp.goto(BASE + '/what-we-do/', { waitUntil: 'networkidle' });
const hidden = await rp.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length);
report.push({ reducedMotion_hiddenRevealEls: hidden, revealReadyClass: await rp.evaluate(() => document.documentElement.classList.contains('reveal-ready')) });
console.log(JSON.stringify(report, null, 1));
await b.close();
