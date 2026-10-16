# Sud0ops / Builder Loop identity specification

**Approved identity:** the precise four-piece *blue segmented zero* with one blue centre dot in the user-selected reference. The icon itself contains **NO amber greater-than arrow**.

## Identity grammar

1. **Icon only** = the segmented blue `0` plus its blue central dot; five blue vector elements, no other artwork.
2. **Wordmark** = amber `>` + off-white `Sud` + modular blue `0` + muted `ops` + amber `_`, using the original brand's outlined glyphs.
3. **No combined amber-chevron/blue-zero symbol.** Earlier visual concepts showing a yellow arrow entering a blue zero are explicitly rejected.
4. Reference grid, blueprints and construction circles are supporting presentation graphics only; never part of the final standalone logo.

## Design system

The palette in `tokens/colors.json` is taken from the prior brand pack. On dark use `#38BDF8` for the zero and `#FFB800` for prompt/cursor. On light use `#0284C7` for the zero and `#D97706` for prompt/cursor. Off-white `#F8FAFC` and muted `#CBD5E1` are used on dark; slate `#0F172A` and muted slate `#475569` on light. Do not add gradients, bloom, drop shadows or neon effects to the approved assets.

Fonts used on the website: **JetBrains Mono** for terminal/labels, **Plus Jakarta Sans** for headings, and **Inter** for UI/body. Existing wordmark letters in SVG are already converted to outlines, so no installed font is required for the logo. Font files are not included in the pack.

## Shape and spacing

- Four structural pieces: top-left, top-right, bottom-left, bottom-right, plus the circular blue centre dot.
- Master icon vector path is reconstructed from the provided zoom crop of the approved concept. It is an engineering-ready **faithful redraw, not a mathematically exact original designer source**.
- Preserve aspect ratio; never stretch the modular zero.
- Keep at least **one centre-dot diameter** of external clear space around the glyph whenever practical.
- Primary SVG mark includes generous padding in its own viewBox.
- In very small favicons the narrow modular cuts can appear less distinct due to pixel limits; review 16px and 32px on target browsers.
- Approximate minimum wordmark 120px wide on screen; below that prefer the standalone blue-zero icon. The 16px icon is included but 32px is recommended where possible.

## Naming and accessibility

- Display name: `Sud0ops` (letter S + u + d + digit zero + o + p + s).
- The full brand wordmark appears as `>Sud0ops_` including terminal prompt and cursor.
- Descriptive alternate text: `Sud0ops` for wordmark, `Sud0ops Builder Loop logo` for standalone mark.

## Motion

Animations must be separate from the SVG mark. Prompt blink: discrete 1 second cycle. Optional wordmark type-on: roughly 120ms per character. Respect `prefers-reduced-motion` and show the full mark immediately without movement when set.

## Asset roles

- `masters/` SVG source of truth for both primary mark and wordmark.
- `icon/svg/`, `icon/png/` standalone mark and filled app icon for light/dark environments.
- `logo/svg/`, `logo/png/` horizontal and stacked wordmark, full color and monochrome.
- `web/` deployable favicon, PWA manifest, and HTML tag snippet.
- `social/` platform images. Text `BUILD / SHIP / IMPROVE` is an optional implementation headline, **not** an official approved company tagline.
- `reference/` original user-approved concept sheet, zoom reference, and vector blueprint/contact sheet.

## Disallowed substitutions

Do not use the previous `>_`-only generic icon. Do not use the earlier arrow+zero hybrid icon generated during this discussion. Do not use a continuous rounded `0` in place of the segmented Builder Loop mark. Do not modify the logo proportions or colors or add visual effects.

## Quality note

The brand-board is a raster reference, not a production SVG. Vector masters supplied here were reconstructed by tracing its geometry. For final print or formal trademark registration, review and sign off the vector shapes with the brand owner.
