import { NextResponse } from "next/server";
import { fetchBlogs } from "@/lib/medium";

/**
 * Optional JSON endpoint — clients (or future ISR consumers) can hit
 * /api/medium and get the latest posts as JSON.
 *
 * Marked dynamic so Next doesn't try to pre-render it at build time
 * (which conflicts with the external Medium RSS fetch and standalone
 * output). Caching is still 1h — provided by the inner fetch's
 * `next: { revalidate: 3600 }` option in `lib/medium.ts` + the
 * Cache-Control header below.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const posts = await fetchBlogs();
  return NextResponse.json(
    { posts },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
