import { Workflow, Plug, Bot, LayoutDashboard } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

// The four core services, each framed as the problem a team has today and what changes after.
const services = [
    {
        icon: Workflow,
        title: "Workflow Automation",
        before: "Your team re-types the same details from email into spreadsheets, invoices and follow-ups, every day.",
        after: "Repetitive steps run on their own. People step in only where a decision needs a person.",
    },
    {
        icon: Plug,
        title: "Tool Integration",
        before: "Your CRM, billing, project and messaging tools each hold a different version of the truth.",
        after: "Data moves between your tools without copy and paste, so every system shows the same picture.",
    },
    {
        icon: Bot,
        title: "AI Assistants",
        before: "Questions queue up for the one senior person who knows where everything is.",
        after: "An internal assistant answers from your own documents and data, so the team keeps moving.",
    },
    {
        icon: LayoutDashboard,
        title: "Operational Dashboards",
        before: "Reports get rebuilt by hand each week and are out of date by the time anyone reads them.",
        after: "One live view of your KPIs, pipeline and operations, ready whenever you need it.",
    },
];

export function Services() {
    return (
        <section id="services" className="scroll-mt-20 border-t border-brand-line">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                <div className="mb-12 max-w-2xl">
                    <SectionLabel index="01">services</SectionLabel>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">What we fix</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-400">
                        Four places growing teams lose the most time, and what they look like once they are fixed.
                    </p>
                </div>

                {/* gap-px over a line-coloured background draws the grid lines between cells. */}
                <div className="grid gap-px border border-brand-line bg-brand-line md:grid-cols-2">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <article key={service.title} className="group flex flex-col bg-brand-black p-6 transition-colors duration-300 hover:bg-brand-black-light sm:p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center border border-brand-line text-brand-blue transition-colors group-hover:border-brand-blue">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <h3 className="font-heading text-xl font-semibold text-white">{service.title}</h3>
                                    </div>
                                    <span className="font-mono text-xs text-slate-400" aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <dl className="grid flex-1 gap-4">
                                    <div>
                                        <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">Before</dt>
                                        <dd className="text-sm leading-relaxed text-slate-400">{service.before}</dd>
                                    </div>
                                    <div className="border-l-2 border-brand-blue pl-4">
                                        <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-brand-blue">After</dt>
                                        <dd className="text-sm leading-relaxed text-brand-paper">{service.after}</dd>
                                    </div>
                                </dl>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
