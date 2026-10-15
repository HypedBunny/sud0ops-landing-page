"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "html" | "md";

// Switches a post between the rendered article (children) and its markdown, with a copy button.
export function PostView({ markdown, toolbarStart, children }: {
    markdown: string;
    toolbarStart: React.ReactNode;
    children: React.ReactNode;
}) {
    const [view, setView] = useState<View>("html");
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(markdown);
        } catch {
            // Clipboard API blocked (insecure context or permissions): fall back to a hidden textarea.
            const area = document.createElement("textarea");
            area.value = markdown;
            area.style.position = "fixed";
            area.style.opacity = "0";
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            area.remove();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4 sm:px-8">
                {toolbarStart}
                <div className="flex items-center gap-2">
                    <div role="group" aria-label="Post format" className="inline-flex rounded-md bg-white/5 p-1 ring-1 ring-white/10">
                        {(["html", "md"] as const).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setView(option)}
                                aria-pressed={view === option}
                                className={cn(
                                    "rounded px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer",
                                    view === option
                                        ? "bg-brand-accent text-brand-black"
                                        : "text-slate-400 hover:text-white",
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={copy}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md bg-brand-accent/10 px-3 text-xs font-medium text-brand-accent ring-1 ring-brand-accent/30 transition-all hover:bg-brand-accent/20 hover:ring-brand-accent/50 cursor-pointer"
                    >
                        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                        {copied ? "Copied" : "Copy MD"}
                    </button>
                    <span className="sr-only" aria-live="polite">{copied ? "Markdown copied to clipboard" : ""}</span>
                </div>
            </div>

            <div className="px-5 py-8 sm:px-10 sm:py-12">
                {/* The article stays in the DOM while hidden so the page reads the same to crawlers. */}
                <div hidden={view !== "html"}>{children}</div>
                {view === "md" && (
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md border border-white/10 bg-brand-black/80 p-5 font-mono text-[13px] leading-relaxed text-slate-300 sm:p-6">
                        {markdown}
                    </pre>
                )}
            </div>
        </>
    );
}
