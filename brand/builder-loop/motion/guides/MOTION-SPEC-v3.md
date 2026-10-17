# Builder Loop - v3 motion implementation

The motion direction is the user's approved v3 storyboard: sharper detachment, spiralling flexible pieces, directional blur, a moving infinity symbol, and precise reassembly. These timings are the choices in this implementation, not measured timings extracted from an original animation file.

| One-shot time | State |
|---|---|
| 0.00-0.28 s | Original zero held, sharp and flat |
| 0.28-0.50 s | Accelerated outward detachment with torque |
| 0.50-0.98 s | Four independently deforming spines curl and spiral |
| 0.98-1.52 s | Flexible material opens into the sideways infinity |
| 1.52-4.40 s | Two 1.44-second circuits in the review clip |
| 4.40-4.80 s | The material leaves the figure-eight and curls inward |
| 4.80-5.56 s | Spiral return and slightly staggered individual landings |
| 5.56-6.40 s | Exact source zero, no trails; hold and stop |

## Geometry

The immutable source dot has centre `(349,443)` and radius `67`. The four original master path strings are retained for the locked states. Material coordinates from the earlier rig map each original contour onto a deforming spine; separate paths persist throughout the motion.

Release and return use polar interpolation around the dot. This avoids the inward implosion caused by linearly mixing opposite sides of a fast orbit. The spiral's radius varies along each piece, so it is not simply rigid rotation. The infinity path is sampled by arc length for consistent circulation. The centre dot is composited last without any transform or filter.

Full-quality trails use seven time-offset samples of the actual moving outlines with a small Gaussian softening. No trail is generated for the dot. The normal dark background is `#0F172A`; the brand blue is `#38BDF8`. Moving material shading is permitted here to match the motion reference; all shading and blur disappear in the locked logo.

## Modes

`mode:'once'`: the 6.40-second sequence above.

`mode:'loading'`: same opening, then indefinite 1.44-second circulation. `.complete()` captures the current pose and starts the return; there is no invented network-completion timer. The source supports completion from arbitrary material phases. Its numerical tests do not substitute for checking those exits visually in the actual product.

Very early completion, a hidden page at completion or reduced motion may show the final static zero immediately instead of forcing an unnecessary flourish.

The standalone demo includes playback speed control for review. Slow motion is not the intended production speed. The blur toggle is diagnostic, not the default design.

## Review boundaries

The static master is unchanged from the previous asset pack, whose SVG was reconstructed from the selected concept image. This is not a claim that an original editable motion-design project was recovered. Visual approval of this newly rendered implementation remains separate from approval of the reference board.
