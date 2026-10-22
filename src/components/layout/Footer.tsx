import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const links = [
    { href: "/#loop", label: "method" },
    { href: "/#rules", label: "rules" },
    { href: "/blog", label: "writing" },
    { href: "/about-founder", label: "about" },
    { href: "https://www.linkedin.com/in/alex-jay-beukes", label: "linkedin" },
    { href: "mailto:alex@sud0ops.com", label: "email" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // Extra bottom padding on phones clears the sticky CTA bar (MobileCta).
        <footer className="bg-brand-black">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pt-16 pb-28 sm:px-6 sm:pb-8">
                <div className="flex flex-wrap items-end justify-between gap-10">
                    <div className="flex max-w-2xl flex-[1_1_26rem] flex-col gap-3.5">
                        <Logo className="block" markClassName="h-auto w-full" />
                        <p className="font-mono text-xs text-slate-400">Cape Town · South Africa &amp; United Kingdom</p>
                    </div>
                    <ul className="grid grid-cols-3 gap-x-10 gap-y-3 font-mono text-[13px]">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-slate-300 transition-colors hover:text-brand-accent">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-wrap justify-between gap-3 border-t border-slate-800 pt-6 font-mono text-[11px] text-slate-400">
                    <p>© {currentYear} Sud0ops</p>
                    <p>
                        <span className="text-brand-accent">$</span> exit 0
                    </p>
                </div>
            </div>
        </footer>
    );
}
