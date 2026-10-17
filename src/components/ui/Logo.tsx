"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { CURSOR, CURSOR_X, OPS, PROMPT, SUD, VIEW_BOX, ZERO, ZERO_DOT, ZERO_PATHS, ZERO_TRANSFORM } from "@/components/ui/logo-glyphs";
import { MOTION_BOX, MOTION_CELLS, MOTION_LEFT, MOTION_REST_TICKS, MOTION_RIGHT, MOTION_SPRITE, MOTION_TICK_MS } from "@/components/ui/logo-motion.generated";

// The official >Sud0ops_ wordmark (Builder Loop identity), drawn from the outlined master vectors.
// On load the bare prompt ">_" blinks for 2 seconds, then the name types out one glyph at a time
// (S-u-d-0-o-p-s) with the cursor moving along. Prompt and cursor are amber; the 0 is the blue
// segmented Builder Loop mark. With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 2000;
const TYPE_MS = 120;
const TOTAL = 7;
// Where the cursor sits after 0..7 glyphs: the next glyph's slot (font units).
const CURSOR_SLOTS = [550, 1100, 1650, 2200, 2835, 3385, 3935, CURSOR_X];

// With `motion`, once the name has typed out the 0 plays the Builder Loop motion on a loop: the still
// zero for 2 seconds, then it spirals out into the infinity and back. The frames are pre-rendered into
// a sprite (scripts/render-logo-motion.mjs), and ">Sud" and "ops_" slide outwards just far enough to
// keep their usual gap from the moving pieces, so nothing overlaps. Sprite and letters run on one clock.
const [VIEW_X, VIEW_Y, VIEW_W, VIEW_H] = VIEW_BOX.split(" ").map(Number);
const share = (n: number) => `${(n * 100).toFixed(3)}%`;
// The sprite cells cover MOTION_BOX (icon units), placed over the 0 as a share of the viewBox.
const MOTION_PLACEMENT = {
    left: share((ZERO.x + (MOTION_BOX[0] - ZERO.ox) * ZERO.sx - VIEW_X) / VIEW_W),
    top: share((ZERO.y + (MOTION_BOX[1] - ZERO.oy) * ZERO.sy - VIEW_Y) / VIEW_H),
    width: share((MOTION_BOX[2] * ZERO.sx) / VIEW_W),
    height: share((MOTION_BOX[3] * ZERO.sy) / VIEW_H),
};
const TICKS = MOTION_LEFT.length;
const LOOP = { duration: TICKS * MOTION_TICK_MS, iterations: Infinity };
const cell = (n: number) =>
    `translate(${(-(n % MOTION_SPRITE.columns) * 100) / MOTION_SPRITE.columns}%, ${(-Math.floor(n / MOTION_SPRITE.columns) * 100) / MOTION_SPRITE.rows}%)`;
// Cell 0 (the still zero) for the rest ticks, then one cell per tick, each held until the next.
const SPRITE_KEYFRAMES: Keyframe[] = [
    { offset: 0, transform: cell(0), easing: "step-end" },
    ...Array.from({ length: MOTION_CELLS - 1 }, (_, i) => ({ offset: (MOTION_REST_TICKS + i) / TICKS, transform: cell(i + 1), easing: "step-end" })),
    { offset: 1, transform: cell(MOTION_CELLS - 1) },
];
const slide = (offsets: number[], direction: number): Keyframe[] => [
    ...offsets.map((x, i) => ({ offset: i / TICKS, transform: `translateX(${direction * x}px)` })),
    { offset: 1, transform: `translateX(${direction * offsets[0]}px)` },
];
const LEFT_KEYFRAMES = slide(MOTION_LEFT, -1);
const RIGHT_KEYFRAMES = slide(MOTION_RIGHT, 1);

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
    const [spriteLoaded, setSpriteLoaded] = useState(false);
    const spriteRef = useRef<HTMLImageElement>(null);
    const leftRef = useRef<SVGGElement>(null);
    const rightRef = useRef<SVGGElement>(null);
    const shown = reduceMotion ? TOTAL : typed;
    const showSprite = motion && !reduceMotion && shown >= 4;
    // The vector 0 stays until the sprite has loaded; its first cell is the same zero.
    const vectorZero = shown >= 4 && !(showSprite && spriteLoaded);
    const animate = showSprite && spriteLoaded && shown === TOTAL;

    useEffect(() => {
        if (reduceMotion || typed >= TOTAL) return;
        const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? PROMPT_HOLD_MS : TYPE_MS);
        return () => clearTimeout(timeout);
    }, [typed, reduceMotion]);

    useEffect(() => {
        const [sprite, left, right] = [spriteRef.current, leftRef.current, rightRef.current];
        if (!animate || !sprite || !left || !right) return;
        const animations = [sprite.animate(SPRITE_KEYFRAMES, LOOP), left.animate(LEFT_KEYFRAMES, LOOP), right.animate(RIGHT_KEYFRAMES, LOOP)];
        // One shared start time keeps the letters in step with the frames.
        const start = document.timeline.currentTime;
        for (const animation of animations) animation.startTime = start;
        return () => animations.forEach((animation) => animation.cancel());
    }, [animate]);

    return (
        <Link href="/" aria-label="Sud0ops home" className="flex items-center">
            <span className="relative">
                {showSprite && (
                    <span className="pointer-events-none absolute overflow-hidden" style={MOTION_PLACEMENT}>
                        <Image
                            ref={spriteRef}
                            src={MOTION_SPRITE.src}
                            alt=""
                            width={MOTION_SPRITE.width}
                            height={MOTION_SPRITE.height}
                            unoptimized
                            onLoad={() => setSpriteLoaded(true)}
                            className="absolute top-0 left-0 max-w-none"
                            style={{ width: `${MOTION_SPRITE.columns * 100}%`, height: `${MOTION_SPRITE.rows * 100}%` }}
                        />
                    </span>
                )}
                {/* Full width from the start, so the header never shifts while the name types out. */}
                <svg viewBox={VIEW_BOX} width={149} height={32} className="relative block h-7 w-auto overflow-visible sm:h-8" aria-hidden="true">
                    <g ref={leftRef}>
                        <path className="fill-brand-accent" transform={glyph(0)} d={PROMPT} />
                        <g className="fill-brand-paper">
                            {SUD.slice(0, Math.min(shown, 3)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                        </g>
                    </g>
                    {vectorZero && (
                        <g transform={ZERO_TRANSFORM} className="fill-brand-blue">
                            {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                            <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                        </g>
                    )}
                    <g ref={rightRef}>
                        <g className="fill-slate-300">
                            {OPS.slice(0, Math.max(0, shown - 4)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                        </g>
                        <path className="cursor-blink fill-brand-accent" transform={glyph(CURSOR_SLOTS[shown])} d={CURSOR} />
                    </g>
                </svg>
            </span>
        </Link>
    );
}
