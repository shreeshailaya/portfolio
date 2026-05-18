"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { SKILL_CATEGORIES } from "@/lib/data/skills";
import { ModelSlot } from "../assets/ModelSlot";
import { Hologram } from "../effects/Hologram";
import { PulsingEmissiveMaterial } from "../effects/PulsingEmissive";

const SCENE = getScene("temple");

/**
 * SCENE 4 — Temple of Knowledge
 *
 * Circular hall with skill pillars arranged in a ring. The procedural
 * animated pillars from v1 are gone — each pillar slot is now driven by
 * the imported pillarBase.glb (via temple.pillarBase ModelSlot).
 *
 * Each pillar is topped by:
 *   - a glowing crystal cap (animated emissive shader) tinted to that
 *     skill category's signature colour
 *   - a floating hologram panel showing the skill title
 *
 * Volumetric light shafts pour from above onto the mandala floor, giving
 * the temple that "shrine pierced by morning sun" feel.
 */
export function TempleOfKnowledge() {
  const group = useRef<THREE.Group>(null);
  const yantraRef = useRef<THREE.Mesh>(null);
  const { smoothRef } = useScrollProgress();

  const pillars = useMemo(() => {
    const n = SKILL_CATEGORIES.length;
    const radius = 6.5;
    // Offset by +30° so no pillar lands directly between the camera
    // (z=0) and the temple (z=-30) — otherwise the front pillar would
    // sit at x=0, z=-21.5 and visually block the temple.
    const phase = -Math.PI / 2 + Math.PI / 6;
    return SKILL_CATEGORIES.map((s, i) => {
      const angle = (i / n) * Math.PI * 2 + phase;
      return {
        title: s.title,
        color: s.pillarColor,
        x: Math.cos(angle) * radius,
        z: -28 + Math.sin(angle) * radius,
        angle,
      };
    });
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    const time = state.clock.elapsedTime;
    if (!group.current) return;

    const visibility =
      Math.min(1, Math.max(0, (t - (SCENE.start - 0.03)) / 0.04)) *
      Math.min(1, Math.max(0, 1 - (t - SCENE.end) * 12));
    group.current.visible = visibility > 0.02;

    if (yantraRef.current) {
      yantraRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Dedicated temple key lights — wash the architecture so the
          stone reads clearly even when global ambient is cool. */}
      <spotLight
        position={[0, 22, -16]}
        target-position={[0, 6, -30]}
        intensity={4.5}
        angle={0.7}
        penumbra={0.6}
        distance={70}
        decay={1.4}
        color="#FFD7A8"
      />
      <pointLight
        position={[0, 8, -22]}
        intensity={1.8}
        distance={32}
        decay={1.6}
        color="#FFC58A"
      />

      {/* Mandala marble floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -28]}
        receiveShadow
      >
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial
          color="#0B1124"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Glowing mandala rings */}
      {[3, 5, 7, 9, 11].map((r, i) => (
        <mesh
          key={`mandala-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, -28]}
        >
          <ringGeometry args={[r, r + 0.05, 96]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#FF8A1F" : "#36F5FF"}
            transparent
            opacity={0.45 - i * 0.05}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Center cosmic yantra emblem */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, -28]}
      >
        <ringGeometry args={[1.2, 1.4, 6]} />
        <meshBasicMaterial color="#FF8A1F" toneMapped={false} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, Math.PI / 6]}
        position={[0, 0.04, -28]}
      >
        <ringGeometry args={[1.2, 1.4, 6]} />
        <meshBasicMaterial color="#36F5FF" toneMapped={false} />
      </mesh>

      {/* Skill pillars — driven by pillarBase.glb (one instance per skill)
          with crystal cap + hologram label above. */}
      {pillars.map((p, i) => (
        <group key={`pillar-${i}`} position={[p.x, 0, p.z]}>
          {/* GLB pillar base */}
          <ModelSlot slot="temple.pillarBase" />

          {/* Glowing crystal cap — animated emissive shader, skill-tinted */}
          <mesh
            position={[0, 5.4, 0]}
            rotation={[0, (i / pillars.length) * Math.PI * 2, 0]}
          >
            <octahedronGeometry args={[0.55, 0]} />
            <PulsingEmissiveMaterial
              color={p.color}
              speed={1 + i * 0.15}
              intensity={1.4}
              noise={0.3}
            />
          </mesh>

          {/* Soft halo so bloom catches it */}
          <mesh position={[0, 5.4, 0]} scale={1.6}>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>

          {/* Floating skill hologram label — faces the temple centre */}
          <Hologram
            position={[0, 7.4, 0]}
            rotation={[0, -p.angle + Math.PI / 2 + Math.PI, 0]}
            width={2.6}
            height={0.7}
            color={p.color}
            edgeColor="#FFB454"
            speed={1 + i * 0.1}
            intensity={0.85}
          />
        </group>
      ))}

      {/* Temple architecture — driven by indian-temple GLB */}
      <ModelSlot slot="temple.architecture" />

      {/* Animated cosmic yantra ceiling */}
      <mesh
        ref={yantraRef}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 18, -28]}
      >
        <ringGeometry args={[4, 4.2, 64]} />
        <meshBasicMaterial
          color="#FF8A1F"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
