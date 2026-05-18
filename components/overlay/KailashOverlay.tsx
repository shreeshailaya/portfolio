"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { BlogsSection } from "./BlogsSection";
import { UsefulLinks } from "./UsefulLinks";
import { PERSON } from "@/lib/data/person";
import type { BlogPost } from "@/lib/data/blogs";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email",
    description: "Let's discuss your next project",
    action: "Send Email",
    href: `mailto:${PERSON.email}`,
    gradient: "from-blue-600 to-purple-600",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect for professional networking",
    action: "Connect",
    href: PERSON.links.linkedin,
    gradient: "from-blue-600 to-blue-800",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Check out my open source contributions",
    action: "View Profile",
    href: PERSON.links.github,
    gradient: "from-gray-600 to-gray-800",
  },
] as const;

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Location & Availability",
    body: "Based in India, working with clients globally. Available for remote collaborations, consulting projects and full-time opportunities in data engineering and automation.",
  },
  {
    icon: Calendar,
    title: "Response Time",
    body: "I typically respond within 24 hours. For urgent projects or time-sensitive discussions, please mention it in your message.",
  },
] as const;

export function KailashOverlay({ posts }: { posts: BlogPost[] }) {
  return (
    <section
      id="kailash"
      className="scene-section yatri-overlay"
      aria-labelledby="kailash-heading"
    >
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <SectionEyebrow index={7} label="The Kailash Summit" sub="Contact" />
          <h2
            id="kailash-heading"
            className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-7xl leading-[1.05]"
          >
            <span className="block bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow">
              “{PERSON.finalQuote}”
            </span>
          </h2>
          <p className="mt-5 text-foreground/65 tracking-widest text-sm uppercase">
            {PERSON.finalSub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          {CONTACT_METHODS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group glass-strong rounded-3xl p-6 lg:p-8 text-center relative overflow-hidden hud-corner"
              >
                <div
                  className={`mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} ring-1 ring-white/10 shadow-glow-cyan`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground/95">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/65">
                  {c.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-saffron group-hover:text-foreground transition">
                  {c.action}
                  <ArrowUpRight size={12} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-neon-cyan/15 ring-1 ring-neon-cyan/25 text-neon-cyan">
                    <Icon size={16} />
                  </div>
                  <h4 className="font-semibold text-foreground/95">
                    {card.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {card.body}
                </p>
              </div>
            );
          })}
        </motion.div>

        <BlogsSection posts={posts} />

        <UsefulLinks />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 glass-strong rounded-3xl p-6 lg:p-10 relative overflow-hidden hud-corner"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-saffron/15" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-foreground/95">
                Ready to start your next project?
              </h3>
              <p className="mt-2 text-foreground/65 max-w-2xl">
                From MVP development to enterprise automation — let&apos;s
                discuss how to bring your ideas to life with cutting-edge
                technology and proven execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${PERSON.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron via-neon-magenta to-neon-violet px-6 py-3 text-sm font-semibold text-cosmos shadow-glow hover:scale-[1.02] transition"
              >
                Send Message
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </a>
              <a
                href={PERSON.links.calSchedule}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground/90 hover:bg-white/5 transition"
              >
                <Calendar size={16} />
                Schedule Call
              </a>
              <a
                href={PERSON.links.tawkChat}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground/90 hover:bg-white/5 transition"
              >
                <MessageCircle size={16} />
                Live Chat
              </a>
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 pb-2 text-center text-xs text-foreground/50">
          <div className="font-mono tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} {PERSON.name} · The Digital Yatri
          </div>
          <div className="mt-1 text-foreground/40">
            Built with care · AI · Automation · Engineering · Vision
          </div>
        </footer>
      </div>
    </section>
  );
}
