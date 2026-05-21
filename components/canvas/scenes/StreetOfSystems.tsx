"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { ModelSlot } from "../assets/ModelSlot";
import { Hologram } from "../effects/Hologram";

const SCENE = getScene("street");

/**
 * SCENE 2 — Street of Systems
 * Cyberpunk Pune-inspired corridor. Towers, holographic dashboards, rainy
 * reflective road, neon reflections. Forms a tunnel the camera flies down.
 */
export function StreetOfSystems() {
  const group = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const { smoothRef } = useScrollProgress();

  // Floating Docker-cube containers
  const containers = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 6,
      y: 4 + Math.random() * 6,
      z: -4 - i * 2.5,
      s: 0.4 + Math.random() * 0.3,
      r: Math.random() * Math.PI,
    }));
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    if (!group.current) return;

    // Visibility envelope w/ generous crossfade
    const inFade = Math.min(1, Math.max(0, (t - (SCENE.start - 0.06)) / 0.08));
    const outFade = Math.min(1, Math.max(0, 1 - (t - SCENE.end) / 0.08));
    const visibility = inFade * outFade;
    group.current.visible = visibility > 0.005;

    // Off-screen short-circuit — no traverse, no container loop.
    if (!group.current.visible) return;

    const time = state.clock.elapsedTime;
    const local = SCENE.local(t);

    // Container rotation (only inside the 14-container group, not full graph)
    if (containerRef.current) {
      const kids = containerRef.current.children;
      for (let i = 0; i < kids.length; i++) {
        kids[i].rotation.y = time * 0.25 + i;
        kids[i].rotation.x = Math.sin(time * 0.4 + i) * 0.2;
      }
    }

    // Camera-pull on data streams
    const t2 = time * 0.6 + local * 4;
    const top = group.current.children;
    for (let i = 0; i < top.length; i++) {
      const c = top[i];
      if (c.name === "data-stream") {
        c.position.z = ((t2 % 8) - 8 + c.userData.offset) % 60;
      }
    }
  });

  return (
    <group ref={group} position={[0, 0, -8]}>
      {/* Reflective rainy road */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -22]}
        receiveShadow
      >
        <planeGeometry args={[16, 80]} />
        <meshStandardMaterial
          color="#03050E"
          metalness={0.95}
          roughness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Center lane glow */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`lane-${i}`}
          position={[0, 0.01, -2 - i * 6]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.3, 2.6]} />
          <meshBasicMaterial
            color="#36F5FF"
            transparent
            opacity={0.55}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Glass grid floor under road — moving data underneath */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`gridline-${i}`}
          position={[0, -0.02, -i * 7]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[12, 0.05]} />
          <meshBasicMaterial
            color="#FF8A1F"
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Buildings on both sides — driven by street.cityblock GLB */}
      <ModelSlot slot="street.cityblock" />

      {/* Floating Docker container cubes */}
      <group ref={containerRef}>
        {containers.map((c, i) => (
          <mesh
            key={`cnt-${i}`}
            position={[c.x, c.y, c.z]}
            rotation={[0, c.r, 0]}
          >
            <boxGeometry args={[c.s, c.s, c.s]} />
            <meshStandardMaterial
              color="#0A2840"
              emissive="#36F5FF"
              emissiveIntensity={0.6}
              metalness={0.6}
              roughness={0.3}
              transparent
              opacity={0.9}
              wireframe={i % 4 === 0}
            />
          </mesh>
        ))}
      </group>

      {/* API "pipelines" — long emissive cylinders in the sky */}
      {[
        { y: 8.5, c: "#36F5FF", offset: 0 },
        { y: 11, c: "#FF8A1F", offset: 0.5 },
        { y: 9.5, c: "#8A5BFF", offset: 1 },
      ].map((p, i) => (
        <mesh
          key={`pipe-${i}`}
          position={[(i - 1) * 3, p.y, -28]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.08, 0.08, 70, 12, 1, true]} />
          <meshBasicMaterial
            color={p.c}
            transparent
            opacity={0.55}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Holographic dashboard panels floating — now animated holograms
          with scanlines + sweep + flicker */}
      {Array.from({ length: 6 }).map((_, i) => {
        const isLeft = i % 2 === 0;
        return (
          <Hologram
            key={`hud-${i}`}
            position={[
              isLeft ? -3.2 : 3.2,
              3.6 + (i % 3) * 0.9,
              -6 - i * 5,
            ]}
            rotation={[0, isLeft ? 0.35 : -0.35, 0]}
            width={2.2}
            height={1.3}
            color={isLeft ? "#36F5FF" : "#FF8A1F"}
            edgeColor={isLeft ? "#FF3DA5" : "#FFD58A"}
            speed={1 + i * 0.15}
            intensity={1.1}
          />
        );
      })}
    </group>
  );
}
