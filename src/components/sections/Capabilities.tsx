import { SectionLabel } from "@/components/ui/SectionLabel";

// How an engagement runs, drawn as a four-stage pipeline.
const capabilities = [
    {
        stage: "discover",
        title: "Discover the Right Technology",
        outcome: "Know what to buy before you buy it",
        items: [
            "Understand what your team actually needs",
            "Find the tools that overlap or go unused",
            "Honest advice on what to keep, add, or drop",
            "A clear plan, calibrated to your budget and skills",
        ],
    },
    {
        stage: "build",
        title: "Implement & Build",
        outcome: "From plan to working systems",
        items: [
            "Set up, configure, and connect your tools",
            "Custom automations and internal tools where they help",
            "We get into the work and build, not just advise",
            "Done properly: stable, documented, built to last",
        ],
    },
    {
        stage: "adopt",
        title: "Help Your Team Adapt",
        outcome: "Technology your team uses every day",
        items: [
            "Hands-on onboarding and guidance for your people",
            "Plain-English explanations, no jargon",
            "Pace and depth matched to your team's comfort",
            "Your team can run the tools without us",
        ],
    },
    {
        stage: "support",
        title: "Support & Keep Improving",
        outcome: "Help when you need it",
        items: [
            "Ongoing support when things change or break",
            "Tune and improve systems as you grow",
            "A partner to call, not just a one-off project",
        ],
    },
];

export function Capabilities() {
    return (
        <section id="capabilities" className="scroll-mt-20 border-t border-brand-line">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                <div className="mb-12 max-w-2xl">
                    <SectionLabel index="02">process</SectionLabel>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">Operations over theory</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-400">
                        We help at each step: choosing the tools, building with them, training your team, and supporting it after.
                    </p>
                </div>

                <ol className="grid gap-px border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((cap, i) => (
                        <li key={cap.title} className="relative flex flex-col bg-brand-black p-6 sm:p-8">
                            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider">
                                <span className={`h-2.5 w-2.5 ${i === 0 ? "bg-brand-blue" : "border border-brand-blue"}`} aria-hidden="true" />
                                <span className="text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-slate-400">{cap.stage}</span>
                            </div>
                            <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-white">{cap.title}</h3>
                            <p className="mb-5 text-sm font-medium text-brand-blue">{cap.outcome}</p>
                            <ul className="space-y-2.5 border-t border-brand-line pt-5">
                                {cap.items.map((item) => (
                                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                                        <span className="font-mono text-slate-400" aria-hidden="true">+</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
