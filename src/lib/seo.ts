import type { Metadata } from "next";

// The social card from the brand pack: every page's link preview unless the page sets its own image.
export const SOCIAL_IMAGE = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Sud0ops: You don't have a technology problem. You have an operations problem.",
};

// Title, description, canonical URL and the matching Open Graph and Twitter tags for one page.
// Next.js replaces a parent's openGraph instead of merging it, so each page gets the full set
// (otherwise pages inherit the home page's og:url).
export function pageMetadata({
    path,
    title,
    description,
    socialTitle = title,
    article,
}: {
    path: string;
    title: string;
    description: string;
    socialTitle?: string;
    // Set for blog posts: makes the page an Open Graph article.
    article?: { publishedTime: string; authors: string[]; tags: string[] };
}): Metadata {
    const openGraph = { siteName: "Sud0ops", url: path, title: socialTitle, description, images: [SOCIAL_IMAGE] };
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: article ? { ...openGraph, type: "article", ...article } : { ...openGraph, type: "website" },
        twitter: { card: "summary_large_image", title: socialTitle, description, images: [SOCIAL_IMAGE.url] },
    };
}
