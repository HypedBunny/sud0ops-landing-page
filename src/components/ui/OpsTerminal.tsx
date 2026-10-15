"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CornerTicks } from "@/components/ui/CornerTicks";

// The engagement model (discover, build, adopt, support) drawn as a pipeline run in a terminal.
const stages = [
    { id: "01", name: "discover", detail: "map how work really moves", state: "done" },
    { id: "02", name: "build", detail: "automate, connect, report", state: "done" },
    { id: "03", name: "adopt", detail: "train the team on it", state: "done" },
    { id: "04", name: "support", detail: "tune it as you grow", state: "running" },
] as const;

export function OpsTerminal() {
    const reduceMotion = useReducedMotion();
    // Each line prints a beat after the last; with reduced motion everything shows at once.
    const line = (step: number) =>
        reduceMotion
            ? {}
            : {
                  initial: { opacity: 0, x: -6 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.25, delay: 0.5 + step * 0.35 },
              };

    return (
        <div className="relative border border-brand-line bg-brand-black-light font-mono text-[13px] leading-relaxed">
            <CornerTicks />
            <div className="flex items-center justify-between border-b border-brand-line px-4 py-2.5 text-xs text-slate-500">
                <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 bg-brand-line" />
                    <span className="h-2.5 w-2.5 bg-brand-line" />
                    <span className="h-2.5 w-2.5 bg-brand-accent" />
                </span>
                <span>sud0ops ~ ops-pipeline</span>
            </div>
            <div className="space-y-2 p-5 sm:p-6">
                <motion.p {...line(0)} className="text-slate-300">
                    <span className="text-brand-accent">$</span> sudo ops run --team yours
                </motion.p>
                {stages.map((stage, i) => (
                    <motion.p {...line(i + 1)} key={stage.id} className="grid grid-cols-[auto_5.5rem_1fr_auto] items-baseline gap-x-3 text-slate-400">
                        <span className="text-slate-600">[{stage.id}]</span>
                        <span className="text-brand-paper">{stage.name}</span>
                        <span className="hidden truncate sm:inline">{stage.detail}</span>
                        <span className={`justify-self-end ${stage.state === "done" ? "text-brand-mint" : "text-brand-accent"}`}>
                            {stage.state === "done" ? "✓ done" : "● running"}
                        </span>
                    </motion.p>
                ))}
                <motion.p {...line(stages.length + 1)} className="border-t border-dashed border-brand-line pt-3 text-brand-accent">
                    [status: systems optimised]
                    <span className="ml-1 animate-[pulse_1s_ease-in-out_infinite]" aria-hidden="true">_</span>
                </motion.p>
            </div>
        </div>
    );
}
