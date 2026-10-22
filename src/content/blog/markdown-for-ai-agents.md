---
title: How to make your website speak to AI agents
description: AI assistants, answer engines and coding agents now read the web for people. Here is how to give them clean markdown through content negotiation, .md URLs and llms.txt, and how to set the rules for the new wave of crawlers.
date: 2026-10-18
author: Alex-Jay Beukes
tags: [AI Agents, Markdown, SEO, Next.js]
---

For most of the web's history a website had two audiences: the people reading it and the search crawlers indexing it. That is no longer true. A growing share of the requests your site receives come from AI systems, and they are not all the same kind of visitor.

Some collect pages to train models. Some build the index behind an AI answer engine. And a fast-growing group fetches a page at the moment a person asks a question, reads it, and answers on their behalf: ChatGPT, Claude and Perplexity browsing for a user, or a coding agent pulling documentation into its context. Cloudflare's 2025 review found crawling by these user-driven AI bots grew about 15 times over the year.

These visitors want your content, not your page. This post covers why that matters, the options for serving them properly, and how we did it on this site.

## The new age of scrapers

It helps to split AI traffic into three groups, because you will probably want to treat them differently.

| Type | What it does | Examples |
| --- | --- | --- |
| Training crawlers | Collect pages in bulk to train or fine-tune models | GPTBot, ClaudeBot, CCBot |
| Search and answer crawlers | Build an index that AI answers are drawn from | OAI-SearchBot, Claude-SearchBot, PerplexityBot |
| User-triggered fetchers | Read a page right now because a person asked | ChatGPT-User, Claude-User, Perplexity-User, coding agents |

The economics are different from classic search. Google crawled your site and sent visitors back. AI crawlers send far fewer. Cloudflare measures this as a crawl-to-referral ratio: in July 2025 it put Anthropic at about 38,000 crawls for every visitor referred back, OpenAI at roughly 1,100 and Perplexity at about 200. A person who gets their answer inside a chat window often never clicks through.

That does not make AI traffic worthless. When someone asks an assistant "who can help us automate our onboarding?", the assistant's answer is built from whatever it managed to read. If your page was hard to parse, you get summarised badly or not at all. The goal is to make your content easy to read correctly, and to be clear about how it may be used.

## Why HTML is the wrong format for a model

A browser needs HTML. A language model does not. When an agent fetches a typical page it gets navigation, scripts, inline styles, tracking tags, cookie banners and footer links, and somewhere in the middle, the article. It has to strip all of that before it can work, and every byte it reads costs tokens.

The clean-up is lossy too. Headings flatten into plain text, tables collapse, code blocks lose their formatting, and lists turn into run-on sentences. The agent then reasons over a damaged copy of what you wrote.

Markdown fixes both problems. It is plain text, so there is almost no overhead, and its structure (headings, lists, tables, code, links) is exactly what models are trained to read and write. When Cloudflare converted its own announcement post, the HTML came to 16,180 tokens and the markdown to 3,150, about 80% less for the same content.

## Your options for serving markdown

There is no single standard yet, but a handful of conventions have emerged. They complement each other, and a well-prepared site uses several.

### 1. Content negotiation

HTTP has always let a client say which formats it prefers, using the `Accept` header, and `text/markdown` has been a registered media type since 2016 (RFC 7763). Content negotiation means the same URL serves different representations:

- A browser sends `Accept: text/html,...` and gets the normal page.
- An agent sends `Accept: text/markdown` and gets markdown.

This is the cleanest option, because there is only one URL to share, link and index. Agents are adopting it: Cloudflare says popular coding agents such as Claude Code and OpenCode already ask for markdown this way.

Three details matter when you implement it:

- **Send `Vary: Accept`.** It tells caches and CDNs that the response body depends on the `Accept` header. Without it, a cache can store the markdown and serve it to the next browser, or the other way round.
- **Point back to the page.** Add `Link: <https://example.com/page>; rel="canonical"` to markdown responses, so search engines treat both versions as one page, not duplicate content.
- **Respect preferences if you can.** Clients can rank formats with quality values, such as `Accept: text/markdown, text/html;q=0.9`. A strict server compares them. A pragmatic one serves markdown whenever `text/markdown` appears at all, since browsers never send it.

### 2. A `.md` twin for every page

Not every tool can set request headers. The simplest fallback is a markdown version at the same address with `.md` on the end: `/blog/my-post` and `/blog/my-post.md`. This convention comes from the llms.txt proposal and is common on documentation sites. It is easy to test, easy to link to, and works with any HTTP client, even a plain `curl`.

### 3. An `llms.txt` file

Proposed by Jeremy Howard of Answer.AI in September 2024, `llms.txt` is a markdown file at the root of your site: a short description of who you are, followed by links to the pages that matter most. Think of it as a map written for a model rather than a sitemap written for a crawler.

```markdown
# Example Co

> Example Co builds payroll software for small teams in South Africa.

## Pages

- [Pricing](https://example.com/pricing.md): plans and what each includes
- [Docs](https://example.com/docs.md): setup and API reference
```

Be realistic about it. `llms.txt` is a community proposal, not an IETF or W3C standard, and the big model providers have not said publicly that their crawlers read it. Coding agents and documentation tools are its main users so far. It costs very little to publish, so it is worth having, but do not expect it to change how a training crawler behaves.

### 4. Make it discoverable

Tell agents that a markdown version exists. In the `<head>` of each page:

```html
<link rel="alternate" type="text/markdown" href="/blog/my-post.md">
```

An agent that lands on the HTML can find the markdown without guessing, and your `llms.txt` can point at your markdown index for the same reason.

### 5. Convert at the edge, or author in markdown

If your content lives in a CMS that only outputs HTML, you can convert on the way out. Cloudflare's Markdown for Agents does this at its edge: when a request asks for `text/markdown`, it fetches your HTML, converts it, and adds an `x-markdown-tokens` header with the estimated size. It is a fast way to start, with no code changes.

Conversion is still a guess at which parts of the page are content. If you can, keep markdown as the source and render HTML from it. Then the markdown agents receive is the text you wrote, not a reconstruction of it.

## Setting the rules

Serving markdown makes you easy to read. You also need to decide who may read you, and for what.

**robots.txt** is still the first lever. Because AI companies use separate user agents for training, search and user-triggered fetching, you can allow some and block others. For example, to appear in AI answers while opting out of training:

```text
User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /
```

**Content Signals** go a step further. Cloudflare's Content Signals Policy, launched in 2025, adds a line to robots.txt that separates access from use, with three signals: `search` (indexing and search results), `ai-input` (using content to ground live AI answers) and `ai-train` (training or fine-tuning models):

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
```

Know the limits. robots.txt and content signals are requests, not locks. Well-behaved crawlers honour them, others do not, and `llms.txt` grants or blocks nothing at all. If you need enforcement, it has to happen at your CDN or firewall: rate limits, bot management, or blocking unverified bots.

Verification is improving too. Web Bot Auth, an IETF draft built on HTTP Message Signatures (RFC 9421), lets a bot sign its requests so a server can confirm it really is who its user agent claims, rather than a scraper borrowing the name.

## How we built it on this site

This site runs on Next.js, deployed to Cloudflare Workers, and every post supports all of the above. The whole setup is small.

**One source.** Each post is a markdown file. The web page is rendered from it at build time, and the markdown version is the same file with the title, date and canonical URL added. There is nothing to keep in sync.

**Rewrites decide the format.** In `next.config.ts`, requests for `.md` URLs, or for the normal URL with `text/markdown` in the `Accept` header, are rewritten to route handlers that return markdown. There is no middleware and no extra round trip:

```ts
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

// Inside rewrites(), in beforeFiles so they win over the pages:
{ source: "/blog/:slug.md", destination: "/md/blog/:slug" },
{ source: "/blog/:slug", has: wantsMarkdown, destination: "/md/blog/:slug" },
```

**The response carries the right headers.** The handlers answer with the markdown media type, `Vary: Accept` and a canonical link back to the HTML page:

```ts
return new Response(markdown, {
    headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        Link: `<${canonical}>; rel="canonical"`,
    },
});
```

**Discovery is built in.** Each post's `<head>` includes `<link rel="alternate" type="text/markdown">`, the site's `llms.txt` points at the markdown blog index, and robots.txt names the main AI crawlers, lets them read everything except the contact API, and declares `Content-Signal: search=yes, ai-input=yes, ai-train=no`, so content may feed search and AI answers but not model training.

**People get it too.** At the top of every post there is an HTML / MD toggle. Flip it to see the raw markdown, then copy it in one click to paste into your own assistant.

## A checklist for your site

1. Keep your content in a structured source (markdown or a CMS), not hand-built HTML.
2. Serve markdown on `Accept: text/markdown`, with `Vary: Accept` and a canonical `Link` header.
3. Add a `.md` twin for each page, for clients that cannot set headers.
4. Publish an `llms.txt` that describes you and links to your most important pages.
5. Add `<link rel="alternate" type="text/markdown">` to each page.
6. Decide your policy per crawler type in robots.txt, and add content signals if you want to separate search from training.
7. Enforce anything that really matters at the edge, and check your logs to see who is actually visiting.

## Try it

Ask this post for markdown and compare it with what your browser received:

```bash
# Content negotiation: same URL, different format
curl -H "Accept: text/markdown" https://sud0ops.com/blog/markdown-for-ai-agents

# The .md twin
curl https://sud0ops.com/blog/markdown-for-ai-agents.md

# Every post, as a markdown index
curl https://sud0ops.com/blog.md
```

If your site already stores content as markdown or in a CMS, this is usually a few days of routing and headers, not a rebuild. If you want help making your website readable to AI agents, or deciding which crawlers to let in, [get in touch](mailto:alex@sud0ops.com).

## Sources

- Cloudflare: [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
- Cloudflare: [Crawl-to-referral ratios of AI crawlers, 2025](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)
- Cloudflare: [Giving users choice with the Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/)
- MediaNama: [User-driven AI bot crawling grew 15x in 2025, Cloudflare report](https://www.medianama.com/2025/12/223-user-driven-ai-bots-crawling-grows-15x-in-2025-cloudflare-report/)
- Jeremy Howard: [The /llms.txt file](https://llmstxt.org/)
- IETF: [HTTP Message Signatures for Bots (Web Bot Auth)](https://datatracker.ietf.org/doc/html/draft-ietf-webbotauth-httpsig-protocol)
- RFC 7763: [The text/markdown Media Type](https://www.rfc-editor.org/rfc/rfc7763)
- RFC 9110: [HTTP Semantics, content negotiation](https://www.rfc-editor.org/rfc/rfc9110#name-content-negotiation)
