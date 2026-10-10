// Renders deterministic motion loops: Playwright seeks each frame, ffmpeg encodes WebM (AV1) + MP4 (H.264).
// Usage: node scripts/media/video.mjs [scene...]   (defaults to all). Writes public/video/* and src/data/videos.json.
import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "../..");
const out = join(root, "public/video");
const posters = join(root, "src/assets/video");
const manifestPath = join(root, "src/data/videos.json");
const FPS = 30;
const JOBS = [
  { id: "hero-16x9", scene: "hero", w: 1920, h: 1080, dur: 8 },
  { id: "hero-9x16", scene: "hero", w: 1080, h: 1920, dur: 8 },
  { id: "cloud", scene: "cloud", w: 960, h: 720, dur: 6 },
  { id: "ai", scene: "ai", w: 960, h: 720, dur: 6 },
  { id: "software", scene: "software", w: 960, h: 720, dur: 6 },
];
const only = process.argv.slice(2);
const jobs = only.length ? JOBS.filter((j) => only.includes(j.id) || only.includes(j.scene)) : JOBS;

mkdirSync(out, { recursive: true });
mkdirSync(posters, { recursive: true });
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const browser = await chromium.launch();
const ff = (args) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const hash = (f) => createHash("sha256").update(readFileSync(f)).digest("hex").slice(0, 8);

for (const job of jobs) {
  const dir = join(tmpdir(), `motion-${job.id}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h }, deviceScaleFactor: 1 });
  await page.goto(`file://${join(root, "scripts/media/stage/motion.html")}?scene=${job.scene}&w=${job.w}&h=${job.h}&dur=${job.dur}`);
  await page.waitForFunction(() => window.READY);
  const frames = job.dur * FPS;
  for (let i = 0; i < frames; i++) {
    const data = await page.evaluate((t) => window.frame(t), i / FPS);
    writeFileSync(join(dir, `f${String(i).padStart(4, "0")}.jpg`), Buffer.from(data.split(",")[1], "base64"));
  }
  await page.close();
  await sharp(join(dir, "f0000.jpg")).png().toFile(join(posters, `${job.id}.png`));

  for (const f of readdirSync(out).filter((f) => f.startsWith(`${job.id}.`))) unlinkSync(join(out, f));
  const seq = ["-framerate", String(FPS), "-i", join(dir, "f%04d.jpg")];
  const webm = join(dir, "v.webm");
  const mp4 = join(dir, "v.mp4");
  ff([...seq, "-c:v", "libsvtav1", "-preset", "5", "-crf", "42", "-pix_fmt", "yuv420p", "-g", "240", "-an", webm]);
  ff([...seq, "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart", "-an", mp4]);
  const entry = { w: job.w, h: job.h, dur: job.dur };
  for (const [ext, src] of [["webm", webm], ["mp4", mp4]]) {
    const name = `${job.id}.${hash(src)}.${ext}`;
    execFileSync("cp", [src, join(out, name)]);
    entry[ext] = `/video/${name}`;
    entry[`${ext}Bytes`] = readFileSync(src).length;
  }
  manifest[job.id] = entry;
  console.log(job.id, `webm ${(entry.webmBytes / 1024).toFixed(0)} KB`, `mp4 ${(entry.mp4Bytes / 1024).toFixed(0)} KB`);
  rmSync(dir, { recursive: true, force: true });
}
await browser.close();
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
