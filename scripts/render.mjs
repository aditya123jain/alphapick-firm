// Render SVGs/HTML to PNG with Playwright + system Chrome.
import { chromium } from 'playwright';
import fs from 'fs';
const [,, svg, out, w, h, bg='transparent'] = process.argv;
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const data = fs.readFileSync(svg, 'utf8');
await p.setContent(`<html><body style="margin:0;background:${bg}"><img src="data:image/svg+xml;base64,${Buffer.from(data).toString('base64')}" style="width:${w}px;height:${h}px;display:block"></body></html>`);
await p.screenshot({ path: out, omitBackground: bg==='transparent' });
await b.close();
