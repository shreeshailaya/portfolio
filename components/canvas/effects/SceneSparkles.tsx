"use client";

import { Sparkles } from "@react-three/drei";

/**
 * Per-scene atmospheric sparkles — embers / dust motes / snow whisps.
 *
 * Each cluster sits inside its scene's working volume. They're cheap
 * (instanced points under the hood) and add huge cinematic dimension when
 * combined with bloom + fog.
 */
export function SceneSparkles({ isMobile = false }: { isMobile?: boolean }) {
  const m = isMobile ? 0.45 : 1;
  return (
    <group>
      {/* Scene 1 — Cosmic Awakening: golden cosmic motes */}
      <Sparkles
        count={Math.round(80 * m)}
        scale={[28, 18, 14]}
        position={[0, 6, -8]}
        size={3.5}
        speed={0.3}
        opacity={0.7}
        color="#FFD58A"
        noise={0.2}
      />

      {/* Scene 2 — Street of Systems: magenta neon flecks */}
      <Sparkles
        count={Math.round(120 * m)}
        scale={[30, 10, 20]}
        position={[0, 4, -20]}
        size={2.2}
        speed={0.6}
        opacity={0.85}
        color="#FF3DA5"
        noise={0.4}
      />

      {/* Scene 3 — Hall of Projects: warm saffron embers */}
      <Sparkles
        count={Math.round(90 * m)}
        scale={[24, 10, 24]}
        position={[0, 4, -30]}
        size={2.8}
        speed={0.35}
        opacity={0.75}
        color="#FFB454"
        noise={0.25}
      />

      {/* Scene 4 — Temple of Knowledge: floating temple incense glow */}
      <Sparkles
        count={Math.round(140 * m)}
        scale={[18, 14, 18]}
        position={[0, 6, -28]}
        size={3.2}
        speed={0.25}
        opacity={0.9}
        color="#FF8A1F"
        noise={0.18}
      />

      {/* Scene 5 — Neural Cave: purple synapse spores */}
      <Sparkles
        count={Math.round(180 * m)}
        scale={[20, 12, 28]}
        position={[0, 3, -38]}
        size={2.5}
        speed={0.5}
        opacity={0.85}
        color="#8A5BFF"
        noise={0.5}
      />

      {/* Scene 6 — Timeline Path: icy white snowfall */}
      <Sparkles
        count={Math.round(160 * m)}
        scale={[28, 14, 24]}
        position={[0, 6, -52]}
        size={2.8}
        speed={0.35}
        opacity={0.75}
        color="#E8EEF7"
        noise={0.3}
      />

      {/* Scene 7 — Kailash Summit: golden dawn snow + halo motes */}
      <Sparkles
        count={Math.round(220 * m)}
        scale={[40, 22, 28]}
        position={[0, 14, -76]}
        size={3.8}
        speed={0.3}
        opacity={0.9}
        color="#FFE6B8"
        noise={0.2}
      />
    </group>
  );
}
