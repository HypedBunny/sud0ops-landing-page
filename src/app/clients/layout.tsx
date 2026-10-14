import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clients | Sud0ops",
    description:
        "Sud0ops client work: technical consultancy and implementation for HelperHub, a Shopify store for Bashies, and a social events platform for Happy Shisha.",
    alternates: { canonical: "/clients" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
