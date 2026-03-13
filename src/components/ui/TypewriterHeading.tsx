"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterHeadingProps {
    readonly text: string;
    readonly className?: string;
    readonly delay?: number;
    readonly typingSpeed?: number;
}

export function TypewriterHeading({
    text,
    className = "",
    delay = 0,
    typingSpeed = 50
}: TypewriterHeadingProps) {
    const [displayedText, setDisplayedText] = useState("");
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let timeout: NodeJS.Timeout;

        // Wait for initial delay before starting to type
        const startTimeout = setTimeout(() => {
            let i = 0;
            const typeNextChar = () => {
                if (i < text.length) {
                    setDisplayedText(text.slice(0, i + 1));
                    i++;
                    timeout = setTimeout(typeNextChar, typingSpeed);
                }
            };
            typeNextChar();
        }, delay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [isInView, text, delay, typingSpeed]);

    return (
        <h2 ref={ref} className={`${className} flex items-center justify-center`}>
            <span>{displayedText}</span>
            {isInView && (
                <span className="text-brand-blue animate-[pulse_1s_ease-in-out_infinite] ml-1">_</span>
            )}
            {/* Invisible full text to reserve layout height/width */}
            <span className="invisible h-0 w-0 absolute">{text}</span>
        </h2>
    );
}
