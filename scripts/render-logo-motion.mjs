// Renders the Builder Loop v3 motion (brand/builder-loop/motion) into the looping animated WebP the
// header plays behind its 0: a 2-second still zero, then the one-shot at 30 fps. Frames come from the
// pack's own renderer with the adapter's settings (no background, trails on, full quality), drawn by
// Chromium, so the image matches the approved motion; only the framing is cropped to where it moves.
//
// Not part of the build. Needs Playwright with Chromium, then run from the repo root:
//   NODE_PATH="$(npm root -g)" node scripts/render-logo-motion.mjs
import { createRequire } from "node:module";
import sharp from "sharp";
import { BOX, TIMES, renderFrame, sample } from "../brand/builder-loop/motion/src/motion.mjs";

// Keep MOTION_BOX in sync with src/components/ui/logo-glyphs.ts, which places the image over the 0.
const MOTION_BOX = [-220, -70, 1140, 1030]; // icon units, holds every frame of the motion
const PX_PER_UNIT = 0.1; // about 3x the size the 0 is drawn at in the header
const FPS = 30;
const REST_MS = 2000;
const OUT = new URL("../public/brand/sud0ops-logo-motion.webp", import.meta.url);

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

// Before TIMES.hold and from TIMES.lock on, the one-shot shows the exact still zero, so those
// stretches fold into the single rest frame at the start of the loop.
const frames = [await frame(0)];
const delay = [REST_MS];
for (let k = 1; TIMES.hold + k / FPS < TIMES.lock; k++) {
    frames.push(await frame(TIMES.hold + k / FPS));
    delay.push(Math.round((k * 1000) / FPS) - Math.round(((k - 1) * 1000) / FPS));
}
await browser.close();

const info = await sharp(frames, { join: { animated: true } })
    .webp({ quality: 70, alphaQuality: 40, effort: 6, loop: 0, delay })
    .toFile(OUT.pathname);
console.log(`Logo motion: ${frames.length} frames, ${width}x${height}, ${Math.round(info.size / 1024)} KB`);
