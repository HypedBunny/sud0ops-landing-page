"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Wrench, Cloud, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

const consultingServices = [
    {
        icon: Search,
        title: "Investigative Consultation",
        subtitle: "Start here if you're not sure what's wrong",
        description:
            "We look closely at how your business runs. We ask questions, watch how your team works, and find where time and money are lost. You get a clear plan to fix it.",
        deliverables: [
            "60–90 minute discovery session",
            "Written findings report",
            "Top 3–5 operational inefficiencies identified",
            "Prioritised action plan with estimated impact",
            "Clear 'what to fix first' roadmap",
        ],
        cta: "Book an Investigation",
        badge: "Best Place to Start",
    },
    {
        icon: Wrench,
        title: "Issue Investigation & Resolution",
        subtitle: "Start here if you know what's broken",
        description:
            "You have a specific problem: something is slow, broken, or getting in your team's way. We find the root cause, explain it in plain English, and fix it.",
        deliverables: [
            "Root cause analysis of the specific issue",
            "Plain-English explanation of what's happening",
            "Options presented (automated, semi-automated, or process change)",
            "Implementation of the agreed solution",
            "Handover with documentation",
        ],
        cta: "Tell Us What's Broken",
        badge: "Fast Resolution",
    },
    {
        icon: Cloud,
        title: "Cloud Tool Consulting",
        subtitle: "Get more from the tools you're already paying for",
        description:
            "Many businesses pay for tools they barely use, or use six tools when two would do. We review your SaaS stack, agree with you what to keep, cut, and fix, and set everything up to match how your business works.",
        deliverables: [
            "Full review of your current SaaS tool stack",
            "Identification of overlap, gaps, and underused features",
            "Consolidation and configuration recommendations",
            "Setup and optimisation of priority tools",
            "Ongoing advisory available",
        ],
        cta: "Review My Tools",
        badge: "Quick Wins",
        note: "Covers business productivity and SaaS tools: Google Workspace, Microsoft 365, HubSpot, Notion, Airtable, Slack, and more. Not cloud infrastructure or server management.",
    },
];

export default function ConsultingPage() {
    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden pt-20">
            {/* Background glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-blue opacity-10 blur-[100px]" />
                <div className="absolute left-1/3 bottom-1/4 h-[200px] w-[200px] rounded-full bg-brand-blue opacity-5 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 lg:py-24">

                {/* ── Hero ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-24"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                        <MessageSquare className="h-4 w-4" />
                        <span>Consulting</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 leading-tight">
                        Start With a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">
                            Conversation
                        </span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        Whether you know exactly what&apos;s broken or just feel like something&apos;s off, one of these options will fit.
                    </p>
                </motion.div>

                {/* ── Consulting Services ── */}
                <div className="space-y-8 mb-24">
                    {consultingServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative rounded-2xl p-8 lg:p-10 glass overflow-hidden border border-white/5 hover:border-brand-blue/40 transition-all duration-300 bg-brand-black-light box-glow-hover"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf807_1px,transparent_1px),linear-gradient(to_bottom,#38bdf807_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Left: info */}
                                    <div>
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black group-hover:ring-brand-blue transition-colors duration-300">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                                    <h2 className="text-2xl font-heading font-bold text-white group-hover:text-brand-blue transition-colors">
                                                        {service.title}
                                                    </h2>
                                                    <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-0.5 text-xs font-medium text-brand-blue">
                                                        {service.badge}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 italic">{service.subtitle}</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>

                                        {service.note && (
                                            <p className="text-xs text-slate-500 italic border-l-2 border-brand-blue/30 pl-3">
                                                {service.note}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right: deliverables + CTA */}
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">What You Get</p>
                                            <ul className="space-y-3 mb-8">
                                                {service.deliverables.map((d) => (
                                                    <li key={d} className="flex items-start gap-2.5">
                                                        <CheckCircle className="h-4 w-4 text-brand-blue flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-slate-300">{d}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            href="/contact"
                                            className="group/btn inline-flex h-11 items-center justify-center rounded-md bg-brand-blue px-6 font-medium text-brand-black text-sm transition-all hover:bg-brand-blue-glow box-glow-hover self-start"
                                        >
                                            <span className="flex items-center gap-2">
                                                {service.cta}
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Not Sure Where to Start ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <TypewriterHeading
                        text="Not Sure Where to Start?"
                        className="text-2xl font-heading font-bold text-white mb-4"
                    />
                    <p className="text-slate-400 max-w-xl mx-auto mb-8">
                        Just reach out and tell us what&apos;s going on. We&apos;ll point you to the right option, or we can talk it through together.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-blue/10 px-8 font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                    >
                        <span className="flex items-center gap-2">
                            Let&apos;s Talk
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}
