"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

// ">Sud0ops_" set in the terminal font. On load the bare prompt ">_" blinks for 4 seconds, then the
// name types out one character at a time (S-u-d-0-o-p-s) with the cursor following.
// Prompt and cursor are amber; the 0 is the original blue seven-segment digit with the root slash.
// With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 4000;
const TYPE_MS = 120;
const TOTAL = 7;

// Reads prefers-reduced-motion without pulling an animation library into every page.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

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
        <Link
            href="/"
            aria-label="Sud0ops home"
            className="group flex items-center font-mono text-[22px] font-extrabold leading-none tracking-tighter"
        >
            <span aria-hidden="true" className="text-brand-accent">&gt;</span>
            <span aria-hidden="true" className="flex items-center">
                {shown > 0 && <span className="text-brand-paper">{"Sud".slice(0, shown)}</span>}
                {shown >= 4 && <SegmentZero />}
                {shown > 4 && (
                    <span className="font-semibold text-slate-300 transition-colors duration-300 group-hover:text-white">
                        {"ops".slice(0, shown - 4)}
                    </span>
                )}
            </span>
            <span aria-hidden="true" className="cursor-blink text-brand-accent">_</span>
        </Link>
    );
}

function SegmentZero() {
    return (
        <span className="mx-[2px] inline-flex items-center">
            <svg width="21" height="28" viewBox="0 0 28 38" fill="none" aria-hidden="true" className="text-brand-blue">
                {/* Container */}
                <rect x="0.5" y="0.5" width="27" height="37" rx="3" className="fill-brand-black-light stroke-brand-line" strokeWidth="1" />
                <g fill="currentColor">
                    {/* Top, upper verticals, lower verticals, bottom: ON */}
                    <rect x="8" y="4" width="12" height="3" rx="1" />
                    <rect x="4" y="8" width="3" height="9" rx="1" />
                    <rect x="21" y="8" width="3" height="9" rx="1" />
                    <rect x="4" y="21" width="3" height="9" rx="1" />
                    <rect x="21" y="21" width="3" height="9" rx="1" />
                    <rect x="8" y="31" width="12" height="3" rx="1" />
                    {/* Middle: OFF (dim ghost) */}
                    <rect x="8" y="17.5" width="12" height="3" rx="1" opacity="0.18" />
                </g>
                {/* Two diagonal segments for the slash */}
                <path d="M 9 29 L 12.25 22.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 15.75 15.5 L 19 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </span>
    );
}
