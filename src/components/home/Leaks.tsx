"use client";

import { useRef, useState } from "react";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { ZeroMark } from "@/components/ui/ZeroMark";
import { pinProgress, useScrollFrame } from "@/lib/motion";

// The four core services, each framed as the problem a team has today and what changes after.
// `was` and `now` are the short readouts beside each card's 0.
const leaks = [
    {
        title: "Workflow automation",
        was: "re-typed by hand,\nevery day",
        now: "0 details\nre-typed by hand",
        before: "Your team re-types the same details from email into spreadsheets, invoices and follow-ups, every day.",
        after: "Repetitive steps run on their own. People step in only where a decision needs a person.",
    },
    {
        title: "Tool integration",
        was: "4 tools,\n4 versions of the truth",
        now: "0 copy-paste\nbetween tools",
        before: "Your CRM, billing, project and messaging tools each hold a different version of the truth.",
        after: "Data moves between your tools without copy and paste, so every system shows the same picture.",
    },
    {
        title: "AI assistants",
        was: "one person\nknows where it is",
        now: "0 questions\nstuck in a queue",
        before: "Questions queue up for the one senior person who knows where everything is.",
        after: "An internal assistant answers from your own documents and data, so the team keeps moving.",
    },
    {
        title: "Operational dashboards",
        was: "rebuilt by hand,\nweekly",
        now: "0 reports\nrebuilt by hand",
        before: "Reports get rebuilt by hand each week and are out of date by the time anyone reads them.",
        after: "One live view of your KPIs, pipeline and operations, ready whenever you need it.",
    },
];

// Where each piece of a broken 0 drifts to.
const SCATTER = [
    "translate(-70px,-60px) rotate(-10deg)",
    "translate(70px,-50px) rotate(9deg)",
    "translate(-64px,60px) rotate(8deg)",
    "translate(72px,58px) rotate(-11deg)",
];

// "What we fix": the section pins while you scroll through it, and each problem in turn flips to
// its fix as its 0 clicks back together. Both texts stay in the page; the hidden one is screen-reader only.
export function Leaks() {
    const wrapRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [fixed, setFixed] = useState(0);

    useScrollFrame(() => {
        if (!wrapRef.current || !panelRef.current) return;
        const progress = pinProgress(wrapRef.current, panelRef.current) * leaks.length;
        setFixed(leaks.filter((_, i) => progress > i + 0.5).length);
    });

    return (
        <section id="services" ref={wrapRef} className="pin-wrap-leaks scroll-mt-4 bg-brand-paper text-brand-black">
            <div ref={panelRef} className="pin-panel bg-brand-paper">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-14 pb-16 sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-7">
                        <div className="flex max-w-2xl flex-col gap-4">
                            <p className="font-mono text-xs text-slate-600">01 / what we fix</p>
                            <h2 className="font-heading text-[clamp(38px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em]">
                                Four leaks.
                                <br />
                                Driven to{" "}
                                <ZeroMark label="zero" pieces="fill-brand-blue-ink" dot="fill-brand-accent-ink" className="inline-block h-[0.74em] w-auto align-[-0.02em]" />.
                            </h2>
                            <p className="max-w-xl text-[17px] leading-relaxed text-slate-600">
                                The places growing teams lose the most time, and what each one looks like once it is fixed.
                            </p>
                        </div>
                        <div aria-hidden="true" className="flex min-w-56 flex-col gap-2.5 font-mono">
                            <div className="flex items-baseline justify-between text-xs text-slate-600">
                                <span>fixed</span>
                                <span className="font-heading text-[40px] font-extrabold tracking-[-0.03em] text-brand-black">
                                    {fixed}
                                    <span className="text-slate-400">/{leaks.length}</span>
                                </span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                                {leaks.map((leak, i) => (
                                    <span key={leak.title} className={`h-1.5 rounded-full transition-colors duration-300 ${i < fixed ? "bg-brand-accent" : "bg-slate-300"}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* gap-px over a line-coloured background draws the grid lines between cells. */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-px overflow-hidden rounded-2xl border border-slate-300 bg-slate-300">
                        {leaks.map((leak, i) => {
                            const done = i < fixed;
                            return (
                                <article key={leak.title} className={`flex flex-col gap-5 p-6 transition-colors duration-500 ${done ? "bg-white" : "bg-slate-100"}`}>
                                    <div className="flex items-center gap-3.5">
                                        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-[10px] bg-brand-black font-mono text-sm font-bold text-brand-accent">
                                            0{i + 1}
                                        </span>
                                        <div className="flex flex-col gap-0.5">
                                            <span aria-hidden="true" className="font-mono text-[11px] text-slate-600">{done ? "after" : "before"}</span>
                                            <h3 className="font-heading text-[22px] font-bold tracking-[-0.02em]">{leak.title}</h3>
                                        </div>
                                    </div>
                                    <div aria-hidden="true" className="flex items-center gap-6">
                                        <svg viewBox="-20 0 740 880" className="h-auto w-[76px] flex-none overflow-visible">
                                            {ZERO_PATHS.map((d, p) => (
                                                <path key={d} d={d} className={`zero-piece ${done ? "fill-brand-blue-ink" : "fill-slate-400"}`} style={{ transform: done ? "none" : SCATTER[p] }} />
                                            ))}
                                            <circle cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} className={`zero-piece ${done ? "fill-brand-accent-ink" : "fill-slate-300"}`} />
                                        </svg>
                                        <p className="font-mono text-[13px] leading-normal whitespace-pre-line text-slate-600">{done ? leak.now : leak.was}</p>
                                    </div>
                                    <p className={done ? "sr-only" : "text-[15px] leading-relaxed text-slate-600"}>
                                        <span className="sr-only">Before: </span>
                                        {leak.before}
                                    </p>
                                    <p className={done ? "text-[15px] leading-relaxed text-brand-black" : "sr-only"}>
                                        <span className="sr-only">After: </span>
                                        {leak.after}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
