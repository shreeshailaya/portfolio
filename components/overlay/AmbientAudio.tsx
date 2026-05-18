"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AmbientEngine } from "@/lib/audio/AmbientEngine";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";

const STORAGE_KEY = "yatri.audio.muted";

/**
 * Renders a small mute toggle. Audio starts on first toggle (or first user
 * gesture if started=true on mount); engine crossfades scene layers based on
 * scroll progress.
 *
 * Honors localStorage preference and `prefers-reduced-motion`.
 */
export function AmbientAudio() {
  const engineRef = useRef<AmbientEngine | null>(null);
  const { progressRef } = useScrollProgress();
  const [muted, setMuted] = useState(true); // start muted — user controls
  const [available, setAvailable] = useState(false);

  // Hydrate persisted preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    setAvailable(true);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "0") setMuted(false);
  }, []);

  // Manage engine lifecycle
  useEffect(() => {
    if (!available) return;
    const engine = new AmbientEngine();
    engine.attach(() => progressRef.current);
    engineRef.current = engine;
    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, [available, progressRef]);

  const toggle = async () => {
    const next = !muted;
    setMuted(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    }
    const engine = engineRef.current;
    if (!engine) return;
    if (!next) {
      // unmute → ensure engine is started
      await engine.start();
      engine.setMuted(false);
    } else {
      engine.setMuted(true);
    }
  };

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute ambient soundscape" : "Mute ambient soundscape"}
      title={muted ? "Unmute soundscape" : "Mute soundscape"}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto glass rounded-full w-11 h-11 grid place-items-center hover:bg-white/[0.08] transition group"
    >
      {muted ? (
        <VolumeX
          size={16}
          className="text-foreground/70 group-hover:text-foreground transition"
        />
      ) : (
        <Volume2
          size={16}
          className="text-saffron animate-pulse-glow"
        />
      )}
      <span className="sr-only">{muted ? "Unmute" : "Mute"}</span>
    </button>
  );
}
