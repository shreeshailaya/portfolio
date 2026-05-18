"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Spline embed wrapper.
 *
 * Loads Spline's lightweight web-component runtime on demand and renders a
 * <spline-viewer> for the given scene URL. Useful for fast prototyping per
 * the "Phase 1" suggestion in the master plan — drop a Spline scene URL in
 * and iterate on environments visually, then optionally migrate to native
 * R3F later.
 *
 * Usage:
 *
 *   <SplineEmbed
 *     url="https://prod.spline.design/your-scene/scene.splinecode"
 *     className="fixed inset-0 -z-10"
 *   />
 *
 * Notes:
 *   - This is a SEPARATE rendering surface from the main R3F canvas. Use it
 *     for full-screen background scenes or side-by-side prototypes; the two
 *     don't share lighting or camera.
 *   - Loaded via CDN module script — no bundle weight unless instantiated.
 */
export function SplineEmbed({
  url,
  className,
  loadingBgColor = "transparent",
}: {
  url: string;
  className?: string;
  loadingBgColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Inject the Spline viewer script once
    const SRC =
      "https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js";
    const existing = document.querySelector(
      `script[data-spline="${SRC}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      setLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src = SRC;
    s.dataset.spline = SRC;
    s.onload = () => setLoaded(true);
    s.onerror = () => setLoaded(false);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!loaded || !ref.current) return;
    const el = ref.current;
    el.innerHTML = "";
    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url);
    viewer.setAttribute("loading-anim-type", "none");
    Object.assign(viewer.style, {
      width: "100%",
      height: "100%",
      background: loadingBgColor,
    });
    el.appendChild(viewer);
    return () => {
      el.innerHTML = "";
    };
  }, [loaded, url, loadingBgColor]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ background: loadingBgColor }}
    />
  );
}
