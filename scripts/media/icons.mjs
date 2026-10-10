// Favicons and app icons from the memoji.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join, resolve } from "node:path";
const root = resolve(import.meta.dirname, "../..");
const pub = join(root, "public");
const src = join(root, "src/assets/portraits/memoji.png");
const onWhite = async (size, pad) => sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
  .composite([{ input: await sharp(src).resize(size - pad * 2).toBuffer(), top: pad, left: pad }]).png();
await (await onWhite(180, 14)).toFile(join(pub, "apple-touch-icon.png"));
await (await onWhite(512, 60)).toFile(join(pub, "icon-512.png"));
await sharp(src).resize(192).png().toFile(join(pub, "icon-192.png"));
await sharp(src).resize(32).png().toFile("/tmp/fav32.png");
execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", "/tmp/fav32.png", join(pub, "favicon.ico")]);
rmSync(join(pub, "favicon.svg"), { force: true });
console.log("icons ok");
