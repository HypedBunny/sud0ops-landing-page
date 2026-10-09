import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Sud0ops",
    description:
        "Tell Sud0ops what is broken or slowing your business down. We reply within 24 hours.",
    alternates: { canonical: "/contact" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
