/**
 * Asset processor: crop intro footer, flood-fill dark backgrounds to transparency.
 * Run: node scripts/process-png-assets.mjs
 * Requires: npm install sharp (dev-time)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsRoot = path.join(root, "public", "assets");

const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

function distRgb(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/** Average RGB along all four image edges (outer 3px strip). */
function sampleEdgeBg(data, width, height, channels) {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const strip = 3;

  const sample = (x, y) => {
    const i = (y * width + x) * channels;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n += 1;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const onEdge =
        x < strip ||
        x >= width - strip ||
        y < strip ||
        y >= height - strip;
      if (onEdge) sample(x, y);
    }
  }

  return { r: r / n, g: g / n, b: b / n };
}

function pixelMetrics(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return { sat, lum };
}

function isBgLike(r, g, b, bg, opts) {
  const { sat, lum } = pixelMetrics(r, g, b);
  const d = distRgb(r, g, b, bg.r, bg.g, bg.b);
  if (d < opts.colorDist) return true;
  if (lum < opts.maxLum && sat < opts.maxSat) return true;
  return false;
}

/** Flood-fill from border: only removes background connected to image edges. */
function floodRemoveEdgeBackground(data, width, height, channels, bg, opts) {
  const size = width * height;
  const visited = new Uint8Array(size);
  const queue = new Int32Array(size);
  let head = 0;
  let tail = 0;

  const tryPush = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * channels;
    if (!isBgLike(data[i], data[i + 1], data[i + 2], bg, opts)) return;
    visited[idx] = 1;
    queue[tail++] = idx;
  };

  for (let x = 0; x < width; x++) {
    tryPush(x, 0);
    tryPush(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y);
    tryPush(width - 1, y);
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) tryPush(x - 1, y);
    if (x < width - 1) tryPush(x + 1, y);
    if (y > 0) tryPush(x, y - 1);
    if (y < height - 1) tryPush(x, y + 1);
  }

  for (let idx = 0; idx < size; idx++) {
    if (!visited[idx]) continue;
    const i = idx * channels;
    data[i + 3] = 0;
  }

  // Soft fringe on pixels still close to bg (anti-aliased edges)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (visited[idx]) continue;
      const i = idx * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const d = distRgb(r, g, b, bg.r, bg.g, bg.b);
      const { sat, lum } = pixelMetrics(r, g, b);
      if (d < opts.fringeDist && lum < opts.fringeLum) {
        const alpha = Math.round(((d - opts.colorDist) / (opts.fringeDist - opts.colorDist)) * 255);
        data[i + 3] = Math.min(data[i + 3] ?? 255, Math.max(0, Math.min(255, alpha)));
      } else if (lum < opts.fringeLum && sat < opts.maxSat) {
        const alpha = Math.round(((lum - 40) / 30) * 200);
        data[i + 3] = Math.min(data[i + 3] ?? 255, Math.max(0, Math.min(255, alpha)));
      }
    }
  }
}

const PRESETS = {
  icon: { colorDist: 78, fringeDist: 118, maxLum: 118, fringeLum: 128, maxSat: 0.45 },
  card: { colorDist: 68, fringeDist: 105, maxLum: 100, fringeLum: 112, maxSat: 0.4 },
  intro: { colorDist: 58, fringeDist: 95, maxLum: 92, fringeLum: 108, maxSat: 0.36 },
};

async function processFile(sharp, filePath, presetKey) {
  const opts = PRESETS[presetKey] ?? PRESETS.icon;
  const img = sharp(filePath);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const bg = sampleEdgeBg(data, info.width, info.height, info.channels);
  floodRemoveEdgeBackground(data, info.width, info.height, info.channels, bg, opts);

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(filePath);

  console.log(`  OK ${path.relative(root, filePath)}`);
}

async function cropIntroFooter(sharp, filePath) {
  const meta = await sharp(filePath).metadata();
  // Only crop the full exported intro (~1672px). Already-cropped files are left alone.
  if (meta.height < 1550) {
    console.log(`  Skip intro crop (${meta.height}px)`);
    return;
  }
  // Remove bottom ~32% where baked-in "시작하기 / 자세히 보기" buttons live.
  const cropH = Math.floor(meta.height * 0.68);
  const tmp = filePath + ".tmp";
  await sharp(filePath)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .png()
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
  console.log(`  Cropped intro footer (${meta.height} -> ${cropH}px)`);
}

async function main() {
  const sharp = (await import("sharp")).default;

  const introPath = path.join(assetsRoot, "intro", "pause-pet-intro-screen.png");
  if (fs.existsSync(introPath)) {
    console.log("Intro:");
    await cropIntroFooter(sharp, introPath);
    await processFile(sharp, introPath, "intro");
  }

  for (const sign of SIGNS) {
    const card = path.join(assetsRoot, "zodiac", "cards", `${sign}_card.png`);
    const icon = path.join(assetsRoot, "zodiac", "icons", `${sign}_icon.png`);
    if (fs.existsSync(card)) await processFile(sharp, card, "card");
    if (fs.existsSync(icon)) await processFile(sharp, icon, "icon");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
