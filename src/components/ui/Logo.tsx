import React from 'react';
import Link from 'next/link';

export function Logo() {
    return (
        <Link href="/" className="group flex items-center gap-1 font-heading text-2xl font-bold tracking-tight">
            <span>Sud</span>
            <span className="relative font-mono font-medium tracking-tighter text-brand-blue group-hover:text-brand-blue-glow transition-colors duration-300">
                0
                {/* Subtle circuit/glow effect on hover */}
                <span className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/50 rounded drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-110 pointer-events-none" />
            </span>
            <span className="font-medium text-slate-300 group-hover:text-white transition-colors duration-300">Ops</span>
            <span className="text-brand-blue animate-pulse group-hover:text-brand-blue-glow">_</span>
        </Link>
    );
}
