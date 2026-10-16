"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { CURSOR, CURSOR_X, OPS, PROMPT, SUD, VIEW_BOX, ZERO_DOT, ZERO_PATHS, ZERO_TRANSFORM } from "@/components/ui/logo-glyphs";

// The official >Sud0ops_ wordmark (Builder Loop identity), drawn from the outlined master vectors.
// On load the bare prompt ">_" blinks for 2 seconds, then the name types out one glyph at a time
// (S-u-d-0-o-p-s) with the cursor moving along. Prompt and cursor are amber; the 0 is the blue
// segmented Builder Loop mark. With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 2000;
const TYPE_MS = 120;
const TOTAL = 7;
// Where the cursor sits after 0..7 glyphs: the next glyph's slot (font units).
const CURSOR_SLOTS = [550, 1100, 1650, 2200, 2835, 3385, 3935, CURSOR_X];

// Reads prefers-reduced-motion without pulling an animation library into every page.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

const glyph = (x: number) => `translate(${x} 0) scale(1 -1)`;

export function Logo() {
    const reduceMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
    const [typed, setTyped] = useState(0);
    const shown = reduceMotion ? TOTAL : typed;

    useEffect(() => {
        if (reduceMotion || typed >= TOTAL) return;
        const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? PROMPT_HOLD_MS : TYPE_MS);
        return () => clearTimeout(timeout);
    }, [typed, reduceMotion]);

    return (
        <Link href="/" aria-label="Sud0ops home" className="flex items-center">
            {/* Full width from the start, so the header never shifts while the name types out. */}
            <svg viewBox={VIEW_BOX} width={149} height={32} className="h-7 w-auto sm:h-8" aria-hidden="true">
                <path className="fill-brand-accent" transform={glyph(0)} d={PROMPT} />
                <g className="fill-brand-paper">
                    {SUD.slice(0, Math.min(shown, 3)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                </g>
                {shown >= 4 && (
                    <g transform={ZERO_TRANSFORM} className="fill-brand-blue">
                        {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                        <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                    </g>
                )}
                <g className="fill-slate-300">
                    {OPS.slice(0, Math.max(0, shown - 4)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                </g>
                <path className="cursor-blink fill-brand-accent" transform={glyph(CURSOR_SLOTS[shown])} d={CURSOR} />
            </svg>
        </Link>
    );
}
