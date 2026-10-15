import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        path: "/contact",
        title: "Contact | Sud0ops",
        description:
            "Tell Sud0ops what is broken or slowing your business down. We reply within 24 hours.",
    }),
    // The form stays live but unlinked: enquiries go to alex@sud0ops.com. Keep it out of search results too.
    robots: { index: false, follow: false },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
