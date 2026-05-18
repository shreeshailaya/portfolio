"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { MAIN_PROJECTS, OTHER_PROJECTS } from "@/lib/data/projects";
import { ModelSlot } from "../assets/ModelSlot";
import { Hologram } from "../effects/Hologram";

const SCENE = getScene("projects");

/**
 * SCENE 3 — Hall of Projects
 * Open futuristic courtyard. Each project = a vertical portal (toroid + disc).
 * Two big portals for AgentMock & PublicMart, four smaller behind them for
 * other MVPs.
 */
export function HallOfProjects() {
  const group = useRef<THREE.Group>(null);
  const portalsRef = useRef<THREE.Group>(null);
  const { smoothRef } = useScrollProgress();

  const mainPortals = useMemo(
    () =>
      MAIN_PROJECTS.map((p, i) => ({
        x: i === 0 ? -3.4 : 3.4,
        y: 4,
        z: -22,
        color: p.portal.color,
        accent: p.portal.accent,
        glow: p.portal.glow,
        scale: 1.55,
      })),
    [],
  );

  const miniPortals = useMemo(
    () =>
      OTHER_PROJECTS.map((_, i) => ({
        x: (i - 1.5) * 3.2,
        y: 3.4,
        z: -30,
        color: ["#36F5FF", "#FF8A1F", "#8A5BFF", "#FF3DA5"][i],
        scale: 0.7,
      })),
    [],
  );

  useFrame((state) => {
    const t = smoothRef.current;
    const local = SCENE.local(t);
    const time = state.clock.elapsedTime;

    if (!group.current) return;
    const visibility =
      Math.min(1, Math.max(0, (t - (SCENE.start - 0.03)) / 0.04)) *
      Math.min(1, Math.max(0, 1 - (t - SCENE.end) * 12));
    group.current.visible = visibility > 0.02;

    if (portalsRef.current) {
      portalsRef.current.children.forEach((p, i) => {
        p.rotation.z = time * (0.2 + i * 0.05);
        const pulse = 1 + Math.sin(time * 1.2 + i) * 0.05;
        p.scale.setScalar(pulse);
      });
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Courtyard floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -25]}>
        <planeGeometry args={[60, 50]} />
        <meshStandardMaterial
          color="#08091A"
          metalness={0.85}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Subtle radial mandala on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -22]}>
        <ringGeometry args={[5, 12, 64, 1]} />
        <meshBasicMaterial
          color="#FF8A1F"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Big project portals */}
      <group ref={portalsRef}>
        {mainPortals.map((p, i) => (
          <group key={`portal-${i}`} position={[p.x, p.y, p.z]} scale={p.scale}>
            {/* Outer ring */}
            <mesh>
              <torusGeometry args={[1.4, 0.08, 16, 100]} />
              <meshStandardMaterial
                color={p.color}
                emissive={p.color}
                emissiveIntensity={1.4}
                metalness={0.7}
                roughness={0.15}
                toneMapped={false}
              />
            </mesh>
            {/* Inner accent ring */}
            <mesh>
              <torusGeometry args={[1.15, 0.03, 16, 100]} />
              <meshBasicMaterial color={p.accent} toneMapped={false} />
            </mesh>
            {/* Portal core — vortex disc */}
            <mesh rotation={[0, 0, Math.PI / 5]}>
              <circleGeometry args={[1.3, 64]} />
              <meshBasicMaterial
                color={p.glow}
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
            {/* Backdrop halo */}
            <mesh scale={1.8} position={[0, 0, -0.2]}>
              <circleGeometry args={[1.4, 48]} />
              <meshBasicMaterial
                color={p.color}
                transparent
                opacity={0.12}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Mini portals for other MVPs */}
      {miniPortals.map((p, i) => (
        <group key={`mini-${i}`} position={[p.x, p.y, p.z]} scale={p.scale}>
          <mesh>
            <torusGeometry args={[1, 0.06, 12, 64]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={1.2}
              metalness={0.7}
              roughness={0.2}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <circleGeometry args={[0.95, 48]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={0.18}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Hall architecture — driven by projects.archway GLB */}
      <ModelSlot slot="projects.archway" />

      {/* Suspended floating glyph rings overhead */}
      {[12, 14, 16].map((y, i) => (
        <mesh
          key={`overhead-${i}`}
          position={[0, y, -22]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[3 + i * 0.6, 0.02, 8, 80]} />
          <meshBasicMaterial
            color={["#36F5FF", "#FF8A1F", "#8A5BFF"][i]}
            transparent
            opacity={0.45}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Floating project nameplates — animated holograms above each main
          portal, color-matched to the project signature */}
      {mainPortals.map((p, i) => (
        <Hologram
          key={`portal-tag-${i}`}
          position={[p.x, p.y + 3.4, p.z + 0.4]}
          width={3.2}
          height={0.9}
          color={p.color}
          edgeColor={p.accent}
          speed={1 + i * 0.2}
          intensity={0.9}
        />
      ))}
    </group>
  );
}
