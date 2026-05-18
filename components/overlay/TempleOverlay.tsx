"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { SKILL_CATEGORIES, CORE_STRENGTHS } from "@/lib/data/skills";

export function TempleOverlay() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section
      id="temple"
      className="scene-section yatri-overlay"
      aria-labelledby="temple-heading"
    >
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <SectionEyebrow
            index={4}
            label="The Temple of Knowledge"
            sub="Technologies & Skills"
          />
          <h2
            id="temple-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            My Technical{" "}
            <span className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
              Arsenal
            </span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-2xl">
            A comprehensive toolkit built through years of hands-on experience
            in building scalable, automated systems.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeIdx === i;
            return (
              <motion.button
                key={cat.title}
                type="button"
                onClick={() =>
                  setActiveIdx((cur) => (cur === i ? null : i))
                }
                onMouseEnter={() => setActiveIdx(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group glass rounded-2xl p-5 relative overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 transition ${
                  isActive ? "ring-1 ring-saffron/40" : ""
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 0 40px ${cat.pillarColor}55`
                    : undefined,
                }}
                aria-expanded={isActive}
                aria-label={`Toggle details for ${cat.title}`}
              >
                <div
                  className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl transition ${
                    isActive ? "opacity-60" : "opacity-25 group-hover:opacity-50"
                  }`}
                  style={{ background: cat.pillarColor }}
                />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid place-items-center w-10 h-10 rounded-xl ring-1"
                      style={{
                        background: `${cat.pillarColor}22`,
                        borderColor: `${cat.pillarColor}55`,
                        boxShadow: `0 0 22px ${cat.pillarColor}44`,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: cat.pillarColor }}
                      />
                    </div>
                    <h3 className="font-display text-lg text-foreground/95">
                      {cat.title}
                    </h3>
                  </div>
                  <Sparkle
                    size={14}
                    className={`transition ${
                      isActive
                        ? "rotate-45 opacity-100"
                        : "opacity-40 group-hover:opacity-80"
                    }`}
                    style={{ color: cat.pillarColor }}
                  />
                </div>
                <ul className="relative mt-4 space-y-1.5 text-sm text-foreground/75">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ background: cat.pillarColor }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative mt-4 pt-4 border-t border-white/10 overflow-hidden"
                    >
                      <div className="text-[10px] uppercase tracking-[0.3em] text-saffron/80">
                        Real-world usage
                      </div>
                      <p className="mt-2 text-xs text-foreground/75 leading-relaxed">
                        Hands-on with this stack across production projects —
                        from AgentMock&apos;s AI agents to PublicMart&apos;s
                        webhook-first fulfillment and Microsoft Dynamics 365
                        async tools. Used at scale, optimized for cost &amp;
                        reliability.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-12 glass-strong rounded-3xl p-6 lg:p-8 hud-corner"
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-display text-2xl text-foreground/95">
                Core Strengths
              </h3>
              <p className="mt-1 text-sm text-foreground/60">
                Proficiency levels based on real-world project experience
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-neon-cyan">
              live · /100
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {CORE_STRENGTHS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-foreground/85">{s.name}</span>
                  <span className="font-mono text-xs text-saffron">
                    {s.level}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
