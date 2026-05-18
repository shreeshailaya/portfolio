import { NextResponse } from "next/server";
import { fetchBlogs } from "@/lib/medium";

/**
 * Optional JSON endpoint — clients (or future ISR consumers) can hit
 * /api/medium and get the latest posts as JSON. Server-cached for 1h.
 */
export const revalidate = 3600;

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
