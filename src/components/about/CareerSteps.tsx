"use client";

import { useRef, useState } from "react";
import { STILL_PIN, pinProgress, useMedia, useScrollFrame } from "@/lib/motion";

export type CareerEntry = { year: string; period: string; place: string; role: string; company: string; blurb: string };

// "The journey": the section pins and shows one role per stretch of scrolling, oldest first, with the
// year large on the left. The full list is always in the page (screen-reader-only while pinned, the
// visible layout when still); the moving panel is aria-hidden.
export function CareerSteps({ entries }: { entries: CareerEntry[] }) {
    const still = useMedia(STILL_PIN);
    const wrap = useRef<HTMLElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);

    useScrollFrame(() => {
        if (still || !wrap.current || !panel.current) return;
        const next = Math.min(entries.length - 1, Math.floor(pinProgress(wrap.current, panel.current) * entries.length));
        if (next !== step) setStep(next);
    });

    const entry = entries[step];

    return (
        <section ref={wrap} className="pin-wrap pin-wrap-career bg-brand-paper text-brand-black">
            <div ref={panel} className="pin-panel">
                <div className="pin-sr">
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6">
                        <p className="font-mono text-xs text-slate-600">02 / the journey</p>
                        <h2 className="font-heading text-[clamp(40px,4.6vw,68px)] leading-[0.95] font-extrabold tracking-[-0.05em]">Six roles, oldest first</h2>
                        <ol className="flex flex-col gap-9">
                            {entries.map((item) => (
                                <li key={item.role + item.company} className="flex max-w-3xl flex-col gap-2">
                                    <span className="font-mono text-xs text-slate-600">{item.period} · {item.place}</span>
                                    <h3 className="font-heading text-2xl leading-tight font-extrabold tracking-[-0.02em]">
                                        {item.role} <span className="text-brand-blue-ink">@ {item.company}</span>
                                    </h3>
                                    <p className="text-base leading-relaxed text-slate-700">{item.blurb}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div aria-hidden="true" className="pin-motion mx-auto grid h-full max-w-7xl content-center gap-5 px-4 pb-[88px] sm:px-6 min-[900px]:grid-cols-2 min-[900px]:items-center min-[900px]:gap-14 min-[900px]:pb-0">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono text-xs text-slate-600">02 / the journey</p>
                        <p className="font-heading text-[clamp(88px,17vw,260px)] leading-[0.82] font-extrabold tracking-[-0.06em]">{entry.year}</p>
                        <div className="grid max-w-[420px] grid-cols-6 gap-1.5">
                            {entries.map((item, i) => (
                                <span key={item.role + item.company} className={`h-[5px] rounded-full transition-colors duration-300 ${i <= step ? "bg-brand-accent-ink" : "bg-slate-300"}`} />
                            ))}
                        </div>
                    </div>
                    <div className="flex max-w-[560px] flex-col gap-3 min-[900px]:gap-[18px]">
                        <span className="font-mono text-xs text-slate-600">Step 0{step + 1} of 0{entries.length} · {entry.period} · {entry.place}</span>
                        <p className="font-heading text-[clamp(30px,4vw,60px)] leading-none font-extrabold tracking-[-0.045em]">{entry.role}</p>
                        <p className="font-mono text-[15px] text-brand-blue-text">@ {entry.company}</p>
                        <p className="text-base leading-relaxed text-slate-700 min-[900px]:text-lg">{entry.blurb}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
