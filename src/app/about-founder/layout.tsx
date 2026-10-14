import type { Metadata } from "next";
import {
    FOUNDER_ID,
    FOUNDER_NAME,
    FOUNDER_PHOTO_CAPTION,
    FOUNDER_PHOTO_PATH,
    FOUNDER_PHOTO_URL,
    FOUNDER_URL,
    SITE_URL,
    hasFounderPhoto,
} from "@/lib/founder";

const title = "About Alex-Jay Beukes | DevOps & Platform Engineer, Founder of Sud0ops";
const description =
    "Alex-Jay Beukes is a DevOps and platform engineer in Cape Town and the founder of Sud0ops. AWS Solutions Architect Professional. He came into tech through AWS re/Start and now improves live cloud platforms without taking them down.";

// The headshot doubles as the social preview, so shares and vision models see the same labelled photo.
const photo = { url: FOUNDER_PHOTO_PATH, alt: FOUNDER_PHOTO_CAPTION };

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/about-founder" },
    openGraph: {
        type: "profile",
        url: "/about-founder",
        title,
        description,
        firstName: "Alex-Jay",
        lastName: "Beukes",
        ...(hasFounderPhoto && { images: [photo] }),
    },
    twitter: {
        card: hasFounderPhoto ? "summary_large_image" : "summary",
        title,
        description,
        ...(hasFounderPhoto && { images: [photo] }),
    },
};

const photoJsonLd = {
    "@type": "ImageObject",
    "@id": `${FOUNDER_URL}#photo`,
    url: FOUNDER_PHOTO_URL,
    contentUrl: FOUNDER_PHOTO_URL,
    name: FOUNDER_NAME,
    caption: FOUNDER_PHOTO_CAPTION,
    representativeOfPage: true,
    creditText: FOUNDER_NAME,
    copyrightNotice: `© ${FOUNDER_NAME}`,
};

// Structured data so search engines and AI summaries can describe Alex-Jay correctly,
// and tie the headshot to him by name.
const graphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ProfilePage",
            "@id": `${FOUNDER_URL}#profile`,
            url: FOUNDER_URL,
            name: title,
            mainEntity: { "@id": FOUNDER_ID },
            ...(hasFounderPhoto && { primaryImageOfPage: { "@id": `${FOUNDER_URL}#photo` } }),
        },
        {
            "@type": "Person",
            "@id": FOUNDER_ID,
            name: FOUNDER_NAME,
            givenName: "Alex-Jay",
            familyName: "Beukes",
            alternateName: ["Alex Beukes", "Alex Jay Beukes"],
            description,
            url: FOUNDER_URL,
            mainEntityOfPage: FOUNDER_URL,
            ...(hasFounderPhoto && { image: photoJsonLd }),
            email: "alex@sud0ops.com",
            jobTitle: "DevOps & Platform Engineer",
            worksFor: [
                { "@type": "Organization", name: "Rhino Africa" },
                { "@id": `${SITE_URL}/#organization` },
            ],
            address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
            sameAs: ["https://www.linkedin.com/in/alex-jay-beukes"],
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
    ],
};

export default function AlexLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
            />
            {children}
        </>
    );
}
