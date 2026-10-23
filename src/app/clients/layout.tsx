import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        path: "/clients",
        title: "Clients | Sud0ops",
        description:
            "Sud0ops client work: technical consultancy and implementation for helperhub, a Shopify store for Bashies, a social events platform for Happy Shisha, and pro bono technical advice for ProVision Alliance.",
    }),
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
