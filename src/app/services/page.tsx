"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, GitBranch, Server, TrendingDown, ShieldCheck, CheckCircle, Terminal, Cpu, Activity, Database } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Cloud,
        title: "Cloud Architecture",
        description: "Design secure and scalable AWS infrastructure.",
    },
    {
        icon: GitBranch,
        title: "DevOps Automation",
        description: "Automate deployments and eliminate manual releases.",
    },
    {
        icon: Server,
        title: "Platform Infrastructure",
        description: "Build production-ready infrastructure for SaaS platforms.",
    },
    {
        icon: TrendingDown,
        title: "Cloud Cost Optimisation",
        description: "Reduce unnecessary AWS spending.",
    },
    {
        icon: ShieldCheck,
        title: "Disaster Recovery",
        description: "Protect your systems from downtime and outages.",
    },
];

const technologies = [
    {
        category: "Cloud Providers",
        icon: Cloud,
        items: ["AWS", "Microsoft Azure"],
    },
    {
        category: "Infrastructure as Code",
        icon: Terminal,
        items: ["Terraform", "AWS CDK"],
    },
    {
        category: "CI/CD & Automation",
        icon: GitBranch,
        items: ["GitHub Actions", "Azure DevOps"],
    },
    {
        category: "Observability",
        icon: Activity,
        items: ["Grafana", "Prometheus", "Loki"],
    },
    {
        category: "Agentic AI & Ops",
        icon: Cpu,
        items: ["Custom AI Agents", "Automated Workflows"],
    },
];

const reasons = [
    "Cloud-native architecture",
    "DevOps automation expertise",
    "Scalable infrastructure design",
    "Startup-friendly engineering",
];

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden pt-20">
            {/* Background grid + glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-blue opacity-10 blur-[100px]" />
                <div className="absolute left-1/3 bottom-1/4 h-[200px] w-[200px] rounded-full bg-brand-blue opacity-5 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 lg:py-24">

                {/* ── Hero ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-24"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                        <Cloud className="h-4 w-4" />
                        <span>Our Services</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 leading-tight">
                        Cloud Infrastructure &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">
                            DevOps Engineering
                        </span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        We design, automate and scale cloud platforms for startups and growing businesses.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-8 font-medium text-brand-black transition-all hover:bg-brand-blue-glow box-glow-hover"
                        >
                            <span className="flex items-center gap-2">
                                Book an Architecture Consultation
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/* ── What We Do ─────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl mb-6 text-center">
                        What We Do
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto text-center mb-10">
                        Sud0Ops helps companies build and operate modern cloud infrastructure.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            "Deploy software reliably",
                            "Scale infrastructure",
                            "Reduce cloud costs",
                            "Build production-grade platforms",
                        ].map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="glass rounded-lg px-6 py-4 text-center border border-white/5"
                            >
                                <p className="text-sm font-medium text-slate-300">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Services ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl mb-12 text-center">
                        Services
                    </h2>
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
                                    className="group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 glass overflow-hidden border border-white/5 hover:border-brand-blue/50 box-glow-hover bg-brand-black-light"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf807_1px,transparent_1px),linear-gradient(to_bottom,#38bdf807_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                    <div className="relative z-10">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black group-hover:ring-brand-blue transition-colors duration-300">
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
                </motion.div>

                {/* ── Core Stack ──────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl mb-12 text-center">
                        Core Technologies
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                        {technologies.map((techGroup, idx) => {
                            const Icon = techGroup.icon;
                            return (
                                <motion.div
                                    key={techGroup.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="glass rounded-xl p-6 border border-white/5 hover:border-brand-blue/30 transition-colors flex flex-col bg-brand-black-light group"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-brand-black transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-heading font-semibold text-white">
                                            {techGroup.category}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {techGroup.items.map((item) => (
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

                {/* ── Why Sud0Ops ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl mb-12 text-center">
                        Why Sud0Ops
                    </h2>
                    <div className="glass rounded-xl p-8 lg:p-10 max-w-2xl mx-auto border border-white/5">
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
                            <Link
                                href="/contact"
                                className="group inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                            >
                                <span className="flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
