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
const archivo = font("archivo.woff2");
const mono = font("jetbrains-mono.woff2");
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
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo}) format("woff2");font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format("woff2");font-weight:100 800}
*{box-sizing:border-box;margin:0}body{width:1600px;height:1000px;background:#0F1011;color:#F1EEE6;font-family:A;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(#2A2D30 1px,transparent 1px),linear-gradient(90deg,#2A2D30 1px,transparent 1px);background-size:80px 80px;opacity:.9}
.glyph{position:absolute;right:${src ? "-40px" : "40px"};top:${src ? "-60px" : "70px"};opacity:${src ? ".5" : "1"}}
.edges line{stroke:#5C5A54;stroke-width:2}.route{fill:none;stroke:#FF4F1A;stroke-width:4;stroke-dasharray:14 10}
.nodes circle{fill:#A3A099}.nodes .hot{fill:#FF4F1A}.nodes .ok{fill:#3FCF8E}
.meta{position:absolute;left:80px;top:72px;font-family:M;font-size:26px;letter-spacing:.08em;text-transform:uppercase;color:#A3A099;display:flex;gap:28px}
.meta b{color:#FF4F1A;font-weight:500}
.name{position:absolute;left:72px;bottom:${src ? "86px" : "120px"};font-weight:820;font-stretch:${src ? "72%" : "88%"};font-size:${src ? 132 : 170}px;line-height:.86;letter-spacing:-.03em;max-width:${src ? "700px" : "1180px"};word-spacing:.12em;text-transform:uppercase}
.kpi{position:absolute;left:80px;bottom:56px;font-family:M;font-size:26px;color:#A3A099;letter-spacing:.04em}.kpi span{color:#3FCF8E}
.shot{position:absolute;right:72px;bottom:72px;width:820px;border:2px solid #2A2D30;border-radius:6px;background:#1A1C1E;overflow:hidden}
.bar{height:38px;display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:2px solid #2A2D30}.bar i{width:12px;height:12px;border-radius:50%;background:#2A2D30}
.shot img{display:block;width:100%;height:520px;object-fit:cover;object-position:top}
</style></head><body><div class="grid"></div><div class="glyph">${glyph(item.id, src ? 900 : 760, src ? 760 : 620)}</div>
<div class="meta"><b>${String(i + 1).padStart(2, "0")}</b><span>${item.tag}</span><span>${article.timeline.en}</span></div>
<h1 class="name">${codename(item)}</h1>
${src ? `<div class="shot"><div class="bar"><i></i><i></i><i></i></div><img src="${src}"></div>` : `<p class="kpi">${metric.label.en} <span>${metric.value}</span></p>`}
</body></html>`;
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
