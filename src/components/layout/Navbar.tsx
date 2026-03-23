"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/clients", label: "Clients" },
    { href: "/packages", label: "Packages" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-brand-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex-1 flex justify-start z-10">
                        <Logo />
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium text-slate-300 absolute left-1/2 -translate-x-1/2 w-full max-w-fit z-20">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="hover:text-brand-blue transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex-1 flex items-center justify-end gap-4 z-10">
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                        >
                            Let&apos;s Modernize
                        </Link>
                        <button
                            className="md:hidden p-2 text-slate-300 hover:text-brand-blue transition-colors"
                            onClick={() => setOpen(prev => !prev)}
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-white/5 bg-brand-black/95 backdrop-blur-md">
                    <nav className="flex flex-col px-6 py-4 gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="py-3 text-sm font-medium text-slate-300 hover:text-brand-blue transition-colors border-b border-white/5 last:border-0"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow"
                        >
                            Let&apos;s Modernize
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
