/**
 * Copies the supplied photos into public/images at web sizes.
 * Usage: node scripts/optimise-images.mjs "<folder with the supplied photos>"
 * next/image then serves AVIF/WebP variants at the size each layout needs.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Pass the source folder, e.g. node scripts/optimise-images.mjs C:/Users/me/Desktop/rean");

const out = path.resolve("public/images");
const jobs = [
  // Portraits: the PNG set in hd/ (same 1122x1402 shots as the WhatsApp copies, without the extra JPEG pass).
  ["hd/3.png", "portrait-standing.jpg", 1400],
  ["hd/2.png", "portrait-seated.jpg", 1400],
  ["hd/4.png", "portrait-pointing.jpg", 1400],
  ["hd/5.png", "portrait-side.jpg", 1400],
  ["New folder/IMG_0787.JPG", "summit-speaking.jpg", 1800],
  ["New folder/IMG_0785.JPG", "summit-audience.jpg", 1800],
  // Inner page heroes: full-width banners, so wide, high-resolution shots only.
  ["New folder/IMG_0787.JPG", "banner-plan.jpg", 2400],
  ["New folder/IMG_0782.JPG", "banner-100days.jpg", 2400],
  ["New folder/IMG_0778.JPG", "banner-accountability.jpg", 2400],
  ["New folder/IMG_0775.JPG", "banner-about.jpg", 2400],
  ["New folder/IMG_0780.JPG", "banner-involved.jpg", 2400],
  // About biography photo (native attire).
  ["New folder/IMG_0789.JPG", "about-native.jpg", 1400],
  // Home photo strip.
  ["New folder/IMG_0801.JPG", "strip-native-full.jpg", 1000],
  ["New folder/IMG_0784.JPG", "strip-seated-mic.jpg", 1000],
  ["New folder/IMG_0790.JPG", "strip-wave.jpg", 1000],
  ["New folder/IMG_0776.JPG", "strip-group-stage.jpg", 1000],
  ["New folder/IMG_0796.JPG", "strip-colleagues.jpg", 1000],
];

await mkdir(out, { recursive: true });
for (const [from, to, max] of jobs) {
  const info = await sharp(path.join(src, from))
    .rotate()
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(out, to));
  console.log(`${to}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
