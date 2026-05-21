"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { TIMELINE } from "@/lib/data/timeline";
import { ModelSlot } from "../assets/ModelSlot";

const SCENE = getScene("timeline");

/**
 * SCENE 6 — Timeline Path
 * Stone path snaking through snowy Himalayas. Each milestone is a glowing
 * cairn / shrine along the route.
 */
export function TimelinePath() {
  const group = useRef<THREE.Group>(null);
  const cairnRefs = useRef<(THREE.Group | null)[]>([]);
  const { smoothRef } = useScrollProgress();

  // Path segments (a series of small stones) along Z
  const stones = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      x: Math.sin(i * 0.5) * 0.6,
      z: -34 - i * 1.4,
      r: Math.random() * Math.PI,
    }));
  }, []);

  // Milestone shrines along path
  const milestones = useMemo(
    () =>
      TIMELINE.map((m, i) => ({
        id: m.id,
        title: m.title,
        color: m.color,
        z: -38 - i * 6,
        side: i % 2 === 0 ? -1.2 : 1.2,
      })),
    [],
  );

  useFrame((state) => {
    const t = smoothRef.current;
    if (!group.current) return;

    const inFade = Math.min(1, Math.max(0, (t - (SCENE.start - 0.06)) / 0.08));
    const outFade = Math.min(1, Math.max(0, 1 - (t - SCENE.end) / 0.08));
    const visibility = inFade * outFade;
    group.current.visible = visibility > 0.005;
    if (!group.current.visible) return;

    const time = state.clock.elapsedTime;
    for (let i = 0; i < cairnRefs.current.length; i++) {
      const g = cairnRefs.current[i];
      if (!g) continue;
      g.rotation.y = time * 0.2 + i;
      const pulse = 1 + Math.sin(time * 1.4 + i) * 0.07;
      g.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Snow ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -50]}>
        <planeGeometry args={[80, 120]} />
        <meshStandardMaterial
          color="#1A2240"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Snow specular sheen layer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, -50]}>
        <planeGeometry args={[60, 100]} />
        <meshStandardMaterial
          color="#E8EEF7"
          metalness={0.1}
          roughness={0.6}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Stone path */}
      {stones.map((s, i) => (
        <mesh
          key={`stone-${i}`}
          position={[s.x, 0.05, s.z]}
          rotation={[0, s.r, 0]}
        >
          <boxGeometry args={[1.1, 0.1, 0.7]} />
          <meshStandardMaterial color="#2A2F46" roughness={0.9} />
        </mesh>
      ))}

      {/* Side peaks — driven by timeline.peaks GLB */}
      <ModelSlot slot="timeline.peaks" />

      {/* Milestone cairns */}
      {milestones.map((m, i) => (
        <group
          key={`cairn-${i}`}
          position={[m.side, 0.4, m.z]}
          ref={(el) => {
            cairnRefs.current[i] = el;
          }}
        >
          {/* base stone */}
          <mesh>
            <boxGeometry args={[0.7, 0.5, 0.7]} />
            <meshStandardMaterial color="#1B1F36" roughness={0.8} />
          </mesh>
          {/* mid stone */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.5, 0.4, 0.5]} />
            <meshStandardMaterial color="#22273E" roughness={0.8} />
          </mesh>
          {/* glowing top crystal */}
          <mesh position={[0, 1.1, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={m.color}
              emissive={m.color}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
          {/* light beam */}
          <mesh position={[0, 4, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.18, 6, 8, 1, true]} />
            <meshBasicMaterial
              color={m.color}
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
