import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

// Only these pages are exposed for now. Add entries here to bring other pages back.
// shortLabel replaces label on phones, where the full nav does not fit next to the logo.
const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about-founder", label: "About the Founder", shortLabel: "About" },
];

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-brand-line bg-brand-black">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 gap-4">
                    <Logo motion />
                    <div className="flex items-center gap-4 sm:gap-8">
                        <nav className="flex items-center gap-5 sm:gap-8 text-sm font-medium text-slate-300">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-white transition-colors">
                                    {link.shortLabel ? (
                                        <>
                                            <span className="sm:hidden">{link.shortLabel}</span>
                                            <span className="hidden sm:inline">{link.label}</span>
                                        </>
                                    ) : link.label}
                                </Link>
                            ))}
                        </nav>
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="group hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-brand-accent px-5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-accent-hover"
                        >
                            Get in Touch
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
