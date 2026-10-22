"use client";

import { useRef } from "react";
import { useReducedMotion, useScrollFrame } from "@/lib/motion";

export type Rule = { title: string; body: string };

// Each rule is brightest as it passes the middle of the screen and fades towards the edges, so the page
// reads one rule at a time. The fade bottoms out at 65%, where the text still passes WCAG AA contrast.
// With reduced motion they stay at full strength.
export function RulesList({ rules }: { rules: Rule[] }) {
    const reduceMotion = useReducedMotion();
    const items = useRef<(HTMLLIElement | null)[]>([]);

    useScrollFrame(() => {
        const half = window.innerHeight / 2;
        for (const item of items.current) {
            if (!item) continue;
            if (reduceMotion) {
                item.style.opacity = "";
                continue;
            }
            const box = item.getBoundingClientRect();
            const distance = Math.min(1, Math.abs(box.top + box.height / 2 - half) / half);
            item.style.opacity = (1 - distance * 0.35).toFixed(3);
        }
    });

    return (
        <ol className="flex flex-col">
            {rules.map((rule, i) => (
                <li
                    key={rule.title}
                    ref={(el) => { items.current[i] = el; }}
                    className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-3 border-t border-slate-800 py-9 min-[900px]:grid-cols-[80px_minmax(0,1fr)_minmax(0,420px)] min-[900px]:gap-x-10"
                >
                    <span className="font-mono text-sm text-brand-accent">0{i + 1}</span>
                    <h3 className="font-heading text-[clamp(30px,3.6vw,56px)] leading-none font-extrabold tracking-[-0.04em]">{rule.title}</h3>
                    <p className="col-start-2 text-base leading-relaxed text-slate-300 min-[900px]:col-start-3">{rule.body}</p>
                </li>
            ))}
        </ol>
    );
}
