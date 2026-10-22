"use client";

import { useRef } from "react";
import Link from "next/link";
import { STILL_LOG, pinProgress, useMedia, useScrollFrame } from "@/lib/motion";

export type LogEntry = { tag: string; title: string; body: string; foot: string; href?: string };
export type LatestPost = { href: string; date: string; title: string; summary: string };

const card = "relative flex min-h-[340px] w-[min(520px,80vw)] flex-none flex-col gap-4 rounded-[20px] p-8 log-card";

// "Where the method gets tested": on wide, tall screens the section pins and the cards slide sideways
// as you scroll down, with an amber line filling above them. Elsewhere (STILL_LOG) the cards stack.
export function FieldLog({ entries, latest }: { entries: LogEntry[]; latest?: LatestPost }) {
    const still = useMedia(STILL_LOG);
    const wrap = useRef<HTMLElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const fill = useRef<HTMLDivElement>(null);

    useScrollFrame(() => {
        const section = wrap.current, row = track.current;
        if (!section || !panel.current || !row) return;
        if (still) {
            section.style.height = "";
            row.style.transform = "";
            return;
        }
        // The section is one screen tall plus however far the row has to travel.
        const travel = Math.max(0, row.scrollWidth - document.documentElement.clientWidth);
        const height = `${window.innerHeight + travel}px`;
        if (section.style.height !== height) section.style.height = height;
        const progress = pinProgress(section, panel.current);
        row.style.transform = `translateX(${(-progress * travel).toFixed(1)}px)`;
        if (fill.current) fill.current.style.width = `${(progress * 100).toFixed(2)}%`;
    });

    return (
        <section id="log" ref={wrap} className="log-wrap relative scroll-mt-0 bg-brand-paper text-brand-black">
            <div ref={panel} className="log-panel">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6">
                    <p className="font-mono text-xs text-slate-600">03 / field log</p>
                    <h2 className="font-heading text-[clamp(40px,4.6vw,72px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                        Where the method
                        <br />
                        <span className="text-brand-blue-ink">gets tested.</span>
                    </h2>
                </div>
                <div className="relative">
                    <div aria-hidden="true" className="log-line absolute inset-x-0 top-0 h-0.5 bg-slate-300">
                        <div ref={fill} className="h-full w-0 bg-brand-accent-ink" />
                    </div>
                    <div ref={track} className="log-track">
                        {entries.map((entry) => {
                            const body = (
                                <>
                                    <span aria-hidden="true" className="log-dot absolute -top-[49px] left-[30px] h-4 w-4 rounded-full border-[3px] border-brand-paper bg-brand-accent-ink" />
                                    <span className="font-mono text-xs text-brand-blue-text">{entry.tag}</span>
                                    <h3 className="font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.03em]">{entry.title}</h3>
                                    <p className="text-base leading-relaxed text-slate-700">{entry.body}</p>
                                    <span className="mt-auto font-mono text-xs text-slate-600">{entry.foot}</span>
                                </>
                            );
                            const look = `${card} border-2 border-brand-black bg-white text-brand-black`;
                            return entry.href ? (
                                <a key={entry.title} href={entry.href} target="_blank" rel="noopener noreferrer" className={`${look} transition-[translate,box-shadow] duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--color-brand-black)]`}>
                                    {body}
                                </a>
                            ) : (
                                <div key={entry.title} className={look}>{body}</div>
                            );
                        })}
                        {latest && (
                            <Link href={latest.href} className={`${card} bg-brand-black text-brand-paper transition-[translate,box-shadow] duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--color-brand-accent)]`}>
                                <span aria-hidden="true" className="log-dot absolute -top-[49px] left-[30px] h-4 w-4 rounded-full border-[3px] border-brand-paper bg-brand-accent" />
                                <span className="font-mono text-xs text-brand-accent">latest writing · {latest.date}</span>
                                <h3 className="font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.03em]">{latest.title}</h3>
                                <p className="text-base leading-relaxed text-slate-300">{latest.summary}</p>
                                <span className="mt-auto font-mono text-xs text-brand-blue">read the post →</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
