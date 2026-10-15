import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight, Calendar, Clock, FileText } from "lucide-react";
import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL, formatDate, getPosts, postUrl } from "@/lib/blog";
import { SITE_URL } from "@/lib/founder";

export const metadata: Metadata = {
    title: "Blog | Sud0ops",
    description: BLOG_DESCRIPTION,
    alternates: { canonical: "/blog", types: { "text/markdown": "/blog.md" } },
    openGraph: { type: "website", url: "/blog", title: BLOG_TITLE, description: BLOG_DESCRIPTION },
};

export default function BlogPage() {
    const posts = getPosts();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${BLOG_URL}#blog`,
        name: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        url: BLOG_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: postUrl(post.slug),
        })),
    };

    return (
        <div className="relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute right-1/4 top-0 h-[400px] w-[400px] rounded-full bg-brand-blue opacity-10 blur-[120px]" />
                <div className="absolute left-1/3 bottom-1/4 h-[250px] w-[250px] rounded-full bg-brand-blue opacity-5 blur-[90px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        <span>Blog</span>
                    </div>
                    <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        Notes from the{" "}
                        <span className="bg-gradient-to-r from-white via-brand-blue to-brand-blue-glow bg-clip-text text-transparent">
                            Terminal
                        </span>
                    </h1>
                    <p className="text-lg leading-relaxed text-slate-400">{BLOG_DESCRIPTION}</p>
                    <p className="mt-4 font-mono text-xs text-slate-500">
                        AI agent? Every page here is also markdown:{" "}
                        <a href="/blog.md" className="text-brand-blue hover:text-brand-blue-glow">/blog.md</a>
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-center text-slate-500">No posts yet.</p>
                ) : (
                    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <ViewTransition name={`post-${post.slug}`}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 p-6 transition-all duration-300 glass hover:-translate-y-1 hover:border-brand-blue/30 box-glow-hover sm:p-8"
                                    >
                                        <div
                                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{
                                                background:
                                                    "linear-gradient(to right,#38bdf807 1px,transparent 1px),linear-gradient(to bottom,#38bdf807 1px,transparent 1px)",
                                                backgroundSize: "16px 16px",
                                            }}
                                            aria-hidden="true"
                                        />
                                        <div className="relative flex flex-1 flex-col">
                                            <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                                    {post.readingMinutes} min read
                                                </span>
                                            </div>
                                            <h2 className="mb-3 font-heading text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-blue">
                                                {post.title}
                                            </h2>
                                            <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{post.description}</p>
                                            {post.tags.length > 0 && (
                                                <div className="mb-6 flex flex-wrap gap-2">
                                                    {post.tags.map((tag) => (
                                                        <span key={tag} className="rounded-md border border-brand-blue/20 bg-brand-blue/5 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide text-brand-blue">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <span className="inline-flex items-center gap-2 border-t border-white/5 pt-4 text-sm font-medium text-brand-blue">
                                                Read post
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </Link>
                                </ViewTransition>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
