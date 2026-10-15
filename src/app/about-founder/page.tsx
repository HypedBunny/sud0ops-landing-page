"use client";

import { useState } from "react";
import { CornerTicks } from "@/components/ui/CornerTicks";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    ExternalLink,
    MapPin,
    Linkedin,
    Mail,
    ShieldCheck,
    Cloud,
    GitBranch,
    Boxes,
    Activity,
    DollarSign,
    Terminal,
    Bot,
    Zap,
    Briefcase,
    CheckCircle2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  CONTENT                                                                    */
/*  Edit these arrays to update the page. No layout changes needed.            */
/* -------------------------------------------------------------------------- */

// TODO(Alex): paste each credential's public verification URL into verifyUrl.
// A "Verify" button appears automatically once a URL is present; until then
// the card shows a subtle "Verification link pending" tag.
const certifications = [
    {
        name: "AWS Certified Solutions Architect",
        level: "Professional",
        issuer: "Amazon Web Services",
        verifyUrl: "",
    },
    {
        name: "AWS Certified Developer",
        level: "Associate",
        issuer: "Amazon Web Services",
        verifyUrl: "",
    },
    {
        name: "AWS Certified Cloud Practitioner",
        level: "Foundational",
        issuer: "Amazon Web Services",
        verifyUrl: "",
    },
    {
        name: "FinOps Certified Practitioner",
        level: "Practitioner",
        issuer: "FinOps Foundation",
        verifyUrl: "",
    },
    {
        name: "AWS re/Start",
        level: "Graduate",
        issuer: "Amazon Web Services",
        verifyUrl: "",
    },
];

const experience = [
    {
        company: "Rhino Africa",
        role: "DevOps Engineer",
        period: "Apr 2026 to Present",
        location: "Cape Town",
        blurb:
            "Accountable for cloud governance, platform reliability and delivery standards across the AWS estate. Built keyless CI/CD on OIDC and the shared infrastructure as code, and led production migrations with zero downtime.",
    },
    {
        company: "Sud0ops",
        role: "Founder",
        period: "Dec 2025 to Present",
        location: "Cape Town",
        blurb:
            "Helping SMEs, NPOs, and small businesses scale with technology calibrated to their real needs and abilities. Not just advice: getting into the codebase and building alongside the team.",
    },
    {
        company: "Skywalk Innovations",
        role: "DevOps Engineer & AWS EEIP Programme DevOps Lead",
        period: "Jun 2023 to Mar 2026",
        location: "Cape Town",
        blurb:
            "DevOps lead for the AWS Equity Equivalent Investment Programme. Introduced and standardised CI/CD across every client, cut environment setup time by about half with AWS CDK, and moved clients to proactive monitoring on OpenTelemetry.",
    },
    {
        company: "Skywalk Innovations",
        role: "AWS Cloud Developer",
        period: "Jun 2022 to Jun 2023",
        location: "South Africa",
        blurb:
            "Built and deployed cloud applications on AWS: serverless with Lambda, content delivery with CloudFront, data on RDS and DynamoDB, compute on EC2, and CI/CD with AWS developer tools.",
    },
    {
        company: "AWS re/Start",
        role: "Graduate",
        period: "2022",
        location: "Cape Town",
        blurb:
            "Cloud fundamentals, Python, Linux, and debugging. The launchpad from behind the bar into a career in technology.",
    },
    {
        company: "Baghdad Café",
        role: "Bartender",
        period: "Dec 2020 to Jun 2023",
        location: "Cape Town",
        blurb:
            "Paid for my move into technology with bar shifts, through AWS re/Start and my first year as an engineer.",
    },
];

const work = [
    {
        name: "HelperHub",
        kind: "Technical Consultant",
        logo: "/helperhub-logo.png",
        logoClass: "h-10",
        blurb:
            "Technical consultant to a live payroll and HR platform for South African employers. Set the migration strategy from a legacy PHP monolith to a modern platform, delivered a security uplift on the live system with zero downtime, and rebuilt the release process.",
        liveUrl: "https://helperhub.co.za",
        caseUrl: "", // TODO(Alex): optional deep-dive / case study link
    },
    {
        name: "Bashies",
        kind: "Technical Build",
        logo: "/bashies-logo.png",
        logoClass: "h-14",
        blurb:
            "Built the online store on Shopify, with a fast, SEO-optimised React landing page.",
        liveUrl: "https://bashies.co.za",
        caseUrl: "",
    },
    {
        name: "Happy Shisha",
        kind: "Digital Enablement",
        logo: "/happyevents-logo.png",
        logoClass: "h-16",
        blurb:
            "Digital enablement and a social platform for a growing hospitality brand, bringing its sub-brands and services online.",
        liveUrl: "https://happyshisha.co.za",
        caseUrl: "",
    },
    {
        name: "ProVision Alliance",
        kind: "Volunteer Technical Advisor (NPO)",
        logo: "", // no logo asset yet; renders a monogram tile
        blurb:
            "Technical advisor to a youth-focused NPO. Delivered the website, domain, email and hosting, which removed a blocker to their funding applications, and onboarded them to nonprofit programmes, including Microsoft's.",
        liveUrl: "https://provisionalliance.org",
        caseUrl: "",
    },
];

const skills = [
    { label: "CI/CD & Containers (GitHub Actions, Docker)", icon: GitBranch },
    { label: "Infrastructure as Code (Terraform, AWS CDK)", icon: Boxes },
    { label: "AWS Cloud Architecture", icon: Cloud },
    { label: "Observability (OpenTelemetry, Grafana)", icon: Activity },
    { label: "Identity & Security (OIDC, IAM)", icon: ShieldCheck },
    { label: "FinOps & Cost Optimisation", icon: DollarSign },
    { label: "Scripting (Python, Bash)", icon: Terminal },
    { label: "AI & Agent Workflows (Claude Code)", icon: Bot },
];

const facts = [
    { label: "Based in", value: "Cape Town, South Africa" },
    { label: "Day job", value: "DevOps Engineer, Rhino Africa" },
    { label: "Founder", value: "Sud0ops, since December 2025" },
    { label: "Focus", value: "AWS platforms, CI/CD, reliability, security and cloud cost" },
    { label: "Top credential", value: "AWS Certified Solutions Architect, Professional" },
    { label: "Way in", value: "AWS re/Start, not a degree" },
];

const principles = [
    {
        title: "Improve it without taking it down",
        body: "Most of what I build sits under systems that already carry customers. Migrations and cutovers happen in phases, with zero downtime, never as one big switch.",
    },
    {
        title: "Root cause first",
        body: "When something breaks, I find out why before I change anything. Then I prove the fix under load before it ships.",
    },
    {
        title: "Standards that hold without me",
        body: "I standardise how infrastructure is built and how code reaches production. Then I automate the checks, so the standard holds when I am not in the room.",
    },
    {
        title: "Decisions people can make",
        body: "I write up options, cost and risk in plain language, so a non-technical founder can make the call with confidence.",
    },
];

/* -------------------------------------------------------------------------- */
/*  HEADSHOT                                                                   */
/*  Drop a photo at public/alex.jpg and it appears automatically, and the     */
/*  next build adds it to the JSON-LD, Open Graph and image sitemap.          */
/*  Until then a clean "AJ" monogram stands in.                               */
/* -------------------------------------------------------------------------- */
function Headshot() {
    const [ok, setOk] = useState(true);
    return (
        <figure className="relative">
            <CornerTicks />
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden border border-brand-line bg-brand-black-light">
                {ok ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src="/alex.jpg"
                        alt="Alex-Jay Beukes, DevOps and platform engineer and founder of Sud0ops"
                        width={448}
                        height={448}
                        className="h-full w-full object-cover"
                        onError={() => setOk(false)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]">
                        <span className="font-heading text-6xl font-bold text-brand-accent">
                            AJ
                        </span>
                    </div>
                )}
            </div>
            {/* Names the photo in the HTML next to it, so crawlers tie the face to the name. */}
            <figcaption className="sr-only">
                Alex-Jay Beukes, founder of Sud0ops, Cape Town
            </figcaption>
            <span className="absolute -bottom-3 left-3 flex items-center gap-1.5 border border-brand-line bg-brand-black px-2.5 py-1 font-mono text-xs text-slate-300">
                <span className="h-1.5 w-1.5 bg-brand-mint animate-pulse" />
                Open to build
            </span>
        </figure>
    );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function AlexPage() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* ------------------------------------------------------------- */}
            {/* HERO                                                          */}
            {/* ------------------------------------------------------------- */}
            <section className="relative flex items-center overflow-hidden pt-10">

                <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-accent/40 bg-brand-accent/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-accent">
                            <Zap className="h-4 w-4" />
                            <span>DevOps &amp; Platform Engineer · Founder of Sud0ops</span>
                        </div>

                        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                            Alex-Jay{" "}
                            <span className="text-brand-accent">
                                Beukes
                            </span>
                        </h1>

                        <p className="mt-4 flex items-center gap-2 font-mono text-sm text-slate-400">
                            <MapPin className="h-4 w-4 text-brand-accent" />
                            Cape Town, South Africa
                        </p>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                            I am a DevOps and platform engineer in Cape Town, and the
                            founder of Sud0ops. I look after cloud platforms that already
                            carry real customers, and I improve them without taking them
                            down. Through Sud0ops I help small businesses, growing teams
                            and NPOs pick the right technology and build it properly. I do
                            not just advise, I get into the codebase and build.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-accent px-8 font-medium text-brand-black transition-all hover:bg-brand-accent-hover lift-hover"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                <span className="mr-1">Get in Touch</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/alex-jay-beukes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="panel inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-brand-black/50 px-8 font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                            >
                                <Linkedin className="mr-2 h-4 w-4" />
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                        className="mx-auto lg:mx-0"
                    >
                        <Headshot />
                    </motion.div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* AT A GLANCE                                                   */}
            {/* ------------------------------------------------------------- */}
            <section id="at-a-glance" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {facts.map((fact) => (
                            <div
                                key={fact.label}
                                className="panel rounded-md border border-white/5 bg-brand-black-light p-5"
                            >
                                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent/70">
                                    {fact.label}
                                </dt>
                                <dd className="mt-2 text-sm font-medium text-slate-200">
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* STORY                                                         */}
            {/* ------------------------------------------------------------- */}
            <section id="story" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading
                        eyebrow="About"
                        title="My Story"
                        subtitle="How a bartender became a cloud engineer, and why that still shapes the work."
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="panel relative rounded-md p-8 sm:p-12"
                    >
                        <span className="absolute -top-4 -left-4 font-serif text-6xl text-brand-accent opacity-20">
                            &quot;
                        </span>
                        <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
                            I did not follow a traditional path into tech. I came in
                            through AWS re/Start, not a degree, and I paid for that change
                            with bar shifts in Cape Town. For a year I held both jobs:
                            engineering by day, behind the bar at night. That shaped my
                            standards early: discipline, resilience, and staying sharp when
                            things move fast.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-slate-300 sm:text-xl">
                            I started at Skywalk Innovations as an AWS cloud developer and
                            grew into DevOps lead for the AWS Equity Equivalent Investment
                            Programme, which helps South African businesses reach AWS
                            Partner standing. I introduced CI/CD where there was none,
                            standardised monitoring across every client, and took client
                            solutions through AWS Well-Architected reviews.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-slate-300 sm:text-xl">
                            Today I am a DevOps engineer at Rhino Africa, responsible for
                            cloud governance, platform reliability and delivery standards.
                            Through Sud0ops I was technical consultant to HelperHub, a
                            live payroll and HR platform, and I volunteer as technical
                            advisor to ProVision Alliance, a youth-focused NPO.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-slate-300 sm:text-xl">
                            <strong className="font-medium text-white">
                                Most businesses do not have an infrastructure problem,
                                they have an operations problem.
                            </strong>{" "}
                            Fragile deployments, manual processes, and systems held
                            together by workarounds. That is what I fix, calibrated to
                            each team&apos;s real needs and abilities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* HOW I WORK                                                    */}
            {/* ------------------------------------------------------------- */}
            <section id="how-i-work" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <SectionHeading
                        eyebrow="Principles"
                        title="How I Work"
                        subtitle="The rules I hold myself to, on every platform I touch."
                    />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {principles.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="panel rounded-md border border-white/5 bg-brand-black-light p-6"
                            >
                                <h3 className="font-heading text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    {item.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* CERTIFICATIONS                                                */}
            {/* ------------------------------------------------------------- */}
            <section id="certifications" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeading
                        eyebrow="Verified Credentials"
                        title="Certifications"
                        subtitle="AWS-heavy, with FinOps."
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.name + cert.level}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="group panel flex flex-col justify-between rounded-md border border-white/5 bg-brand-black-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/50 lift-hover"
                            >
                                <div>
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-brand-black">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <span className="rounded-sm border border-brand-accent/20 bg-brand-accent/5 px-3 py-1 font-mono text-xs text-brand-accent/80">
                                            {cert.level}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                                        {cert.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {cert.issuer}
                                    </p>
                                </div>

                                <div className="mt-5">
                                    {cert.verifyUrl ? (
                                        <a
                                            href={cert.verifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-hover"
                                        >
                                            <ShieldCheck className="h-4 w-4" />
                                            Verify credential
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            Verification link pending
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="https://www.credly.com/users/alex-jay-beukes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-hover"
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Verify all badges on Credly
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* EXPERIENCE                                                    */}
            {/* ------------------------------------------------------------- */}
            <section id="experience" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading
                        eyebrow="Experience"
                        title="The Path So Far"
                        subtitle="From behind the bar to leading cloud reliability."
                    />

                    <div className="relative border-l border-white/10 pl-8 sm:pl-10">
                        {experience.map((job, index) => (
                            <motion.div
                                key={job.company + job.role}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="relative pb-12 last:pb-0"
                            >
                                <span className="absolute -left-[42px] sm:-left-[50px] flex h-5 w-5 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-black">
                                    <span className="h-2 w-2 rounded-full bg-brand-accent" />
                                </span>

                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="font-heading text-lg font-semibold text-white">
                                        {job.role}
                                    </h3>
                                    <span className="font-mono text-xs text-brand-accent/70">
                                        {job.period}
                                    </span>
                                </div>
                                <p className="mt-0.5 flex items-center gap-2 text-sm font-medium text-slate-400">
                                    <Briefcase className="h-3.5 w-3.5 text-brand-accent/60" />
                                    {job.company}
                                    <span className="text-slate-600">·</span>
                                    <span className="text-slate-500">{job.location}</span>
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                    {job.blurb}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* SELECTED WORK                                                 */}
            {/* ------------------------------------------------------------- */}
            <section id="work" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <SectionHeading
                        eyebrow="Sud0ops Engagements"
                        title="Selected Work"
                        subtitle="Consulting and technical work that helps businesses run and grow properly."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {work.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group panel relative flex flex-col overflow-hidden rounded-md border border-white/5 bg-brand-black-light p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-accent/50 lift-hover"
                            >
                                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="mb-5 flex h-16 items-center">
                                        {project.logo ? (
                                            <Image
                                                src={project.logo}
                                                alt={project.name}
                                                width={160}
                                                height={64}
                                                className={`${project.logoClass ?? "h-12"} w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                                            />
                                        ) : (
                                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-accent/10 font-heading text-lg font-bold text-brand-accent ring-1 ring-brand-accent/20">
                                                PA
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-2 flex items-center gap-2">
                                        <h3 className="font-heading text-xl font-semibold text-white transition-colors group-hover:text-brand-accent">
                                            {project.name}
                                        </h3>
                                    </div>
                                    <p className="mb-4 font-mono text-xs tracking-wide text-brand-accent/70">
                                        {project.kind}
                                    </p>

                                    <p className="flex-1 text-sm leading-relaxed text-slate-400">
                                        {project.blurb}
                                    </p>

                                    <div className="mt-6 flex items-center gap-5 border-t border-white/5 pt-5">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-hover"
                                        >
                                            Visit site
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                        {project.caseUrl ? (
                                            <a
                                                href={project.caseUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                                            >
                                                Read the work
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-600">
                                                Case study coming soon
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* SKILLS                                                        */}
            {/* ------------------------------------------------------------- */}
            <section id="skills" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <SectionHeading
                        eyebrow="Toolkit"
                        title="What I Work With"
                        subtitle="A full-stack DevOps skill set, AWS-heavy, built for reliability and cost efficiency."
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={skill.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    className="panel flex items-center gap-3 rounded-md border border-white/5 bg-brand-black-light p-4 transition-colors hover:border-brand-accent/40"
                                >
                                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                                        <Icon className="h-4.5 w-4.5" />
                                    </span>
                                    <span className="text-sm font-medium text-slate-300">
                                        {skill.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* CONTACT CTA                                                   */}
            {/* ------------------------------------------------------------- */}
            <section id="contact" className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="panel relative overflow-hidden rounded-md border border-brand-accent/20 p-10 text-center sm:p-14"
                    >

                        <CheckCircle2 className="mx-auto mb-5 h-10 w-10 text-brand-accent" />
                        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                            Let us build something that lasts.
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Whether it is stabilising your infrastructure, automating the
                            work that slows your team down, or building the thing you have
                            been putting off, I am happy to talk it through.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group inline-flex h-12 items-center justify-center rounded-md bg-brand-accent px-8 font-medium text-brand-black transition-all hover:bg-brand-accent-hover lift-hover"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                alex@sud0ops.com
                            </a>
                            <a
                                href="https://www.linkedin.com/in/alex-jay-beukes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="panel inline-flex h-12 items-center justify-center rounded-md border border-slate-700 px-8 font-medium text-slate-300 transition-colors hover:text-white"
                            >
                                <Linkedin className="mr-2 h-4 w-4" />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  SHARED SECTION HEADING                                                     */
/* -------------------------------------------------------------------------- */
function SectionHeading({
    eyebrow,
    title,
    subtitle,
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
        >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent/70">
                {eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>
        </motion.div>
    );
}
