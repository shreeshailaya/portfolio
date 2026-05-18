"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PERSON } from "@/lib/data/person";
import { RotatingRoles } from "./RotatingRoles";

export function CosmicOverlay() {
  return (
    <section
      id="cosmic"
      className="scene-section yatri-overlay"
      aria-labelledby="cosmic-heading"
    >
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-foreground/80">
              <span className="grid place-items-center w-6 h-6 rounded-full bg-saffron/20 text-saffron">
                <Sparkles size={12} />
              </span>
              {PERSON.badge}
            </span>

            <h1
              id="cosmic-heading"
              className="mt-8 font-display text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
            >
              <span className="block text-foreground/95 text-glow">
                {PERSON.name.split(" ")[0]}
              </span>
              <span className="block bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
                {PERSON.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-foreground/80 max-w-2xl">
              {PERSON.tagline.prefix}{" "}
              <RotatingRoles />
            </p>

            <p className="mt-5 text-foreground/65 max-w-2xl leading-relaxed">
              {PERSON.paragraphs[0]}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={`mailto:${PERSON.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-saffron via-neon-magenta to-neon-violet px-6 py-3 text-sm font-semibold text-cosmos shadow-glow hover:scale-[1.02] active:scale-[0.99] transition"
              >
                Get In Touch
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </a>
              <a
                href={PERSON.links.githubRepositories}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground/90 hover:bg-white/5 transition"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="lg:col-span-5 grid grid-cols-3 gap-3"
          >
            {PERSON.stats.map((s) => (
              <div
                key={s.label}
                className="glass hud-corner rounded-2xl p-4 text-center"
              >
                <div className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-saffron to-neon-cyan bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
