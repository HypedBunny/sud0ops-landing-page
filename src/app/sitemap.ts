import type { MetadataRoute } from "next";
import { FOUNDER_PHOTO_URL, hasFounderPhoto } from "@/lib/founder";

// Lists every live page, including the ones the home page does not link to.
const pages = ["", "/about-founder", "/services", "/consulting", "/clients", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
    return pages.map((path) => ({
        url: `https://sud0ops.com${path}`,
        priority: path === "" || path === "/about-founder" ? 1 : 0.7,
        // Image sitemap entry so the headshot is indexed against the founder page.
        ...(path === "/about-founder" && hasFounderPhoto && { images: [FOUNDER_PHOTO_URL] }),
    }));
}
