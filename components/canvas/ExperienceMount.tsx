"use client";

import dynamic from "next/dynamic";

function CanvasFallback() {
  return (
    <div className="yatri-canvas" aria-hidden="true">
      {/* Pre-3D atmospheric layer so the page is never visually empty */}
      <div className="absolute inset-0 bg-cosmos bg-yatri-gradient" />
      <div className="absolute inset-0 grid-floor opacity-30" />
    </div>
  );
}

/**
 * Mounts the heavy R3F canvas client-side only. Avoids shipping three.js to
 * SSR output and prevents window-access errors during server render.
 */
const Experience = dynamic(
  () => import("./Experience").then((m) => m.Experience),
  { ssr: false, loading: () => <CanvasFallback /> },
);

export function ExperienceMount() {
  return <Experience />;
}
