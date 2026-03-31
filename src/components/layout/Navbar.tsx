import { Logo } from "@/components/ui/Logo";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-brand-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Logo />
                    <a
                        href="mailto:alex@sud0ops.com"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </header>
    );
}
