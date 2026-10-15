"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ">Sud0ops_": a terminal prompt, then the name typed one character at a time
// (S-u-d-0-o-p-s), then a blinking cursor. Prompt and cursor are amber; the 0 is the original
// blue seven-segment digit with the root slash.
const TOTAL = 7;

export function Logo() {
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (typed < TOTAL) {
            const timeout = setTimeout(() => setTyped((n) => n + 1), 120);
            return () => clearTimeout(timeout);
        }
    }, [typed]);

    return (
        <Link href="/" aria-label="Sud0ops home" className="group flex items-center font-heading text-2xl font-bold tracking-tight">
            <span aria-hidden="true" className="mr-1.5 font-mono text-xl font-medium text-brand-accent">&gt;</span>
            <span aria-hidden="true" className="flex items-center">
                {typed > 0 && <span>{"Sud".slice(0, typed)}</span>}
                {typed >= 4 && <SegmentZero />}
                {typed > 4 && (
                    <span className="font-medium text-slate-300 transition-colors duration-300 group-hover:text-white">
                        {"ops".slice(0, typed - 4)}
                    </span>
                )}
            </span>
            <span aria-hidden="true" className="text-brand-accent animate-[pulse_1s_ease-in-out_infinite]">_</span>
        </Link>
    );
}

function SegmentZero() {
    return (
        <span className="relative mx-[2px] inline-flex items-center">
            <svg width="28" height="38" viewBox="0 0 28 38" fill="none" aria-hidden="true" className="text-brand-blue">
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
