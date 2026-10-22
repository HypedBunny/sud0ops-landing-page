"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";

// The 0 that follows you: a floating menu button in the bottom-right corner. Its four pieces fly apart
// when the menu opens. Each row carries a small 0 with one piece lit, so the menu reads as the loop.
// On phones it is the site menu (the header links hide below 900px), so it shows from the start; on
// wider screens it fades in once the header has scrolled away.
const items = [
    { key: "home", href: "/", label: "Home", hint: "Back to the start" },
    { key: "blog", href: "/blog", label: "Blog", hint: "Posts and notes" },
    { key: "about", href: "/about-founder", label: "Meet Alex-Jay", hint: "The story so far" },
    { key: "hello", href: "mailto:alex@sud0ops.com", label: "Say hello", hint: "alex@sud0ops.com" },
];

// ZERO_PATHS runs top-left, top-right, bottom-left, bottom-right; the rows light them clockwise.
const CLOCKWISE = [0, 1, 3, 2];

function current(pathname: string) {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/blog")) return "blog";
    if (pathname.startsWith("/about-founder")) return "about";
    return null;
}

export function Dock() {
    const pathname = usePathname();
    const here = current(pathname);
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setShown(window.innerWidth < 900 || max < 240 || window.scrollY > Math.min(window.innerHeight * 0.5, max * 0.35));
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [pathname]);

    function close() {
        setOpen(false);
        buttonRef.current?.focus();
    }

    // Escape closes the menu wherever focus is (right after opening it is still on the button).
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setOpen(false);
            buttonRef.current?.focus();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const visible = shown || open;

    return (
        <>
            {open && <button type="button" aria-label="Close menu" onClick={close} className="fixed inset-0 z-[90] cursor-default bg-brand-black/35" />}
            <div
                className={`dock fixed z-[91] flex flex-col items-end gap-3 transition-[opacity,transform] duration-300 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
            >
                {open && (
                    <nav
                        id="dock-menu"
                        aria-label="Site"
                        className="dock-menu flex w-[min(300px,calc(100vw-32px))] flex-col gap-0.5 rounded-[18px] border border-slate-700 bg-brand-black p-2 shadow-[8px_8px_0_var(--color-brand-accent)]"
                    >
                        <span className="px-2.5 pt-1 pb-2 text-[11px] text-slate-500">Go to</span>
                        {items.map((item, i) => {
                            const active = item.key === here;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex min-h-[52px] items-center gap-3.5 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-brand-black-light focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-accent ${active ? "text-brand-accent" : "text-brand-paper"}`}
                                >
                                    <svg viewBox="74 81 549 717" aria-hidden="true" className="h-auto w-4 flex-none">
                                        {ZERO_PATHS.map((d, p) => <path key={d} d={d} className={p === CLOCKWISE[i] ? "fill-brand-accent" : "fill-slate-700"} />)}
                                    </svg>
                                    <span className="flex flex-1 flex-col gap-0.5">
                                        <span className="font-heading text-base font-bold">{item.label}</span>
                                        <span className="text-xs text-slate-500">{item.hint}</span>
                                    </span>
                                    {active && <span className="text-[11px] text-brand-accent">You’re here</span>}
                                </Link>
                            );
                        })}
                    </nav>
                )}
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls="dock-menu"
                    aria-label={open ? "Close site menu" : "Open site menu"}
                    className={`dock-button grid h-[60px] w-[60px] cursor-pointer place-items-center rounded-full border-2 bg-brand-black shadow-[0_0_0_4px_rgb(15_23_42/0.18)] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-brand-accent focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-accent ${open ? "is-open border-brand-accent" : "border-slate-700"}`}
                >
                    <svg viewBox="49 63 600 760" aria-hidden="true" className="h-auto w-[26px] overflow-visible">
                        {ZERO_PATHS.map((d) => <path key={d} d={d} className="dock-piece fill-brand-blue" />)}
                        <circle className="fill-brand-accent" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                    </svg>
                </button>
            </div>
        </>
    );
}
