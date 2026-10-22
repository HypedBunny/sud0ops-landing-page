import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL, formatDate, getPosts, postUrl } from "@/lib/blog";
import { SITE_URL } from "@/lib/founder";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata({ path: "/blog", title: "Blog | Sud0ops", socialTitle: BLOG_TITLE, description: BLOG_DESCRIPTION });
export const metadata: Metadata = {
    ...base,
    alternates: { ...base.alternates, types: { "text/markdown": "/blog.md" } },
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
        <div className="flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section>
                <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] items-end gap-12 px-4 pt-[72px] pb-[88px] sm:px-6">
                    <div className="flex flex-col gap-6">
                        <p className="font-mono text-xs text-slate-400">Blog</p>
                        <h1 className="font-heading text-[clamp(52px,7vw,108px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
                            Notes from
                            <br />
                            the <span className="mark-amber">loop.</span>
                        </h1>
                        <p className="max-w-lg text-lg leading-relaxed text-slate-300">
                            Automation, DevOps, cloud and AI, written up for the teams that run on them.
                        </p>
                    </div>

                    {/* Points people and AI tools at the markdown versions (/blog.md and each post's .md twin). */}
                    <div className="mr-2 flex flex-col gap-3 rounded-2xl border border-slate-700 bg-brand-black-light p-6 shadow-[8px_8px_0_var(--color-brand-blue)]">
                        <p className="text-[17px] font-bold text-brand-paper">Readable by people and AI tools</p>
                        <p className="text-[15px] leading-relaxed text-slate-300">
                            Every post is also published as plain markdown, so assistants like ChatGPT and Claude can read it cleanly.
                        </p>
                        <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                            <a href="/blog.md" className="text-brand-blue hover:text-brand-blue-hover">All posts as markdown</a>
                            <a href="/llms.txt" className="text-brand-blue hover:text-brand-blue-hover">llms.txt</a>
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-brand-paper text-brand-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 pt-[72px] pb-24 sm:px-6">
                    <div className="flex flex-wrap justify-between gap-3 font-mono text-xs text-slate-600">
                        <span>Latest posts</span>
                        <span>{posts.length === 1 ? "1 post" : `${posts.length} posts`}</span>
                    </div>

                    {posts.length === 0 ? (
                        <p className="text-slate-600">No posts yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-7">
                            {posts.map((post, i) => (
                                // The card lifts while its wrapper (the .group) is hovered. The wrapper never moves,
                                // so hovering near the card's edge is steady (lifting on the card's own :hover flickers).
                                <li key={post.slug} className="group">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-x-12 gap-y-7 rounded-[20px] border-2 border-brand-black bg-white p-6 shadow-[8px_8px_0_var(--color-brand-black)] transition-[translate,box-shadow] duration-200 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] group-hover:shadow-[12px_12px_0_var(--color-brand-black)] sm:p-9"
                                    >
                                        <div className="flex flex-col gap-4.5">
                                            <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                                                {i === 0 && <span className="rounded-full bg-brand-black px-2.5 py-1 text-brand-accent">latest</span>}
                                                {post.tags.map((tag) => (
                                                    <span key={tag} className="rounded-full border border-brand-black px-2.5 py-[3px]">{tag}</span>
                                                ))}
                                            </div>
                                            <ViewTransition name={`post-${post.slug}`}>
                                                <h2 className="font-heading text-[clamp(32px,3.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]">{post.title}</h2>
                                            </ViewTransition>
                                            <p className="font-mono text-xs text-slate-600">
                                                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read · also available as markdown
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-between gap-6">
                                            <p className="text-[17px] leading-relaxed text-slate-700">{post.description}</p>
                                            <span className="inline-flex items-center gap-2.5 self-start rounded-full border-2 border-brand-black px-4.5 py-2.5 font-mono text-[13px] font-bold transition-colors duration-200 group-hover:bg-brand-accent">
                                                read the post →
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="mt-2 text-[15px] text-slate-600">More posts on the way.</p>
                </div>
            </section>
        </div>
    );
}
