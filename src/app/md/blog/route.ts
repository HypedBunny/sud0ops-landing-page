import { BLOG_URL, blogIndexMarkdown, markdownResponse } from "@/lib/blog";

// Markdown version of /blog. Reached through /blog.md or Accept: text/markdown (see next.config.ts).
export const dynamic = "force-static";

export function GET() {
    return markdownResponse(blogIndexMarkdown(), BLOG_URL);
}
