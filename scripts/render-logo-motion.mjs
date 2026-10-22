// Renders the Builder Loop v3 motion (brand/builder-loop/motion) for the logo's 0, which plays it once when
// clicked, and works out how far the letters either side of the 0 must move so the moving pieces never
// overlap them.
//
// Frames come from the pack's own renderer with the adapter's settings (no background, trails on, full
// quality), drawn by Chromium, so they match the approved motion; only the framing is cropped to where
// it moves. They go into one sprite sheet (public/brand/sud0ops-logo-motion.webp), and the timeline goes
// into src/components/ui/logo-motion.generated.ts: per 30 fps tick, the frame to show and the letter
// offsets. The page plays both on one clock, so the letters stay in step with the pieces.
//
// Not part of the build. Needs Node 22.18+ (it reads the glyphs from TypeScript) and Playwright with
// Chromium. Run from the repo root:
//   NODE_PATH="$(npm root -g)" node scripts/render-logo-motion.mjs
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import sharp from "sharp";
import { BOX, TIMES, renderFrame, sample } from "../brand/builder-loop/motion/src/motion.mjs";
import { OPS, SUD, ZERO } from "../src/components/ui/logo-glyphs.ts";

const MOTION_BOX = [-220, -70, 1140, 1030]; // icon units, holds every frame of the motion
const PX_PER_UNIT = 0.1; // about 3x the size the 0 is drawn at in the header
const FPS = 30;
const REST_TICKS = 2 * FPS; // the still zero between plays: 2 seconds
const COLUMNS = 10;
// Letter movement: start LEAD ticks before the pieces arrive, stay out HOLD ticks after they leave
// (so the letters do not twitch while the infinity circulates), and ease with a triangular kernel of
// radius LEAD. A kernel no wider than LEAD and HOLD keeps every eased offset at or above what the
// pieces need, so nothing overlaps on any tick.
const LEAD = 8;
const HOLD = 10;
const SOLID = 96; // alpha (of 255) that counts as material; fainter trail edges may pass behind letters

const { chromium } = createRequire(import.meta.url)("playwright");
const width = Math.round(MOTION_BOX[2] * PX_PER_UNIT);
const height = Math.round(MOTION_BOX[3] * PX_PER_UNIT);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
const options = { background: false, trails: true, quality: "full", history: (t) => sample(t), idPrefix: "blv3" };

async function frame(t) {
    const svg = renderFrame(sample(t), options)
        .replace('width="720" height="720"', `width="${width}" height="${height}"`)
        .replace(`viewBox="${BOX.join(" ")}"`, `viewBox="${MOTION_BOX.join(" ")}"`);
    await page.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);
    return page.screenshot({ omitBackground: true });
}

// Vertical extent of the letters next to the 0 ("d" on the left, "o" on the right), in icon units.
async function band([x, d]) {
    await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
    const box = await page.evaluate(() => {
        const { y, height } = document.querySelector("path").getBBox();
        return { y, height };
    });
    const toIcon = (wordmarkY) => (wordmarkY - ZERO.y) / ZERO.sy + ZERO.oy;
    // Glyphs are drawn with scale(1 -1), so font-unit y flips.
    return { x, top: toIcon(-(box.y + box.height)), bottom: toIcon(-box.y) };
}
const bands = { left: await band(SUD[2]), right: await band(OPS[0]) };

// Before TIMES.hold and from TIMES.lock on, the one-shot shows the exact still zero, so those
// stretches fold into the single rest frame (cell 0).
const frames = [await frame(0)];
for (let k = 1; TIMES.hold + k / FPS < TIMES.lock; k++) frames.push(await frame(TIMES.hold + k / FPS));
await browser.close();

// Leftmost and rightmost solid column of each frame within a letter's vertical band.
async function extent(png, { top, bottom }) {
    const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
    const rowFrom = Math.max(0, Math.floor((top - MOTION_BOX[1]) * PX_PER_UNIT));
    const rowTo = Math.min(info.height - 1, Math.ceil((bottom - MOTION_BOX[1]) * PX_PER_UNIT));
    let min = Infinity;
    let max = -Infinity;
    for (let y = rowFrom; y <= rowTo; y++) {
        for (let x = 0; x < info.width; x++) {
            if (data[(y * info.width + x) * info.channels + 3] >= SOLID) {
                min = Math.min(min, x);
                max = Math.max(max, x);
            }
        }
    }
    return { min, max };
}
const leftExtents = await Promise.all(frames.map((png) => extent(png, bands.left)));
const rightExtents = await Promise.all(frames.map((png) => extent(png, bands.right)));

// How far each side must move on each tick (font units), relative to the still zero's own spacing.
const unit = ZERO.sx / PX_PER_UNIT;
const ticks = REST_TICKS + frames.length - 1;
const cellAt = (tick) => Math.max(0, tick - REST_TICKS + 1);
const need = (side) =>
    Array.from({ length: ticks }, (_, tick) => {
        const extents = side === "left" ? leftExtents : rightExtents;
        const shift = side === "left" ? extents[0].min - extents[cellAt(tick)].min : extents[cellAt(tick)].max - extents[0].max;
        return Math.max(0, shift * unit);
    });

const at = (values, i) => values[((i % ticks) + ticks) % ticks];
function ease(required) {
    const envelope = required.map((_, i) => Math.max(...Array.from({ length: LEAD + HOLD + 1 }, (_, j) => at(required, i - HOLD + j))));
    const kernel = Array.from({ length: 2 * LEAD + 1 }, (_, j) => LEAD + 1 - Math.abs(j - LEAD));
    const total = kernel.reduce((a, b) => a + b, 0);
    return envelope.map((_, i) => Math.ceil(kernel.reduce((sum, w, j) => sum + w * at(envelope, i - LEAD + j), 0) / total));
}
// The letters finish closing in during the still zero, so start the loop on the first tick where both
// sides are home: playback then begins from rest instead of jumping to a half-open spread.
const leftEased = ease(need("left"));
const rightEased = ease(need("right"));
const start = leftEased.findIndex((x, tick) => x === 0 && rightEased[tick] === 0);
const fromStart = (values) => [...values.slice(start), ...values.slice(0, start)];
const cells = fromStart(Array.from({ length: ticks }, (_, tick) => cellAt(tick)));
const left = fromStart(leftEased);
const right = fromStart(rightEased);

const rows = Math.ceil(frames.length / COLUMNS);
const sheet = await sharp({ create: { width: width * COLUMNS, height: height * rows, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(frames.map((input, i) => ({ input, left: (i % COLUMNS) * width, top: Math.floor(i / COLUMNS) * height })))
    .png()
    .toBuffer();
const info = await sharp(sheet)
    .webp({ quality: 70, alphaQuality: 40, effort: 6 })
    .toFile(new URL("../public/brand/sud0ops-logo-motion.webp", import.meta.url).pathname);

writeFileSync(
    new URL("../src/components/ui/logo-motion.generated.ts", import.meta.url),
    `// Generated by scripts/render-logo-motion.mjs. Do not edit.
// The sprite holds the still zero (cell 0) and then each frame of the Builder Loop motion, ${COLUMNS} per row.
export const MOTION_SPRITE = { src: "/brand/sud0ops-logo-motion.webp", width: ${width * COLUMNS}, height: ${height * rows}, columns: ${COLUMNS}, rows: ${rows} };
// Area each cell covers, in icon units.
export const MOTION_BOX = ${JSON.stringify(MOTION_BOX)};
export const MOTION_TICK_MS = 1000 / ${FPS};
// One loop, per tick: the sprite cell to show (${REST_TICKS} ticks of the still zero per loop), and how far
// (font units) the letters left and right of the 0 move outwards. The loop starts with both sides home.
export const MOTION_FRAMES = ${JSON.stringify(cells)};
export const MOTION_LEFT = ${JSON.stringify(left)};
export const MOTION_RIGHT = ${JSON.stringify(right)};
`,
);
console.log(`Logo motion: ${frames.length} frames, ${width}x${height} cells, sprite ${Math.round(info.size / 1024)} KB`);
console.log(`Letters move out up to ${Math.max(...left)} (left) and ${Math.max(...right)} (right) font units`);
