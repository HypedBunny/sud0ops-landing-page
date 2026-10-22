"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

// The home page lists its own sections, numbered like the section labels; every other page gets
// the short ~/ paths. Phones always get the short paths, on a row of their own under the logo.
const sectionLinks = [
    { href: "/#services", prefix: "01/", label: "fixes" },
    { href: "/#loop", prefix: "02/", label: "method" },
    { href: "/#rules", prefix: "03/", label: "rules" },
    { href: "/#log", prefix: "04/", label: "work" },
    { href: "/blog", prefix: "05/", label: "writing" },
    { href: "/about-founder", prefix: "06/", label: "about" },
];
const pageLinks = [
    { href: "/#loop", prefix: "~/", label: "method" },
    { href: "/about-founder", prefix: "~/", label: "about" },
    { href: "/blog", prefix: "~/", label: "writing" },
];

type NavLink = (typeof pageLinks)[number];

function NavLinks({ links, current, className }: { links: NavLink[]; current: string; className: string }) {
    return (
        <div className={className}>
            {links.map((link) => {
                const active = link.href !== "/#loop" && (current === link.href || current.startsWith(`${link.href}/`));
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`whitespace-nowrap transition-colors hover:text-brand-accent ${active ? "text-brand-accent" : "text-slate-300"}`}
                    >
                        <span className="text-slate-500">{link.prefix}</span>
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
            <nav aria-label="Main" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
                <Logo typeOn />
                <div className="order-last w-full font-mono text-[13px] sm:order-none sm:w-auto">
                    {home && <NavLinks links={sectionLinks} current={pathname} className="hidden gap-7 lg:flex" />}
                    <NavLinks links={pageLinks} current={pathname} className={`flex gap-6 sm:gap-7 ${home ? "lg:hidden" : ""}`} />
                </div>
                <a
                    href={home ? "#hello" : "mailto:alex@sud0ops.com"}
                    className="inline-flex min-h-11 items-center gap-3 rounded-full bg-brand-paper py-1.5 pr-1.5 pl-4 font-mono text-[13px] font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                >
                    say hello
                    <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-brand-accent">→</span>
                </a>
            </nav>
        </header>
    );
}
