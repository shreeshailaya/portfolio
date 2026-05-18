import { BLOG_FEED, FALLBACK_POSTS, type BlogPost } from "@/lib/data/blogs";

/** Strip HTML tags + collapse whitespace + truncate. */
function summarize(html: string, max = 240): string {
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

function pickBetween(src: string, open: string, close: string): string | null {
  const i = src.indexOf(open);
  if (i === -1) return null;
  const j = src.indexOf(close, i + open.length);
  if (j === -1) return null;
  return src.slice(i + open.length, j);
}

function cleanCdata(s: string | null): string {
  if (!s) return "";
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

/** Parses an RSS feed (XML string) into BlogPost[]. */
export function parseRss(xml: string, max = 3): BlogPost[] {
  const items: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) && items.length < max) {
    const raw = m[1];
    const title = cleanCdata(pickBetween(raw, "<title>", "</title>"));
    const link = cleanCdata(pickBetween(raw, "<link>", "</link>"));
    const guid = cleanCdata(pickBetween(raw, "<guid", "</guid>"))
      .replace(/^[^>]*>/, "")
      .trim();
    const pubDate = cleanCdata(pickBetween(raw, "<pubDate>", "</pubDate>"));
    const descRaw =
      pickBetween(raw, "<content:encoded>", "</content:encoded>") ||
      pickBetween(raw, "<description>", "</description>");
    const description = summarize(cleanCdata(descRaw));
    if (title && link) {
      items.push({
        title,
        link,
        pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        description,
        guid: guid || link,
      });
    }
  }
  return items;
}

/**
 * Server-side fetch of the Medium RSS feed.
 * Caches result for 1 hour to be a good citizen.
 * Falls back to static posts on error.
 */
export async function fetchBlogs(max = BLOG_FEED.maxPosts): Promise<BlogPost[]> {
  const url = `${BLOG_FEED.proxyBase}${encodeURIComponent(BLOG_FEED.rssUrl)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "DigitalYatri/1.0 (+portfolio)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();
    const posts = parseRss(xml, max);
    if (posts.length === 0) throw new Error("empty feed");
    return posts;
  } catch {
    return FALLBACK_POSTS.slice(0, max);
  }
}
