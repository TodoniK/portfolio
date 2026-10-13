// Renders a 1200x630 Open Graph image for every built page, from its own <title>, into public/og/<slug>.jpg
// (slug matches Base.astro). Images are committed: the Workers Builds image has no Chromium.
// Project images reuse the real ProjectThumb markup and CSS from the built /projects page, so they always match the site.
// Run `npm run media:og` after adding a page or changing a title; existing images are kept (delete one to redo it).
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, mkdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const dist = join(root, "dist");
const out = join(root, "public", "og");
mkdirSync(out, { recursive: true });
const memoji = `data:image/png;base64,${readFileSync(join(root, "src/assets/portraits/memoji.png")).toString("base64")}`;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".html") ? [join(d, f)] : []));
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, bypassCSP: true, reducedMotion: "reduce" });
const page = await ctx.newPage();
// Serve dist/ under a fake origin so absolute /_astro/* URLs resolve.
await page.route("http://og.local/**", (route) => {
  const p = join(dist, decodeURIComponent(new URL(route.request().url()).pathname));
  const file = existsSync(p) && statSync(p).isFile() ? p : `${p.replace(/\/$/, "")}.html`;
  return existsSync(file) ? route.fulfill({ path: file }) : route.fulfill({ status: 404 });
});

let n = 0;
for (const file of walk(dist)) {
  const html = readFileSync(file, "utf8");
  const og = html.match(/property="og:image" content="[^"]*\/og\/([^"]+)\.jpg"/)?.[1];
  // noindex pages (404) borrow another page's image and must not overwrite it
  if (!og || /name="robots" content="noindex/.test(html) || existsSync(join(out, `${og}.jpg`))) continue;
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "Jules Royet").replace(/\s*\|\s*Jules Royet$/, "").replace(/^Jules Royet \|\s*/, "");
  const path = "/" + relative(dist, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  const project = path.match(/projects\/([\w-]+)$/)?.[1];
  await page.goto("http://og.local/projects", { waitUntil: "load" });
  await page.evaluate(({ title, path, project, memoji }) => {
    const thumb = project ? document.querySelector(`[data-thumb="${project}"]`)?.outerHTML ?? "" : "";
    const style = document.createElement("style");
    style.textContent = `
      html,body{width:1200px;height:630px;margin:0;overflow:hidden;background:#0a0a0b}
      .og{position:relative;width:1200px;height:630px;overflow:hidden;color:#f5f5f7;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
      .og::before{content:"";position:absolute;inset:-200px -100px 300px;filter:blur(60px);opacity:.75;
        background:radial-gradient(35% 60% at 20% 30%,rgb(0 144 247/.55),transparent 70%),radial-gradient(35% 60% at 55% 20%,rgb(186 98 252/.5),transparent 70%),radial-gradient(35% 60% at 85% 30%,rgb(242 65 107/.45),transparent 70%)}
      .c{position:absolute;left:72px;top:64px;bottom:64px;width:${thumb ? 560 : 1000}px;display:flex;flex-direction:column;justify-content:space-between}
      .k{display:flex;align-items:center;gap:16px;font-size:24px;font-weight:500;color:#a1a1a6}.k img{width:56px;height:56px}
      h1{font-size:${title.length > 44 ? 56 : 68}px;font-weight:600;line-height:1.05;letter-spacing:-.04em;margin:0}
      .f{font-size:22px;font-weight:500;color:#a1a1a6}.f b{background:linear-gradient(90deg,#0090f7,#ba62fc,#f2416b);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:600}
      .t{position:absolute;right:64px;top:50%;width:480px;transform:translateY(-50%);padding:10px;border-radius:26px;background:#141416;border:1px solid rgb(255 255 255/.1);box-shadow:0 40px 80px -30px rgba(0,0,0,.8)}`;
    document.head.append(style);
    const e = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    document.body.innerHTML = `<div class="og"><div class="c"><p class="k"><img src="${memoji}" alt="">julesroyet.dev${e(path === "/" ? "" : path)}</p><h1>${e(title)}</h1><p class="f"><b>Jules Royet</b> · Cloud &amp; DevOps · AI systems</p></div>${thumb ? `<div class="t">${thumb}</div>` : ""}</div>`;
  }, { title, path, project, memoji });
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
  await page.screenshot({ path: join(out, `${og}.jpg`), type: "jpeg", quality: 82 });
  n++;
}
await browser.close();
console.log(`og: ${n} images`);
