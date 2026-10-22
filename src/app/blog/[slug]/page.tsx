import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PostView } from "@/components/blog/PostView";
import { ZeroMark } from "@/components/ui/ZeroMark";
import { BLOG_TITLE, BLOG_URL, formatDate, getPost, getPosts, postHeadings, postMarkdown, postUrl, renderPostHtml } from "@/lib/blog";
import { FOUNDER_ID, FOUNDER_NAME, SITE_URL } from "@/lib/founder";
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

    const byFounder = post.author === FOUNDER_NAME;
    const headings = postHeadings(post);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: postUrl(post.slug),
        mainEntityOfPage: postUrl(post.slug),
        keywords: post.tags,
        // The founder and the business are entities described elsewhere on the site; point at them.
        author: byFounder
            ? { "@type": "Person", "@id": FOUNDER_ID, name: FOUNDER_NAME }
            : post.author === "Sud0ops"
              ? { "@id": `${SITE_URL}/#organization` }
              : { "@type": "Person", name: post.author },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@type": "Blog", "@id": `${BLOG_URL}#blog`, name: BLOG_TITLE, url: BLOG_URL },
        encoding: { "@type": "MediaObject", encodingFormat: "text/markdown", contentUrl: `${postUrl(post.slug)}.md` },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <PostView
                markdown={postMarkdown(post)}
                header={
                    <>
                        <Link href="/blog" className="self-start font-mono text-[13px] text-slate-400 transition-colors hover:text-brand-accent">
                            ← ~/writing
                        </Link>
                        {post.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300">
                                {post.tags.map((tag) => (
                                    <li key={tag} className="rounded-full border border-slate-600 px-2.5 py-0.5">{tag}</li>
                                ))}
                            </ul>
                        )}
                        <ViewTransition name={`post-${post.slug}`}>
                            <h1 className="max-w-5xl font-heading text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-brand-paper">
                                {post.title}
                            </h1>
                        </ViewTransition>
                        <p className="max-w-3xl text-[19px] leading-relaxed text-slate-300">{post.description}</p>
                    </>
                }
                byline={
                    <div className="flex items-center gap-3">
                        {byFounder ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/alex-224.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                            <ZeroMark className="h-10 w-10 p-1" />
                        )}
                        <p className="font-mono text-xs leading-normal text-slate-400">
                            <span className="text-brand-paper">{post.author}</span>
                            <br />
                            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                        </p>
                    </div>
                }
                contents={
                    headings.length > 1 && (
                        <nav aria-label="Contents" className="flex flex-col gap-3 font-mono text-xs leading-normal">
                            <p className="text-slate-400">contents</p>
                            {headings.map((heading, i) => (
                                <a key={heading.id} href={`#${heading.id}`} className="text-slate-600 transition-colors hover:text-brand-black">
                                    {String(i + 1).padStart(2, "0")} {heading.text}
                                </a>
                            ))}
                        </nav>
                    )
                }
                footer={
                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4.5 rounded-[18px] bg-brand-black p-6 text-brand-paper">
                        <div className="flex items-center gap-3.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/alex-224.webp" alt="Alex-Jay Beukes" width={52} height={52} loading="lazy" className="h-[52px] w-[52px] rounded-full border-2 border-brand-accent object-cover" />
                            <p className="text-[15px] leading-normal">
                                <strong>Alex-Jay Beukes</strong>
                                <br />
                                <span className="text-slate-400">DevOps &amp; platform engineer, founder of Sud0ops</span>
                            </p>
                        </div>
                        <a
                            href="mailto:alex@sud0ops.com"
                            className="inline-flex min-h-11 items-center rounded-full bg-brand-accent px-5 text-sm font-bold text-brand-black transition-transform hover:-translate-y-0.5"
                        >
                            Say hello →
                        </a>
                    </div>
                }
            >
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: renderPostHtml(post) }} />
            </PostView>
        </>
    );
}
