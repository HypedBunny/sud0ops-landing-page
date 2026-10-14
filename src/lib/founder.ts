import { existsSync } from "node:fs";
import path from "node:path";

// One source of truth for the founder's identity, shared by the JSON-LD, page
// metadata and sitemap so every crawler sees the same entity.
export const SITE_URL = "https://sud0ops.com";
export const FOUNDER_URL = `${SITE_URL}/about-founder`;
// Stable @id so the Organization's founder and the ProfilePage's Person resolve to one entity.
export const FOUNDER_ID = `${FOUNDER_URL}#person`;
export const FOUNDER_NAME = "Alex-Jay Beukes";

// Headshot: drop a square JPG at public/alex.jpg (at least 800x800) and it is
// picked up on the next build by the page, JSON-LD, Open Graph and image sitemap.
export const FOUNDER_PHOTO_PATH = "/alex.jpg";
export const FOUNDER_PHOTO_URL = `${SITE_URL}${FOUNDER_PHOTO_PATH}`;
export const FOUNDER_PHOTO_CAPTION =
    "Alex-Jay Beukes, DevOps and platform engineer and founder of Sud0ops, Cape Town, South Africa";

// Checked at build time, so schema and sitemap never point at a missing file.
export const hasFounderPhoto = existsSync(
    path.join(process.cwd(), "public", FOUNDER_PHOTO_PATH),
);
