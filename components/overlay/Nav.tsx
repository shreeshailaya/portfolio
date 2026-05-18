"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PERSON } from "@/lib/data/person";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-6 pt-5">
        <nav className="glass rounded-full px-4 py-2.5 flex items-center justify-between pointer-events-auto">
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="relative grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-saffron via-neon-magenta to-neon-violet shadow-glow">
              <span className="absolute inset-0 rounded-full ring-1 ring-saffron/40 animate-pulse-glow" />
              <span className="font-display text-xs font-bold text-cosmos">SV</span>
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-sm tracking-widest text-foreground/95">
                Digital Yatri
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                {PERSON.name}
              </span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-foreground/70">
            {[
              { label: "Home", href: "#cosmic" },
              { label: "Systems", href: "#street" },
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#temple" },
              { label: "AI", href: "#neural" },
              { label: "Journey", href: "#timeline" },
              { label: "Contact", href: "#kailash" },
            ].map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className="px-3 py-1.5 rounded-full transition hover:text-foreground hover:bg-white/5"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={PERSON.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/5 transition"
            >
              <Github size={16} className="text-foreground/80" />
            </a>
            <a
              href={PERSON.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/5 transition"
            >
              <Linkedin size={16} className="text-foreground/80" />
            </a>
            <a
              href={`mailto:${PERSON.email}`}
              aria-label="Email"
              className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/5 transition"
            >
              <Mail size={16} className="text-foreground/80" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
