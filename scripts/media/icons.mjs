// Renders the JR mark with the brand font, then exports favicon/app icons.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const pub = join(root, "public");
const font = readFileSync(join(root, "src/assets/fonts/archivo.woff2")).toString("base64");
const mark = (size, radius) => `<html><head><style>@font-face{font-family:A;src:url(data:font/woff2;base64,${font});font-weight:100 900;font-stretch:62% 125%}
body{margin:0}div{width:${size}px;height:${size}px;background:#FF4F1A;border-radius:${radius}px;display:grid;place-items:center;font:820 ${size * 0.5}px/1 A;font-stretch:80%;letter-spacing:-.04em;color:#0F1011}</style></head><body><div>JR</div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 512, height: 512 } });
await p.setContent(mark(512, 0));
await p.evaluate(() => document.fonts.ready);
const square = await p.screenshot({ clip: { x: 0, y: 0, width: 512, height: 512 } });
await p.setContent(mark(512, 64).replace("body{margin:0}", "body{margin:0;background:transparent}"));
await p.evaluate(() => document.fonts.ready);
const rounded = await p.screenshot({ clip: { x: 0, y: 0, width: 512, height: 512 }, omitBackground: true });
await b.close();
await sharp(square).resize(180).png().toFile(join(pub, "apple-touch-icon.png"));
await sharp(rounded).resize(192).png().toFile(join(pub, "icon-192.png"));
await sharp(square).resize(512).png().toFile(join(pub, "icon-512.png"));
await sharp(rounded).resize(32).png().toFile("/tmp/fav32.png");
execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", "/tmp/fav32.png", join(pub, "favicon.ico")]);
// Vector favicon: system font fallback is acceptable at 16 px.
writeFileSync(join(pub, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#FF4F1A"/><text x="16" y="21.5" text-anchor="middle" font-family="Archivo,Arial Narrow,Arial,sans-serif" font-weight="800" font-size="14" letter-spacing="-.6" fill="#0F1011">JR</text></svg>\n`);
console.log("icons ok");
