// Screenshot helper for visual QA:  node tools/shot.js <url-or-path> <out.png> [width] [height] [fullPage]
const { chromium } = require('playwright');

(async () => {
  const [target, out, w = '1440', h = '900', full = 'true'] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const url = target.startsWith('http') ? target : 'file://' + require('path').resolve(target);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  // Walk the page so IntersectionObserver reveals fire, then return to the top.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: out, fullPage: full === 'true' });
  await browser.close();
  console.log('wrote', out);
})();
