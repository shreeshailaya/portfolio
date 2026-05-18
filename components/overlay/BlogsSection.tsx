"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { PERSON } from "@/lib/data/person";
import type { BlogPost } from "@/lib/data/blogs";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function BlogsSection({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="mt-16">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            <BookOpen size={14} className="text-neon-cyan" /> Latest Blogs
          </div>
          <h3 className="mt-2 font-display text-2xl lg:text-3xl text-foreground/95">
            Thoughts &amp; Insights{" "}
            <span className="bg-gradient-to-r from-neon-cyan to-saffron bg-clip-text text-transparent">
              from my Medium
            </span>
          </h3>
        </div>
        <a
          href={PERSON.links.medium}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition"
        >
          Follow on Medium
          <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {posts.map((p, i) => (
          <motion.a
            key={p.guid}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group glass rounded-2xl p-5 hover:bg-white/[0.05] transition flex flex-col"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-saffron font-mono">
              {formatDate(p.pubDate)}
            </div>
            <h4 className="mt-2 font-display text-lg leading-snug text-foreground/95 group-hover:text-foreground">
              {p.title}
            </h4>
            <p className="mt-2 text-sm text-foreground/65 leading-relaxed line-clamp-3 flex-1">
              {p.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-neon-cyan/90">
              Read on Medium <ArrowUpRight size={12} />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
