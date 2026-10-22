"use client";

import { useRef, useState } from "react";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { STILL_PIN, easeInOut, pinProgress, placePiece, seg, useMedia, useScrollFrame } from "@/lib/motion";

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
// Where each piece of the broken 0 sits (icon units and degrees), in ZERO_PATHS order.
const BROKEN = [[-46, -40, -9], [46, -34, 8], [-42, 40, 7], [48, 38, -10]];

// "The leaks": the section pins and shows one leak per screen of scrolling. Each starts as a broken 0
// with the problem, then the 0 clicks together and the fix appears. The full list is always in the
// page (screen-reader-only while pinned, the visible layout when still); the moving panel is aria-hidden.
export function LeakSteps() {
    const still = useMedia(STILL_PIN);
    const wrap = useRef<HTMLElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const pieces = useRef<(SVGPathElement | null)[]>([]);
    const [view, setView] = useState({ step: 0, after: false });

    useScrollFrame(() => {
        if (still || !wrap.current || !panel.current) return;
        const progress = Math.min(pinProgress(wrap.current, panel.current) * 4, 3.999);
        const step = Math.floor(progress), local = progress - step;
        const apart = 1 - easeInOut(seg(local, 0.12, 0.55));
        pieces.current.forEach((piece, i) => placePiece(piece, BROKEN[i][0] * apart, BROKEN[i][1] * apart, BROKEN[i][2] * apart));
        const after = local > 0.56;
        if (step !== view.step || after !== view.after) setView({ step, after });
    });

    const leak = leaks[view.step];
    const fixed = (i: number) => i < view.step || (i === view.step && view.after);

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
                            {ZERO_PATHS.map((d, i) => (
                                <path key={d} ref={(el) => { pieces.current[i] = el; }} d={d} className={`transition-[fill] duration-300 ${view.after ? "fill-brand-blue-ink" : "fill-slate-400"}`} />
                            ))}
                            <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} className={`transition-[fill] duration-300 ${view.after ? "fill-brand-accent-ink" : "fill-slate-300"}`} />
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
                                <span key={item.title} className={`h-[5px] rounded-full transition-colors duration-300 ${fixed(i) ? "bg-brand-accent-ink" : "bg-slate-300"}`} />
                            ))}
                        </div>
                        <p className="font-heading text-[38px] leading-[0.95] font-extrabold tracking-[-0.05em] min-[900px]:text-[clamp(44px,5.4vw,88px)]">{leak.title}</p>
                        <div className="flex flex-col gap-3.5">
                            <p className={`grid grid-cols-[70px_minmax(0,1fr)] gap-3 text-[15px] leading-normal transition-colors duration-500 min-[900px]:text-lg ${view.after ? "text-slate-500" : "text-brand-black"}`}>
                                <span className="pt-1 font-mono text-xs text-brand-accent-text">− before</span>
                                <span className={view.after ? "line-through decoration-brand-accent-ink decoration-2" : ""}>{leak.before}</span>
                            </p>
                            <p className={`grid grid-cols-[70px_minmax(0,1fr)] gap-3 text-base leading-normal font-semibold transition-[opacity,translate] duration-500 min-[900px]:text-xl ${view.after ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}`}>
                                <span className="pt-1.5 font-mono text-xs text-brand-blue-text">+ after</span>
                                <span>{leak.after}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
