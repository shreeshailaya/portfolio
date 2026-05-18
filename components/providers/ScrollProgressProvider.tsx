"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface ScrollState {
  /** Normalized [0,1] progress through the whole page. */
  progress: number;
  /** Raw scrollY in px. */
  scrollY: number;
  /** Smoothed/eased version used by the 3D camera, lags slightly. */
  smooth: number;
  /** Whether viewport is mobile-sized. */
  isMobile: boolean;
}

interface ScrollContextValue extends ScrollState {
  /** Imperative ref — avoid re-renders for canvas reads. */
  progressRef: React.MutableRefObject<number>;
  smoothRef: React.MutableRefObject<number>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollProgress(): ScrollContextValue {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error(
      "useScrollProgress must be used inside <ScrollProgressProvider>",
    );
  }
  return ctx;
}

export function ScrollProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const progressRef = useRef(0);
  const smoothRef = useRef(0);

  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    smooth: 0,
    isMobile: false,
  });

  useEffect(() => {
    let rafId = 0;
    let needsState = false;
    let lastEmit = 0;

    const measureMobile = () =>
      typeof window !== "undefined" && window.innerWidth < 768;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY || window.pageYOffset || 0;
      const p = Math.max(0, Math.min(1, y / max));
      progressRef.current = p;
      needsState = true;
    };

    const onResize = () => {
      setState((s) => ({ ...s, isMobile: measureMobile() }));
      onScroll();
    };

    const loop = (t: number) => {
      // Smooth follow with critically-damped feel.
      // Lower factor = creamier camera, slightly more lag — feels more
      // cinematic and pairs well with Lenis's longer duration.
      const target = progressRef.current;
      const cur = smoothRef.current;
      smoothRef.current = cur + (target - cur) * 0.055;

      // Emit React state at ~30Hz max — keeps overlays responsive without
      // thrashing.
      if (needsState && t - lastEmit > 33) {
        lastEmit = t;
        needsState = false;
        setState((s) => ({
          ...s,
          progress: progressRef.current,
          smooth: smoothRef.current,
          scrollY: window.scrollY,
        }));
      } else if (Math.abs(target - cur) > 0.0005 && t - lastEmit > 50) {
        // also tick to update smooth even when not scrolling
        lastEmit = t;
        setState((s) => ({ ...s, smooth: smoothRef.current }));
      }

      rafId = requestAnimationFrame(loop);
    };

    setState((s) => ({ ...s, isMobile: measureMobile() }));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ ...state, progressRef, smoothRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
