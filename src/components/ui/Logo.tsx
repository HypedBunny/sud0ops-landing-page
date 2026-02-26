"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Logo() {
    const [typedLength, setTypedLength] = useState(0);
    const totalLength = 7; // S-u-d-0-O-p-s

    useEffect(() => {
        if (typedLength < totalLength) {
            const timeout = setTimeout(() => setTypedLength(prev => prev + 1), 120);
            return () => clearTimeout(timeout);
        }
    }, [typedLength]);

    const renderSud = () => {
        if (typedLength === 0) return "";
        if (typedLength === 1) return "S";
        if (typedLength === 2) return "Su";
        return "Sud";
    };

    const renderOps = () => {
        if (typedLength <= 4) return "";
        if (typedLength === 5) return "O";
        if (typedLength === 6) return "Op";
        return "Ops";
    };

    return (
        <Link href="/" className="group flex items-center gap-1 font-heading text-2xl font-bold tracking-tight">
            {typedLength > 0 && <span>{renderSud()}</span>}

            {typedLength >= 4 && (
                <span className="relative font-mono font-medium tracking-tighter text-brand-blue group-hover:text-brand-blue-glow transition-colors duration-300">
                    0
                    {/* Subtle circuit/glow effect on hover */}
                    <span className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/50 rounded drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-110 pointer-events-none" />
                </span>
            )}

            {typedLength > 4 && (
                <span className="font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                    {renderOps()}
                </span>
            )}
            <span className="text-brand-blue animate-[pulse_1s_ease-in-out_infinite] group-hover:text-brand-blue-glow">_</span>
        </Link>
    );
}
