> **Stored in the repo as the brand's source of truth.** The site uses these files:
> `src/app/icon.svg`, `favicon.ico` and `apple-icon.png` (from `web/`), `public/icon-192.png`,
> `icon-512.png`, `icon-maskable-512.png` (from `web/`), `public/brand/sud0ops-email-logo.png`
> (from `email/`), and the header logo drawn from `masters/builder-loop-wordmark-master.svg`
> (`src/components/ui/logo-glyphs.ts`). `email/sud0ops-email-signature.html` is the full signature
> with name, contact details, sud0ops.com and LinkedIn; it replaces the pack's logo-only snippet.
> `motion/` is the Builder Loop v3 motion pack; the header's 0 plays `public/brand/sud0ops-logo-motion.webp`,
> rendered from it by `scripts/render-logo-motion.mjs` (see `motion/README.md`).
>
> **v1.1 (Oct 2026):** the centre dot of the 0 is amber everywhere: `#FFB800` on dark, `#D97706` on light.
> The four pieces stay blue and the mono versions stay one colour. Every file here, the site's icons, OG
> image, email logo and the header motion sprite were replaced from the v1.1 pack. The exported clips in
> `motion/exports/` were not re-rendered and still show the blue dot.

# Sud0ops Builder Loop — implementation asset pack

**Version:** 1.1 • **Selected concept:** Builder Loop • **Brand:** Sud0ops

This is the pack for the *original* chosen concept, whose symbol is a **segmented blue zero with a central amber dot** (blue in v1.0). It is deliberately **not** the combined yellow-arrow/blue-zero artwork from the rejected concept pack.

## Quick start

1. View `reference/CONTACT-SHEET.png` and compare with `reference/APPROVED-BUILDER-LOOP.png`.
2. Use `masters/builder-loop-wordmark-master.svg` as your full wordmark vector, and `masters/builder-loop-icon-master.svg` as your icon vector.
3. Give `guides/AGENT-HANDOVER.md` and this ZIP to the implementation agent.
4. Use `web/` for standard browser/PWA icons; adjust deploy paths per site architecture.

## Contents

- `masters`: canonical editable SVG masters + construction blueprint.
- `logo/svg`, `logo/png`: horizontal/stacked, dark/light, mono, pre-sized PNGs.
- `icon/svg`, `icon/png`: zero-only, app tiles, several transparent raster sizes.
- `web`: favicon.ico, Apple touch, Android/PWA, manifest and snippet.
- `social`: Open Graph, LinkedIn banner and avatar.
- `email`: minimal signature snippet and its graphic asset.
- `tokens`: exact source palette and minimal Builder Loop CSS.
- `guides`: brand usage and agent-specific instructions.
- `reference`: original concept, crop and delivered contact sheet.

**Production note:** The vector is faithfully reconstructed from the chosen raster concept, not recovered from an original editable designer file. Avoid treating AI brand-board image dimensions as pixel-perfect engineering specs; use the SVGs in this pack.
