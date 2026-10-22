import { Marked, type Tokens } from "marked";
import { SITE_URL } from "@/lib/founder";
import { sources } from "@/content/blog/posts.generated";

// To publish a post, add a .md file to src/content/blog. The file name is the URL slug.
// Frontmatter needs title, description and date (YYYY-MM-DD); author and tags are optional.
// scripts/generate-blog.mjs bundles the files before every dev and build run.

export const BLOG_URL = `${SITE_URL}/blog`;
export const BLOG_TITLE = "Sud0ops Blog";
export const BLOG_DESCRIPTION =
    "Notes from Sud0ops on automation, DevOps, cloud and AI, written for the teams that run on them.";

export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    readingMinutes: number;
    // Markdown body, without frontmatter.
    body: string;
};

// Reads the flat `key: value` frontmatter these posts use. Values may be quoted;
// `[a, b]` becomes a list.
function parseFrontmatter(slug: string, source: string) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
    if (!match) throw new Error(`Blog post "${slug}" is missing frontmatter.`);

    const data: Record<string, string | string[]> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const field = /^(\w+):\s*(.*)$/.exec(line);
        if (!field) continue;
        const raw = field[2].trim();
        data[field[1]] = raw.startsWith("[") && raw.endsWith("]")
            ? raw.slice(1, -1).split(",").map(unquote).filter(Boolean)
            : unquote(raw);
    }
    return { data, body: source.slice(match[0].length).trim() };
}

function unquote(value: string) {
    return value.trim().replace(/^(["'])(.*)\1$/, "$2");
}

function toPost(slug: string, source: string): Post {
    const { data, body } = parseFrontmatter(slug, source);
    const field = (key: string) => {
        const value = data[key];
        if (typeof value !== "string" || !value) throw new Error(`Blog post "${slug}" needs a "${key}" in its frontmatter.`);
        return value;
    };
    const date = field("date");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Blog post "${slug}" date must be YYYY-MM-DD.`);

    return {
        slug,
        title: field("title"),
        description: field("description"),
        date,
        author: typeof data.author === "string" && data.author ? data.author : "Sud0ops",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
        body,
    };
}

// Newest first.
const posts = Object.entries(sources)
    .map(([slug, source]) => toPost(slug, source))
    .sort((a, b) => b.date.localeCompare(a.date));

export function getPosts() {
    return posts;
}

export function getPost(slug: string) {
    return posts.find((post) => post.slug === slug);
}

export function postUrl(slug: string) {
    return `${BLOG_URL}/${slug}`;
}

export function formatDate(date: string) {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

// Anchor id for a heading: "Why HTML is the wrong format" becomes "why-html-is-the-wrong-format".
function headingId(text: string) {
    return text.toLowerCase().replace(/[`*_]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Posts are written by us, so their HTML is trusted and rendered as-is.
// External links open in a new tab, and headings get ids so the contents list can link to them.
const marked = new Marked({
    gfm: true,
    renderer: {
        heading({ tokens, depth, text }) {
            return `<h${depth} id="${headingId(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
        },
        link({ href, title, tokens }) {
            const text = this.parser.parseInline(tokens);
            const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
            const attrs = [
                `href="${attr(href)}"`,
                title ? `title="${attr(title)}"` : "",
                external ? `target="_blank" rel="noopener noreferrer"` : "",
            ].filter(Boolean).join(" ");
            return `<a ${attrs}>${text}</a>`;
        },
    },
});

function attr(value: string) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// A "## Sources" section renders as a collapsed <details>, closed by default, so references don't crowd
// the end of the post. It runs to the next "## " heading or the end. The markdown version keeps it as a list.
const SOURCES = /^## Sources[ \t]*$/m;

export function renderPostHtml(post: Post) {
    const render = (markdown: string) => marked.parse(markdown, { async: false });
    const start = post.body.search(SOURCES);
    if (start < 0) return render(post.body);
    const rest = post.body.slice(start).replace(SOURCES, "");
    const next = rest.search(/^## /m);
    const sources = next < 0 ? rest : rest.slice(0, next);
    const count = sources.match(/^\s*[-*] /gm)?.length ?? 0;
    return (
        render(post.body.slice(0, start)) +
        `<details class="blog-sources"><summary>Sources${count ? ` <span>(${count})</span>` : ""}</summary>${render(sources)}</details>` +
        (next < 0 ? "" : render(rest.slice(next)))
    );
}

// The post's sections (its ## headings, minus Sources) for the contents list.
export function postHeadings(post: Post) {
    return marked
        .lexer(post.body)
        .filter((token): token is Tokens.Heading => token.type === "heading" && token.depth === 2 && token.text !== "Sources")
        .map((token) => ({ id: headingId(token.text), text: token.text.replace(/[`*_]/g, "") }));
}

// What agents get from Accept: text/markdown or a .md URL, and what the MD toggle shows.
export function postMarkdown(post: Post) {
    const frontmatter = [
        "---",
        `title: ${JSON.stringify(post.title)}`,
        `description: ${JSON.stringify(post.description)}`,
        `date: ${post.date}`,
        `author: ${post.author}`,
        ...(post.tags.length ? [`tags: [${post.tags.join(", ")}]`] : []),
        `url: ${postUrl(post.slug)}`,
        "---",
    ].join("\n");
    return `${frontmatter}\n\n# ${post.title}\n\n${post.body}\n`;
}

export function blogIndexMarkdown() {
    const list = posts
        .map((post) => `- [${post.title}](${postUrl(post.slug)}.md) (${post.date}): ${post.description}`)
        .join("\n");
    return [
        `# ${BLOG_TITLE}`,
        `> ${BLOG_DESCRIPTION}`,
        "Every post is available as markdown: send `Accept: text/markdown` to the post URL, or add `.md` to it.",
        "## Posts",
        list || "No posts yet.",
    ].join("\n\n") + "\n";
}

export function markdownResponse(markdown: string, canonical: string) {
    return new Response(markdown, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept",
            Link: `<${canonical}>; rel="canonical"`,
        },
    });
}
