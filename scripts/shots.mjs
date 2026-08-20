import { chromium } from "playwright";
const OUT = process.argv[2] || "/tmp/shots";
const base = "http://localhost:3211";
const pages = [
  ["home", "/"],
  ["buy", "/buy/"],
  ["sell", "/sell/"],
  ["emily", "/emily/"],
  ["about", "/about/"],
  ["suburbs", "/suburbs/"],
  ["contact", "/contact/"],
  ["property", "/property/westall-road-clayton/"],
];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

for (const [name, path] of pages) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  // Settle scroll-triggered reveals before capturing.
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.8;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else setTimeout(() => { window.scrollTo(0, 0); r(); }, 400);
      };
      step();
    });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log("shot", name);
}

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
const mp = await mobile.newPage();
await mp.goto(base + "/", { waitUntil: "networkidle" });
await mp.waitForTimeout(1600);
await mp.screenshot({ path: `${OUT}/mobile-home.png`, fullPage: false });
console.log("shot mobile");

console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
await browser.close();
