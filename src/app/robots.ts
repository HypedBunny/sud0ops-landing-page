import type { MetadataRoute } from "next";

// Search and AI crawlers may read every page. Only the contact API is closed.
const aiCrawlers = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User",
    "ClaudeBot", "Claude-SearchBot", "Claude-User",
    "PerplexityBot", "Perplexity-User",
    "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/", disallow: "/api/" },
            { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
        ],
        sitemap: "https://sud0ops.com/sitemap.xml",
    };
}
