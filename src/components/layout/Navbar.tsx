import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-brand-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex-1 flex justify-start z-10">
                        <Logo />
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium text-slate-300 absolute left-1/2 -translate-x-1/2 w-full max-w-fit z-20">
                        <Link href="/services" className="hover:text-brand-blue transition-colors">Services</Link>
                        <Link href="/#capabilities" className="hover:text-brand-blue transition-colors">Capabilities</Link>
                        <Link href="/#approach" className="hover:text-brand-blue transition-colors">Approach</Link>
                        <Link href="/#clients" className="hover:text-brand-blue transition-colors">Clients</Link>
                        <Link href="/packages" className="hover:text-brand-blue transition-colors">Packages</Link>
                        <Link href="/contact" className="hover:text-brand-blue transition-colors">Contact</Link>
                    </nav>

                    <div className="flex-1 flex items-center justify-end gap-4 z-10">
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                        >
                            Let&apos;s Modernize
                        </Link>
                        <button className="md:hidden p-2 text-slate-300 hover:text-brand-blue">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
