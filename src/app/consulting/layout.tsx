import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consulting | Sud0ops",
    description:
        "Three ways to start with Sud0ops: an investigative consultation, a fix for a problem you already know about, or a review of the SaaS tools you pay for.",
    alternates: { canonical: "/consulting" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
