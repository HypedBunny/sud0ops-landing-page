> **Stored in the repo as the source of the header logo's motion.** The site does not run these modules
> in the browser: the official renderer costs about 34 ms of script per frame, too much for a header that
> loops forever. Instead `scripts/render-logo-motion.mjs` renders the one-shot with `src/motion.mjs`
> (adapter settings: no background, trails on, full quality) into a sprite,
> `public/brand/sud0ops-logo-motion.webp`, and measures how far the pieces reach on every frame. The
> header plays it on a loop (a 2-second still zero, then the motion) while ">Sud" and "ops_" slide
> outwards just far enough to keep clear of the pieces. Reduced-motion visitors and the footer get the
> static zero.

# Sud0ops Builder Loop - spiral motion v3

**Motion review build, based on the approved v3 storyboard.**

This is a replacement for the earlier motion proof, NOT a replacement for the static brand identity. The original four-piece blue zero and centre dot are unchanged. The previous amber-arrow concept does not belong to this icon.

## Start here

Watch `exports/builder-loop-spiral-v3.mp4`, or open `OPEN-MOTION.html` in a browser. The HTML file is self-contained: there are no network requests, fonts to install, build steps or third-party animation runtimes.

The demo provides Replay, Keep loading, Finish loading, Pause, a timeline scrubber, a 0.35x slow-motion option and a motion-blur toggle. The toggle is for inspection; motion blur is enabled in the intended full-quality treatment. System reduced-motion preferences show the static logo instead.

## What changed

- Faster, angular detachment instead of a slow separation.
- An outward spiral with four individually deforming material sections.
- Time-sampled, softened directional trails on the moving pieces only.
- A clear figure-eight made from the bending parts themselves.
- A separate inward spiral, followed by slightly staggered individual landings.
- The centre circle remains at `(349,443)`, radius `67`, sharp and unchanged.

The live figure-eight is still an SVG implementation of the visual idea; the storyboard is a design reference, not an original motion file. The animation needs your visual sign-off before an agent deploys it. Numerical checks do not prove visual fidelity.

## Contents

| File or folder | Purpose |
|---|---|
| `OPEN-MOTION.html` | Self-contained interactive preview |
| `exports/builder-loop-spiral-v3.mp4` | 720 x 720, 30 fps, 6.40-second one-shot, dark background |
| `exports/builder-loop-spiral-v3.gif` | 540 x 540, one-shot preview, dark background; stops at the zero |
| `exports/builder-loop-spiral-v3.webp` | 540 x 540 one-shot animated WebP, dark background |
| `exports/infinity-loading-v3.gif` | Repeatable middle phase only; not a complete introduction/exit |
| `src/motion.mjs` | Deterministic geometry and SVG renderer |
| `src/loader.mjs` | Client-side, event-driven adapter |
| `src/approved-geometry.mjs`, `src/rig.mjs` | Existing source contours and their material-coordinate rig |
| `reference/unchanged-static-master.svg` | Unmodified master copied from the previous static pack |
| `reference/approved-storyboard-v3.png` | Approved aggressive-detach / spiral / blur reference |
| `reference/rendered-sequence.png` | Actual rendered frames, not a concept illustration |
| `guides/AGENT-HANDOVER.md` | Implementation instructions to give your coding agent |
| `qa/` | Numerical tests, browser checks and their limitations |

The media files have an opaque dark background. The live SVG can render transparently onto your site's background. MP4/GIF are review and marketing assets, not event-driven loaders.

## Minimal integration

Copy the four `.mjs` files from `src/` together. Use the adapter in a client-side lifecycle:

```js
import { createBuilderLoopLoader } from './motion/loader.mjs';

const loader = createBuilderLoopLoader(document.querySelector('#loader'), {
  mode: 'loading',
  size: 240,
  trails: true,
  quality: 'full',
  onComplete() {
    // Optional: remove a purely visual loading treatment after its return.
    // This callback says only that the animation ended, not that work succeeded.
  }
});

// Call this from your real application's settled loading state:
loader.complete();

// Call on component/view disposal:
loader.destroy();
```

Do not run the example's `complete()` immediately in real use; wire it to actual work finishing. The full example and integration constraints are in the agent handover.

Use `mode:'once'` for a one-shot brand introduction. Use `mode:'loading'` for a real task: the middle repeats until `.complete()` is called, then returns in approximately 1.16 seconds. Very early completion or reduced motion shows the static zero without an unnecessary full cycle.

## Validation and rebuild

```sh
node qa/check-geometry.mjs
python scripts/build-demo.py
```

The supplied checks cover the fixed dot, four pieces, exact master at start/end, numerical completion from 15 different states, loop periodicity, browser lifecycle and a 390px layout. The supplied browser results are Chromium on Linux; Safari, Firefox, the user's actual application and device-specific performance still need validation.

No changes have been made to sud0ops.com. No font files are included.
