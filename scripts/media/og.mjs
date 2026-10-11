// Renders a 1200x630 Open Graph image for every built page, from its own <title>, into public/og/<slug>.jpg
// (slug matches Base.astro). Images are committed: the Workers Builds image has no Chromium.
// Run `npm run media:og` after adding a page or changing a title; existing images are kept (delete one to redo it).
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, mkdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "../..");
const dist = join(root, "dist");
const out = join(root, "public", "og");
mkdirSync(out, { recursive: true });
const b64 = (f) => readFileSync(join(root, f)).toString("base64");
const inter = b64("src/assets/fonts/inter.woff2");
const memoji = `data:image/png;base64,${b64("src/assets/portraits/memoji.png")}`;
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
  const image = project ? await bg(`src/assets/tiles/${project}.png`) : "";
  const dark = Boolean(project);
  await page.setContent(`<html><head><style>
@font-face{font-family:I;src:url(data:font/woff2;base64,${inter});font-weight:100 900}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:I;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased;
background:${dark ? "#000" : "radial-gradient(120% 100% at 50% 0%,#fff 0%,#f5f5f7 60%,#e8e8ed 100%)"};color:${dark ? "#f5f5f7" : "#1d1d1f"}}
.img{position:absolute;right:-60px;top:70px;width:560px;border-radius:22px;box-shadow:0 40px 80px -30px rgba(0,0,0,.5)}
.c{position:absolute;left:72px;top:64px;bottom:64px;width:${dark ? 620 : 1000}px;display:flex;flex-direction:column;justify-content:space-between}
.k{display:flex;align-items:center;gap:16px;font-size:26px;font-weight:600;color:${dark ? "#a1a1a6" : "#6e6e73"}}.k img{width:56px;height:56px}
h1{font-size:${title.length > 44 ? 62 : 78}px;font-weight:700;line-height:1;letter-spacing:-.045em}
.f{font-size:24px;font-weight:500;color:${dark ? "#a1a1a6" : "#6e6e73"}}.f b{background:linear-gradient(90deg,#0090f7,#ba62fc,#f2416b);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:600}
</style></head><body>${dark ? `<img class="img" src="${image}">` : ""}<div class="c"><p class="k"><img src="${memoji}">julesroyet.dev${esc(path === "/" ? "" : path)}</p><h1>${esc(title)}</h1><p class="f"><b>Jules Royet</b> · Cloud &amp; DevOps · AI systems</p></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, `${og}.jpg`), type: "jpeg", quality: 82 });
  n++;
}
await browser.close();
console.log(`og: ${n} images`);
