"use client";

import { useRef } from "react";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { clamp, easeOut, placePiece, seg, useReducedMotion, useScrollFrame } from "@/lib/motion";

// Where each piece starts, in ZERO_PATHS order (top left, top right, bottom left, bottom right).
const FROM = [[-450, -350], [450, -350], [-450, 350], [450, 350]];

// The big navy 0 behind "Let's talk shop": its pieces fly in as the amber section scrolls into view
// and the dot lands last. Decoration only; with reduced motion it stays assembled. Below 1360px it would
// sit behind the text, so there it is a faint watermark.
export function HelloZero() {
    const reduceMotion = useReducedMotion();
    const svg = useRef<SVGSVGElement>(null);
    const pieces = useRef<(SVGPathElement | null)[]>([]);
    const dot = useRef<SVGCircleElement>(null);

    useScrollFrame(() => {
        const section = svg.current?.parentElement;
        if (!section) return;
        const top = section.getBoundingClientRect().top, height = window.innerHeight;
        const arrived = reduceMotion ? 1 : easeOut(clamp((height - top) / (height * 0.85)));
        pieces.current.forEach((piece, i) => placePiece(piece, FROM[i][0] * (1 - arrived), FROM[i][1] * (1 - arrived)));
        dot.current?.setAttribute("r", (ZERO_DOT.r * easeOut(seg(arrived, 0.85, 1))).toFixed(1));
    });

    return (
        <svg
            ref={svg}
            viewBox="49 63 600 760"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[-2%] h-[104%] w-auto -translate-y-1/2 overflow-visible opacity-15 min-[1360px]:opacity-100"
        >
            {ZERO_PATHS.map((d, i) => <path key={d} ref={(el) => { pieces.current[i] = el; }} d={d} className="fill-brand-black" />)}
            <circle ref={dot} className="fill-brand-black" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
        </svg>
    );
}
