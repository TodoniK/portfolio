// Generates one 1600x1000 tile per project from a shared visual system, rendered by Playwright.
// Usage: node scripts/media/tiles.mjs  → src/assets/tiles/<id>.png (astro:assets converts to AVIF/WebP).
import { chromium } from "@playwright/test";
import { mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { DICTIONARY } from "../../src/data/dictionary.ts";
import { PROJECT_ARTICLES } from "../../src/data/projects-data.ts";

const root = resolve(import.meta.dirname, "../..");
const outDir = join(root, "src/assets/tiles");
mkdirSync(outDir, { recursive: true });
const font = (f) => readFileSync(join(root, "src/assets/fonts", f)).toString("base64");
const inter = font("inter.woff2");
const shots = { shopeen: "png", iplocator: "png", automatisms: "png", mijotons: "png", portfolio: "png", stakeirb: "jpg" };

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const seedOf = (id) => [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

// Unique topology glyph per project: seeded nodes and edges, one highlighted path.
function glyph(id, w, h) {
  const R = rng(seedOf(id)), n = 14, pts = [];
  for (let i = 0; i < n; i++) pts.push([40 + R() * (w - 80), 40 + R() * (h - 80)]);
  let lines = "", dots = "";
  pts.forEach(([x, y], i) => {
    const near = pts.map((p, j) => [j, (p[0] - x) ** 2 + (p[1] - y) ** 2]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, 2);
    near.forEach(([j]) => { if (j > i) lines += `<line x1="${x}" y1="${y}" x2="${pts[j][0]}" y2="${pts[j][1]}"/>`; });
    dots += `<circle cx="${x}" cy="${y}" r="${i % 5 === 0 ? 9 : 5}" class="${i === 0 ? "hot" : i % 4 === 0 ? "ok" : ""}"/>`;
  });
  // nearest-neighbour chain from the first node reads as a real route
  const route = [pts[0]], left = pts.slice(1);
  while (route.length < 5) {
    const [lx, ly] = route[route.length - 1];
    left.sort((a, b) => (a[0] - lx) ** 2 + (a[1] - ly) ** 2 - ((b[0] - lx) ** 2 + (b[1] - ly) ** 2));
    route.push(left.shift());
  }
  const path = route.map(([x, y]) => `${x},${y}`).join(" ");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><g class="edges">${lines}</g><polyline class="route" points="${path}"/><g class="nodes">${dots}</g></svg>`;
}

async function html(item, article, i) {
  const shot = shots[item.id];
  const src = shot
    ? `data:image/jpeg;base64,${(await sharp(join(root, "src/assets/projects", `${item.id}.${shot}`)).resize({ width: 1640 }).jpeg({ quality: 90 }).toBuffer()).toString("base64")}`
    : null;
  const metric = article.metrics[0];
  const css = `@font-face{font-family:I;src:url(data:font/woff2;base64,${inter}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}body{width:1600px;height:1000px;font-family:I;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}`;
  if (src) return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{background:radial-gradient(120% 90% at 50% 0%,#ffffff 0%,#f0f0f3 55%,#e3e4ea 100%)}
.win{position:absolute;left:140px;right:140px;top:110px;border-radius:22px;background:#fff;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.06),0 50px 90px -30px rgba(0,0,0,.35)}
.bar{height:52px;display:flex;align-items:center;gap:10px;padding:0 22px;background:#f6f6f8;border-bottom:1px solid rgba(0,0,0,.06)}
.bar i{width:14px;height:14px;border-radius:50%}.bar i:nth-child(1){background:#ff5f57}.bar i:nth-child(2){background:#febc2e}.bar i:nth-child(3){background:#28c840}
.url{margin-left:auto;margin-right:auto;font-size:20px;color:#6e6e73;background:#ececf0;padding:6px 28px;border-radius:10px;letter-spacing:-.01em}
.win img{display:block;width:100%;height:760px;object-fit:cover;object-position:top}
</style></head><body><div class="win"><div class="bar"><i></i><i></i><i></i><span class="url">${(item.previewUrl || "localhost").replace(/^https?:\/\//, "").replace(/\/$/, "")}</span></div><img src="${src}"></div></body></html>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{background:#000;color:#f5f5f7}
.glow{position:absolute;width:1100px;height:1100px;right:-200px;top:-420px;border-radius:50%;background:radial-gradient(circle,rgba(41,151,255,.32),rgba(186,98,252,.12) 45%,transparent 70%)}
.glyph{position:absolute;right:60px;top:40px}
.edges line{stroke:rgba(255,255,255,.2);stroke-width:2}.route{fill:none;stroke:#2997FF;stroke-width:4;stroke-linecap:round}
.nodes circle{fill:rgba(255,255,255,.55)}.nodes .hot{fill:#2997FF}.nodes .ok{fill:#30D158}
.meta{position:absolute;left:84px;bottom:90px;display:flex;flex-direction:column;gap:18px}
.k{font-size:30px;font-weight:600;letter-spacing:.01em;color:#86868b;text-transform:uppercase;padding-left:6px}
.name{font-weight:680;font-size:150px;line-height:.9;letter-spacing:-.05em;max-width:1200px;
background:linear-gradient(180deg,#fff 30%,#a1a1a6);-webkit-background-clip:text;background-clip:text;color:transparent}
.kpi{position:absolute;left:90px;top:80px;font-size:28px;color:#86868b}.kpi b{display:block;font-size:84px;font-weight:700;letter-spacing:-.05em;color:#f5f5f7}
</style></head><body><div class="glow"></div><div class="glyph">${glyph(item.id, 860, 640)}</div>
<div class="meta"><p class="k">${item.tag}</p><h1 class="name">${codename(item)}</h1></div><p class="kpi"><b>${metric.value}</b>${metric.label.en}</p></body></html>`;
}
const codename = (item) => ({ shopeen: "Shopeen", "m2c-flows": "M2C Flows", "opencode-harness": "OpenCode Harness", iplocator: "IP Locator", automatisms: "Automatisms", stakeirb: "Stakeirb", portfolio: "Portfolio" })[item.id] ?? item.title.split(" ")[0];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
for (const [i, item] of DICTIONARY.en.projects.items.entries()) {
  const article = PROJECT_ARTICLES[item.id];
  await page.setContent(await html(item, article, i), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(outDir, `${item.id}.png`) });
  console.log("tile", item.id);
}
await browser.close();
if (!existsSync(join(outDir, "hermes.png"))) process.exit(1);
