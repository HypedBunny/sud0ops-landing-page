"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Mail, User, Building2, MessageSquare, Package } from "lucide-react";

const packageOptions = [
    "Cloud Foundation Setup",
    "DevOps Automation Setup",
    "Cloud Cost Optimisation Audit",
    "High Availability Architecture",
    "SaaS Platform Infrastructure",
    "Strategic Consultation",
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", company: "", packageInterest: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            setForm({ name: "", email: "", company: "", packageInterest: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        }
    }

    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden pt-20">
            {/* Background grid + glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-blue opacity-10 blur-[100px]" />
                <div className="absolute left-1/4 bottom-1/3 h-[200px] w-[200px] rounded-full bg-brand-blue opacity-5 blur-[80px]" />
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
                        <Mail className="h-4 w-4" />
                        <span>Get In Touch</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 leading-tight">
                        Start Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow">
                            Modernization
                        </span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        Tell us about your business. We&apos;ll get back to you within 24 hours to discuss how we can help you scale.
                    </p>
                </motion.div>

                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="glass rounded-xl p-8 lg:p-10"
                    >
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center text-center py-12 gap-4"
                            >
                                <div className="h-16 w-16 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/30 flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-brand-blue" />
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-white">Message Sent</h2>
                                <p className="text-slate-400 max-w-sm">
                                    Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-brand-blue/10 px-6 text-sm font-medium text-brand-blue ring-1 ring-brand-blue/30 transition-all hover:bg-brand-blue/20 hover:ring-brand-blue/50 hover:text-brand-blue-glow box-glow-hover"
                                >
                                    Send Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                            <User className="h-3.5 w-3.5 text-brand-blue" />
                                            Name <span className="text-brand-blue">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            placeholder="Alex Johnson"
                                            className="w-full rounded-md border border-white/10 bg-brand-black-lighter/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                            <Mail className="h-3.5 w-3.5 text-brand-blue" />
                                            Email <span className="text-brand-blue">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="alex@yourcompany.com"
                                            className="w-full rounded-md border border-white/10 bg-brand-black-lighter/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        <Building2 className="h-3.5 w-3.5 text-brand-blue" />
                                        Company <span className="text-slate-500 text-xs font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.company}
                                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                                        placeholder="Your Company Ltd."
                                        className="w-full rounded-md border border-white/10 bg-brand-black-lighter/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        <Package className="h-3.5 w-3.5 text-brand-blue" />
                                        Interested In <span className="text-slate-500 text-xs font-normal">(optional)</span>
                                    </label>
                                    <select
                                        value={form.packageInterest}
                                        onChange={e => setForm(f => ({ ...f, packageInterest: e.target.value }))}
                                        className="w-full rounded-md border border-white/10 bg-brand-black-lighter/60 px-4 py-3 text-sm text-white outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 appearance-none"
                                    >
                                        <option value="" className="bg-brand-black-lighter">Select a package...</option>
                                        {packageOptions.map(pkg => (
                                            <option key={pkg} value={pkg} className="bg-brand-black-lighter">{pkg}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        <MessageSquare className="h-3.5 w-3.5 text-brand-blue" />
                                        Message <span className="text-brand-blue">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        placeholder="Tell us about your business goals, current challenges, and what you're looking to achieve..."
                                        className="w-full resize-none rounded-md border border-white/10 bg-brand-black-lighter/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30"
                                    />
                                </div>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="group relative w-full inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-blue px-8 font-medium text-brand-black transition-all hover:bg-brand-blue-glow box-glow-hover disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Send Enquiry
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-500">
                                    We&apos;ll reply to your email within 24 hours.
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Info cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {[
                            { label: "Response Time", value: "< 24 hours" },
                            { label: "Based In", value: "South Africa" },
                            { label: "Clients Served", value: "SMEs Globally" },
                        ].map(item => (
                            <div
                                key={item.label}
                                className="glass rounded-lg px-6 py-4 text-center"
                            >
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                                <p className="text-sm font-medium text-brand-blue">{item.value}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
