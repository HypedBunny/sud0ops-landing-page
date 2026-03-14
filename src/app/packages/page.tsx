"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, GitBranch, TrendingDown, Shield, Server, Lightbulb } from "lucide-react";
import Link from "next/link";

const packages = [
    {
        icon: Cloud,
        title: "Cloud Foundation Setup",
        audience: "For startups launching their platform",
        includes: [
            "Infrastructure design & AWS account setup",
            "VPC network architecture",
            "Dev / Staging / Production environments",
            "Load balancer, DNS & security groups",
            "Logging & monitoring setup",
        ],
        deliverables: ["Production-ready cloud environment", "Architecture documentation", "Deployment-ready infrastructure"],
        timeline: "2–4 weeks",
        price: "R10k – R95k",
    },
    {
        icon: GitBranch,
        title: "DevOps Automation Setup",
        audience: "For teams deploying software manually",
        includes: [
            "CI/CD pipeline setup",
            "Automated deployments & environment promotion",
            "Infrastructure as Code",
            "Docker build pipelines",
            "Deployment rollback capability",
        ],
        deliverables: ["Fully automated deployment pipeline", "Infrastructure as Code templates", "Runbook documentation"],
        timeline: "2–3 weeks",
        price: "R10k – R85k",
    },
    {
        icon: TrendingDown,
        title: "Cloud Cost Optimisation Audit",
        audience: "For teams overspending on cloud",
        includes: [
            "AWS infrastructure audit",
            "Resource utilisation analysis",
            "Cost reduction recommendations",
            "Architecture improvements",
        ],
        deliverables: ["Cost report & optimisation roadmap", "Savings estimates"],
        timeline: "1 week",
        price: "R15k – R40k",
        priceAlt: "or 20% of yearly savings",
    },
    {
        icon: Shield,
        title: "High Availability Architecture",
        audience: "For businesses that cannot afford downtime",
        includes: [
            "Multi-region infrastructure",
            "Backup & failover design",
            "Database redundancy",
            "Route53 failover configuration",
        ],
        deliverables: ["Disaster recovery architecture", "Failover testing & recovery procedures"],
        timeline: "3–6 weeks",
        price: "R60k – R200k",
    },
    {
        icon: Server,
        title: "SaaS Platform Infrastructure",
        audience: "For startups building software platforms",
        includes: [
            "Platform infrastructure architecture",
            "CI/CD pipelines & container hosting",
            "Monitoring stack & scaling infrastructure",
            "Security configuration",
        ],
        deliverables: ["Full production platform infrastructure", "Automated deployments", "Monitoring dashboards"],
        timeline: "4–8 weeks",
        price: "R120k – R350k",
    },
    {
        icon: Lightbulb,
        title: "Strategic Consultation",
        audience: "For businesses exploring AI, cloud or digital transformation",
        includes: [
            "AI integration & automation strategy",
            "Cloud architecture review",
            "Business process optimisation",
            "Technology roadmap planning",
        ],
        deliverables: ["Strategic recommendations report", "Prioritised action plan"],
    },
];

export default function PackagesPage() {
    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden pt-20">
            {/* Background grid + glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-blue opacity-10 blur-[100px]" />
                <div className="absolute left-1/3 bottom-1/4 h-[200px] w-[200px] rounded-full bg-brand-blue opacity-5 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                        <Server className="h-4 w-4" />
                        <span>Service Packages</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 leading-tight">
                        Clear Scope.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">
                            Fixed Price.
                        </span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        Productised cloud and DevOps engagements — scoped, priced, and ready to start. Every package is tailored to your stack during the consultation.
                    </p>
                </motion.div>

                {/* CTA — Consultation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mb-16"
                >
                    <div className="glass rounded-xl p-8 max-w-2xl mx-auto border border-white/5 text-center">
                        <h2 className="font-heading text-xl font-bold text-white mb-2">
                            Start with a free 30-minute consultation
                        </h2>
                        <p className="text-slate-400 mb-6 text-sm">
                            We&apos;ll assess your infrastructure, recommend the right package, and scope the engagement to your needs.
                        </p>
                        <Link
                            href="/contact"
                            className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-8 font-medium text-brand-black transition-all hover:bg-brand-blue-glow box-glow-hover"
                        >
                            <span className="flex items-center gap-2">
                                Book a Consultation
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/* Package cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {packages.map((pkg, index) => {
                        const Icon = pkg.icon;
                        return (
                            <motion.div
                                key={pkg.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 glass overflow-hidden border border-white/5 hover:border-brand-blue/50 box-glow-hover bg-brand-black-light"
                            >
                                {/* Hover grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf807_1px,transparent_1px),linear-gradient(to_bottom,#38bdf807_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                <div className="relative z-10 flex flex-col flex-1">
                                    {/* Icon + title */}
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black group-hover:ring-brand-blue transition-colors duration-300">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-heading font-semibold text-white mb-1 group-hover:text-brand-blue transition-colors">
                                        {pkg.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-6">{pkg.audience}</p>

                                    {/* What's included */}
                                    <ul className="space-y-2 mb-6">
                                        {pkg.includes.map((item, idx) => (
                                            <li key={idx} className="flex items-start text-slate-300">
                                                <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue/50 flex-shrink-0 group-hover:bg-brand-blue transition-colors" />
                                                <span className="text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Deliverables */}
                                    <div className="mb-6">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Deliverables</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pkg.deliverables.map((d, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-block rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-xs text-brand-blue"
                                                >
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer: timeline + price */}
                                    {pkg.timeline && pkg.price ? (
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Timeline</p>
                                                    <p className="text-sm font-medium text-slate-300">{pkg.timeline}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 uppercase tracking-wider">From</p>
                                                    <p className="text-sm font-semibold text-brand-blue">{pkg.price}</p>
                                                    {pkg.priceAlt && (
                                                        <p className="text-xs text-slate-500 mt-0.5">{pkg.priceAlt}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-auto pt-6 border-t border-white/5 text-center">
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-blue-glow transition-colors"
                                            >
                                                Let&apos;s Talk
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
