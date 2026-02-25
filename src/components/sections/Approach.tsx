"use client";

import { motion } from "framer-motion";
import {
    Cloud,
    Database,
    Container,
    GitPullRequest,
    Terminal,
    Blocks,
    Box
} from "lucide-react";

const steps = [
    { id: "01", name: "Assess", description: "Deep dive into current architecture, bottlenecks, and business goals." },
    { id: "02", name: "Architect", description: "Design cloud-native, scalable, and secure infrastructure blueprints." },
    { id: "03", name: "Automate", description: "Implement CI/CD, IaC, and intelligent workflows to remove toil." },
    { id: "04", name: "Optimize", description: "Continuous monitoring, cost optimization, and performance tuning." },
];

const technologies = [
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: Cloud },
    { name: "Docker", icon: Container },
    { name: "Kubernetes", icon: Box },
    { name: "GitHub Actions", icon: GitPullRequest },
    { name: "Terraform", icon: Blocks },
    { name: "MongoDB / SQL", icon: Database },
    { name: "DevOps", icon: Terminal },
];

export function Approach() {
    return (
        <section id="approach" className="py-24 px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="mx-auto max-w-7xl relative z-10">

                {/* Modernization Framework */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl font-heading font-bold text-white mb-4 sm:text-4xl">
                            Modernization Framework
                        </h2>
                        <p className="text-lg text-slate-400">Our systematic approach to building operational maturity.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Animated Line connecting steps (hidden on mobile) */}
                        <div className="hidden md:block absolute top-[44px] left-0 w-full h-[2px] bg-white/5 z-0">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-brand-blue shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    className="relative flex flex-col items-center md:items-start text-center md:text-left z-10"
                                >
                                    <div className="h-24 w-24 md:h-24 md:w-full flex md:block items-center justify-center mb-6 md:mb-0">
                                        <div className="h-[88px] w-[88px] rounded-2xl bg-brand-black-light border border-white/10 flex items-center justify-center text-3xl font-heading font-bold text-slate-600 shadow-xl transition-colors duration-300 hover:border-brand-blue hover:text-brand-blue box-glow-hover relative group cursor-default">
                                            {step.id}
                                            <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>

                                    <div className="md:mt-6">
                                        <h3 className="text-xl font-heading font-semibold text-white mb-3">{step.name}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed md:pr-4">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Capabilities Snapshot */}
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                            Technical Capabilities
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                        {technologies.map((tech, i) => {
                            const Icon = tech.icon;
                            return (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="group relative cursor-help"
                                >
                                    <div className="h-16 w-16 rounded-xl bg-brand-black-light border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-blue group-hover:border-brand-blue/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
                                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -top-12 left-1/2 -translate-x-1/2 bg-brand-blue text-brand-black font-medium text-xs py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-20">
                                        {tech.name}
                                        {/* Tooltip triangle */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-blue"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
