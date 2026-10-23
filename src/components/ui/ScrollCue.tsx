"use client";

import { useState } from "react";
import { useReducedMotion, useScrollFrame } from "@/lib/motion";

// The "keep scrolling" hint for pages whose first screen can look complete: an amber dot sliding down a
// short rail, pinned to the bottom of the screen until you start scrolling (it comes back at the top).
// It arrives after a pause, so people who scroll straight away never see it over the content, and it is
// not a 0, so it never reads as a second dock button. Tapping it scrolls most of a screen. It is a visual
// hint only, so it is hidden from assistive tech and kept out of the tab order. `more` is dropped on
// phones, where the cue shares the bottom line with the dock.
export function ScrollCue({ label, more }: { label: string; more?: string }) {
    const reduceMotion = useReducedMotion();
    const [shown, setShown] = useState(true);

    useScrollFrame(() => {
        const next = window.scrollY < 24 && document.documentElement.scrollHeight - window.innerHeight > 120;
        if (next !== shown) setShown(next);
    });

    return (
        <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: reduceMotion ? "auto" : "smooth" })}
            className={`scroll-cue fixed left-1/2 z-40 -translate-x-1/2 cursor-pointer ${shown ? "" : "pointer-events-none"}`}
        >
            <span className={`flex min-h-11 items-center gap-3 rounded-full border border-slate-700 bg-brand-black/90 pr-4.5 pl-4 font-mono text-xs whitespace-nowrap text-slate-300 shadow-[3px_3px_0_var(--color-brand-accent)] backdrop-blur-sm transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}>
                <span className="relative h-5 w-2 flex-none">
                    <span className="absolute inset-y-0 left-[3px] w-0.5 rounded-full bg-slate-600" />
                    <span className="scroll-cue-dot absolute top-0 left-0 h-2 w-2 rounded-full bg-brand-accent" />
                </span>
                <span>
                    {label}
                    {more && <span className="hidden min-[480px]:inline">{more}</span>}
                </span>
            </span>
        </button>
    );
}
