"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { ABOUT, HIGHLIGHTS } from "@/lib/data/highlights";

export function StreetOverlay() {
  return (
    <section
      id="street"
      className="scene-section yatri-overlay"
      aria-labelledby="street-heading"
    >
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <SectionEyebrow index={2} label="The Street of Systems" sub={ABOUT.badge} />
          <h2
            id="street-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            {ABOUT.title.line1}{" "}
            <span className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
              {ABOUT.title.highlight}
            </span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-2xl">
            {ABOUT.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 grid md:grid-cols-2 gap-4 max-w-3xl"
        >
          <div className="glass rounded-2xl p-5 lg:p-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-saffron">
              Spotlight
            </div>
            <h3 className="mt-2 font-display text-xl text-foreground">
              {ABOUT.spotlight.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              {ABOUT.spotlight.body}
            </p>
          </div>
          <div className="glass rounded-2xl p-5 lg:p-6 bg-yatri-gradient">
            <div className="text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
              Operational Mode
            </div>
            <h3 className="mt-2 font-display text-xl text-foreground">
              AI-First · Automation-First
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/75">
              <li>• Event-driven backends with Python &amp; FastAPI</li>
              <li>• AWS-native serverless deployments</li>
              <li>• Webhook + queue-based fulfillment systems</li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group glass rounded-2xl p-5 hover:bg-white/[0.05] transition relative overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-saffron/25 to-neon-cyan/15 ring-1 ring-saffron/25 text-saffron">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground/95">
                      {h.title}
                    </h4>
                    <p className="mt-1 text-sm text-foreground/65 leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
