# v3.1 - official loader, amber centre dot

Approved as the official Sud0ops loader. The centre circle is amber (`#FFB800`), matching brand v1.1; the four pieces and their trails stay blue. `OPEN-MOTION.html` was rebuilt from `src/` with `scripts/build-demo.py`, and the MP4, GIF and WebP exports were re-rendered with the settings of `scripts/export.py` (frames captured with Node Playwright, encoded with Pillow and ffmpeg). The QA screenshots in `qa/` are from v3 and still show the blue dot.

# v3 - spiral motion review build

Replaces the earlier animation proof, but does not change the static branding.

Implemented a faster release, explicit outward and inward spiral stages, stronger directional motion trails, independently bending material outlines and staggered reassembly. Removed the earlier slow inflate/deflate emphasis. Preserved the original blue centre circle and the four original master paths in the locked states.

The interactive demo, video and image exports use the same SVG geometry renderer. Their first and final rendered pixels match. The approved storyboard is included beside actual rendered frames to prevent confusing concept illustrations with implemented output.

Recorded checks: numerical geometry and completion-state tests; Chromium lifecycle, reduced-motion and 390px layout checks. Remaining: user visual approval, actual-site integration, Safari/Firefox and device-specific performance.

No production deployment or repository changes were performed.
