"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { TIMELINE } from "@/lib/data/timeline";
import { SERVICES } from "@/lib/data/services";

export function TimelineOverlay() {
  return (
    <section
      id="timeline"
      className="scene-section yatri-overlay"
      aria-labelledby="timeline-heading"
    >
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <SectionEyebrow index={6} label="Timeline Path" sub="Journey" />
          <h2
            id="timeline-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            From{" "}
            <span className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
              Mech to AI
            </span>{" "}
            — milestones on the road.
          </h2>
        </motion.div>

        {/* Vertical milestone trail */}
        <div className="mt-14 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-saffron/40 to-transparent" />
          <ul className="space-y-12">
            {TIMELINE.map((m, i) => {
              const Icon = m.icon;
              const isRight = i % 2 === 0;
              return (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${
                    isRight ? "" : "md:[direction:rtl]"
                  }`}
                >
                  <div
                    className={`relative md:[direction:ltr] ${
                      isRight ? "md:pr-10 md:text-right" : "md:pl-10"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-mono">
                      <span style={{ color: m.color }}>STOP {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-foreground/95">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed max-w-md md:inline-block">
                      {m.blurb}
                    </p>
                  </div>
                  <div
                    className={`md:[direction:ltr] ${
                      isRight ? "md:pl-10" : "md:pr-10"
                    }`}
                  >
                    <div
                      className="glass rounded-2xl p-4 inline-flex items-center gap-3"
                      style={{ boxShadow: `0 0 30px ${m.color}33` }}
                    >
                      <div
                        className="grid place-items-center w-10 h-10 rounded-xl ring-1"
                        style={{
                          background: `${m.color}22`,
                          color: m.color,
                          boxShadow: `0 0 20px ${m.color}66`,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="text-sm text-foreground/85">{m.title}</div>
                    </div>
                  </div>
                  {/* dot on spine */}
                  <span
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ring-2 ring-cosmos"
                    style={{ background: m.color, boxShadow: `0 0 18px ${m.color}` }}
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Services strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <SectionEyebrow
            index={6}
            label="Things I Build For Others"
            sub="Services"
          />
          <h3 className="mt-3 font-display text-3xl lg:text-4xl text-foreground/95">
            Turn ideas into{" "}
            <span className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent">
              reality
            </span>
            .
          </h3>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="glass rounded-2xl p-4 hover:bg-white/[0.05] transition"
                >
                  <div className="grid place-items-center w-9 h-9 rounded-xl bg-saffron/15 ring-1 ring-saffron/25 text-saffron">
                    <Icon size={16} />
                  </div>
                  <h4 className="mt-3 font-semibold text-sm text-foreground/90">
                    {s.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-foreground/65 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-neon-cyan/80">
                    {s.idealFor}
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
