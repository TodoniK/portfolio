// Visual review helper: node scripts/quality/shots.mjs <path> [outPrefix]  (needs a server on BASE)
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://127.0.0.1:8787";
const [path = "/", out = "/tmp/shot"] = process.argv.slice(2);
const b = await chromium.launch();
for (const [name, vp, mobile] of [["m", { width: 390, height: 844 }, true], ["d", { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  const errors = [];
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  await p.screenshot({ path: `${out}-${name}.jpg`, fullPage: true, quality: 60 });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(name, path, "overflow:", overflow, "errors:", errors.length ? errors : "none");
  await ctx.close();
}
await b.close();
