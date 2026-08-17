/**
 * Generates the complete favicon set from `app/icon.svg`:
 *   - app/favicon.ico   (16 / 32 / 48 px — legacy browsers)
 *   - app/apple-icon.png (180 × 180 px — iOS home screen)
 *
 * Run: npm run generate:icons  (requires sharp, declared in devDependencies)
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "app");
const svg = await readFile(path.join(appDir, "icon.svg"), "utf8");

/** Rasterize the SVG crisply by supersampling with `density`. */
const rasterize = (size) =>
  sharp(Buffer.from(svg), { density: 400 }).resize(size, size).png().toBuffer();

/* ------------------------------------------------------------------ */
/*  apple-icon.png                                                     */
/* ------------------------------------------------------------------ */
await sharp(Buffer.from(svg), { density: 400 })
  .resize(180, 180)
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));
console.log("✓ app/apple-icon.png (180×180)");

/* ------------------------------------------------------------------ */
/*  favicon.ico (ICO container holding PNG-encoded frames)             */
/* ------------------------------------------------------------------ */
const sizes = [16, 32, 48];
const frames = [];
for (const size of sizes) {
  frames.push({ size, data: await rasterize(size) });
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(frames.length, 4); // image count

const entrySize = 16;
const entries = [];
const payloads = [];
let offset = 6 + frames.length * entrySize;
for (const frame of frames) {
  const entry = Buffer.alloc(entrySize);
  entry.writeUInt8(frame.size >= 256 ? 0 : frame.size, 0); // width  (0 = 256)
  entry.writeUInt8(frame.size >= 256 ? 0 : frame.size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // palette entries (0 = none)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(frame.data.length, 8); // bytes in resource
  entry.writeUInt32LE(offset, 12); // image data offset
  entries.push(entry);
  payloads.push(frame.data);
  offset += frame.data.length;
}

await writeFile(
  path.join(appDir, "favicon.ico"),
  Buffer.concat([header, ...entries, ...payloads])
);
console.log("✓ app/favicon.ico (16/32/48)");
