import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        path: "/clients",
        title: "Clients | Sud0ops",
        description:
            "Sud0ops client work: technical consultancy and implementation for HelperHub, a Shopify store for Bashies, and a social events platform for Happy Shisha.",
    }),
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
