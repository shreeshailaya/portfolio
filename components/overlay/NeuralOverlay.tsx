"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { VISION } from "@/lib/data/vision";

export function NeuralOverlay() {
  return (
    <section
      id="neural"
      className="scene-section yatri-overlay"
      aria-labelledby="neural-heading"
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
            index={5}
            label="The Neural Cave"
            sub={VISION.badge}
          />
          <h2
            id="neural-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            {VISION.title.line1}{" "}
            <span className="bg-gradient-to-r from-neon-violet via-neon-magenta to-saffron bg-clip-text text-transparent text-glow">
              {VISION.title.highlight}
            </span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-2xl">
            {VISION.subtitle}
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-6 lg:p-8 lg:col-span-7 relative overflow-hidden hud-corner"
          >
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full blur-3xl bg-neon-violet/30 opacity-50" />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.3em] text-neon-violet">
                {VISION.mission.title}
              </div>
              <h3 className="mt-2 font-display text-2xl text-foreground/95">
                Turn chaos into systems.
              </h3>
              <p className="mt-3 text-foreground/75 leading-relaxed">
                {VISION.mission.body}
              </p>
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
                  What drives me
                </div>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-foreground/80">
                  {VISION.drivers.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3">
            {VISION.points.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="glass rounded-2xl p-4 hover:bg-white/[0.05] transition"
                >
                  <div className="grid place-items-center w-9 h-9 rounded-xl bg-neon-violet/15 ring-1 ring-neon-violet/30 text-neon-violet">
                    <Icon size={16} />
                  </div>
                  <h4 className="mt-3 font-semibold text-foreground/90 text-sm">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-xs text-foreground/65 leading-relaxed">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
