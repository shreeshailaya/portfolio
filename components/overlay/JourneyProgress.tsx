"use client";

import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { SCENES, SCENE_RANGES } from "@/lib/scenes";

export function JourneyProgress() {
  const { progress } = useScrollProgress();

  // Find which scene we're in
  const activeIdx = SCENE_RANGES.findIndex(
    (r) => progress >= r.start && progress <= r.end,
  );
  const active = SCENES[activeIdx === -1 ? 0 : activeIdx];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      aria-hidden="true"
    >
      <div className="h-[2px] w-full bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan transition-[width] duration-100"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
      </div>
      <div className="mx-auto px-6 mt-2 hidden md:flex max-w-fit pointer-events-none">
        <div className="glass rounded-full px-3 py-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
          <span className="font-mono text-saffron">
            {String((activeIdx === -1 ? 0 : activeIdx) + 1).padStart(2, "0")}/07
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span>{active.title}</span>
          <span className="text-foreground/40">· {active.subtitle}</span>
        </div>
      </div>
    </div>
  );
}
