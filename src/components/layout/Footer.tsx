import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-brand-black-light py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    <div className="max-w-xs cursor-default">
                        <Logo />
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Business automation and operational efficiency for growing businesses. We don&apos;t just advise — we build.
                        </p>
                    </div>

                    <div className="flex gap-16">
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-white tracking-wider">Services</h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-400">
                                <li>Workflow Automation</li>
                                <li>Tool Integration</li>
                                <li>AI Assistants</li>
                                <li>Operational Dashboards</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-white tracking-wider">Contact</h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-400">
                                <li><Link href="mailto:alex@sud0ops.com" className="hover:text-brand-blue transition-colors">alex@sud0ops.com</Link></li>
                                <li><Link href="https://sud0ops.com" className="hover:text-brand-blue transition-colors">sud0ops.com</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {currentYear} Sud0Ops. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
