import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Shared by the scroll-driven sections and the animated logo. Client components only.

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

// Reads prefers-reduced-motion without pulling an animation library into every page.
export function useReducedMotion() {
    return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

// Calls onFrame at most once per animation frame while the page scrolls or resizes, and once on mount.
export function useScrollFrame(onFrame: () => void) {
    const latest = useRef(onFrame);
    useEffect(() => {
        latest.current = onFrame;
    });
    useEffect(() => {
        let frame = 0;
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(() => {
                frame = 0;
                latest.current();
            });
        };
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, []);
}

const clamp = (x: number) => Math.max(0, Math.min(1, x));

// How far an element has passed a line `at` of the way down the viewport: 0 when its top reaches
// the line, 1 when its bottom does.
export function viewProgress(element: HTMLElement, at = 0.65) {
    const rect = element.getBoundingClientRect();
    return clamp((window.innerHeight * at - rect.top) / rect.height);
}

// Progress through a pinned section (.pin-wrap-* around a sticky .pin-panel): 0 when the panel
// pins, 1 when it lets go. When the section is unpinned (small screens, reduced motion) there is no
// pinned stretch, so it falls back to the section's progress through the viewport.
export function pinProgress(wrap: HTMLElement, panel: HTMLElement) {
    const rect = wrap.getBoundingClientRect();
    const range = rect.height - panel.offsetHeight;
    return range > 50 ? clamp(-rect.top / range) : viewProgress(wrap, 0.6);
}

// A vertical timeline that fills as it scrolls up the viewport: `line` (a full-height element with
// origin-top and scale-y-0) grows with the scroll, and `lit` counts the entries it has reached.
// `lead` lights each entry a little before the line gets there.
export function useTimeline(count: number, lead: number) {
    const list = useRef<HTMLDivElement>(null);
    const line = useRef<HTMLSpanElement>(null);
    const [lit, setLit] = useState(0);
    useScrollFrame(() => {
        if (!list.current) return;
        const progress = viewProgress(list.current);
        if (line.current) line.current.style.scale = `1 ${progress.toFixed(4)}`;
        setLit(Math.min(count, Math.floor(progress * count + lead)));
    });
    return { list, line, lit };
}
