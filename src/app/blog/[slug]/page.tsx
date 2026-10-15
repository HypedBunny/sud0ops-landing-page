import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { PostView } from "@/components/blog/PostView";
import { BLOG_TITLE, BLOG_URL, formatDate, getPost, getPosts, postMarkdown, postUrl, renderPostHtml } from "@/lib/blog";
import { SITE_URL } from "@/lib/founder";
import { pageMetadata } from "@/lib/seo";

// No dynamicParams = false: on Workers the prerender cache can miss, and Next would then 404
// a real post. Posts are bundled into the code, so rendering on demand is cheap; unknown slugs hit notFound().
export function generateStaticParams() {
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
    const post = getPost((await params).slug);
    if (!post) return {};
    const path = `/blog/${post.slug}`;
    const base = pageMetadata({
        path,
        title: `${post.title} | Sud0ops Blog`,
        socialTitle: post.title,
        description: post.description,
        article: { publishedTime: post.date, authors: [post.author], tags: post.tags },
    });
    return {
        ...base,
        authors: [{ name: post.author }],
        keywords: post.tags,
        alternates: { ...base.alternates, types: { "text/markdown": `${path}.md` } },
    };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
    const post = getPost((await params).slug);
    if (!post) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: postUrl(post.slug),
        mainEntityOfPage: postUrl(post.slug),
        keywords: post.tags,
        author: post.author === "Sud0ops"
            ? { "@id": `${SITE_URL}/#organization` }
            : { "@type": "Person", name: post.author },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@type": "Blog", "@id": `${BLOG_URL}#blog`, name: BLOG_TITLE, url: BLOG_URL },
        encoding: { "@type": "MediaObject", encodingFormat: "text/markdown", contentUrl: `${postUrl(post.slug)}.md` },
    };

    return (
        <div className="relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
                <ViewTransition name={`post-${post.slug}`}>
                    <article className="panel overflow-hidden rounded-md border border-white/5">
                        <PostView
                            markdown={postMarkdown(post)}
                            toolbarStart={
                                <Link
                                    href="/blog"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-brand-blue"
                                >
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                                    Back to blog
                                </Link>
                            }
                        >
                            <header className="mb-10">
                                {post.tags.length > 0 && (
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="rounded-md border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 font-mono text-xs font-medium tracking-wide text-brand-blue">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h1 className="mb-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                                    {post.title}
                                </h1>
                                <p className="mb-6 text-lg leading-relaxed text-slate-400">{post.description}</p>
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                                    <span>{post.author}</span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" aria-hidden="true" />
                                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" aria-hidden="true" />
                                        {post.readingMinutes} min read
                                    </span>
                                </div>
                            </header>
                            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: renderPostHtml(post) }} />
                        </PostView>
                    </article>
                </ViewTransition>
            </div>
        </div>
    );
}
