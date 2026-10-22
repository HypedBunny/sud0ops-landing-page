import { CURSOR, CURSOR_X, OPS, PROMPT, SUD, VIEW_BOX, ZERO_DOT, ZERO_PATHS, ZERO_TRANSFORM } from "@/components/ui/logo-glyphs";

const glyph = (x: number) => `translate(${x} 0) scale(1 -1)`;

// The full >Sud0ops_ wordmark, drawn still (only the cursor blinks). The header uses the animated
// Logo; this one is for large placements such as the footer, where it scales to its container.
export function Wordmark({ className }: { className?: string }) {
    return (
        <svg viewBox={VIEW_BOX} className={className} role="img" aria-label="Sud0ops">
            <path className="fill-brand-accent" transform={glyph(0)} d={PROMPT} />
            <g className="fill-brand-paper">
                {SUD.map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
            </g>
            <g transform={ZERO_TRANSFORM}>
                <g className="fill-brand-blue">
                    {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                </g>
                <circle className="fill-brand-accent" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
            </g>
            <g className="fill-slate-300">
                {OPS.map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
            </g>
            <path className="cursor-blink fill-brand-accent" transform={glyph(CURSOR_X)} d={CURSOR} />
        </svg>
    );
}
