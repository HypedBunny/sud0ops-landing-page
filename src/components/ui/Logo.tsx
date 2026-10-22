"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CURSOR, CURSOR_X, OPS, PROMPT, SUD, VIEW_BOX, ZERO, ZERO_DOT, ZERO_PATHS, ZERO_TRANSFORM } from "@/components/ui/logo-glyphs";
import { MOTION_BOX, MOTION_FRAMES, MOTION_LEFT, MOTION_RIGHT, MOTION_SPRITE, MOTION_TICK_MS } from "@/components/ui/logo-motion.generated";
import { useReducedMotion } from "@/lib/motion";

// The official >Sud0ops_ wordmark (Builder Loop identity), drawn from the outlined master vectors.
// Prompt and cursor are amber; the 0 is the blue segmented Builder Loop mark with its amber centre dot.
// With `typeOn`, the bare prompt ">_" blinks for 2 seconds on load, then the name types out one glyph
// at a time (S-u-d-0-o-p-s) with the cursor moving along. With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 2000;
const TYPE_MS = 120;
const TOTAL = 7;
// Where the cursor sits after 0..7 glyphs: the next glyph's slot (font units).
const CURSOR_SLOTS = [550, 1100, 1650, 2200, 2835, 3385, 3935, CURSOR_X];

// Easter egg: clicking the 0 plays the Builder Loop motion once. It spirals out into the infinity and
// back. The frames are pre-rendered into a sprite (scripts/render-logo-motion.mjs), and ">Sud" and "ops_"
// slide outwards just far enough to keep their usual gap from the moving pieces, so nothing overlaps.
// Sprite and letters run on one clock.
const [VIEW_X, VIEW_Y, VIEW_W, VIEW_H] = VIEW_BOX.split(" ").map(Number);
const share = (n: number) => `${(n * 100).toFixed(3)}%`;
// The sprite cells cover MOTION_BOX (icon units), placed over the 0 as a share of the viewBox.
const MOTION_PLACEMENT = {
    left: share((ZERO.x + (MOTION_BOX[0] - ZERO.ox) * ZERO.sx - VIEW_X) / VIEW_W),
    top: share((ZERO.y + (MOTION_BOX[1] - ZERO.oy) * ZERO.sy - VIEW_Y) / VIEW_H),
    width: share((MOTION_BOX[2] * ZERO.sx) / VIEW_W),
    height: share((MOTION_BOX[3] * ZERO.sy) / VIEW_H),
};
// The generated timeline is a loop that starts at rest. One play runs from the tick before anything
// moves to the end of the loop, then settles on the still zero with the letters home.
const FROM = Math.max(0, MOTION_FRAMES.findIndex((n, i) => n !== 0 || MOTION_LEFT[i] > 0 || MOTION_RIGHT[i] > 0) - 1);
const FRAMES = MOTION_FRAMES.slice(FROM);
const TICKS = FRAMES.length;
const PLAY = { duration: TICKS * MOTION_TICK_MS, iterations: 1 };
const cell = (n: number) =>
    `translate(${(-(n % MOTION_SPRITE.columns) * 100) / MOTION_SPRITE.columns}%, ${(-Math.floor(n / MOTION_SPRITE.columns) * 100) / MOTION_SPRITE.rows}%)`;
// Each tick's cell is held until the next change.
const SPRITE_KEYFRAMES: Keyframe[] = [
    ...FRAMES.flatMap((n, i) => (i > 0 && n === FRAMES[i - 1] ? [] : [{ offset: i / TICKS, transform: cell(n), easing: "step-end" }])),
    { offset: 1, transform: cell(0) },
];
const slide = (offsets: number[], direction: number): Keyframe[] => [
    ...offsets.slice(FROM).map((x, i) => ({ offset: i / TICKS, transform: `translateX(${direction * x}px)` })),
    { offset: 1, transform: "translateX(0px)" },
];
const LEFT_KEYFRAMES = slide(MOTION_LEFT, -1);
const RIGHT_KEYFRAMES = slide(MOTION_RIGHT, 1);
// The 0's box in wordmark units, the click target for the easter egg.
const ZERO_BOX = { x: ZERO.x, y: ZERO.y, width: (603 - ZERO.ox) * ZERO.sx, height: (778 - ZERO.oy) * ZERO.sy };

const glyph = (x: number) => `translate(${x} 0) scale(1 -1)`;

// `className` lays out the home link; `markClassName` sizes the wordmark (the header's 28-32px by default).
export function Logo({ typeOn = false, className = "flex items-center", markClassName = "h-7 w-auto sm:h-8" }: {
    typeOn?: boolean;
    className?: string;
    markClassName?: string;
}) {
    const reduceMotion = useReducedMotion();
    const [typed, setTyped] = useState(typeOn ? 0 : TOTAL);
    const [clicked, setClicked] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [spriteLoaded, setSpriteLoaded] = useState(false);
    const spriteRef = useRef<HTMLImageElement>(null);
    const leftRef = useRef<SVGGElement>(null);
    const rightRef = useRef<SVGGElement>(null);
    const shown = reduceMotion ? TOTAL : typed;
    // The vector 0 stays until the sprite has loaded; the sprite's first and last cells are the same zero.
    const vectorZero = shown >= 4 && !(spinning && spriteLoaded);

    useEffect(() => {
        if (reduceMotion || typed >= TOTAL) return;
        const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? PROMPT_HOLD_MS : TYPE_MS);
        return () => clearTimeout(timeout);
    }, [typed, reduceMotion]);

    useEffect(() => {
        const [sprite, left, right] = [spriteRef.current, leftRef.current, rightRef.current];
        if (!spinning || !spriteLoaded || !sprite || !left || !right) return;
        const animations = [sprite.animate(SPRITE_KEYFRAMES, PLAY), left.animate(LEFT_KEYFRAMES, PLAY), right.animate(RIGHT_KEYFRAMES, PLAY)];
        // One shared start time keeps the letters in step with the frames.
        const start = document.timeline.currentTime;
        for (const animation of animations) animation.startTime = start;
        animations[0].onfinish = () => setSpinning(false);
        return () => animations.forEach((animation) => animation.cancel());
    }, [spinning, spriteLoaded]);

    function spin(event: React.MouseEvent) {
        // The 0 plays the motion instead of following the home link; the letters still go home.
        event.preventDefault();
        if (reduceMotion || spinning) return;
        setClicked(true);
        setSpinning(true);
    }

    return (
        <Link href="/" aria-label="Sud0ops home" className={className}>
            <span className="relative block">
                {/* Loaded on the first click, then kept for the next one. */}
                {clicked && (
                    <span className={`pointer-events-none absolute overflow-hidden ${spinning ? "" : "invisible"}`} style={MOTION_PLACEMENT}>
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
                <svg viewBox={VIEW_BOX} width={149} height={32} className={`relative block overflow-visible ${markClassName}`} aria-hidden="true">
                    <g ref={leftRef}>
                        <path className="fill-brand-accent" transform={glyph(0)} d={PROMPT} />
                        <g className="fill-brand-paper">
                            {SUD.slice(0, Math.min(shown, 3)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                        </g>
                    </g>
                    {vectorZero && (
                        <g transform={ZERO_TRANSFORM} className="fill-brand-blue">
                            {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                            <circle className="fill-brand-accent" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                        </g>
                    )}
                    <g ref={rightRef}>
                        <g className="fill-slate-300">
                            {OPS.slice(0, Math.max(0, shown - 4)).map(([x, d]) => <path key={x} transform={glyph(x)} d={d} />)}
                        </g>
                        <path className="cursor-blink fill-brand-accent" transform={glyph(CURSOR_SLOTS[shown])} d={CURSOR} />
                    </g>
                    {shown >= 4 && <rect {...ZERO_BOX} fill="transparent" className="cursor-pointer" onClick={spin} />}
                </svg>
            </span>
        </Link>
    );
}
