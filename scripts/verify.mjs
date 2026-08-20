import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 960 } });
const page = await ctx.newPage();
const problems = [];
page.on("pageerror", (e) => problems.push(`pageerror: ${e}`));
page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));

const routes = ["/", "/buy/", "/sell/", "/emily/", "/suburbs/", "/about/", "/contact/", "/property/westall-road-clayton/", "/nope/"];
for (const r of routes) {
  const res = await page.goto("http://localhost:3211" + r, { waitUntil: "networkidle" });
  if (r !== "/nope/" && res.status() !== 200) problems.push(`${r} -> ${res.status()}`);
  await page.waitForTimeout(500);
  // Every page must fit horizontally.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) problems.push(`${r} horizontal overflow at 1440`);
  const h1 = await page.locator("h1").count();
  if (r !== "/nope/" && h1 !== 1) problems.push(`${r} has ${h1} h1 elements`);
}

// Narrow viewport overflow check
const m = await b.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true });
const mp = await m.newPage();
for (const r of ["/", "/buy/", "/sell/", "/emily/", "/contact/", "/property/westall-road-clayton/"]) {
  await mp.goto("http://localhost:3211" + r, { waitUntil: "networkidle" });
  await mp.waitForTimeout(400);
  const o = await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (o) problems.push(`${r} horizontal overflow at 360`);
}

// Buy filters actually filter
await page.goto("http://localhost:3211/buy/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Sold", exact: true }).click();
await page.waitForTimeout(700);
const soldCount = await page.locator("article").count();
if (soldCount !== 2) problems.push(`Sold filter shows ${soldCount}, expected 2`);
await page.getByRole("button", { name: "Clayton", exact: true }).click();
await page.waitForTimeout(700);
const empty = await page.getByText("Nothing matches that brief today.").count();
if (empty !== 1) problems.push("empty state did not appear for Sold+Clayton");

console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "ALL CHECKS PASSED");
await b.close();
