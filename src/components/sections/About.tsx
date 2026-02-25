"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="relative py-24 px-6 lg:px-8 overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full point-events-none z-0"></div>

            <div className="mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-heading font-bold text-white mb-8 sm:text-4xl px-4">
                        Building Operational Maturity
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto glass p-8 sm:p-12 rounded-2xl relative">
                        <span className="absolute -top-4 -left-4 text-brand-blue text-6xl opacity-20 font-serif">&quot;</span>
                        Sud0Ops is a modernization consultancy focused on helping SMEs adopt scalable cloud architectures, DevOps pipelines, AI enablement, and engineering best practices. <br className="hidden sm:block" />
                        <br className="hidden sm:block" />
                        <strong className="text-white font-medium">We don&apos;t just implement tools — we build operational maturity.</strong>
                        <span className="absolute -bottom-10 -right-4 text-brand-blue text-6xl opacity-20 font-serif leading-none">&quot;</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
