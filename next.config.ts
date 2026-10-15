import type { NextConfig } from "next";

// Agents that send Accept: text/markdown get the markdown version of a blog page.
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

const nextConfig: NextConfig = {
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
      { source: "/blog", headers: [{ key: "Vary", value: "Accept" }] },
      { source: "/blog/:slug", headers: [{ key: "Vary", value: "Accept" }] },
    ];
  },
};

export default nextConfig;
