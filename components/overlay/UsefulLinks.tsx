"use client";

import { ArrowUpRight, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import { USEFUL_LINKS } from "@/lib/data/links";
import { PERSON } from "@/lib/data/person";

export function UsefulLinks() {
  return (
    <div className="mt-16">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            <Link2 size={14} className="text-saffron" /> Useful Links
          </div>
          <h3 className="mt-2 font-display text-2xl lg:text-3xl text-foreground/95">
            Quick access to my{" "}
            <span className="bg-gradient-to-r from-saffron to-neon-cyan bg-clip-text text-transparent">
              projects &amp; services
            </span>
          </h3>
        </div>
        <a
          href={PERSON.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition"
        >
          View all
          <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {USEFUL_LINKS.map((l, i) => {
          const Icon = l.icon;
          return (
            <motion.a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group glass rounded-2xl p-4 hover:bg-white/[0.05] transition"
            >
              <div className="flex items-start justify-between">
                <div className={`grid place-items-center w-10 h-10 rounded-xl ring-1 ring-white/10 bg-gradient-to-br ${l.gradient}`}>
                  <Icon size={18} className="text-white" />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-foreground/60 transition group-hover:text-foreground group-hover:rotate-12"
                />
              </div>
              <h4 className="mt-3 font-semibold text-sm text-foreground/95">
                {l.title}
              </h4>
              <div className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan/70 font-mono">
                {l.displayUrl}
              </div>
              <p className="mt-2 text-xs text-foreground/65 leading-relaxed">
                {l.description}
              </p>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
