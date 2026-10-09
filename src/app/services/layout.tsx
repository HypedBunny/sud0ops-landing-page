import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Sud0ops",
    description:
        "Workflow automation, tool integration, internal assistants, dashboards and process audits for small and growing businesses, from Sud0ops in Cape Town.",
    alternates: { canonical: "/services" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
