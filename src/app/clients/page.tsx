import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  CONTENT                                                                    */
/*  Edit this array to update the page. No layout changes needed.              */
/* -------------------------------------------------------------------------- */

// The logos are drawn for dark backgrounds, so each case is a dark card.
const clients = [
    {
        id: "helperhub",
        name: "HelperHub",
        kind: "technical consultancy & implementation",
        url: "https://helperhub.co.za",
        logo: { src: "/helperhub-logo.webp", width: 389, height: 85, className: "h-9 sm:h-11" },
        summary: "payroll & HR platform",
        description:
            "A live payroll and HR platform for South African employers. I streamlined its core operations with automated workflows and connected tools, secured the live platform without taking it down, and set the plan to move it off a legacy PHP monolith.",
        delivered: [
            "Workflow automation and tool integration across core processes",
            "Security uplift on the live platform, with zero downtime",
            "Migration strategy away from a legacy PHP monolith",
            "A rebuilt release process",
        ],
        tags: ["Technical consultancy", "Implementation", "Workflow automation", "Platform modernisation"],
    },
    {
        id: "bashies",
        name: "Bashies",
        kind: "digital presence & e-commerce",
        url: "https://bashies.co.za",
        logo: { src: "/bashies-logo.webp", width: 160, height: 160, className: "h-16 sm:h-20" },
        summary: "Shopify store",
        description: "I built the Bashies online store on Shopify, with a custom React landing page made to rank well in search.",
        delivered: ["Shopify store set up and customised", "SEO-optimised React landing page", "Automated order and fulfilment workflow"],
        tags: ["Shopify", "React", "SEO", "Automation"],
    },
    {
        id: "happy-shisha",
        name: "Happy Shisha",
        kind: "digital enablement & automation",
        url: "https://happyshisha.co.za",
        logo: { src: "/happyevents-logo.webp", width: 160, height: 160, className: "h-24 sm:h-28" },
        summary: "social events platform",
        description:
            "A custom social events platform that handles bookings, user engagement and live updates, so the team does much less of it by hand.",
        delivered: ["Custom social events platform", "Automated booking and notification workflows", "Real-time view of operations"],
        tags: ["Business automation", "Real-time", "Custom platform"],
    },
];

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function ClientsPage() {
    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section>
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] items-end gap-12 px-4 pt-[72px] pb-[88px] sm:px-6">
                    <div className="flex flex-col gap-6">
                        <p className="self-start rounded-full bg-brand-accent px-3.5 py-1.5 text-sm font-semibold text-brand-black">Clients</p>
                        <h1 className="font-heading text-[clamp(48px,6.4vw,100px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
                            Businesses{" "}
                            <br />
                            I’ve <span className="mark-amber">built for.</span>
                        </h1>
                        <p className="max-w-lg text-lg leading-relaxed text-slate-300">What I built for each one, and why.</p>
                    </div>

                    <nav aria-label="Clients on this page" className="mr-2 overflow-hidden rounded-2xl border border-slate-700 bg-brand-black-light shadow-[8px_8px_0_var(--color-brand-blue)]">
                        <p className="border-b border-brand-line px-5 py-3.5 font-semibold text-brand-paper">{clients.length} clients</p>
                        <ol className="flex flex-col">
                            {clients.map((client, i) => (
                                <li key={client.id} className="border-b border-brand-line last:border-b-0">
                                    <a
                                        href={`#${client.id}`}
                                        className="flex min-h-12 items-baseline gap-4 px-5 py-3 transition-colors hover:bg-brand-black-lighter focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-accent"
                                    >
                                        <span className="font-mono text-xs text-brand-accent">0{i + 1}</span>
                                        <span className="flex flex-1 flex-col gap-0.5 min-[480px]:flex-row min-[480px]:items-baseline min-[480px]:justify-between min-[480px]:gap-4">
                                            <span className="font-heading text-lg font-bold text-brand-paper">{client.name}</span>
                                            <span className="font-mono text-xs text-slate-400">{client.summary}</span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Cases */}
            <section className="bg-brand-paper text-brand-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 pt-[72px] pb-24 sm:px-6">
                    <div className="flex flex-wrap justify-between gap-3 font-mono text-xs text-slate-600">
                        <span>Client work</span>
                        <span>{clients.length} clients</span>
                    </div>
                    <ol className="flex flex-col gap-9">
                        {clients.map((client, i) => (
                            <li
                                key={client.id}
                                id={client.id}
                                className={`grid scroll-mt-6 grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-x-12 gap-y-8 rounded-[20px] border-2 border-brand-black bg-brand-black p-6 text-brand-paper sm:p-9 ${i % 2 ? "shadow-[8px_8px_0_var(--color-brand-blue)]" : "shadow-[8px_8px_0_var(--color-brand-accent)]"}`}
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between gap-4 font-mono text-xs text-slate-400">
                                        <span className="flex-none whitespace-nowrap">
                                            0{i + 1} / 0{clients.length}
                                        </span>
                                        <span className="text-right text-brand-blue">{client.kind}</span>
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={client.logo.src}
                                        alt={`${client.name} logo`}
                                        width={client.logo.width}
                                        height={client.logo.height}
                                        loading={i === 0 ? "eager" : "lazy"}
                                        className={`${client.logo.className} w-auto self-start object-contain`}
                                    />
                                    <h2 className="font-heading text-[clamp(34px,3.8vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]">{client.name}</h2>
                                    <p className="text-[17px] leading-relaxed text-slate-300">{client.description}</p>
                                    <a
                                        href={client.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex min-h-11 items-center gap-2.5 self-start rounded-full border-2 border-slate-600 px-4.5 font-mono text-[13px] font-bold text-brand-paper transition hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
                                    >
                                        {client.url.replace("https://", "")} <span aria-hidden="true">↗</span>
                                        <span className="sr-only">(opens in a new tab)</span>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-6 border-t border-brand-line pt-7 min-[900px]:border-t-0 min-[900px]:border-l min-[900px]:pt-0 min-[900px]:pl-12">
                                    <div className="flex flex-col gap-3.5">
                                        <h3 className="font-mono text-xs text-brand-accent">what I delivered</h3>
                                        <ul className="flex flex-col gap-3 text-base leading-snug text-brand-paper">
                                            {client.delivered.map((item) => (
                                                <li key={item} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2">
                                                    <span aria-hidden="true" className="font-mono text-brand-accent">›</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <ul aria-label="Areas" className="mt-auto flex flex-wrap gap-2 font-mono text-[11px] text-slate-300">
                                        {client.tags.map((tag) => (
                                            <li key={tag} className="rounded-full border border-slate-600 px-2.5 py-[3px]">{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Say hello */}
            <section className="bg-brand-paper px-4 pb-[72px]">
                <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-8 rounded-[28px] bg-brand-accent px-6 py-16 text-brand-black sm:px-10">
                    <div className="flex max-w-2xl flex-col gap-3.5">
                        <h2 className="font-heading text-[clamp(36px,4.2vw,60px)] leading-none font-extrabold tracking-[-0.045em]">Have a problem like these?</h2>
                        <p className="text-lg leading-normal">Tell me where your business loses time and I’ll tell you what I would fix first.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="inline-flex min-h-14 items-center gap-3.5 rounded-full bg-brand-black py-2 pr-2 pl-6 font-bold text-brand-paper transition-transform hover:-translate-y-0.5"
                        >
                            alex@sud0ops.com
                            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-accent font-mono text-brand-black">→</span>
                        </a>
                        <Link
                            href="/about-founder"
                            className="inline-flex min-h-14 items-center rounded-full border-2 border-brand-black px-6 font-mono text-sm font-bold transition-transform hover:-translate-y-0.5"
                        >
                            meet Alex-Jay →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
