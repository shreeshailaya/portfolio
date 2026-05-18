"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { MAIN_PROJECTS, type MainProject } from "@/lib/data/projects";

export interface ProjectModalState {
  open: boolean;
  projectId: string | null;
}

interface Props {
  state: ProjectModalState;
  onClose: () => void;
}

export function ProjectModal({ state, onClose }: Props) {
  const project: MainProject | null =
    state.projectId === null
      ? null
      : MAIN_PROJECTS.find((p) => p.id === state.projectId) ?? null;

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state.open, onClose]);

  return (
    <AnimatePresence>
      {state.open && project ? (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[100] grid place-items-center px-4 py-6 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-cosmos/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — case study`}
            className="relative glass-strong rounded-3xl w-full max-w-2xl hud-corner overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -top-32 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: project.portal.color }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition"
            >
              <X size={16} className="text-foreground/85" />
            </button>

            <div className="relative p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div
                  className="grid place-items-center w-14 h-14 rounded-2xl ring-1"
                  style={{
                    background: `linear-gradient(135deg, ${project.portal.color}33, ${project.portal.accent}22)`,
                    boxShadow: `0 0 28px ${project.portal.color}66`,
                  }}
                >
                  <project.icon size={26} className="text-foreground" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">
                    {project.subtitle}
                  </div>
                  <h2 className="mt-1 font-display text-3xl text-foreground/95">
                    {project.title}
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-foreground/80 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
                  What it does
                </div>
                <ul className="mt-3 space-y-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground/85"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: project.portal.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full glass text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron via-neon-magenta to-neon-violet px-5 py-2.5 text-sm font-semibold text-cosmos shadow-glow hover:scale-[1.02] transition"
                >
                  Visit Live Project
                  <ArrowUpRight
                    size={14}
                    className="transition group-hover:rotate-12"
                  />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-foreground/90 hover:bg-white/[0.08] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
