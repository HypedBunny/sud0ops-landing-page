import { useEffect, useRef, useSyncExternalStore } from "react";

// Shared by the scroll-driven sections and the animated logo. Client components only.

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// When the pinned sections (.pin-wrap around a sticky .pin-panel) give up pinning and lay out as plain
// sections: short screens, where a pinned panel would cut its content off (landscape phones, and small
// phones where the hero copy leaves no room for the 0), and reduced motion. globals.css uses the same
// queries; keep them in step.
export const STILL_PIN = "(max-height: 559px), (max-width: 899px) and (max-height: 599px), (prefers-reduced-motion: reduce)";
// The sideways field log needs a wide, tall screen.
export const STILL_LOG = "(max-width: 899px), (max-height: 719px), (prefers-reduced-motion: reduce)";

// Whether a media query matches, kept live. The server (and a crawler) gets the moving version's markup.
export function useMedia(query: string) {
    return useSyncExternalStore(
        (onChange) => {
            const list = window.matchMedia(query);
            list.addEventListener("change", onChange);
            return () => list.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        () => false,
    );
}

// Reads prefers-reduced-motion without pulling an animation library into every page.
export function useReducedMotion() {
    return useMedia(REDUCED_MOTION);
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

export const clamp = (x: number) => Math.max(0, Math.min(1, x));
// Where p sits between a and b, as 0..1.
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeInOut = (x: number) => {
    const t = clamp(x);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);

// Progress through a pinned section: 0 when the panel pins, 1 when it lets go. When the section is
// laid out still there is no pinned stretch, so it falls back to its progress up the viewport.
export function pinProgress(wrap: HTMLElement, panel: HTMLElement) {
    const rect = wrap.getBoundingClientRect();
    const range = rect.height - panel.offsetHeight;
    return range > 10 ? clamp(-rect.top / range) : clamp((window.innerHeight * 0.6 - rect.top) / Math.max(1, rect.height));
}

// Moves and turns one piece of a 0 drawn in icon units (its centre dot sits at 349, 443).
export function placePiece(piece: SVGElement | null, x: number, y: number, turn = 0) {
    piece?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${turn.toFixed(2)} 349 443)`);
}
