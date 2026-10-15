"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Phones only: the navbar has no room for the CTA, so it sticks to the bottom of the screen.
// It slides in after the first scroll so it does not double up with the hero's own button.
export function MobileCta() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const update = () => setVisible(window.scrollY > 320);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-line bg-brand-black/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 sm:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
            aria-hidden={!visible}
        >
            <a
                href="mailto:alex@sud0ops.com"
                tabIndex={visible ? 0 : -1}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand-accent text-sm font-semibold text-brand-black transition-colors hover:bg-brand-accent-hover"
            >
                Get in Touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
        </div>
    );
}
