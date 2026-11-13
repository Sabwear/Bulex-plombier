import fs from "fs";
import path from "path";

// ── Commune type ────────────────────────────────────────────────
export interface CommuneFaq {
  q: string;
  a: string;
}

export interface Commune {
  name: string;
  slug: string;
  region: string;
  postal_code: string | null;
  distance_minutes: number | null;
  response_time_minutes: number | null;
  building_profile: string | null;
  nearby_landmarks: string[];
  common_issues: string[];
  services: string[];
  nearby_communes: string[];
  faq: CommuneFaq[];
  last_updated: string;
}

// ── Blog type ───────────────────────────────────────────────────
export interface BlogContent {
  title: string;
  excerpt: string;
  content: string; // Markdown
  date: string;
}

export interface BlogPost {
  slug: string;
  categories: string[];
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  languages: {
    fr: BlogContent;
    nl: BlogContent;
  };
  related_slugs: string[];
}

// ── Data loader (reads individual JSON files) ───────────────────
const communesDir = path.join(process.cwd(), "data", "communes");

function loadAllCommunes(): Commune[] {
  const files = fs.readdirSync(communesDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(communesDir, file), "utf-8");
    return JSON.parse(raw) as Commune;
  });
}

// Cache after first load (within a single build / server process)
let _cache: Commune[] | null = null;

function getAll(): Commune[] {
  if (!_cache) {
    _cache = loadAllCommunes();
  }
  return _cache;
}

// ── Public accessors ────────────────────────────────────────────

/** Return all communes */
export function getCommunes(): Commune[] {
  return getAll();
}

/** Return a single commune by its slug, or undefined if not found */
export function getCommuneBySlug(slug: string): Commune | undefined {
  return getAll().find((c) => c.slug === slug);
}

/** Return all valid slugs */
export function getAllSlugs(): string[] {
  return getAll().map((c) => c.slug);
}

// ── Blog Data loader ───────────────────────────────────────────
const blogDir = path.join(process.cwd(), "data", "blog");

function loadBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    return JSON.parse(raw) as BlogPost;
  });
  
  // Sort posts by date descending
  return posts.sort((a, b) => {
    return new Date(b.languages.fr.date).getTime() - new Date(a.languages.fr.date).getTime();
  });
}

let _blogCache: BlogPost[] | null = null;

/** Today's date as YYYY-MM-DD (UTC) for scheduling comparisons. */
function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * A post is "published" once its date is today or earlier. Posts with a future
 * date act as scheduled drafts: they are hidden from listings, static params and
 * direct slug access until that date arrives (and the site is rebuilt).
 */
function isPublished(post: BlogPost): boolean {
  return post.languages.fr.date <= todayIso();
}

/**
 * Published blog posts only (future-dated posts are excluded so they can be
 * scheduled ahead of time). Sorted by date descending.
 */
export function getBlogPosts(): BlogPost[] {
  if (!_blogCache) {
    _blogCache = loadBlogPosts();
  }
  return _blogCache.filter(isPublished);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((b) => b.slug === slug);
}
