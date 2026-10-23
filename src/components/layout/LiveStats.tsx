"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STATS = [
    ["load", "Load time"],
    ["requests", "Requests"],
    ["size", "Page size"],
    ["elements", "Elements"],
    ["time", "Time on page"],
    ["depth", "Scrolled"],
] as const;
type Key = (typeof STATS)[number][0] | "you" | "capeTown";

function clock(timeZone?: string) {
    try {
        return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    } catch {
        return "--:--";
    }
}

// A bar under the footer that reports this page's own numbers, read in the browser from the
// Performance API: nothing is sent anywhere. It updates once a second by writing text into the
// spans directly, so the page does not re-render. Time on page and scroll depth restart on each page.
// On phones the label stays put and the numbers scroll past in one line, like a news ticker (a second,
// aria-hidden copy makes the loop seamless); wider screens show them as a plain row. See .stats-* in
// globals.css. The dock sits at the bar's right end, so the row keeps clear of it.
export function LiveStats() {
    const pathname = usePathname();
    const spans = useRef<Partial<Record<Key, (HTMLSpanElement | null)[]>>>({});

    useEffect(() => {
        const start = Date.now();
        let deepest = 0;
        const set = (key: Key, value: string) => {
            for (const span of spans.current[key] ?? []) if (span && span.textContent !== value) span.textContent = value;
        };
        const tick = () => {
            const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
            const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
            const bytes = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), navigation?.transferSize || 0);
            const load = navigation && (navigation.loadEventEnd > 0 ? navigation.loadEventEnd : navigation.domContentLoadedEventEnd);
            set("load", load ? `${Math.round(load)} ms` : "—");
            set("requests", String(resources.length + 1));
            set("size", bytes > 0 ? `${Math.round(bytes / 1024)} KB` : "cached");
            set("elements", String(document.getElementsByTagName("*").length));
            const seconds = Math.floor((Date.now() - start) / 1000);
            set("time", `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`);
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            deepest = Math.max(deepest, scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100);
            set("depth", `${deepest}%`);
            set("you", clock());
            set("capeTown", clock("Africa/Johannesburg"));
        };
        tick();
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, [pathname]);

    const value = (key: Key, copy: number, className = "text-brand-paper") => (
        <span ref={(el) => { (spans.current[key] ??= [])[copy] = el; }} className={className}>—</span>
    );
    const items = (copy: number) => (
        <>
            {STATS.map(([key, label]) => (
                <li key={key} className="whitespace-nowrap">
                    {label} {value(key, copy)}
                </li>
            ))}
            <li className="whitespace-nowrap">
                Your time {value("you", copy)} · Cape Town {value("capeTown", copy, "text-brand-accent")}
            </li>
        </>
    );

    return (
        <aside aria-label="Live stats for this page" className="border-t border-slate-800 bg-[#0B1220]">
            <div className="mx-auto flex min-h-[92px] max-w-7xl items-center gap-3 pr-[84px] pl-4 text-xs text-slate-400 sm:pl-6 min-[900px]:gap-6">
                <span className="flex-none text-brand-mint">
                    ● Live stats<span className="hidden min-[900px]:inline"> for this page</span>
                </span>
                <div className="stats-window min-w-0 flex-1 overflow-hidden">
                    <div className="stats-track">
                        <ul className="stats-list flex gap-x-6 gap-y-2.5 pr-6">{items(0)}</ul>
                        <ul aria-hidden="true" className="stats-list stats-copy flex gap-x-6 pr-6">{items(1)}</ul>
                    </div>
                </div>
            </div>
        </aside>
    );
}
