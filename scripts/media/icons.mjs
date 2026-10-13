// Favicons and app icons from the memoji: npm run media:icons
// The memoji sits inside a dark disc with a safety margin, so Google's circular crop never cuts the face.
// Sizes follow Google's favicon guidance (square, multiples of 48 px) plus a separate maskable icon.
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "../..");
const pub = join(root, "public");
const face = await sharp(join(root, "src/assets/portraits/memoji.png")).trim().toBuffer();

const bg = (size, round) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs><radialGradient id="g" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#2c2c31"/><stop offset="1" stop-color="#121214"/></radialGradient></defs>
  ${round ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#g)"/>` : `<rect width="${size}" height="${size}" fill="url(#g)"/>`}</svg>`);

/** @param {number} size @param {number} ratio memoji height relative to the canvas @param {boolean} round */
async function icon(size, ratio, round) {
  const h = Math.round(size * ratio);
  const m = await sharp(face).resize({ height: h }).toBuffer({ resolveWithObject: true });
  return sharp(bg(size, round))
    .composite([{ input: m.data, left: Math.round((size - m.info.width) / 2), top: Math.round((size - h) / 2 + size * 0.02) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** ICO container with embedded PNGs (supported by every current browser). */
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size % 256, e);
    head.writeUInt8(size % 256, e + 1);
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(data.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map((i) => i.data)]);
}

const favs = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await icon(size, 0.72, true) })));
writeFileSync(join(pub, "favicon.ico"), ico(favs));
for (const size of [96, 192, 512]) writeFileSync(join(pub, `icon-${size}.png`), await icon(size, 0.66, true));
writeFileSync(join(pub, "icon-maskable-512.png"), await icon(512, 0.56, false)); // inside the 80% safe zone
writeFileSync(join(pub, "apple-touch-icon.png"), await icon(180, 0.66, false)); // iOS rounds the corners itself

for (const [f, s] of [["icon-96.png", 96], ["icon-192.png", 192], ["icon-512.png", 512], ["icon-maskable-512.png", 512], ["apple-touch-icon.png", 180]]) {
  const meta = await sharp(join(pub, f)).metadata();
  assert.equal(meta.width, s, f);
  assert.equal(meta.height, s, f);
}
console.log("icons ok");
