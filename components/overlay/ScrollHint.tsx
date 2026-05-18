"use client";

import { useEffect, useState } from "react";

export function ScrollHint() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-80"
      }`}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/60">
        Scroll to begin the journey
      </span>
      <div className="w-px h-10 bg-gradient-to-b from-saffron via-neon-cyan to-transparent" />
      <span className="block w-2 h-2 rotate-45 border-r border-b border-saffron animate-scroll-hint" />
    </div>
  );
}
