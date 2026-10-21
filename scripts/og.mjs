import { chromium } from 'playwright';
import path from 'path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file://' + path.resolve('scripts/og.html')); await p.waitForTimeout(400);
await p.screenshot({ path: 'public/og.png' }); await b.close();
