"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { CURSOR, CURSOR_X, OPS, PROMPT, SUD, VIEW_BOX, ZERO, ZERO_DOT, ZERO_PATHS, ZERO_TRANSFORM } from "@/components/ui/logo-glyphs";

// The official >Sud0ops_ wordmark (Builder Loop identity), drawn from the outlined master vectors.
// On load the bare prompt ">_" blinks for 2 seconds, then the name types out one glyph at a time
// (S-u-d-0-o-p-s) with the cursor moving along. Prompt and cursor are amber; the 0 is the blue
// segmented Builder Loop mark. With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 2000;
const TYPE_MS = 120;
const TOTAL = 7;
// Where the cursor sits after 0..7 glyphs: the next glyph's slot (font units).
const CURSOR_SLOTS = [550, 1100, 1650, 2200, 2835, 3385, 3935, CURSOR_X];

// With `motion`, once the 0 is typed it becomes the Builder Loop motion: a pre-rendered loop
// (scripts/render-logo-motion.mjs) that holds the still zero for 2 seconds, spirals out into the
// infinity and back, and repeats. It plays behind the letters so the name stays readable. The image
// covers MOTION_BOX (icon units, in sync with the script), placed over the 0 as a share of the viewBox.
const MOTION_SRC = "/brand/sud0ops-logo-motion.webp";
const MOTION_BOX = [-220, -70, 1140, 1030];
const [VIEW_X, VIEW_Y, VIEW_W, VIEW_H] = VIEW_BOX.split(" ").map(Number);
const share = (n: number) => `${(n * 100).toFixed(3)}%`;
const MOTION_PLACEMENT = {
    left: share((ZERO.x + (MOTION_BOX[0] - ZERO.ox) * ZERO.sx - VIEW_X) / VIEW_W),
    top: share((ZERO.y + (MOTION_BOX[1] - ZERO.oy) * ZERO.sy - VIEW_Y) / VIEW_H),
    width: share((MOTION_BOX[2] * ZERO.sx) / VIEW_W),
    height: share((MOTION_BOX[3] * ZERO.sy) / VIEW_H),
};

// Reads prefers-reduced-motion without pulling an animation library into every page.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

const glyph = (x: number) => `translate(${x} 0) scale(1 -1)`;

export function Logo({ motion = false }: { motion?: boolean }) {
    const reduceMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
    const [typed, setTyped] = useState(0);
    const [motionLoaded, setMotionLoaded] = useState(false);
    const shown = reduceMotion ? TOTAL : typed;
    const playMotion = motion && !reduceMotion && shown >= 4;
    // The vector 0 stays until the motion image has loaded; its first frame is the same zero.
    const vectorZero = shown >= 4 && !(playMotion && motionLoaded);

    useEffect(() => {
        if (reduceMotion || typed >= TOTAL) return;
        const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? PROMPT_HOLD_MS : TYPE_MS);
        return () => clearTimeout(timeout);
    }, [typed, reduceMotion]);

    return (
        <Link href="/" aria-label="Sud0ops home" className="flex items-center">
            <span className="relative">
                {playMotion && (
                    <Image
                        src={MOTION_SRC}
                        alt=""
                        width={114}
                        height={103}
                        unoptimized
                        onLoad={() => setMotionLoaded(true)}
                        className="pointer-events-none absolute max-w-none"
                        style={MOTION_PLACEMENT}
                    />
                )}
                {/* Full width from the start, so the header never shifts while the name types out. */}
                <svg viewBox={VIEW_BOX} width={149} height={32} className="relative block h-7 w-auto sm:h-8" aria-hidden="true">
                    <path className="fill-brand-accent" transform={glyph(0)} d={PROMPT} />
                    <g className="fill-brand-paper">
                        {SUD.slice(0, Math.min(shown, 3)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                    </g>
                    {vectorZero && (
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
            </span>
        </Link>
    );
}
