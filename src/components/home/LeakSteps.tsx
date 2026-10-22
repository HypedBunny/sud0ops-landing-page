"use client";

import { useRef, useState } from "react";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { STILL_PIN, pinProgress, seg, useMedia, useScrollFrame } from "@/lib/motion";

// The four core services, each framed as the problem a team has today and what changes after.
const leaks = [
    {
        title: "Workflow automation",
        before: "Your team re-types the same details from email into spreadsheets, invoices and follow-ups, every day.",
        after: "Repetitive steps run on their own. People step in only where a decision needs a person.",
    },
    {
        title: "Tool integration",
        before: "Your CRM, billing, project and messaging tools each hold a different version of the truth.",
        after: "Data moves between your tools without copy and paste, so every system shows the same picture.",
    },
    {
        title: "AI assistants",
        before: "Questions queue up for the one senior person who knows where everything is.",
        after: "An internal assistant answers from your own documents and data, so the team keeps moving.",
    },
    {
        title: "Operational dashboards",
        before: "Reports get rebuilt by hand each week and are out of date by the time anyone reads them.",
        after: "One live view of your KPIs, pipeline and operations, ready whenever you need it.",
    },
];
// ZERO_PATHS runs top-left, top-right, bottom-left, bottom-right; the fixes fill them clockwise.
const CLOCKWISE = [0, 1, 3, 2];
// Where each piece starts and ends, in degrees clockwise from 12 o'clock around the dot (ZERO_PATHS order).
const SPAN = [[-65, 5], [1, 134], [-177, -46], [115, 187]];

// A wedge from the dot's centre, `sweep` degrees wide starting `from` degrees clockwise from 12 o'clock.
// Drawn as two arcs so a full turn still closes.
function wedge(from: number, sweep: number) {
    if (sweep <= 0) return "";
    const { cx, cy } = ZERO_DOT, r = 600;
    const at = (deg: number) => `${(cx + r * Math.sin((deg * Math.PI) / 180)).toFixed(1)} ${(cy - r * Math.cos((deg * Math.PI) / 180)).toFixed(1)}`;
    return `M ${cx} ${cy} L ${at(from)} A ${r} ${r} 0 0 1 ${at(from + sweep / 2)} A ${r} ${r} 0 0 1 ${at(from + sweep)} Z`;
}

// "The leaks": the section pins and shows one leak per screen of scrolling, the problem first, then the
// fix. Beside it a grey 0 is built up like a loader: as you scroll, each leak's piece fills blue in a
// clockwise sweep (on the last leak the amber dot follows), and the fix shows once it is full. The full
// list is always in the page (screen-reader-only while pinned, the visible layout when still); the
// moving panel is aria-hidden.
export function LeakSteps() {
    const still = useMedia(STILL_PIN);
    const wrap = useRef<HTMLElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const sweeps = useRef<(SVGPathElement | null)[]>([]);
    const dotSweep = useRef<SVGPathElement>(null);
    const bars = useRef<(HTMLSpanElement | null)[]>([]);
    const readout = useRef<HTMLSpanElement>(null);
    const [view, setView] = useState({ step: 0, after: false });

    useScrollFrame(() => {
        if (still || !wrap.current || !panel.current) return;
        const progress = Math.min(pinProgress(wrap.current, panel.current) * leaks.length, leaks.length - 0.001);
        const step = Math.floor(progress), local = progress - step, last = step === leaks.length - 1;
        // The current fix loads over the first half of its stretch; on the last leak the piece takes the
        // first part of that and the dot the rest.
        const load = seg(local, 0.04, 0.5);
        const piece = last ? seg(local, 0.04, 0.34) : load;
        CLOCKWISE.forEach((p, k) => {
            const [from, to] = SPAN[p];
            sweeps.current[p]?.setAttribute("d", wedge(from, (to - from) * (k < step ? 1 : k === step ? piece : 0)));
            const bar = bars.current[k];
            if (bar) bar.style.scale = `${k < step ? 1 : k === step ? load : 0} 1`;
        });
        dotSweep.current?.setAttribute("d", wedge(0, last ? 360 * seg(local, 0.34, 0.5) : 0));
        if (readout.current) readout.current.textContent = `fixing… ${Math.round(load * 100)}%`;
        const after = load === 1;
        if (step !== view.step || after !== view.after) setView({ step, after });
    });

    const leak = leaks[view.step];

    return (
        <section id="leaks" ref={wrap} className="pin-wrap pin-wrap-leaks scroll-mt-0 bg-brand-paper text-brand-black">
            {/* Older links (emails) point at #services. */}
            <span id="services" aria-hidden="true" className="absolute top-0" />
            <div ref={panel} className="pin-panel">
                <div className="pin-sr">
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6">
                        <p className="font-mono text-xs text-slate-600">01 / the leaks</p>
                        <h2 className="font-heading text-[clamp(40px,4.6vw,72px)] leading-[0.95] font-extrabold tracking-[-0.05em]">Four leaks I fix</h2>
                        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-8">
                            {leaks.map((item, i) => (
                                <li key={item.title} className="flex flex-col gap-3">
                                    <span className="font-mono text-xs text-slate-600">0{i + 1} / 04</span>
                                    <h3 className="font-heading text-2xl font-extrabold tracking-[-0.03em]">{item.title}</h3>
                                    <p className="text-base leading-relaxed text-slate-600"><span className="font-mono text-xs text-brand-accent-text">Before: </span>{item.before}</p>
                                    <p className="text-base leading-relaxed font-semibold"><span className="font-mono text-xs text-brand-blue-text">After: </span>{item.after}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div aria-hidden="true" className="pin-motion mx-auto grid h-full max-w-7xl content-center gap-6 px-4 pb-[88px] sm:px-6 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[900px]:items-center min-[900px]:gap-12 min-[900px]:pb-0">
                    <div className="flex h-[18svh] justify-center min-[900px]:h-[58svh]">
                        <svg viewBox="49 63 600 760" className="h-full w-auto overflow-visible">
                            <defs>
                                {ZERO_PATHS.map((d, p) => (
                                    <clipPath key={d} id={`leak-fill-${p}`}>
                                        <path ref={(el) => { sweeps.current[p] = el; }} />
                                    </clipPath>
                                ))}
                                <clipPath id="leak-fill-dot">
                                    <path ref={dotSweep} />
                                </clipPath>
                            </defs>
                            <g className="fill-slate-400">
                                {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
                            </g>
                            <g className="fill-brand-blue-ink">
                                {ZERO_PATHS.map((d, p) => <path key={d} d={d} clipPath={`url(#leak-fill-${p})`} />)}
                            </g>
                            <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} className="fill-slate-300" />
                            <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} clipPath="url(#leak-fill-dot)" className="fill-brand-accent-ink" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-5 min-[900px]:gap-[26px]">
                        <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-slate-600">
                            <span>01 / the leaks</span>
                            <span>
                                <span className="font-heading text-[40px] font-extrabold tracking-[-0.03em] text-brand-black">0{view.step + 1}</span> / 04
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {leaks.map((item, i) => (
                                <span key={item.title} className="h-[5px] overflow-hidden rounded-full bg-slate-300">
                                    <span ref={(el) => { bars.current[i] = el; }} className="block h-full origin-left scale-x-0 bg-brand-accent-ink" />
                                </span>
                            ))}
                        </div>
                        <p className="font-heading text-[38px] leading-[0.95] font-extrabold tracking-[-0.05em] min-[900px]:text-[clamp(44px,5.4vw,88px)]">{leak.title}</p>
                        <div className="flex flex-col gap-3.5">
                            <p className={`grid grid-cols-[70px_minmax(0,1fr)] gap-3 text-[15px] leading-normal transition-colors duration-500 min-[900px]:text-lg ${view.after ? "text-slate-500" : "text-brand-black"}`}>
                                <span className="pt-1 font-mono text-xs text-brand-accent-text">− before</span>
                                <span className={view.after ? "line-through decoration-brand-accent-ink decoration-2" : ""}>{leak.before}</span>
                            </p>
                            <p className="grid grid-cols-[70px_minmax(0,1fr)] gap-3 text-base leading-normal font-semibold min-[900px]:text-xl">
                                <span className="pt-1.5 font-mono text-xs text-brand-blue-text">+ after</span>
                                <span className="grid">
                                    <span ref={readout} className={`col-start-1 row-start-1 pt-1.5 font-mono text-xs font-normal text-slate-600 transition-opacity duration-300 ${view.after ? "opacity-0" : "opacity-100"}`}>
                                        fixing… 0%
                                    </span>
                                    <span className={`col-start-1 row-start-1 transition-[opacity,translate] duration-500 ${view.after ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}`}>{leak.after}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
