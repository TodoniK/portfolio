// Post-build: renders a 1200x630 Open Graph image for every built page, from its own <title>.
// Output: dist/og/<slug>.jpg where slug matches Base.astro (home for "/", path with "-" otherwise).
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, mkdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "../..");
const dist = join(root, "dist");
const out = join(dist, "og");
mkdirSync(out, { recursive: true });
const b64 = (f) => readFileSync(join(root, f)).toString("base64");
const archivo = b64("src/assets/fonts/archivo.woff2");
const mono = b64("src/assets/fonts/jetbrains-mono.woff2");
const bgCache = new Map();
async function bg(file) {
  if (!bgCache.has(file)) bgCache.set(file, `data:image/jpeg;base64,${(await sharp(join(root, file)).resize({ width: 1200 }).jpeg({ quality: 82 }).toBuffer()).toString("base64")}`);
  return bgCache.get(file);
}
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".html") ? [join(d, f)] : []));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const file of walk(dist)) {
  const html = readFileSync(file, "utf8");
  const og = html.match(/property="og:image" content="[^"]*\/og\/([^"]+)\.jpg"/)?.[1];
  if (!og || existsSync(join(out, `${og}.jpg`))) continue;
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "Jules Royet").replace(/\s*\|\s*Jules Royet$/, "").replace(/^Jules Royet \|\s*/, "");
  const path = "/" + relative(dist, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  const project = path.match(/projects\/([\w-]+)$/)?.[1];
  const image = await bg(project && existsSync(join(root, `src/assets/tiles/${project}.png`)) ? `src/assets/tiles/${project}.png` : "src/assets/video/hero-16x9.png");
  await page.setContent(`<html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo});font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono});font-weight:100 800}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#0F1011 url(${image}) center/cover;color:#F1EEE6;font-family:A;position:relative}
.s{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,16,17,.96) 0%,rgba(15,16,17,.82) 55%,rgba(15,16,17,.35) 100%)}
.c{position:absolute;inset:56px 64px;display:flex;flex-direction:column;justify-content:space-between}
.k{font-family:M;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:#A3A099;display:flex;gap:18px;align-items:center}
.k b{width:34px;height:34px;background:#FF4F1A;color:#0F1011;display:grid;place-items:center;border-radius:4px;font:820 15px A;font-stretch:80%}
h1{font-size:${title.length > 48 ? 64 : 80}px;font-weight:800;font-stretch:78%;line-height:.95;letter-spacing:-.02em;text-transform:uppercase;max-width:900px}
.f{font-family:M;font-size:20px;letter-spacing:.06em;color:#A3A099}.f span{color:#FF4F1A}
</style></head><body><div class="s"></div><div class="c"><p class="k"><b>JR</b>julesroyet.dev${esc(path === "/" ? "" : path)}</p><h1>${esc(title)}</h1><p class="f"><span>●</span> Jules Royet · Cloud &amp; DevOps · AI systems</p></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, `${og}.jpg`), type: "jpeg", quality: 82 });
  n++;
}
await browser.close();
console.log(`og: ${n} images`);
