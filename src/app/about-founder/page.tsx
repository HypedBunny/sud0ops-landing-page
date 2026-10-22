import { CareerSteps, type CareerEntry } from "@/components/about/CareerSteps";

/* -------------------------------------------------------------------------- */
/*  CONTENT                                                                    */
/*  Edit these arrays to update the page. No layout changes needed.            */
/* -------------------------------------------------------------------------- */

const CREDLY_URL = "https://www.credly.com/users/alex-jay-beukes";
const LINKEDIN_URL = "https://www.linkedin.com/in/alex-jay-beukes";

const facts = [
    { key: "Based in", value: "Cape Town, South Africa" },
    { key: "Day job", value: "DevOps Engineer, Rhino Africa" },
    { key: "Founder", value: "Sud0ops, since Dec 2025" },
    { key: "Focus", value: "AWS platforms, CI/CD, reliability, security, cloud cost" },
    { key: "Top credential", value: "AWS Solutions Architect, Professional", highlight: true },
    { key: "Way in", value: "AWS re/Start, not a degree" },
];

const story = [
    "I did not follow a traditional path into tech. I came in through AWS re/Start, not a degree, and paid for that change with bar shifts in Cape Town. For a year I held both jobs: engineering by day, behind the bar at night. That year taught me discipline, and how to stay sharp when things move fast.",
    "I started at Skywalk Innovations as an AWS cloud developer and grew into DevOps lead for the AWS Equity Equivalent Investment Programme, which helps South African businesses reach AWS Partner standing. I introduced CI/CD where there was none, standardised monitoring across every client, and took client solutions through AWS Well-Architected reviews.",
    "Today I am a DevOps engineer at Rhino Africa, responsible for cloud governance, platform reliability and delivery standards. Through Sud0ops I was technical consultant to HelperHub, a live payroll and HR platform, and I volunteer as technical advisor to ProVision Alliance, a youth-focused NPO.",
];

// Oldest first. `year` is the big number shown while the step is on screen.
const career: CareerEntry[] = [
    {
        year: "2020",
        period: "Dec 2020 – Jun 2023",
        place: "Cape Town",
        role: "Bartender",
        company: "Baghdad Café",
        blurb: "Paid for my move into technology with bar shifts, through AWS re/Start and my first year as an engineer.",
    },
    {
        year: "2022",
        period: "2022",
        place: "Cape Town",
        role: "Graduate",
        company: "AWS re/Start",
        blurb: "Cloud fundamentals, Python, Linux and debugging. My way into tech.",
    },
    {
        year: "2022",
        period: "Jun 2022 – Jun 2023",
        place: "South Africa",
        role: "AWS Cloud Developer",
        company: "Skywalk Innovations",
        blurb: "Built and deployed cloud applications on AWS: serverless with Lambda, content delivery with CloudFront, data on RDS and DynamoDB, compute on EC2, and CI/CD with AWS developer tools.",
    },
    {
        year: "2023",
        period: "Jun 2023 – Mar 2026",
        place: "Cape Town",
        role: "DevOps Engineer & AWS EEIP DevOps Lead",
        company: "Skywalk Innovations",
        blurb: "DevOps lead for the AWS Equity Equivalent Investment Programme. Introduced and standardised CI/CD across every client, cut environment setup time by about half with AWS CDK, and moved clients to proactive monitoring on OpenTelemetry.",
    },
    {
        year: "2025",
        period: "Dec 2025 – now",
        place: "Cape Town",
        role: "Founder",
        company: "Sud0ops",
        blurb: "Helping SMEs, NPOs and small businesses pick and build technology that fits their needs and their skills. I get into the codebase and build with the team.",
    },
    {
        year: "2026",
        period: "Apr 2026 – now",
        place: "Cape Town",
        role: "DevOps Engineer",
        company: "Rhino Africa",
        blurb: "Accountable for cloud governance, platform reliability and delivery standards across the AWS estate. Built keyless CI/CD on OIDC and the shared infrastructure as code, and led production migrations with zero downtime.",
    },
];

const work = [
    {
        name: "HelperHub",
        kind: "technical consultant",
        url: "https://helperhub.co.za",
        blurb: "Technical consultant to a live payroll and HR platform for South African employers. Set the migration strategy from a legacy PHP monolith to a modern platform, delivered a security uplift on the live system with zero downtime, and rebuilt the release process.",
    },
    {
        name: "ProVision Alliance",
        kind: "volunteer technical advisor · NPO",
        url: "https://provisionalliance.org",
        blurb: "Technical advisor to a youth-focused NPO. Delivered the website, domain, email and hosting, which removed a blocker to their funding applications, and onboarded them to nonprofit programmes, including Microsoft’s.",
    },
    {
        name: "Bashies",
        kind: "technical build",
        url: "https://bashies.co.za",
        blurb: "Built the online store on Shopify, with a fast, SEO-optimised React landing page.",
    },
    {
        name: "Happy Shisha",
        kind: "digital enablement",
        url: "https://happyshisha.co.za",
        blurb: "Digital enablement and a social platform for a growing hospitality brand, bringing its sub-brands and services online.",
    },
];

// The first one gets the dark, featured card.
const certifications = [
    { name: "AWS Certified Solutions Architect", level: "professional", issuer: "Amazon Web Services" },
    { name: "AWS Certified Developer", level: "associate", issuer: "Amazon Web Services" },
    { name: "FinOps Certified Practitioner", level: "practitioner", issuer: "FinOps Foundation" },
    { name: "AWS Certified Cloud Practitioner", level: "foundational", issuer: "Amazon Web Services" },
    { name: "AWS re/Start", level: "graduate", issuer: "Amazon Web Services" },
];

const stack = [
    "CI/CD & containers (GitHub Actions, Docker)",
    "Infrastructure as code (Terraform, AWS CDK)",
    "AWS cloud architecture",
    "Observability (OpenTelemetry, Grafana)",
    "Identity & security (OIDC, IAM)",
    "FinOps & cost optimisation",
    "Scripting (Python, Bash)",
    "AI & agent workflows (Claude Code)",
];

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function AlexPage() {
    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section>
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(520px,100%),1fr))] items-center gap-14 px-4 pt-[72px] pb-24 sm:px-6">
                    <div className="flex flex-col gap-6.5">
                        <p className="self-start rounded-full bg-brand-accent px-3.5 py-1.5 text-sm font-semibold text-brand-black">Meet Alex-Jay</p>
                        <h1 className="font-heading text-[clamp(42px,5.2vw,76px)] leading-none font-extrabold tracking-[-0.045em]">
                            From behind the bar to leading <span className="mark-amber my-1.5">cloud reliability.</span>
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                            I’m Alex-Jay Beukes, a DevOps and platform engineer in Cape Town and the founder of Sud0ops. I look after cloud platforms that already carry real customers, and I improve them without taking them down. Through Sud0ops I help small businesses, growing teams and NPOs pick the right technology and build it properly, working in the codebase with their team.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-14 items-center gap-3.5 rounded-full bg-brand-accent py-2 pr-2 pl-6 font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                            >
                                Connect on LinkedIn
                                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-black font-mono text-brand-accent">→</span>
                            </a>
                            <a
                                href="mailto:alex@sud0ops.com"
                                className="inline-flex min-h-14 items-center gap-2.5 rounded-full border border-slate-600 px-6 font-mono text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-brand-paper hover:text-brand-paper"
                            >
                                <span aria-hidden="true" className="text-brand-blue">@</span>alex@sud0ops.com
                            </a>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[500px] flex-col gap-7 justify-self-center">
                        <figure className="relative aspect-square w-[62%] self-end overflow-hidden rounded-[20px] border-2 border-brand-paper shadow-[10px_10px_0_var(--color-brand-accent)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/alex-448.webp"
                                srcSet="/alex-224.webp 224w, /alex-448.webp 448w"
                                sizes="(min-width: 640px) 310px, 62vw"
                                fetchPriority="high"
                                alt="Alex-Jay Beukes, DevOps and platform engineer and founder of Sud0ops"
                                width={448}
                                height={448}
                                className="block h-full w-full object-cover"
                            />
                            {/* Names the photo in the HTML next to it, so crawlers tie the face to the name. */}
                            <figcaption className="sr-only">Alex-Jay Beukes, founder of Sud0ops, Cape Town</figcaption>
                        </figure>
                        <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-brand-black-light text-sm min-[480px]:w-[88%]">
                            <p className="border-b border-brand-line px-4 py-3 font-semibold text-brand-paper">At a glance</p>
                            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 p-4 leading-snug">
                                {facts.map((fact) => (
                                    <div key={fact.key} className="contents">
                                        <dt className="text-slate-400">{fact.key}</dt>
                                        <dd className={fact.highlight ? "text-brand-accent" : "text-brand-paper"}>{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section id="story" className="border-t border-slate-800">
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-14 px-4 py-24 sm:px-6 min-[900px]:py-[104px]">
                    <div className="flex flex-col gap-4.5 min-[900px]:sticky min-[900px]:top-8">
                        <p className="font-mono text-xs text-slate-400">01 / my story</p>
                        <h2 className="font-heading text-[clamp(40px,4.6vw,68px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                            How a bartender became a <span className="text-brand-blue">cloud engineer.</span>
                        </h2>
                        <p className="max-w-[420px] text-[17px] leading-relaxed text-slate-400">And why that still shapes the work.</p>
                    </div>
                    <div className="flex flex-col gap-[22px] text-lg leading-[1.75] text-slate-300">
                        {story.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
                        <blockquote className="mt-4 mr-2.5 rounded-[20px] bg-brand-accent px-6 py-7 text-brand-black shadow-[10px_10px_0_var(--color-brand-blue)] sm:px-8">
                            <p className="font-heading text-[clamp(26px,2.8vw,38px)] leading-[1.1] font-extrabold tracking-[-0.035em]">
                                Most businesses do not have an infrastructure problem. They have an operations problem.
                            </p>
                            <p className="mt-3.5 text-base leading-relaxed">
                                Fragile deployments, manual processes and systems held together by workarounds. That is what I fix, sized to what each team needs and can run.
                            </p>
                        </blockquote>
                    </div>
                </div>
            </section>

            <CareerSteps entries={career} />

            {/* Work */}
            <section>
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-[88px] sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="flex flex-col gap-4.5">
                            <p className="font-mono text-xs text-slate-400">03 / selected work</p>
                            <h2 className="font-heading text-[clamp(38px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em]">
                                Outside
                                <br />
                                <span className="text-brand-accent">the day job.</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-[17px] leading-relaxed text-slate-300">Consulting, builds and volunteer work through Sud0ops.</p>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(520px,100%),1fr))] gap-4">
                        {work.map((project) => (
                            <a
                                key={project.name}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-3.5 rounded-2xl border border-brand-line bg-brand-black-light p-7 text-brand-paper transition hover:-translate-y-[3px] hover:border-brand-accent"
                            >
                                <div className="flex justify-between gap-4 font-mono text-xs text-slate-400">
                                    <span className="text-brand-blue">{project.kind}</span>
                                    <span>{project.url.replace("https://", "")} ↗</span>
                                </div>
                                <h3 className="font-heading text-[28px] font-extrabold tracking-[-0.02em]">{project.name}</h3>
                                <p className="text-[15px] leading-relaxed text-slate-300">{project.blurb}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credentials and stack */}
            <section className="bg-brand-paper text-brand-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-[88px] sm:px-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div className="flex flex-col gap-4.5">
                                <p className="font-mono text-xs text-slate-600">04 / credentials</p>
                                <h2 className="font-heading text-[clamp(38px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em]">Certifications.</h2>
                            </div>
                            <a
                                href={CREDLY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-brand-black px-5 font-mono text-[13px] font-bold transition-transform hover:-translate-y-0.5"
                            >
                                all badges on Credly <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3.5">
                            {certifications.map((cert, i) => {
                                const featured = i === 0;
                                return (
                                    <li key={cert.name} className="flex">
                                        <a
                                            href={CREDLY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`hover-amber flex w-full flex-col gap-2.5 rounded-2xl border-2 border-brand-black p-5.5 ${featured ? "bg-brand-black text-brand-paper shadow-[6px_6px_0_var(--color-brand-accent)]" : "bg-white text-brand-black"}`}
                                        >
                                            <span className={`hover-amber-invert self-start rounded-md px-2 py-0.5 font-mono text-[11px] font-bold ${featured ? "bg-brand-accent text-brand-black" : "border border-brand-black"}`}>
                                                {cert.level}
                                            </span>
                                            <p className="font-heading text-[19px] leading-tight font-extrabold">{cert.name}</p>
                                            <p className={`mt-auto font-mono text-[11px] ${featured ? "text-slate-400" : "text-slate-600"}`}>{cert.issuer}</p>
                                            <span className={`flex justify-between border-t pt-2.5 font-mono text-[11px] font-bold ${featured ? "border-brand-line" : "border-slate-200"}`}>
                                                <span>verify on Credly</span>
                                                <span aria-hidden="true">↗</span>
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h3 className="font-heading text-[22px] font-extrabold tracking-[-0.02em]">Toolkit</h3>
                        <ul className="flex flex-wrap gap-2.5 font-mono text-[13px]">
                            {stack.map((item, i) => (
                                <li key={item} className={`hover-amber rounded-full border-2 border-brand-black px-4 py-2 ${i === stack.length - 1 ? "bg-brand-accent" : ""}`}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Say hello */}
            <section className="bg-brand-paper px-4 pb-[72px]">
                <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-8 rounded-[28px] bg-brand-accent px-6 py-16 text-brand-black sm:px-10">
                    <div className="flex max-w-2xl flex-col gap-3.5">
                        <h2 className="font-heading text-[clamp(36px,4.2vw,60px)] leading-none font-extrabold tracking-[-0.045em]">Let’s talk shop.</h2>
                        <p className="text-lg leading-normal">
                            If your platform needs work, or you want to know how I got into tech without a degree, send me an email.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="inline-flex min-h-14 items-center gap-3.5 rounded-full bg-brand-black py-2 pr-2 pl-6 font-bold text-brand-paper transition-transform hover:-translate-y-0.5"
                        >
                            alex@sud0ops.com
                            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-brand-accent font-mono text-brand-black">→</span>
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-14 items-center rounded-full border-2 border-brand-black px-6 font-mono text-sm font-bold transition-transform hover:-translate-y-0.5"
                        >
                            linkedin ↗
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
