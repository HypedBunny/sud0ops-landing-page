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
                <span className="relative inline-flex items-center mx-[2px]">
                    {/* 7-segment display "0" — matches email signature exactly */}
                    <svg
                        width="28"
                        height="38"
                        viewBox="0 0 28 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-[0_0_12px_rgba(56,189,248,0.28)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-[filter] duration-300"
                        aria-hidden="true"
                    >
                        <defs>
                            <filter id="segGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Container */}
                        <rect x="0.5" y="0.5" width="27" height="37" rx="5" fill="#060a12" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
                        {/* Top segment — ON */}
                        <rect x="8" y="4" width="12" height="3" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                        {/* Upper-left vertical — ON */}
                        <rect x="4" y="8" width="3" height="9" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                        {/* Upper-right vertical — ON */}
                        <rect x="21" y="8" width="3" height="9" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                        {/* Middle segment — OFF (dim ghost) */}
                        <rect x="8" y="17.5" width="12" height="3" rx="1.5" fill="#38BDF8" opacity="0.2" />
                        {/* Lower-left vertical — ON */}
                        <rect x="4" y="21" width="3" height="9" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                        {/* Lower-right vertical — ON */}
                        <rect x="21" y="21" width="3" height="9" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                        {/* Bottom segment — ON */}
                        <rect x="8" y="31" width="12" height="3" rx="1.5" fill="#38BDF8" filter="url(#segGlow)" />
                    </svg>
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
