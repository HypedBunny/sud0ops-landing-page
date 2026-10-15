---
title: This blog speaks markdown to AI agents
description: Every post here is published twice from one source, as a web page for people and as plain markdown for AI agents. Here is how that works and why it matters.
date: 2026-10-15
author: Sud0ops
tags: [AI Agents, Markdown, Next.js]
---

More of the people reading a website are not people. Assistants like ChatGPT, Claude and Perplexity fetch pages on a user's behalf, and coding agents pull documentation straight into their context. Most of them get HTML built for a browser, then strip it back down to text before they can use it.

That clean-up step costs tokens and loses structure. Navigation, scripts, styling and cookie banners all get read before the actual content. Headings flatten, code blocks break, and lists turn into run-on sentences.

So every post on this blog is available in the format agents already work in: markdown.

## Three ways to get the markdown

**1. Ask for it.** Send an `Accept: text/markdown` header to any post URL and the server answers with markdown instead of HTML. Browsers never send that header, so people still get the normal page.

```bash
curl -H "Accept: text/markdown" https://sud0ops.com/blog/markdown-for-ai-agents
```

**2. Add `.md` to the URL.** Every post has a markdown twin at the same address with `.md` on the end, for tools that cannot set headers.

```bash
curl https://sud0ops.com/blog/markdown-for-ai-agents.md
```

**3. Press the toggle.** At the top of every post there is an HTML / MD switch. Flip it to see the raw markdown, then copy it in one click and paste it into your own assistant.

The blog index works the same way. `https://sud0ops.com/blog.md` lists every post with a link to its markdown version.

## How it works

This site runs on Next.js, deployed to Cloudflare Workers. The setup is small:

- **One source.** Each post is a markdown file. The web page is rendered from it at build time, and the markdown version is that same file with the title and canonical URL added. There is nothing to keep in sync.
- **A header-based rewrite.** The Next.js config rewrites any `/blog` request whose `Accept` header contains `text/markdown` to a route that returns `text/markdown`. No middleware, no extra round trip.
- **`Vary: Accept`.** Blog responses tell caches that the body depends on the `Accept` header, so a cached HTML page is never served to an agent that asked for markdown, or the other way round.
- **A canonical link.** Markdown responses carry a `Link: rel="canonical"` header pointing at the HTML page, so search engines treat the two as one page rather than duplicates.
- **Discoverable.** Each post page includes `<link rel="alternate" type="text/markdown">` in its head, and the site's `llms.txt` points agents at the markdown index.

## Why bother

If an assistant is going to summarise your page for someone, you want it working from what you actually wrote, not from a best guess at which parts of the HTML mattered. Serving markdown makes that cheap for the agent and predictable for you.

It is also a small change. If your site already stores content as markdown or in a CMS, adding content negotiation is usually a few lines of routing, not a rebuild.

If you want help making your own content easier for AI agents to read, [get in touch](mailto:alex@sud0ops.com).
