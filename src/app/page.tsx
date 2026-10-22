import Link from "next/link";
import { HeroLoop } from "@/components/home/HeroLoop";
import { Leaks } from "@/components/home/Leaks";
import { Method } from "@/components/home/Method";
import { WorkLog, type WorkEntry } from "@/components/home/WorkLog";
import { ZeroMark } from "@/components/ui/ZeroMark";
import { formatDate, getPosts } from "@/lib/blog";

// Words in the tilted ticker, each read as "zero ___".
const zeroes = ["downtime", "re-typing", "copy-paste", "jargon", "black boxes"];

const rules = [
    {
        title: "Improve it without taking it down",
        body: "Most of what we build sits under systems that already carry customers. Migrations and cutovers happen in phases, with zero downtime, never as one big switch.",
    },
    {
        title: "Root cause first",
        body: "When something breaks, we find out why before we change anything. Then we prove the fix under load before it ships.",
    },
    {
        title: "Standards that hold without us",
        body: "We standardise how infrastructure is built and how code reaches production, then automate the checks so the standard holds after we leave.",
    },
    {
        title: "Decisions people can make",
        body: "We write up the options, cost and risk in plain language, so a non-technical founder can make the call.",
    },
];

const work: WorkEntry[] = [
    {
        tag: "consulting · discover + build",
        title: "HelperHub, a live payroll and HR platform",
        body: "Set the migration strategy away from a legacy PHP monolith, delivered a security uplift on the live system with zero downtime, and rebuilt the release process.",
    },
    {
        tag: "volunteer · adopt",
        title: "ProVision Alliance, a youth NPO",
        body: "Delivered the website, domain, email and hosting, which removed a blocker to their funding applications, and onboarded them to nonprofit programmes.",
    },
    {
        tag: "small business · build",
        title: "Bashies",
        body: "Built the online store on Shopify, with a fast, SEO-optimised React landing page.",
    },
    {
        tag: "hospitality · build + support",
        title: "Happy Shisha",
        body: "Digital enablement and a social platform for a growing hospitality brand, bringing its sub-brands and services online.",
    },
];

const contactRows = [
    { href: "mailto:alex@sud0ops.com", command: "mail alex@sud0ops.com" },
    { href: "https://www.linkedin.com/in/alex-jay-beukes", command: "open linkedin/alex-jay-beukes" },
    { href: "/blog", command: "cat ./writing" },
    { href: "/about-founder", command: "whoami --long" },
];

export default function Home() {
    const latest = getPosts()[0];

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section>
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(540px,100%),1fr))] items-center gap-12 px-4 pt-14 pb-[88px] sm:px-6">
                    <div className="flex flex-col gap-7">
                        <p className="flex items-center gap-2 self-start bg-brand-accent px-3 py-1.5 font-mono text-[13px] font-bold text-brand-black">
                            $ sudo ops --diagnose
                            <span aria-hidden="true" className="cursor-blink inline-block h-[15px] w-2 bg-brand-black" />
                        </p>
                        <h1 className="flex flex-col gap-2.5 font-heading">
                            <span className="text-[clamp(30px,3.4vw,46px)] leading-tight font-bold tracking-[-0.03em] text-slate-500">
                                It’s rarely a <span className="line-through decoration-brand-accent decoration-[5px]">technology</span> problem.
                            </span>
                            <span className="text-[clamp(46px,5.6vw,82px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-brand-paper">
                                It’s an <span className="mark-amber my-1.5">operations</span> problem.
                            </span>
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
                            Sud0ops helps small businesses, growing teams and NPOs pick the right tools, set them up properly, train their people and keep it all running. We do the build work ourselves, alongside your team.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="inline-flex min-h-14 items-center gap-3.5 rounded-full bg-brand-accent py-2 pr-2 pl-6 font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                            >
                                Get in touch
                                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-black font-mono text-brand-accent">→</span>
                            </a>
                            <a
                                href="#loop"
                                className="inline-flex min-h-14 items-center gap-2.5 rounded-full border border-slate-600 px-6 font-mono text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-brand-paper hover:text-brand-paper"
                            >
                                <span aria-hidden="true" className="text-brand-blue">$</span>see the method
                            </a>
                        </div>
                        <p className="flex flex-wrap items-center gap-x-4.5 gap-y-2 font-mono text-xs text-slate-400">
                            <span><span className="text-brand-accent">●</span> Small businesses, growing teams &amp; NPOs</span>
                            <span><span className="text-brand-accent">●</span> South Africa &amp; UK</span>
                            <span className="text-slate-600">|</span>
                            <span>Cape Town</span>
                        </p>
                    </div>
                    <HeroLoop />
                </div>
            </section>

            {/* Tilted ticker */}
            <div aria-label={`Zero ${zeroes.join(", zero ")}`} role="img" className="bg-brand-paper pt-4 pb-10">
                <div className="-mx-10 -rotate-2 overflow-hidden border-y-[3px] border-brand-accent bg-brand-black py-5">
                    <div aria-hidden="true" className="ticker flex w-max font-heading text-[clamp(26px,2.6vw,38px)] font-extrabold tracking-[-0.02em] whitespace-nowrap">
                        {[...zeroes, ...zeroes].map((word, i) => (
                            <span key={i} className="inline-flex items-center gap-3 pr-9">
                                <ZeroMark className="h-[0.82em] w-auto" />
                                <span className="text-brand-paper">{word}</span>
                                <span className="pl-6 text-brand-accent">×</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Leaks />
            <Method />

            {/* House rules */}
            <section id="rules" className="scroll-mt-4 bg-brand-paper text-brand-black">
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-10 px-4 py-[88px] sm:px-6">
                    <div className="flex flex-col gap-5">
                        <p className="font-mono text-xs text-slate-600">03 / house rules</p>
                        <h2 className="font-heading text-[clamp(36px,4vw,56px)] leading-none font-extrabold tracking-[-0.04em]">
                            The rules
                            <br />
                            we work by.
                        </h2>
                        <p className="max-w-md text-[17px] leading-relaxed text-slate-600">
                            Four rules we hold to on every system, whatever its size.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border-2 border-brand-black bg-white font-mono shadow-[8px_8px_0_var(--color-brand-black)]">
                        <div className="flex justify-between gap-3 border-b-2 border-brand-black px-5 py-3.5 text-xs text-slate-600">
                            <span>/etc/sud0ers</span>
                            <span>read-only</span>
                        </div>
                        <ol>
                            {rules.map((rule, i) => (
                                <li key={rule.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-slate-200 px-5 py-5.5 last:border-b-0">
                                    <span className="text-[13px] font-bold text-brand-blue-ink">0{i + 1}</span>
                                    <h3 className="font-heading text-[19px] font-bold tracking-[-0.01em]">{rule.title}</h3>
                                    <p className="col-start-2 font-sans text-[15px] leading-relaxed text-slate-600">{rule.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Work */}
            <section id="log" className="scroll-mt-4 bg-brand-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-[88px] sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-7">
                        <div className="flex flex-col gap-4">
                            <p className="font-mono text-xs text-slate-400">04 / recent work</p>
                            <h2 className="font-heading text-[clamp(38px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em]">
                                The method,
                                <br />
                                <span className="text-brand-blue">on real teams.</span>
                            </h2>
                        </div>
                        <p className="font-mono text-[13px] text-slate-400">
                            <span className="text-brand-accent">$</span> git log --oneline --all
                        </p>
                    </div>
                    <WorkLog entries={work} />
                    {latest && (
                        <Link
                            href={`/blog/${latest.slug}`}
                            className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-center gap-x-10 gap-y-4 rounded-2xl border border-brand-line bg-brand-black-light p-7 transition-colors hover:border-brand-accent"
                        >
                            <div className="flex flex-col gap-2.5">
                                <span className="font-mono text-xs text-brand-accent">
                                    latest writing · <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                                </span>
                                <span className="font-heading text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-brand-paper">{latest.title}</span>
                            </div>
                            <div className="flex flex-col gap-3.5">
                                <span className="text-[15px] leading-relaxed text-slate-300">{latest.description}</span>
                                <span className="font-mono text-[13px] text-brand-blue">read the post →</span>
                            </div>
                        </Link>
                    )}
                </div>
            </section>

            {/* Say hello */}
            <section id="hello" className="scroll-mt-4 bg-brand-paper px-4 py-[72px]">
                <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] bg-brand-accent text-brand-black">
                    <ZeroMark pieces="fill-brand-black" dot="fill-brand-black" className="pointer-events-none absolute -bottom-40 -left-24 h-auto w-[440px] opacity-10" />
                    <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-center gap-12 px-6 py-16 sm:px-10 sm:py-[72px]">
                        <div className="flex flex-col gap-5">
                            <p className="font-mono text-xs font-bold">05 / say hello</p>
                            <h2 className="font-heading text-[clamp(40px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
                                Tell us where your business loses time.
                            </h2>
                            <p className="max-w-md text-lg leading-normal">We’ll tell you what we would fix first.</p>
                            <div className="flex items-center gap-3.5 pt-1.5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/alex-224.webp" alt="Alex-Jay Beukes" width={52} height={52} loading="lazy" className="h-[52px] w-[52px] rounded-full border-2 border-brand-black object-cover" />
                                <p className="font-mono text-xs leading-normal">
                                    <strong>Alex-Jay Beukes</strong>
                                    <br />
                                    Founder · Cape Town, South Africa
                                </p>
                            </div>
                        </div>
                        <nav aria-label="Contact" className="overflow-hidden rounded-[18px] bg-brand-black font-mono text-brand-paper shadow-[10px_10px_0_rgb(15_23_42/0.25)]">
                            <div className="flex items-center gap-1.5 border-b border-brand-line px-5 py-3.5 text-xs text-slate-400">
                                <span className="h-[9px] w-[9px] rounded-full bg-brand-accent" />
                                <span className="h-[9px] w-[9px] rounded-full bg-slate-600" />
                                <span className="h-[9px] w-[9px] rounded-full bg-slate-600" />
                                <span className="ml-2.5">~ hello</span>
                            </div>
                            {contactRows.map((row) => (
                                <Link
                                    key={row.href}
                                    href={row.href}
                                    className="flex min-h-11 items-center justify-between gap-4 border-b border-brand-line px-5 py-5.5 text-[15px] text-brand-paper transition-colors last:border-b-0 hover:bg-brand-black-light"
                                >
                                    <span className="[overflow-wrap:anywhere]">
                                        <span className="text-brand-accent">$</span> {row.command}
                                    </span>
                                    <span aria-hidden="true" className="text-brand-accent">→</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
}
