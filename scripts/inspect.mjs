import { chromium } from "playwright";
const OUT = process.argv[2];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3211/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await new Promise((r) => { let y=0; const s=()=>{ y+=600; window.scrollTo(0,y); if(y<document.body.scrollHeight) setTimeout(s,90); else setTimeout(r,500);}; s(); });
});
await page.waitForTimeout(800);
const targets = [
  ["featured", "section:has(h2:text-is('On the market'))"],
  ["team", "section:has(h2:has-text('Small team'))"],
  ["testimonials", "section:has(blockquote)"],
  ["emily", "#emily"],
];
for (const [name, sel] of targets) {
  const el = page.locator(sel).first();
  if (await el.count()) { await el.screenshot({ path: `${OUT}/sec-${name}.png` }); console.log("ok", name); }
  else console.log("MISSING", name);
}
await browser.close();
