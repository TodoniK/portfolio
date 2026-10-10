import { chromium } from "@playwright/test";
const T = "/var/folders/1h/y_lyl_j52lgdc1b_mpnvmcb80000gn/T/opencode";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.text().slice(0, 200)));
p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
await p.goto("http://127.0.0.1:8787/", { waitUntil: "load" });
await p.screenshot({ path: `${T}/mo-0.jpg`, quality: 55 });
await p.waitForTimeout(2500);
await p.screenshot({ path: `${T}/mo-1.jpg`, quality: 55 });
const st = await p.evaluate(() => ({ cursor: document.documentElement.classList.contains("has-cursor"), videos: [...document.querySelectorAll("video")].map(v => ({ src: v.currentSrc.split("/").pop(), paused: v.paused, rs: v.readyState })), pinned: !!document.querySelector(".is-pinned") }));
console.log(JSON.stringify(st));
for (const [i, y] of [[2, 700], [3, 2300], [4, 3200], [5, 4200]]) { await p.mouse.wheel(0, y - await p.evaluate(() => scrollY)); await p.waitForTimeout(1400); await p.screenshot({ path: `${T}/mo-${i}.jpg`, quality: 55 }); }
await p.mouse.move(400, 400);
console.log("errors:", errs);
await b.close();
