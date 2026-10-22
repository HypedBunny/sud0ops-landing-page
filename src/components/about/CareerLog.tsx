"use client";

import { useTimeline } from "@/lib/motion";

export type CareerEntry = { period: string; place: string; role: string; company: string; blurb: string };

// The founder's career as a git log, oldest first. Entries brighten as the amber line reaches them;
// the newest one reached gets the amber dot.
export function CareerLog({ entries }: { entries: CareerEntry[] }) {
    const { list, line, lit } = useTimeline(entries.length, 0.8);

    return (
        <div ref={list} className="relative">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-slate-300" />
            <span ref={line} aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top scale-y-0 bg-brand-accent-ink" />
            <ol className="flex flex-col gap-9">
                {entries.map((entry, i) => {
                    const on = i < lit;
                    const head = i === lit - 1;
                    return (
                        <li key={entry.role + entry.company} className={`relative flex flex-col gap-2 pl-11 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-40"}`}>
                            <span
                                aria-hidden="true"
                                className={`absolute top-1 left-0 h-4 w-4 rounded-full border-[3px] border-brand-paper transition-[background-color,box-shadow] duration-300 ${head ? "bg-brand-accent" : on ? "bg-brand-accent-ink" : "bg-brand-paper"} ${on ? "shadow-[0_0_0_2px_var(--color-brand-accent-ink)]" : "shadow-[0_0_0_2px_#CBD5E1]"}`}
                            />
                            <span className="font-mono text-xs text-slate-600">
                                {entry.period} · {entry.place}
                            </span>
                            <h3 className="font-heading text-2xl leading-tight font-extrabold tracking-[-0.02em]">
                                {entry.role} <span className="text-brand-blue-ink">@ {entry.company}</span>
                            </h3>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-700">{entry.blurb}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
