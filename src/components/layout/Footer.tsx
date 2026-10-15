import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // Extra bottom padding on phones clears the sticky CTA bar (MobileCta).
        <footer className="relative border-t border-brand-line bg-brand-black-light pt-12 pb-28 sm:pb-12 lg:pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    <div className="max-w-xs cursor-default">
                        <Logo />
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            We help growing teams discover, build, adopt, and support the technology that fits them. We don&apos;t just advise, we build alongside you.
                        </p>
                    </div>

                    <div className="flex gap-16">
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">Services</h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                <li>Workflow Automation</li>
                                <li>Tool Integration</li>
                                <li>AI Assistants</li>
                                <li>Operational Dashboards</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">Contact</h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                <li><Link href="mailto:alex@sud0ops.com" className="hover:text-brand-blue transition-colors">alex@sud0ops.com</Link></li>
                                <li><Link href="/blog" className="hover:text-brand-blue transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-brand-line flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs text-slate-400">
                    <p>© {currentYear} Sud0ops. All rights reserved.</p>
                    <p>Cape Town, South Africa · Working with teams in SA and the UK</p>
                </div>
            </div>
        </footer>
    );
}
