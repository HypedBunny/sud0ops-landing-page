import type { MetadataRoute } from "next";

// Lets phones save the site with the >_ icon and the brand colours.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Sud0ops",
        short_name: "Sud0ops",
        description: "Technology consultancy for small businesses, growing teams and NPOs.",
        start_url: "/",
        display: "browser",
        background_color: "#0F172A",
        theme_color: "#0F172A",
        icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    };
}
