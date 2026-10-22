"use client";

import { useEffect, useState } from "react";

// Phones only: once the header's "say hello" has scrolled away, a bar sticks to the bottom of the
// screen. It slides in after the first scroll so it does not double up with the header button.
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
                className="flex min-h-12 w-full items-center justify-between rounded-full bg-brand-accent py-1.5 pr-1.5 pl-6 font-semibold text-brand-black"
            >
                Say hello: alex@sud0ops.com
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-brand-black font-mono text-brand-accent">→</span>
            </a>
        </div>
    );
}
