import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Alex-Jay Beukes | DevOps & Platform Engineer, Founder of Sud0ops",
    description:
        "Alex-Jay Beukes is a DevOps and platform engineer in Cape Town and the founder of Sud0ops. AWS Solutions Architect Professional. He came into tech through AWS re/Start and now improves live cloud platforms without taking them down.",
    alternates: { canonical: "/about-founder" },
    openGraph: { type: "profile", url: "/about-founder", firstName: "Alex-Jay", lastName: "Beukes" },
};

// Structured data so search engines and AI summaries can describe Alex-Jay correctly.
const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: "https://sud0ops.com/about-founder",
    mainEntity: {
        "@type": "Person",
        name: "Alex-Jay Beukes",
        url: "https://sud0ops.com/about-founder",
        email: "alex@sud0ops.com",
        jobTitle: "DevOps & Platform Engineer",
        worksFor: [
            { "@type": "Organization", name: "Rhino Africa" },
            { "@type": "Organization", name: "Sud0ops", url: "https://sud0ops.com" },
        ],
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        sameAs: ["https://www.linkedin.com/in/alex-jaybeukes"],
        knowsAbout: [
            "DevOps", "AWS", "CI/CD", "Infrastructure as Code", "Terraform", "AWS CDK",
            "Observability", "OpenTelemetry", "Site Reliability", "FinOps", "Cloud Security", "AI agent workflows",
        ],
        hasCredential: [
            "AWS Certified Solutions Architect - Professional",
            "AWS Certified Developer - Associate",
            "AWS Certified Cloud Practitioner",
            "AWS re/Start Graduate",
            "FinOps Certified Practitioner",
        ].map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
    },
};

export default function AlexLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            {children}
        </>
    );
}
