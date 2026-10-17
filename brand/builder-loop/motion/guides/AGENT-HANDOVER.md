# Agent handover - Sud0ops Builder Loop v3

You are integrating an approved visual direction, not designing a new logo.

## Approval boundary

The user approved the aggressive-detach, spiral and directional-blur storyboard in `reference/approved-storyboard-v3.png`. This package is the corresponding **motion review implementation**. Do not treat its test reports as the user's visual approval. Show the actual animation and obtain that approval before production deployment. Do not deploy merely because the storyboard was approved.

The previous animated-brand-pack and correction-proof engines are superseded for this motion revision. Keep the existing static brand assets unchanged. Use only this package's four source modules together; do not mix their geometry or renderer with earlier versions.

## Essential visual requirements

1. Begin and end with the exact paths in `reference/unchanged-static-master.svg`. Four blue outer pieces and one blue dot. No attached amber chevron.
2. Detach with angular momentum and outward movement, not a slow dissolve or rigid floating tiles.
3. The actual outlines flex into curved material. The pieces form the infinity symbol themselves; they do not orbit a separately drawn infinity icon.
4. Use the spiral release, directional trails and inward spiral return. Do not replace them with generic CSS rotation or a simple two-shape interpolation.
5. Blur the moving material only. The centre dot must never move, pulse, rotate, change radius or inherit the blur.
6. Preserve separate material identities and travelling seams. Return the four pieces to their individual source positions, then stop cleanly on the original zero.
7. Keep `trails:true` and `quality:'full'` for the reference treatment. The low-quality setting uses fewer temporal samples; it is a performance fallback, not a visually identical output. Benchmark before using it and request approval for meaningful visual changes.
8. Do not add a dark halo around the centre, an amber arrow, a new typeface, particles, sound or an unrelated page redesign.

## First inspect the repository

Find the framework, existing logo component, loading lifecycle, responsive layout, CSS/CSP rules, accessibility conventions and existing animation runtimes. Make the smallest maintainable change. Do not install a new animation library. Do not replace an existing application loading state with a fake timeout.

## Files to copy

Copy these modules together, preserving relative imports:

- `src/approved-geometry.mjs`
- `src/rig.mjs`
- `src/motion.mjs`
- `src/loader.mjs`

Use `createBuilderLoopLoader()` in a client-only lifecycle. Imports themselves contain no browser side effects; calling the adapter requires a browser DOM. A React/Vue/Svelte wrapper should own a stable host element and one adapter instance, call `.complete()` when the real loading state ends, and call `.destroy()` on unmount.

Do not copy `OPEN-MOTION.html` into a component. That file is the standalone review UI. Do not use the GIF as a production loader.

## Event-driven usage

```js
import { createBuilderLoopLoader } from './motion/loader.mjs';

const host = document.querySelector('#brand-loader');
const animation = createBuilderLoopLoader(host, {
  mode: 'loading',
  size: 240,
  trails: true,
  quality: 'full',
  onComplete: () => {
    // Visual return finished. Optionally hide this presentation element.
  }
});

async function initialize() {
  try {
    await existingInitialization(); // The application's real operation.
  } catch (error) {
    existingErrorHandling(error);   // Preserve the application's behavior.
  } finally {
    animation.complete();          // Finishes visually; does not imply success.
  }
}

// Attach this to the framework's cleanup/unmount callback:
function dispose() {
  animation.destroy();
}
```

Keep the presentation element mounted for the return when appropriate. Do not delay real content availability, error handling or navigation just to play 6.4 seconds of branding. The roughly 1.16-second return is a visual treatment, not an artificial task delay. Skip the motion rather than trapping the user behind it.

## Accessibility and performance

The adapter respects `prefers-reduced-motion`; while real work is pending it shows the static zero and remains a loading status. Completion then changes that status. Do not force motion for these users.

Set `aria-busy` on the actual application region from the real async state, not from animation time. Do not steal focus or use a focus trap. The SVG is hidden from assistive technology inside the adapter's single named status element.

Use the static mark for tiny placements. A desktop headless check is not a mobile performance guarantee. Benchmark full-quality rendering on the target devices. Profile before selecting the lower trail count or removing trails. The adapter draws at up to 30 fps and pauses when the document is hidden.

## Acceptance checks

Run `node qa/check-geometry.mjs`. Also run the repository's own typecheck, lint and test commands.

Watch the actual beginning, infinity motion and return at normal speed and 0.35x in `OPEN-MOTION.html`. Compare to the supplied v3 storyboard. Check each part can be followed and that the motion does not collapse into a bow-tie or a single spinning rigid shape.

Test `.complete()` early, during both infinity lobes and while the page is hidden. It must be idempotent and its callback must fire once. Test disposal before completion, multiple instances, reduced motion, mobile layout and both theme backgrounds. Use unique SVG IDs; the adapter already supplies them.

Test Safari/iOS and Firefox explicitly; this package's recorded browser checks do not cover those engines. Check the site's CSP before embedding the supplied source; the standalone demo's inline script is for local review, while application code should follow the repository's bundling/CSP conventions.

Report changed files, screenshots or recordings, test outputs, unsupported environments and performance measurements. Get visual sign-off before deploying. Do not claim that exact endpoint geometry proves the entire motion matches the reference.
