import { getPost, getPosts, markdownResponse, postMarkdown, postUrl } from "@/lib/blog";

// Markdown version of /blog/[slug]. Reached through /blog/[slug].md or Accept: text/markdown (see next.config.ts).
export const dynamic = "force-static";

export function generateStaticParams() {
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: RouteContext<"/md/blog/[slug]">) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return new Response("Not found", { status: 404 });
    return markdownResponse(postMarkdown(post), postUrl(post.slug));
}
