"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Capabilities } from "@/components/sections/Capabilities";

export default function Home() {
    return (
        <div className="flex flex-col gap-16 pb-24">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-blue opacity-20 blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mx-auto max-w-3xl"
                    >
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                            <Zap className="h-4 w-4" />
                            <span>Helping Teams Adopt, Build &amp; Grow with Technology</span>
                        </div>

                        <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 leading-tight">
                            Take Control of <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">
                                Your Technology.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto mb-10">
                            Most businesses don&apos;t have a technology problem, they have an operations problem. Sud0ops helps growing teams discover the right tools, implement them properly, adapt with confidence, and stay supported as they grow. We don&apos;t just advise, we get into the work and build alongside you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-blue px-8 font-medium text-brand-black transition-all hover:bg-brand-blue-glow box-glow-hover"
                            >
                                <span className="mr-2">Get in Touch</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>

                            <a
                                href="#capabilities"
                                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-brand-black/50 px-8 font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white glass"
                            >
                                See How We Help
                            </a>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-8 text-sm text-slate-500"
                        >
                            Trusted by growing businesses, NPOs, and teams across South Africa and the UK
                        </motion.p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-10 pointer-events-none" />
            </section>

            <Capabilities />
        </div>
    );
}
