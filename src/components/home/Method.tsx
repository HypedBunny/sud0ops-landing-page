"use client";

import { useRef, useState } from "react";
import { ZeroMark } from "@/components/ui/ZeroMark";
import { pinProgress, useScrollFrame } from "@/lib/motion";

// How an engagement runs, as four stages.
const stages = [
    {
        key: "discover",
        title: "Discover the right technology",
        outcome: "know what to buy before you buy it",
        items: [
            "Understand what your team actually needs",
            "Find the tools that overlap or go unused",
            "Honest advice on what to keep, add or drop",
            "A plan that fits your budget and skills",
        ],
    },
    {
        key: "build",
        title: "Implement and build",
        outcome: "from plan to working systems",
        items: [
            "Set up, configure and connect your tools",
            "Custom automations and internal tools where they help",
            "We do the build work ourselves",
            "Stable and documented, so it lasts",
        ],
    },
    {
        key: "adopt",
        title: "Help your team adapt",
        outcome: "technology your team uses every day",
        items: [
            "Hands-on onboarding for your people",
            "Explanations in plain English",
            "Training paced to your team",
            "Your team can run the tools without us",
        ],
    },
    {
        key: "support",
        title: "Support and keep improving",
        outcome: "help when you need it",
        items: [
            "Support when things change or break",
            "Tune and improve systems as you grow",
            "Someone to call after the project ends",
        ],
    },
];

const smooth = (x: number) => {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
};
// A point `share` of the way along the rail, which lines up with the card grid (gap 16px, padding 24px).
const railAt = (share: number) => `calc((100% + 16px) * ${share.toFixed(4)} + 24px)`;

// "Operations over theory": the section pins while you scroll; a dot runs along the rail and lights
// each stage's card in turn. Small screens drop the rail and light the cards as they pass.
export function Method() {
    const wrapRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);
    const fillRef = useRef<HTMLSpanElement>(null);
    const [active, setActive] = useState(0);

    useScrollFrame(() => {
        if (!wrapRef.current || !panelRef.current) return;
        const progress = Math.min(pinProgress(wrapRef.current, panelRef.current) * 4, 3.999);
        const stage = Math.floor(progress);
        // The dot rests on each stage, then glides to the next over the last stretch of it.
        const position = stage < 3 ? stage + smooth((progress - stage - 0.55) / 0.4) : 3;
        if (dotRef.current) dotRef.current.style.left = railAt(position / 4);
        if (fillRef.current) fillRef.current.style.width = `calc((100% + 16px) * ${(position / 4).toFixed(4)})`;
        setActive(Math.floor(position + 0.02));
    });

    return (
        <section id="loop" ref={wrapRef} className="pin-wrap-method relative scroll-mt-4 bg-brand-black">
            <div ref={panelRef} className="pin-panel overflow-hidden">
                <ZeroMark pieces="fill-brand-blue" dot="fill-brand-blue" className="pointer-events-none absolute -top-16 -right-32 h-auto w-[620px] opacity-[0.06]" />
                <div className="relative mx-auto flex max-w-7xl flex-col gap-9 px-4 py-[72px] sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-7">
                        <div className="flex flex-col gap-4">
                            <p className="font-mono text-xs text-slate-400">02 / the method</p>
                            <h2 className="font-heading text-[clamp(38px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em]">
                                Operations
                                <br />
                                <span className="text-brand-accent">over theory.</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-[17px] leading-relaxed text-slate-300">
                            Each engagement runs in four stages, the four pieces of the 0 in our logo. Support feeds the next round of discovery, so the work keeps improving after launch.
                        </p>
                    </div>

                    <div aria-hidden="true" className="relative hidden h-[22px] min-[1080px]:block">
                        <span className="absolute top-2.5 right-0 left-6 h-0.5 bg-slate-700" />
                        <span ref={fillRef} className="absolute top-2.5 left-6 h-0.5 w-0 bg-brand-accent" />
                        {stages.map((stage, i) => (
                            <span
                                key={stage.key}
                                className={`absolute top-1 -ml-[7px] h-3.5 w-3.5 rounded-full border-2 bg-brand-black transition-colors ${i <= active ? "border-brand-accent" : "border-slate-600"}`}
                                style={{ left: railAt(i / 4) }}
                            />
                        ))}
                        <span ref={dotRef} className="absolute top-0 left-6 -ml-[11px] h-[22px] w-[22px] rounded-full border-4 border-brand-black bg-brand-accent shadow-[0_0_0_2px_var(--color-brand-accent)]" />
                    </div>

                    <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
                        {stages.map((stage, i) => {
                            const on = i === active;
                            const done = i < active;
                            return (
                                <li
                                    key={stage.key}
                                    className={`flex flex-col gap-3.5 rounded-[14px] border p-6 transition-[background-color,color,border-color,transform] duration-300 ${on ? "-translate-y-2 border-brand-accent bg-brand-accent text-brand-black" : "border-brand-line bg-brand-black-light text-brand-paper"}`}
                                >
                                    <div className={`flex justify-between font-mono text-xs font-bold ${on ? "text-brand-black" : "text-slate-400"}`}>
                                        <span>[0{i + 1}] {stage.key}</span>
                                        <span className={on ? "text-brand-black" : done ? "text-brand-mint" : "text-slate-400"}>
                                            {on ? "● running" : done ? "✓ done" : "○ queued"}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-[22px] leading-tight font-extrabold">{stage.title}</h3>
                                    <p className={`font-mono text-xs ${on ? "text-brand-black" : "text-brand-blue"}`}>{stage.outcome}</p>
                                    <ul className={`flex flex-col gap-2.5 text-sm leading-normal ${on ? "text-brand-black" : "text-slate-300"}`}>
                                        {stage.items.map((item) => (
                                            <li key={item} className="flex gap-2.5">
                                                <span aria-hidden="true" className={on ? "text-brand-black" : "text-brand-accent"}>›</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    {i === stages.length - 1 && (
                                        <p className={`mt-auto border-t pt-3.5 font-mono text-xs font-bold ${on ? "border-brand-black/25" : "border-brand-line"}`}>↻ loops back to [01]</p>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}
