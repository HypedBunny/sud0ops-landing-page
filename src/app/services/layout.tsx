import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        path: "/services",
        title: "Services | Sud0ops",
        description:
            "Workflow automation, tool integration, internal assistants, dashboards and process audits for small and growing businesses, from Sud0ops in Cape Town.",
    }),
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
