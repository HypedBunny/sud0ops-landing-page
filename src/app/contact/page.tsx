"use client";

import { useState } from "react";

const packageOptions = [
    "Workflow automation",
    "Tool integration",
    "AI assistant or internal tool",
    "Dashboards and reporting",
    "Process audit and efficiency review",
    "Investigative consultation",
    "Issue investigation and resolution",
    "Cloud tool consulting",
    "Not sure yet, just want to talk",
];

const facts = [
    { key: "Reply", value: "within 24 hours" },
    { key: "Based in", value: "Cape Town, South Africa" },
    { key: "Who I help", value: "small businesses, growing teams and NPOs" },
];

const empty = { name: "", email: "", company: "", packageInterest: "", message: "" };
type Field = keyof typeof empty;

const input =
    "w-full rounded-xl border-2 border-brand-black bg-white px-4 py-3 text-[15px] text-brand-black placeholder:text-slate-500 outline-none transition-shadow focus-visible:shadow-[4px_4px_0_var(--color-brand-blue-ink)]";
const label = "flex items-baseline gap-2 font-mono text-xs font-bold";
const optional = <span className="font-normal text-slate-600">optional</span>;

// The enquiry form. It stays live but unlinked (and out of search, see layout.tsx): enquiries mostly
// arrive by email. It posts to /api/contact, which emails alex@sud0ops.com and sends a confirmation.
export default function ContactPage() {
    const [form, setForm] = useState(empty);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const bind = (field: Field) => ({
        id: `contact-${field}`,
        name: field,
        value: form[field],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [field]: e.target.value })),
    });

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
            setForm(empty);
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        }
    }

    return (
        <section>
            <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-14 px-4 pt-[72px] pb-24 sm:px-6">
                <div className="flex flex-col gap-6.5 min-[900px]:sticky min-[900px]:top-8">
                    <p className="self-start rounded-full bg-brand-accent px-3.5 py-1.5 text-sm font-semibold text-brand-black">Say hello</p>
                    <h1 className="font-heading text-[clamp(44px,5.6vw,84px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                        Tell me what’s <span className="mark-amber my-1.5">slowing you down.</span>
                    </h1>
                    <p className="max-w-lg text-lg leading-relaxed text-slate-300">
                        A few lines about what is broken, or what eats your team’s time, is enough. I reply within 24 hours with what I would fix first.
                    </p>
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-brand-black-light text-sm">
                        <p className="border-b border-brand-line px-4 py-3 font-semibold text-brand-paper">At a glance</p>
                        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 p-4 leading-snug">
                            {facts.map((fact) => (
                                <div key={fact.key} className="contents">
                                    <dt className="text-slate-400">{fact.key}</dt>
                                    <dd className="text-brand-paper">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <p className="text-[15px] text-slate-400">
                        Prefer email?{" "}
                        <a href="mailto:alex@sud0ops.com" className="font-mono text-brand-blue transition-colors hover:text-brand-blue-hover">alex@sud0ops.com</a>
                    </p>
                </div>

                <div className="mr-2.5 rounded-[20px] border-2 border-brand-paper bg-brand-paper p-6 text-brand-black shadow-[10px_10px_0_var(--color-brand-accent)] sm:p-8">
                    <div aria-live="polite">
                        {status === "success" ? (
                            <div className="flex flex-col items-start gap-4 py-8">
                                <p className="font-mono text-xs font-bold text-brand-blue-text">sent ✓</p>
                                <h2 className="font-heading text-[clamp(32px,3.4vw,44px)] leading-none font-extrabold tracking-[-0.04em]">Message sent.</h2>
                                <p className="max-w-sm text-[17px] leading-relaxed text-slate-700">Thanks for getting in touch. I’ll reply to your email within 24 hours.</p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="mt-2 inline-flex min-h-12 cursor-pointer items-center rounded-full border-2 border-brand-black px-5 font-mono text-[13px] font-bold transition-transform hover:-translate-y-0.5"
                                >
                                    send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <h2 className="font-mono text-xs text-slate-600">new enquiry</h2>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contact-name" className={label}>Name <span aria-hidden="true" className="text-brand-accent-text">*</span></label>
                                        <input type="text" required autoComplete="name" placeholder="Your name" className={input} {...bind("name")} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contact-email" className={label}>Email <span aria-hidden="true" className="text-brand-accent-text">*</span></label>
                                        <input type="email" required autoComplete="email" placeholder="you@company.com" className={input} {...bind("email")} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact-company" className={label}>Company {optional}</label>
                                    <input type="text" autoComplete="organization" placeholder="Company or organisation" className={input} {...bind("company")} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact-packageInterest" className={label}>What do you need help with? {optional}</label>
                                    <div className="relative">
                                        <select className={`${input} cursor-pointer appearance-none pr-10`} {...bind("packageInterest")}>
                                            <option value="">Choose one</option>
                                            {packageOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                                        </select>
                                        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-sm">▾</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact-message" className={label}>Message <span aria-hidden="true" className="text-brand-accent-text">*</span></label>
                                    <textarea required rows={6} placeholder="What’s broken? What’s slowing you down?" className={`${input} resize-y`} {...bind("message")} />
                                </div>

                                {status === "error" && (
                                    <p role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 px-4 py-3 text-[15px] text-red-800">
                                        {errorMsg} You can also email alex@sud0ops.com.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="inline-flex min-h-14 cursor-pointer items-center justify-between gap-3.5 rounded-full bg-brand-black py-2 pr-2 pl-6 font-bold text-brand-paper transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    {status === "loading" ? "Sending…" : "Send enquiry"}
                                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-accent font-mono text-brand-black">→</span>
                                </button>
                                <p className="font-mono text-xs text-slate-600">
                                    <span aria-hidden="true" className="text-brand-accent-text">*</span> required · I reply within 24 hours.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
