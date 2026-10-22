"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    ArrowRight,
    Cloud,
    ShoppingCart,
    Calendar,
    CheckCircle,
} from "lucide-react";

const clients = [
    {
        name: "HelperHub",
        logo: "/helperhub-logo.webp",
        logoClass: "h-12",
        url: "https://helperhub.co.za",
        tagline: "Technical Consultancy & Implementation",
        description:
            "Technical consultancy and hands-on implementation for HelperHub, a live payroll and HR platform for South African employers. We streamlined its core operations with automated workflows and connected tools, secured the live platform with zero downtime, and set the strategy to move it off a legacy PHP monolith.",
        deliverables: [
            "Workflow automation and tool integration across core processes",
            "Zero-downtime security uplift on the live platform",
            "Migration strategy from a legacy PHP monolith",
            "Rebuilt release process",
        ],
        tags: ["Technical Consultancy", "Implementation", "Workflow Automation", "Platform Modernisation"],
        icon: Cloud,
    },
    {
        name: "Bashies",
        logo: "/bashies-logo.webp",
        logoClass: "h-16",
        url: "https://bashies.co.za",
        tagline: "Digital Presence & E-commerce Enablement",
        description:
            "Built the Bashies online store on Shopify, with a custom React landing page made to rank well in search.",
        deliverables: [
            "Shopify store setup & customisation",
            "SEO-optimised React landing page",
            "Automated order and fulfilment workflow",
        ],
        tags: ["Shopify", "React", "SEO", "Automation"],
        icon: ShoppingCart,
    },
    {
        name: "Happy Shisha",
        logo: "/happyevents-logo.webp",
        logoClass: "h-20",
        url: "https://happyshisha.co.za",
        tagline: "Digital Enablement & Business Automation",
        description:
            "Built a custom social events platform that handles bookings, user engagement, and live updates, so the team does much less of it by hand.",
        deliverables: [
            "Custom social events platform",
            "Automated booking & notification workflows",
            "Real-time operational visibility",
        ],
        tags: ["Business Automation", "Real-time", "Custom Platform"],
        icon: Calendar,
    },
];

// Height of the snap container: the viewport minus the header (about 5rem)
// Uses dvh (dynamic viewport height) so mobile browser chrome is handled correctly
const SNAP_HEIGHT = "calc(100dvh - 5rem)";

export default function ClientsPage() {
    const shouldReduceMotion = useReducedMotion();

    const fadeUpTransition: Transition = shouldReduceMotion
        ? { duration: 0.2 }
        : { duration: 0.7, ease: "easeOut" as const };

    const revealTransition: Transition = shouldReduceMotion
        ? { duration: 0.2 }
        : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.05 };

    const fadeUpAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

    const revealInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.97 };
    const revealAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

    return (
        <div className="relative">
            {/*
              Scroll-snap container.
              - overflow-y-scroll + snap-y mandatory: each section snaps into place
              - Height fills the viewport below the header
            */}
            <div
                className="relative z-10 overflow-y-scroll"
                style={{
                    height: SNAP_HEIGHT,
                    scrollSnapType: "y mandatory",
                    scrollBehavior: "smooth",
                }}
                aria-label="Client portfolio, scroll to navigate"
            >

                {/* ── HERO SCREEN ─────────────────────────────────── */}
                <section
                    className="flex flex-col items-center justify-center text-center px-6"
                    style={{ height: SNAP_HEIGHT, scrollSnapAlign: "start" }}
                >
                    <motion.div
                        initial={false}
                        animate={fadeUpAnimate}
                        transition={fadeUpTransition}
                        className="max-w-2xl w-full"
                    >
                        {/* Badge — matches services page pattern */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-blue/40 bg-brand-blue/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-blue">
                            <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            <span>Clients</span>
                        </div>

                        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 leading-tight">
                            Businesses We{" "}
                            <span className="text-brand-blue">
                                Work With
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
                            What we built for each one, and why.
                        </p>

                        {/* Scroll hint — uses inline style for gradient to avoid missing Tailwind class */}
                        <div className="flex flex-col items-center gap-2 text-sm text-slate-400" aria-hidden="true">
                            <span>Scroll to explore</span>
                            <motion.div
                                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                                className="w-px h-8 rounded-full"
                                style={{
                                    background: "linear-gradient(to bottom, color-mix(in oklab, var(--color-brand-blue) 70%, transparent), transparent)",
                                }}
                            />
                        </div>
                    </motion.div>
                </section>

                {/* ── CLIENT SCREENS ──────────────────────────────── */}
                {clients.map((client, i) => {
                    const Icon = client.icon;
                    return (
                        <section
                            key={client.name}
                            className="flex items-center justify-center px-6 py-6"
                            style={{ minHeight: SNAP_HEIGHT, scrollSnapAlign: "start" }}
                            aria-label={`Client: ${client.name}`}
                        >
                            <motion.div
                                initial={revealInitial}
                                whileInView={revealAnimate}
                                viewport={{ once: false, amount: 0.4 }}
                                transition={revealTransition}
                                className="panel rounded-md border border-white/5 hover:border-brand-blue/30 transition-colors duration-500 p-6 md:p-10 w-full max-w-2xl relative overflow-hidden group lift-hover"
                            >
                                {/* Subtle hover grid overlay — matches services page */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)",
                                        backgroundSize: "16px 16px",
                                    }}
                                    aria-hidden="true"
                                />

                                <div className="relative z-10">
                                    {/* Top row: index + icon + external link */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-slate-400 select-none" aria-hidden="true">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div
                                                className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 group-hover:bg-brand-blue group-hover:text-brand-black transition-colors duration-300"
                                                aria-hidden="true"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <Link
                                            href={client.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-brand-blue transition-colors duration-200 cursor-pointer"
                                            aria-label={`Visit ${client.name} website (opens in new tab)`}
                                        >
                                            Visit site
                                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </Link>
                                    </div>

                                    {/* Logo */}
                                    <div className="mb-5 opacity-70 group-hover:opacity-100 transition-all duration-500">
                                        <Image
                                            src={client.logo}
                                            alt={`${client.name} logo`}
                                            width={180}
                                            height={70}
                                            className={`${client.logoClass} w-auto object-contain`}
                                        />
                                    </div>

                                    {/* Name + tagline */}
                                    <h2 className="font-heading text-2xl font-bold text-white mb-1 group-hover:text-brand-blue transition-colors duration-300">
                                        {client.name}
                                    </h2>
                                    <p className="text-brand-blue text-sm font-medium mb-4">
                                        {client.tagline}
                                    </p>

                                    {/* Description */}
                                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                        {client.description}
                                    </p>

                                    {/* Deliverables */}
                                    <ul className="space-y-2 mb-5" aria-label="What we delivered">
                                        {client.deliverables.map((d) => (
                                            <li key={d} className="flex items-center gap-2.5">
                                                <CheckCircle className="h-4 w-4 text-brand-blue flex-shrink-0" aria-hidden="true" />
                                                <span className="text-sm text-slate-300">{d}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tags — matches services page mono tag style */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                        {client.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block rounded-md border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-xs font-medium text-brand-blue font-mono tracking-wide"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </section>
                    );
                })}

                {/* ── CTA SCREEN ──────────────────────────────────── */}
                <section
                    className="flex flex-col items-center justify-center text-center px-6"
                    style={{ height: SNAP_HEIGHT, scrollSnapAlign: "start" }}
                    aria-label="Contact call to action"
                >
                    <motion.div
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={revealTransition}
                        className="panel rounded-md border border-white/5 hover:border-brand-blue/30 transition-colors duration-300 p-10 md:p-16 max-w-lg w-full"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-blue/40 bg-brand-blue/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-blue">
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            <span>Next Step</span>
                        </div>

                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            Have a problem like these?
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Tell us where your business loses time, and we will tell you
                            what we would fix first.
                        </p>

                        <a
                            href="mailto:alex@sud0ops.com"
                            className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-accent px-8 font-medium text-brand-black transition-all hover:bg-brand-accent-hover lift-hover cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                Book a Free Discovery Call
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </a>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
