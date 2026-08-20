import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3211/", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.screenshot({ path: `${OUT}/hero.png` });
const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto("http://localhost:3211/", { waitUntil: "networkidle" });
await mp.waitForTimeout(3200);
await mp.screenshot({ path: `${OUT}/m-hero.png` });
// Mobile nav drawer
await mp.locator('button[aria-label="Open menu"]').click();
await mp.waitForTimeout(900);
await mp.screenshot({ path: `${OUT}/m-nav.png` });
// Emily, mid conversation
const ep = await ctx.newPage();
await ep.goto("http://localhost:3211/emily/", { waitUntil: "networkidle" });
await ep.waitForTimeout(1400);
for (const label of ["I'm buying", "Clayton", "$1m – $1.3m", "4 bedrooms", "Within 3 months"]) {
  await ep.getByRole("button", { name: label, exact: true }).click();
  await ep.waitForTimeout(1300);
}
await ep.waitForTimeout(1200);
await ep.screenshot({ path: `${OUT}/emily-done.png` });
console.log("done");
await b.close();
