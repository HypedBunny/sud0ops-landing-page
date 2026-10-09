import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The founder page moved from /alex. Keep old links (LinkedIn, CV) working.
  async redirects() {
    return [{ source: "/alex", destination: "/about-founder", permanent: true }];
  },
};

export default nextConfig;
