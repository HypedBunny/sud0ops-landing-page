"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

// The home page lists its own sections; every other page gets the three main pages. Below 900px the
// links hide and the dock (the floating 0) takes over as the menu. Between 900 and 1100px the home page
// shows the short list too, so the row never wraps.
const sectionLinks = [
    { href: "/#film", label: "The loop" },
    { href: "/#leaks", label: "Leaks" },
    { href: "/#rules", label: "Rules" },
    { href: "/#log", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/about-founder", label: "Meet Alex-Jay" },
];
const pageLinks = [
    { href: "/", label: "Home" },
    { href: "/about-founder", label: "Meet Alex-Jay" },
    { href: "/blog", label: "Blog" },
];

function NavLinks({ links, current, className }: { links: typeof pageLinks; current: string; className: string }) {
    return (
        <div className={className}>
            {links.map((link) => {
                const active = current === link.href || (link.href !== "/" && current.startsWith(`${link.href}/`));
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`whitespace-nowrap transition-colors hover:text-brand-accent ${active ? "text-brand-accent" : "text-slate-300"}`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}

export function Navbar() {
    const pathname = usePathname();
    const home = pathname === "/";

    return (
        <header className="relative z-50 border-b border-slate-800 bg-brand-black">
            <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <Logo typeOn />
                <div className="text-sm font-medium">
                    {home && <NavLinks links={sectionLinks} current={pathname} className="hidden gap-6 min-[1100px]:flex" />}
                    <NavLinks links={pageLinks} current={pathname} className={`hidden gap-6 min-[900px]:flex ${home ? "min-[1100px]:hidden" : ""}`} />
                </div>
                <a
                    href={home ? "#hello" : "mailto:alex@sud0ops.com"}
                    className="inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full bg-brand-paper py-1.5 pr-1.5 pl-4 font-mono text-[13px] font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                >
                    Say hello
                    <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-brand-accent">→</span>
                </a>
            </nav>
        </header>
    );
}
