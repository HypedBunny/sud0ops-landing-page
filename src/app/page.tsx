import { ArrowRight } from "lucide-react";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { OpsTerminal } from "@/components/ui/OpsTerminal";
import { CornerTicks } from "@/components/ui/CornerTicks";

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
                    <div>
                        <p className="mb-6 font-mono text-sm text-slate-500">
                            <span className="text-brand-accent">$</span> sudo ops --diagnose
                        </p>

                        <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
                            You don’t have a technology problem.{" "}
                            <span className="text-brand-blue">You have an operations problem.</span>
                        </h1>

                        <p className="mt-7 max-w-xl text-xl font-medium leading-snug text-brand-paper sm:text-2xl">
                            We don’t just advise; we build the pipelines alongside you.
                        </p>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                            Sud0ops helps growing teams pick the right tools, set them up properly, learn to use them, and get support when things change.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-brand-accent px-7 font-semibold text-brand-black transition-colors hover:bg-brand-accent-hover"
                            >
                                Get in Touch
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                            <a
                                href="#services"
                                className="inline-flex h-12 items-center justify-center rounded-sm border border-brand-line px-7 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-brand-black-light"
                            >
                                See what we fix
                            </a>
                        </div>

                        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-slate-500">
                            Small businesses, growing teams &amp; NPOs · South Africa &amp; UK
                        </p>
                    </div>

                    <OpsTerminal />
                </div>
            </section>

            <Services />
            <Capabilities />

            {/* Closing CTA */}
            <section className="border-t border-brand-line">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                    <div className="relative flex flex-col items-start justify-between gap-8 border border-brand-line bg-brand-black-light p-8 sm:p-12 lg:flex-row lg:items-center">
                        <CornerTicks />
                        <div className="max-w-2xl">
                            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Tell us where your business loses time.
                            </h2>
                            <p className="mt-3 text-lg text-slate-400">We will tell you what we would fix first.</p>
                        </div>
                        <div className="flex flex-col items-start gap-3">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-brand-accent px-7 font-semibold text-brand-black transition-colors hover:bg-brand-accent-hover"
                            >
                                Get in Touch
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                            <span className="font-mono text-xs text-slate-500">alex@sud0ops.com</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
