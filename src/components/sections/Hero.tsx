"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-sm border border-brand-blue/40 bg-brand-blue/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-blue">
                        <Zap className="h-4 w-4" />
                        <span>Business Automation &amp; Operational Efficiency</span>
                    </div>

                    <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 leading-tight">
                        Your Business <br className="hidden sm:block" />
                        <span className="text-brand-blue">Should Run Itself.</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto mb-10">
                        SudoOps helps growing businesses replace manual work with smart automations, connected tools, and AI — so your team can focus on what actually moves the needle.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-accent px-8 font-medium text-brand-black transition-all hover:bg-brand-accent-hover lift-hover"
                        >
                            <span className="mr-2">Book a Free Discovery Call</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <Link
                            href="#capabilities"
                            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-brand-black/50 px-8 font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white panel"
                        >
                            See What We Fix
                        </Link>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-8 text-sm text-slate-400"
                    >
                        Trusted by businesses across South Africa and the UK
                    </motion.p>
                </motion.div>
            </div>

        </section>
    );
}
