"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

// ">Sud0ops_" typed in the terminal font (JetBrains Mono, as in the home page terminal). On load the
// bare prompt ">_" blinks for 3 seconds, then the name types out one character at a time
// (S-u-d-0-o-p-s) with the cursor following. Prompt and cursor are amber; the 0 is the original blue.
// With reduced motion the full logo shows straight away.
const PROMPT_HOLD_MS = 3000;
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
                {shown >= 4 && <span className="text-brand-blue">0</span>}
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
