import Link from "next/link";
import { FieldLog, type LogEntry } from "@/components/home/FieldLog";
import { Film } from "@/components/home/Film";
import { HelloZero } from "@/components/home/HelloZero";
import { LeakSteps } from "@/components/home/LeakSteps";
import { RulesList, type Rule } from "@/components/home/RulesList";
import { HelperHub } from "@/components/ui/HelperHub";
import { ZeroMark } from "@/components/ui/ZeroMark";
import { formatDate, getPosts } from "@/lib/blog";

// Words in the tilted ticker, each read as "zero ___".
const zeroes = ["downtime", "re-typing", "copy-paste", "jargon", "black boxes"];

const rules: Rule[] = [
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
        body: "I standardise how infrastructure is built and how code reaches production, then automate the checks so the standard holds when I am not in the room.",
    },
    {
        title: "Decisions people can make",
        body: "I write up the options, cost and risk in plain language, so a non-technical founder can make the call.",
    },
];

const work: LogEntry[] = [
    {
        tag: "platform · build + support",
        title: "DevOps lead, AWS EEIP programme",
        body: "Introduced and standardised CI/CD across every client, cut environment setup time by about half with AWS CDK, and moved clients to proactive monitoring on OpenTelemetry.",
        foot: "2023 – 2026",
    },
    {
        tag: "consulting · discover + build",
        title: "Live payroll & HR platform",
        body: "Set the migration strategy away from a legacy PHP monolith, delivered a security uplift on the live system with zero downtime, and rebuilt the release process.",
        foot: <><HelperHub /> ↗</>,
        href: "https://helperhub.co.za",
    },
    {
        tag: "volunteer · adopt",
        title: "Technical advisor, youth NPO",
        body: "Delivered the website, domain, email and hosting, which removed a blocker to their funding applications, and onboarded them to nonprofit programmes.",
        foot: "ProVision Alliance ↗",
        href: "https://provisionalliance.org",
    },
    {
        tag: "small business · build",
        title: "Bashies & Happy Shisha",
        body: "A Shopify store with a fast, SEO-optimised React landing page, and digital enablement for a growing hospitality brand.",
        foot: "bashies.co.za ↗",
        href: "https://bashies.co.za",
    },
];

const contactRows = [
    { href: "mailto:alex@sud0ops.com", label: "alex@sud0ops.com", mark: "→" },
    { href: "https://www.linkedin.com/in/alex-jay-beukes", label: "LinkedIn", mark: "↗" },
    { href: "/blog", label: "Read the blog", mark: "→" },
    { href: "/about-founder", label: "Meet Alex-Jay", mark: "→" },
];

export default function Home() {
    const post = getPosts()[0];
    const latest = post && { href: `/blog/${post.slug}`, date: formatDate(post.date), title: post.title, summary: post.description };

    return (
        <div className="flex flex-col">
            <Film />

            {/* Tilted ticker */}
            <div aria-label={`Zero ${zeroes.join(", zero ")}`} role="img" className="bg-brand-paper py-7">
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

            <LeakSteps />

            {/* House rules */}
            <section id="rules" className="scroll-mt-0 bg-brand-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-24 sm:px-6 min-[900px]:py-[120px]">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono text-xs text-slate-400">02 / house rules</p>
                        <h2 className="font-heading text-[clamp(40px,4.6vw,72px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                            The rules the
                            <br />
                            <span className="text-brand-accent">loop runs on.</span>
                        </h2>
                    </div>
                    <RulesList rules={rules} />
                </div>
            </section>

            <FieldLog entries={work} latest={latest} />

            {/* Meet Alex-Jay */}
            <section id="meet" className="scroll-mt-0 bg-brand-black">
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-16 px-4 py-24 sm:px-6 min-[900px]:py-[120px]">
                    <figure className="relative aspect-square w-[min(440px,calc(100%-14px))] justify-self-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/alex-448.webp"
                            srcSet="/alex-224.webp 224w, /alex-448.webp 448w"
                            sizes="(min-width: 480px) 440px, 90vw"
                            alt="Alex-Jay Beukes, DevOps and platform engineer and founder of Sud0ops"
                            width={448}
                            height={448}
                            loading="lazy"
                            className="block h-full w-full rounded-3xl border-2 border-brand-paper object-cover shadow-[14px_14px_0_var(--color-brand-accent)]"
                        />
                        <figcaption className="absolute bottom-7 -left-2.5 rounded-full bg-brand-paper px-3.5 py-2 text-sm font-bold text-brand-black">From the bar to the cloud</figcaption>
                    </figure>
                    <div className="flex max-w-[620px] flex-col gap-[22px]">
                        <p className="font-mono text-xs text-slate-400">04 / meet alex-jay</p>
                        <h2 className="font-heading text-[clamp(40px,4.6vw,72px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                            Not a traditional path <span className="text-brand-accent">into tech.</span>
                        </h2>
                        <p className="text-lg leading-[1.7] text-slate-300">
                            I came in through AWS re/Start, not a degree, and paid for the switch with bar shifts in Cape Town. For a year I held both jobs: engineering by day, behind the bar at night. It taught me discipline, and how to stay sharp when things move fast.
                        </p>
                        <p className="text-lg leading-[1.7] text-slate-300">
                            I grew from AWS cloud developer to DevOps lead for the AWS Equity Equivalent Investment Programme. Today I’m a DevOps engineer at Rhino Africa, responsible for cloud governance, platform reliability and delivery standards.
                        </p>
                        <Link
                            href="/about-founder"
                            className="inline-flex min-h-14 items-center gap-3.5 self-start rounded-full bg-brand-accent py-2 pr-2 pl-6 font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                        >
                            Read my story
                            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-black text-brand-accent">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Say hello */}
            <section id="hello" className="relative scroll-mt-0 overflow-hidden bg-brand-accent text-brand-black">
                <HelloZero />
                <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-24 sm:px-6 min-[900px]:py-[140px]">
                    <p className="font-mono text-xs font-bold">05 / say hello</p>
                    <h2 className="max-w-[9ch] font-heading text-[clamp(56px,9vw,160px)] leading-[0.88] font-extrabold tracking-[-0.055em]">Let’s talk shop.</h2>
                    <p className="max-w-[520px] text-lg leading-normal min-[900px]:text-xl">
                        Tell me where your business loses time and I’ll tell you what I would fix first. Or just talk ops, platforms and AI agents.
                    </p>
                    <nav aria-label="Contact" className="flex max-w-[560px] flex-col border-t-2 border-brand-black text-lg font-bold">
                        {contactRows.map((row) => (
                            <Link
                                key={row.href}
                                href={row.href}
                                className="flex min-h-11 items-center justify-between border-b-2 border-brand-black py-[18px] transition-[padding,background-color,color] duration-200 hover:bg-brand-black hover:px-3.5 hover:text-brand-accent focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
                            >
                                {row.label}
                                <span aria-hidden="true">{row.mark}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </section>
        </div>
    );
}
