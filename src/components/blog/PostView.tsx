"use client";

import { useRef, useState } from "react";
import { useScrollFrame } from "@/lib/motion";

type View = "page" | "md";

// A blog post: the dark header (with the page/.md switch and a copy button), a reading progress bar,
// and the light body with the contents list beside the article. The .md view swaps the rendered
// article (children) for the post's markdown.
export function PostView({ markdown, header, byline, contents, footer, children }: {
    markdown: string;
    header: React.ReactNode;
    byline: React.ReactNode;
    contents?: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}) {
    const [view, setView] = useState<View>("page");
    const [copied, setCopied] = useState(false);
    const bodyRef = useRef<HTMLElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useScrollFrame(() => {
        const body = bodyRef.current;
        if (!body || !barRef.current) return;
        const rect = body.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        // `scale`, not `transform`: the bar starts from Tailwind's scale-x-0, which sets the scale property.
        barRef.current.style.scale = `${progress.toFixed(4)} 1`;
    });

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
        <div>
            <div aria-hidden="true" className="sticky top-0 z-10 h-1 bg-slate-800">
                <div ref={barRef} className="h-full origin-left scale-x-0 bg-brand-accent" />
            </div>

            <section>
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-14 pb-16 sm:px-6">
                    {header}
                    <div className="flex flex-wrap items-center justify-between gap-5 border-t border-brand-line pt-3">
                        {byline}
                        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                            <div role="group" aria-label="Post format" className="flex gap-1 rounded-full border border-brand-line bg-brand-black-light p-1">
                                {(["page", "md"] as const).map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setView(option)}
                                        aria-pressed={view === option}
                                        className={`min-h-9 cursor-pointer rounded-full px-4 transition-colors ${view === option ? "bg-brand-accent text-brand-black" : "text-slate-300 hover:text-brand-paper"}`}
                                    >
                                        {option === "md" ? ".md" : option}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={copy}
                                className="min-h-11 cursor-pointer rounded-full border border-slate-600 px-4 text-slate-300 transition-colors hover:border-brand-paper hover:text-brand-paper"
                            >
                                {copied ? "✓ copied" : "copy as markdown"}
                            </button>
                            <span className="sr-only" aria-live="polite">{copied ? "Markdown copied to clipboard" : ""}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={bodyRef} className="bg-brand-paper text-brand-black">
                <div className="mx-auto flex max-w-7xl items-start gap-12 px-4 pt-16 pb-[88px] sm:px-6">
                    {contents && <aside className="sticky top-7 hidden max-w-[260px] flex-[1_1_200px] lg:block">{contents}</aside>}
                    <article className="max-w-[720px] min-w-0 flex-[999_1_560px]">
                        {/* The article stays in the DOM while hidden so the page reads the same to crawlers. */}
                        <div hidden={view !== "page"}>{children}</div>
                        {view === "md" && (
                            <pre className="overflow-x-auto rounded-2xl bg-brand-black p-6 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-slate-300 [overflow-wrap:anywhere] sm:p-7 sm:text-sm">
                                {markdown}
                            </pre>
                        )}
                        {footer}
                    </article>
                </div>
            </section>
        </div>
    );
}
