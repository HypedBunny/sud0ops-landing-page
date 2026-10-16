# Implementation brief — Sud0ops Builder Loop (agent-ready)

You are integrating the approved Sud0ops personal brand identity into the current repository / site. **Do not redesign, reinterpret or invent a logo**. The exact approved direction is shown in `reference/APPROVED-BUILDER-LOOP.png` and its zoom `reference/approved-zero-zoom.png`.

## Source of truth (highest priority first)

1. The attached vector master `masters/builder-loop-icon-master.svg` for the blue segmented zero.
2. `masters/builder-loop-wordmark-master.svg` for the wordmark, preserving the existing `>Sud0ops_` letter shapes with the modular 0.
3. `guides/BRAND-GUIDE.md`, `tokens/colors.json`, `reference/APPROVED-BUILDER-LOOP.png`.

## Constraints

- The icon is **BLUE ONLY**, four parts plus a dot. Do not merge any yellow/amber `>` into it.
- The amber `>` and `_` appear only in full logo/terminal presentations.
- Do not replace the outlined SVG wordmark with an ordinary font-typed zero.
- Do not substitute AI-generated alternative mark, existing `>_` favicon, or combined arrow/zero.
- Keep brand palette exactly; avoid new effects or extraneous supporting graphics.

## Implementation tasks

1. Inspect the existing site's public assets and metadata to identify dependencies and current icon file paths.
2. Add approved files to the appropriate public/static folder; maintain file names or update references consistently.
3. Replace existing site header wordmark with `logo/svg/sud0ops-builder-loop-on-dark.svg` (or on-light variant when necessary).
4. Use `icon/svg/builder-loop-zero-on-dark.svg` for inline brand icon; use `web/favicon.ico`, `web/apple-touch-icon.png` and PWA exports as needed.
5. Replace OG/Twitter images with the new files under `social/` only if they suit the product's existing metadata; preserve the existing marketing copy if it is already approved.
6. Prefer pre-generated images rather than runtime text rendering or effects.
7. Check contrast and icon visibility on both light and dark themes.
8. Preserve existing page accessibility, responsive breakpoints, keyboard operation and performance.
9. Run lint/build/tests. Compare desktop and mobile screenshots at typical breakpoints before deployment.

## Acceptance checks

- [ ] Logo icon is the segmented blue zero with its centre dot and **no amber arrow**.
- [ ] Header reads `>Sud0ops_`; the blue 0 has modular seams and the amber cursor remains.
- [ ] Browser tab uses the new blue-zero mark rather than the old yellow `>_` icon.
- [ ] Layouts preserve padding and mark aspect ratio at 16, 32, 64, 128, 512px.
- [ ] Header contrast is right on slate and on white.
- [ ] Metadata references valid existing images (200 responses in deployment), no broken paths.
- [ ] No new fonts are bundled; original type system remains intact.
- [ ] Reduced-motion preference respected if an animation is added.
- [ ] App manifest references icons with correct paths and sizes.

## Example HTML

```html
<img src="/sud0ops-builder-loop-on-dark.svg" alt="Sud0ops" width="240" height="53" />
```

If the site has its own asset conventions, adapt file paths only. Don't alter the actual logo geometry or colors. Report exactly which files, references, and metadata were changed.
