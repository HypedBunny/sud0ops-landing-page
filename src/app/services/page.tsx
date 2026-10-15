"use client";

import { motion } from "framer-motion";
import { ArrowRight, Workflow, Plug, Bot, LayoutDashboard, Search, CheckCircle, Zap, MessageSquare, BarChart3 } from "lucide-react";
import Link from "next/link";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

const services = [
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "Automate the manual, repetitive tasks, so your team spends its time on work that needs a person.",
    },
    {
        icon: Plug,
        title: "Tool Integration & Connectivity",
        description: "Connect your CRM, project management, billing, and messaging tools, so data moves between them without copy and paste.",
    },
    {
        icon: Bot,
        title: "AI Assistants & Internal Tools",
        description: "Internal assistants that answer questions from your own documents and data, so your team does not have to wait for a senior person.",
    },
    {
        icon: LayoutDashboard,
        title: "Dashboards & Reporting",
        description: "One live view of your KPIs, pipeline, and operations, so you stop building reports by hand.",
    },
    {
        icon: Search,
        title: "Process Mapping & Efficiency Audit",
        description: "We map how work moves through your business, find where it loses time and money, and give you a prioritised plan to fix it.",
    },
];

const toolGroups = [
    {
        category: "Automation Platforms",
        icon: Workflow,
        items: ["Make.com", "Zapier", "n8n"],
    },
    {
        category: "Business Tools",
        icon: MessageSquare,
        items: ["HubSpot", "Notion", "Airtable", "Slack"],
    },
    {
        category: "Productivity Suites",
        icon: Zap,
        items: ["Google Workspace", "Microsoft 365"],
    },
    {
        category: "AI & Intelligence",
        icon: Bot,
        items: ["OpenAI", "Custom AI Agents"],
    },
    {
        category: "Finance & Ops",
        icon: BarChart3,
        items: ["QuickBooks", "Xero", "Monday.com"],
    },
];

const reasons = [
    "We fix operations, not infrastructure",
    "Plain-English explanations, no jargon",
    "Built for small and growing businesses",
    "Outcomes over hours billed",
];

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden pt-20">

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 lg:py-24">

                {/* ── Hero ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-24"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-blue/40 bg-brand-blue/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-blue">
                        <Zap className="h-4 w-4" />
                        <span>What We Do</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 leading-tight">
                        Fix How Your{" "}
                        <span className="text-brand-blue">
                            Business Operates
                        </span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        We find where your business loses time and money, then we fix it.
                    </p>
                    <div className="mt-8">
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-accent px-8 font-medium text-brand-black transition-all hover:bg-brand-accent-hover lift-hover"
                        >
                            <span className="flex items-center gap-2">
                                Book a Free Consultation
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                    </div>
                </motion.div>

                {/* ── What We Solve ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <TypewriterHeading
                        text="What We Solve"
                        className="text-3xl font-heading font-bold text-white sm:text-4xl mb-6 text-center"
                    />
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto text-center mb-10">
                        The operational problems that slow growing businesses down.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            "Stop wasting hours on tasks a machine can do",
                            "Connect your tools so your data stays in sync",
                            "Help your team find answers in your own data",
                            "Make decisions from live data, not last week's spreadsheet",
                        ].map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="panel rounded-lg px-6 py-4 text-center border border-white/5"
                            >
                                <p className="text-sm font-medium text-slate-300">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Services ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <TypewriterHeading
                        text="Services"
                        className="text-3xl font-heading font-bold text-white sm:text-4xl mb-12 text-center"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((svc, index) => {
                            const Icon = svc.icon;
                            return (
                                <motion.div
                                    key={svc.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="group relative rounded-md p-8 transition-all duration-300 hover:-translate-y-2 panel overflow-hidden border border-white/5 hover:border-brand-blue/50 lift-hover bg-brand-black-light"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                    <div className="relative z-10">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black group-hover:ring-brand-blue transition-colors duration-300">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-brand-blue transition-colors">
                                            {svc.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{svc.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/consulting"
                            className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-blue/10 px-8 font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-hover lift-hover"
                        >
                            <span className="flex items-center gap-2">
                                View Consulting Options
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/* ── Tools We Work With ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <TypewriterHeading
                        text="Tools We Work With"
                        className="text-3xl font-heading font-bold text-white sm:text-4xl mb-4 text-center"
                    />
                    <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                        We work with the tools your business already uses. We connect them, set them up properly, and automate the repetitive parts.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                        {toolGroups.map((group, idx) => {
                            const Icon = group.icon;
                            return (
                                <motion.div
                                    key={group.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="panel rounded-md p-6 border border-white/5 hover:border-brand-blue/30 transition-colors flex flex-col bg-brand-black-light group"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-brand-black transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-heading font-semibold text-white">
                                            {group.category}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="inline-block rounded-md border border-brand-blue/20 bg-brand-blue/5 px-3 py-1.5 text-xs font-medium text-brand-blue font-mono tracking-wide"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ── Why Sud0Ops ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <TypewriterHeading
                        text="Why Sud0Ops?"
                        className="text-3xl font-heading font-bold text-white sm:text-4xl mb-12 text-center"
                    />
                    <div className="panel rounded-md p-8 lg:p-10 max-w-2xl mx-auto border border-white/5">
                        <ul className="space-y-4">
                            {reasons.map((reason, idx) => (
                                <motion.li
                                    key={reason}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0" />
                                    <span className="text-slate-300 font-medium">{reason}</span>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-hover lift-hover"
                            >
                                <span className="flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
