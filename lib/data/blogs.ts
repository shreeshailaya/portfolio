export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
}

export const BLOG_FEED = {
  proxyBase: "https://api.allorigins.win/raw?url=",
  rssUrl: "https://medium.com/@shreeshail/feed",
  maxPosts: 3,
} as const;

export const FALLBACK_POSTS: BlogPost[] = [
  {
    title: "Building Scalable Web Applications with Modern Technologies",
    link: "https://medium.com/@shreeshail/building-scalable-web-applications",
    pubDate: "2026-01-01T00:00:00.000Z",
    description:
      "Learn how to build scalable web applications using modern frameworks and best practices for performance and maintainability.",
    guid: "fallback-1",
  },
  {
    title: "Data Engineering Best Practices for 2024",
    link: "https://medium.com/@shreeshail/data-engineering-best-practices",
    pubDate: "2025-12-31T00:00:00.000Z",
    description:
      "Explore the latest trends and best practices in data engineering, including cloud platforms, automation and data pipeline optimization.",
    guid: "fallback-2",
  },
  {
    title: "The Future of AI in Software Development",
    link: "https://medium.com/@shreeshail/future-of-ai-in-software-development",
    pubDate: "2025-12-30T00:00:00.000Z",
    description:
      "Discover how artificial intelligence is transforming software development workflows.",
    guid: "fallback-3",
  },
];
