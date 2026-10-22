"use client";

import { useTimeline } from "@/lib/motion";

export type WorkEntry = { tag: string; title: string; body: string };

// The home page's work list, drawn as a git log: an amber line runs down it as you scroll and
// lights each entry's dot.
export function WorkLog({ entries }: { entries: WorkEntry[] }) {
    const { list, line, lit } = useTimeline(entries.length, 0.75);

    return (
        <div ref={list} className="relative">
            <span ref={line} aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-brand-accent" />
            <ol className="flex flex-col gap-8 border-l-2 border-brand-line">
                {entries.map((entry, i) => (
                    <li key={entry.title} className="relative grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-10 gap-y-3 pl-8">
                        <span
                            aria-hidden="true"
                            className={`absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-[3px] border-brand-black transition-colors duration-300 ${i < lit ? "bg-brand-accent" : "bg-slate-700"}`}
                        />
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs text-brand-blue">{entry.tag}</span>
                            <h3 className="font-heading text-2xl font-bold tracking-[-0.02em]">{entry.title}</h3>
                        </div>
                        <p className="text-base leading-relaxed text-slate-300">{entry.body}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
