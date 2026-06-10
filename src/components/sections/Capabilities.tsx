"use client";

import { motion } from "framer-motion";
import { Compass, Hammer, Users, LifeBuoy } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

const capabilities = [
    {
        title: "Discover the Right Technology",
        icon: Compass,
        outcome: "Stop guessing what to buy",
        items: [
            "Understand what your team actually needs",
            "Cut through the noise of overlapping tools",
            "Honest advice on what to keep, add, or drop",
            "A clear plan, calibrated to your budget and skills",
        ],
    },
    {
        title: "Implement & Build",
        icon: Hammer,
        outcome: "From plan to working systems",
        items: [
            "Set up, configure, and connect your tools",
            "Custom automations and internal tools where they help",
            "We get into the work and build, not just advise",
            "Done properly: stable, documented, built to last",
        ],
    },
    {
        title: "Help Your Team Adapt",
        icon: Users,
        outcome: "Tech your team will actually use",
        items: [
            "Hands-on onboarding and guidance for your people",
            "Plain-English explanations, no jargon",
            "Pace and depth matched to your team's comfort",
            "Confidence to own the tools after we leave",
        ],
    },
    {
        title: "Support & Keep Improving",
        icon: LifeBuoy,
        outcome: "You're never left stranded",
        items: [
            "Ongoing support when things change or break",
            "Tune and improve systems as you grow",
            "A partner to call, not just a one-off project",
            "Your operations get better over time, not worse",
        ],
    },
];

export function Capabilities() {
    return (
        <section id="capabilities" className="relative py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <TypewriterHeading
                        text="How We Help"
                        className="text-3xl font-heading font-bold text-white mb-4 sm:text-4xl"
                    />
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        From discovering the right tools to building, adopting, and supporting them, we walk the whole journey with your team.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {capabilities.map((cap, index) => {
                        const Icon = cap.icon;
                        return (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 glass overflow-hidden border border-white/5 hover:border-brand-blue/50 box-glow-hover bg-brand-black-light"
                            >
                                {/* Background active hover grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf807_1px,transparent_1px),linear-gradient(to_bottom,#38bdf807_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black group-hover:ring-brand-blue transition-colors duration-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-xl font-heading font-semibold text-white mb-1 group-hover:text-brand-blue transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-xs font-medium text-brand-blue/70 mb-4 font-mono tracking-wide">
                                        {cap.outcome}
                                    </p>

                                    <ul className="space-y-3">
                                        {cap.items.map((item) => (
                                            <li key={item} className="flex items-start text-slate-300">
                                                <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue/50 flex-shrink-0 group-hover:bg-brand-blue transition-colors"></span>
                                                <span className="text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
