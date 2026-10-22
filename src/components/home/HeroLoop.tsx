"use client";

import { useEffect, useRef, useState } from "react";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { useReducedMotion } from "@/lib/motion";

const STAGES = ["discover", "build", "adopt", "support"];
// A dotted track around the 0 (icon units), and the stop for each stage on its four corners.
const TRACK =
    "M 130 144 L 164 110 C 190 84 214 66 252 66 L 452 66 C 486 66 508 80 532 104 L 600 172 C 624 196 638 222 638 258 L 638 620 C 638 652 628 680 604 704 L 536 772 C 512 796 486 813 448 813 L 250 813 C 214 813 190 798 166 776 L 98 708 C 74 684 59 656 59 620 L 59 262 C 59 228 72 202 96 178 Z";
const STOPS = [[130, 144], [566, 138], [570, 738], [132, 742]];
const LABELS = [
    { x: 104, y: 104, anchor: "end" },
    { x: 596, y: 104, anchor: "start" },
    { x: 600, y: 790, anchor: "start" },
    { x: 104, y: 790, anchor: "end" },
] as const;
// The amber dot rests on each stop, lifting slightly, then travels to the next. One lap of travel
// takes TRAVEL_MS, shared out by distance.
const PAUSE_MS = 1000;
const TRAVEL_MS = 6000;
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

type Leg = { t0: number; t1: number } & ({ stop: number; at: number } | { stop: null; from: number; to: number });

// The home hero's picture: the Builder Loop 0 with its four stages, a dot running the loop, and a
// pipeline readout that follows the dot. With reduced motion everything stays still.
export function HeroLoop() {
    const reduceMotion = useReducedMotion();
    const [current, setCurrent] = useState<number | null>(0);
    const trackRef = useRef<SVGPathElement>(null);
    const dotRef = useRef<SVGGElement>(null);
    const shadowRef = useRef<SVGEllipseElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (reduceMotion || !track) return;
        const length = track.getTotalLength();
        // Where each stop sits along the track: the nearest of 800 samples.
        const along = STOPS.map(([x, y], i) => {
            if (i === 0) return 0;
            let best = 0;
            let bestDistance = Infinity;
            for (let k = 0; k <= 800; k++) {
                const point = track.getPointAtLength((length * k) / 800);
                const distance = (point.x - x) ** 2 + (point.y - y) ** 2;
                if (distance < bestDistance) [best, bestDistance] = [(length * k) / 800, distance];
            }
            return best;
        });
        along.push(length);

        const legs: Leg[] = [];
        let t = 0;
        for (let i = 0; i < STOPS.length; i++) {
            legs.push({ stop: i, at: along[i], t0: t, t1: (t += PAUSE_MS) });
            legs.push({ stop: null, from: along[i], to: along[i + 1], t0: t, t1: (t += (TRAVEL_MS * (along[i + 1] - along[i])) / length) });
        }
        const lap = t;
        const start = performance.now();
        let shown: number | null = 0;
        let frame = 0;

        const tick = (now: number) => {
            // The first frame's timestamp can be a little before `start`.
            const elapsed = Math.max(0, now - start) % lap;
            const leg = legs.find((l) => elapsed < l.t1) ?? legs[legs.length - 1];
            const p = (elapsed - leg.t0) / (leg.t1 - leg.t0);
            const lift = leg.stop === null ? 0 : p < 0.2 ? ease(p / 0.2) : p > 0.8 ? ease((1 - p) / 0.2) : 1;
            const point = track.getPointAtLength(leg.stop === null ? leg.from + (leg.to - leg.from) * ease(p) : leg.at % length);
            dotRef.current?.setAttribute("transform", `translate(${point.x.toFixed(1)} ${(point.y - 18 * lift).toFixed(1)}) scale(${(1 + 0.25 * lift).toFixed(3)})`);
            const shadow = shadowRef.current;
            if (shadow) {
                shadow.setAttribute("cx", point.x.toFixed(1));
                shadow.setAttribute("cy", (point.y + 6).toFixed(1));
                shadow.setAttribute("rx", (15 + 5 * lift).toFixed(1));
                shadow.setAttribute("opacity", (0.55 * lift).toFixed(2));
            }
            if (leg.stop !== shown) {
                shown = leg.stop;
                setCurrent(shown);
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [reduceMotion]);

    const active = reduceMotion ? null : current;

    return (
        <div className="relative w-full max-w-[580px] justify-self-center">
            <svg viewBox="-120 20 900 860" role="img" aria-label="The Sud0ops loop: discover, build, adopt and support, around your business" className="block aspect-[900/860] h-auto w-full">
                <path ref={trackRef} d={TRACK} fill="none" className="stroke-slate-700" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
                <g className="fill-brand-blue">
                    {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                </g>
                <circle className="fill-brand-accent" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                <g className="fill-brand-black" strokeWidth={5}>
                    {STOPS.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r={13} className={`transition-[stroke] duration-300 ${i === active ? "stroke-brand-accent" : "stroke-brand-blue"}`} />
                    ))}
                </g>
                {!reduceMotion && (
                    <>
                        <ellipse ref={shadowRef} cx={130} cy={144} rx={15} ry={6} className="fill-slate-950" opacity={0} />
                        <g ref={dotRef} transform="translate(130 144)">
                            <circle r={15} className="fill-brand-accent stroke-brand-black" strokeWidth={5} />
                        </g>
                    </>
                )}
                <g className="font-mono" fontSize={24}>
                    {LABELS.map((label, i) => (
                        <text key={i} x={label.x} y={label.y} textAnchor={label.anchor} className={`transition-[fill] duration-300 ${i === active ? "fill-brand-accent" : "fill-slate-300"}`}>
                            <tspan className="fill-brand-blue">0{i + 1}</tspan> {STAGES[i]}
                        </text>
                    ))}
                </g>
            </svg>

            {/* The same four stages as a pipeline readout. The SVG's label already names them for screen readers.
                On phones it sits under the loop instead of over its corner. */}
            <div aria-hidden="true" className="mt-4 w-[calc(100%-8px)] overflow-hidden sm:absolute sm:bottom-[2%] sm:left-0 sm:mt-0 sm:w-[min(280px,72%)] rounded-xl border border-slate-700 bg-brand-black-light font-mono text-xs shadow-[8px_8px_0_var(--color-brand-accent)]">
                <div className="flex items-center gap-1.5 border-b border-brand-line px-3.5 py-2.5 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-brand-accent" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="ml-2">ops-pipeline</span>
                </div>
                <div className="flex flex-col gap-0.5 p-2">
                    {STAGES.map((stage, i) => (
                        <div key={stage} className={`flex items-center justify-between gap-2 rounded-md px-1.5 py-1 transition-colors duration-300 ${i === active ? "bg-brand-accent/15 text-brand-paper" : "text-slate-300"}`}>
                            <span>
                                <span className="text-slate-500">[0{i + 1}]</span> {stage}
                            </span>
                            <span className="flex items-center gap-2">
                                {i === active && <span className="text-brand-accent">● live</span>}
                                <span className="text-brand-mint">✓</span>
                            </span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-brand-line px-3.5 py-2.5 text-brand-accent">
                    {active === null ? "status: looping ↻" : `status: [0${active + 1}] ${STAGES[active]} · live`}
                </div>
            </div>
        </div>
    );
}
