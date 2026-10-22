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

// A strip above the footer that reports this page's own numbers, read in the browser from the
// Performance API: nothing is sent anywhere. It updates once a second by writing text into the
// spans directly, so the page does not re-render. Time on page and scroll depth restart on each page.
export function LiveStats() {
    const pathname = usePathname();
    const spans = useRef<Partial<Record<Key, HTMLSpanElement | null>>>({});

    useEffect(() => {
        const start = Date.now();
        let deepest = 0;
        const set = (key: Key, value: string) => {
            const span = spans.current[key];
            if (span && span.textContent !== value) span.textContent = value;
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

    const value = (key: Key, className = "text-brand-paper") => (
        <span ref={(el) => { spans.current[key] = el; }} className={className}>—</span>
    );

    return (
        <aside aria-label="Live stats for this page" className="border-b border-slate-800 bg-[#0B1220]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-4 text-xs text-slate-400 sm:px-6">
                <span className="text-brand-mint">● Live stats for this page</span>
                {STATS.map(([key, label]) => (
                    <span key={key}>
                        {label} {value(key)}
                    </span>
                ))}
                <span>
                    Your time {value("you")} · Cape Town {value("capeTown", "text-brand-accent")}
                </span>
            </div>
        </aside>
    );
}
