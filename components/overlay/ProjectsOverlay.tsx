"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { MAIN_PROJECTS, OTHER_PROJECTS } from "@/lib/data/projects";
import { useProjectModal } from "@/components/providers/ProjectModalProvider";

export function ProjectsOverlay() {
  const { open } = useProjectModal();
  return (
    <section
      id="projects"
      className="scene-section yatri-overlay"
      aria-labelledby="projects-heading"
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
            index={3}
            label="The Hall of Projects"
            sub="Projects & MVPs"
          />
          <h2
            id="projects-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            Building Solutions That{" "}
            <span className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
              Drive Results
            </span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-2xl">
            From AI-powered platforms to automated e-commerce systems — each
            portal opens into a different world I&apos;ve built.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          {MAIN_PROJECTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => open(p.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative glass-strong rounded-3xl p-6 lg:p-8 overflow-hidden hud-corner text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60"
                style={{
                  boxShadow: `0 0 60px ${p.portal.color}25`,
                }}
                aria-label={`Open ${p.title} case study`}
              >
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 transition group-hover:opacity-60"
                  style={{ background: p.portal.color }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="grid place-items-center w-14 h-14 rounded-2xl ring-1"
                      style={{
                        background: `linear-gradient(135deg, ${p.portal.color}33, ${p.portal.accent}22)`,
                        boxShadow: `0 0 24px ${p.portal.color}55`,
                      }}
                    >
                      <Icon
                        size={26}
                        className="text-foreground"
                        style={{ filter: `drop-shadow(0 0 6px ${p.portal.color})` }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-foreground">
                        {p.title}
                      </h3>
                      <div className="text-xs uppercase tracking-[0.25em] text-foreground/55 mt-1">
                        {p.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron/80 opacity-0 group-hover:opacity-100 transition">
                      <MousePointer2 size={11} /> case study
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-foreground/70 transition group-hover:rotate-12 group-hover:text-foreground"
                    />
                  </div>
                </div>

                <p className="relative mt-5 text-foreground/75 leading-relaxed">
                  {p.description}
                </p>

                <ul className="relative mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-foreground/80"
                    >
                      <span
                        className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: p.portal.accent }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full glass text-foreground/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-14"
        >
          <h3 className="font-display text-xl text-foreground/95">
            Other Notable MVPs &amp; Systems
          </h3>
          <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {OTHER_PROJECTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="glass rounded-2xl p-4 hover:bg-white/[0.05] transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center w-9 h-9 rounded-xl bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/20">
                      <Icon size={16} />
                    </div>
                    <h4 className="font-semibold text-sm text-foreground/90">
                      {p.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-xs text-foreground/65 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-foreground/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
