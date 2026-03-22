"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-blue opacity-20 blur-[100px]"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                        <TerminalSquare className="h-4 w-4" />
                        <span>Systems-Driven Modernization Partner</span>
                    </div>

                    <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 leading-tight">
                        Less Firefighting. <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">More Building.</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto mb-10">
                        We turn fragile, manual infrastructure into automated, scalable systems. Cloud, DevOps, and AI — implemented, not just recommended.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-blue px-8 font-medium text-brand-black transition-all hover:bg-brand-blue-glow box-glow-hover"
                        >
                            <span className="mr-2">Let&apos;s Modernize</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="#capabilities"
                            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-brand-black/50 px-8 font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white glass"
                        >
                            See How We Work
                        </Link>
                    </div>
                </motion.div>

                {/* Decorative dynamic particles */}
                {mounted && (
                    <div className="absolute inset-0 pointer-events-none z-[-1]">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-brand-blue rounded-full opacity-30"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.1, 0.5, 0.1],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Fade out bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
