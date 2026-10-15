"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="relative py-24 px-6 lg:px-8">

            <div className="mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-heading font-bold text-white mb-8 sm:text-4xl px-4">
                        What We Actually Do
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto panel p-8 sm:p-12 rounded-md relative">
                        <span className="absolute -top-4 -left-4 text-brand-blue text-6xl opacity-20 font-serif">&quot;</span>
                        Most businesses aren&apos;t slow because they lack people — they&apos;re slow because no one has ever automated the right things. Manual processes, disconnected tools, and work that should never touch a human inbox. We fix that. <br className="hidden sm:block" />
                        <br className="hidden sm:block" />
                        <strong className="text-white font-medium">We don&apos;t just advise — we find the waste and build the systems that eliminate it.</strong>
                        <span className="absolute -bottom-10 -right-4 text-brand-blue text-6xl opacity-20 font-serif leading-none">&quot;</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
