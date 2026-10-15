import type { NextConfig } from "next";

// Baseline security headers for every page Next serves (public/_headers covers static files).
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

// Agents that send Accept: text/markdown get the markdown version of a blog page.
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

const nextConfig: NextConfig = {
  // Workers has no image optimiser without a paid Cloudflare Images binding, so /_next/image only
  // added a round trip. Images in public/ are pre-sized WebP instead.
  images: { unoptimized: true },
  // The founder page moved from /alex. Keep old links (LinkedIn, CV) working.
  async redirects() {
    return [{ source: "/alex", destination: "/about-founder", permanent: true }];
  },
  // Markdown for AI agents: /blog.md, /blog/<slug>.md, or Accept: text/markdown on the normal URL.
  // beforeFiles so they win over the /blog pages.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/blog.md", destination: "/md/blog" },
        { source: "/blog/:slug.md", destination: "/md/blog/:slug" },
        { source: "/blog", has: wantsMarkdown, destination: "/md/blog" },
        { source: "/blog/:slug", has: wantsMarkdown, destination: "/md/blog/:slug" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // The same blog URL can return HTML or markdown, so caches must key on Accept.
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/blog", headers: [{ key: "Vary", value: "Accept" }] },
      { source: "/blog/:slug", headers: [{ key: "Vary", value: "Accept" }] },
    ];
  },
};

export default nextConfig;
