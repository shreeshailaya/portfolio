"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { NeuralOrb } from "../effects/NeuralOrb";
import { ModelSlot } from "../assets/ModelSlot";
import { LightShafts } from "../effects/LightShafts";
import { PulsingEmissiveMaterial } from "../effects/PulsingEmissive";

const SCENE = getScene("kailash");

/**
 * SCENE 7 — The Kailash Summit
 * Snow clears, Mount Kailash is revealed. Aurora streaks across the sky.
 * Memory orbs of past scenes hover in air. The hero orb from Scene 1 rises
 * back into the sky to complete the loop.
 */
export function KailashSummit() {
  const group = useRef<THREE.Group>(null);
  const memoriesRef = useRef<THREE.Group>(null);
  const orbAnchor = useRef<THREE.Group>(null);
  const { smoothRef } = useScrollProgress();

  const memories = useMemo(
    () => [
      { x: -7, y: 12, z: -70, c: "#FF8A1F" },
      { x: -3, y: 14, z: -72, c: "#36F5FF" },
      { x: 0, y: 16, z: -76, c: "#8A5BFF" },
      { x: 3, y: 13.5, z: -72, c: "#FF3DA5" },
      { x: 7, y: 12, z: -70, c: "#FFB454" },
      { x: -5, y: 17, z: -74, c: "#B388FF" },
      { x: 5, y: 18, z: -74, c: "#7BA7FF" },
    ],
    [],
  );

  // Snow particles
  const snow = useMemo(() => {
    const n = 700;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 50;
      a[i * 3 + 1] = Math.random() * 28;
      a[i * 3 + 2] = -60 - Math.random() * 30;
    }
    return a;
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    if (!group.current) return;

    const inFade = Math.min(1, Math.max(0, (t - (SCENE.start - 0.06)) / 0.08));
    group.current.visible = inFade > 0.005;
    if (!group.current.visible) return;

    const local = SCENE.local(t);
    const time = state.clock.elapsedTime;

    if (memoriesRef.current) {
      const kids = memoriesRef.current.children;
      for (let i = 0; i < kids.length; i++) {
        kids[i].position.y = memories[i].y + Math.sin(time * 0.6 + i) * 0.25;
        kids[i].rotation.y = time * 0.3 + i;
      }
    }

    if (orbAnchor.current) {
      // Orb rises as we reach the very end (full circle to Scene 1)
      orbAnchor.current.position.y = 10 + local * 6;
      orbAnchor.current.position.z = -60 - local * 8;
      orbAnchor.current.scale.setScalar(1.4 + local * 0.4);
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Far cosmos sky panel */}
      <mesh position={[0, 12, -90]}>
        <planeGeometry args={[120, 60]} />
        <meshBasicMaterial color="#040714" />
      </mesh>

      {/* Mount Kailash — driven by kailash.summit GLB (HERO asset) */}
      <ModelSlot slot="kailash.summit" />

      {/* Adjacent smaller peaks for depth */}
      {[
        { x: -16, h: 12, w: 5 },
        { x: 16, h: 14, w: 6 },
        { x: -26, h: 10, w: 4 },
        { x: 26, h: 11, w: 5 },
      ].map((p, i) => (
        <group key={`adj-${i}`} position={[p.x, 0, -78]}>
          <mesh position={[0, p.h / 2, 0]}>
            <coneGeometry args={[p.w, p.h, 4]} />
            <meshStandardMaterial color="#0F1430" roughness={1} flatShading />
          </mesh>
          <mesh position={[0, p.h - 1, 0]}>
            <coneGeometry args={[p.w * 0.6, p.h * 0.3, 4]} />
            <meshStandardMaterial color="#E8EEF7" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Aurora bands */}
      {[
        { y: 22, c: "#36F5FF" },
        { y: 25, c: "#8A5BFF" },
        { y: 28, c: "#FF8A1F" },
      ].map((a, i) => (
        <mesh key={`aur-${i}`} position={[0, a.y, -82]}>
          <planeGeometry args={[100, 3]} />
          <meshBasicMaterial
            color={a.c}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Snow particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={snow.length / 3}
            array={snow}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#E8EEF7"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Final steps */}
      <group position={[0, 0, -64]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={`step-${i}`} position={[0, i * 0.35, -i * 1.3]}>
            <boxGeometry args={[3, 0.3, 1]} />
            <meshStandardMaterial color="#2A2F46" roughness={0.9} />
          </mesh>
        ))}
        {/* tiny monk silhouette atop steps */}
        <mesh position={[0, 2.8, -7.5]}>
          <coneGeometry args={[0.35, 1, 16]} />
          <meshStandardMaterial color="#0F1438" emissive="#1A2050" />
        </mesh>
      </group>

      {/* Memory orbs floating in the sky — each represents a previous scene */}
      <group ref={memoriesRef}>
        {memories.map((m, i) => (
          <group key={`mem-${i}`} position={[m.x, m.y, m.z]}>
            <mesh>
              <sphereGeometry args={[0.4, 24, 24]} />
              <meshStandardMaterial
                color={m.c}
                emissive={m.c}
                emissiveIntensity={1.6}
                metalness={0.4}
                roughness={0.2}
                toneMapped={false}
              />
            </mesh>
            <mesh scale={1.8}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial
                color={m.c}
                transparent
                opacity={0.18}
                side={THREE.BackSide}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* The hero orb rises again — full-circle ending */}
      <group ref={orbAnchor} position={[0, 10, -60]}>
        <NeuralOrb scale={1.4} intensity={1.6} />
      </group>

      {/* Massive dawn god-rays behind the summit — the AAA payoff shot */}
      <LightShafts
        position={[0, 28, -78]}
        color="#FFE6B8"
        height={36}
        radius={9}
        intensity={1.6}
      />
      <LightShafts
        position={[-6, 25, -78]}
        color="#FF8A1F"
        height={28}
        radius={5}
        intensity={1.0}
        rotation={[0, 0, 0.18]}
      />
      <LightShafts
        position={[6, 25, -78]}
        color="#FFB454"
        height={28}
        radius={5}
        intensity={1.0}
        rotation={[0, 0, -0.18]}
      />

      {/* Pulsing emissive halo orb behind the summit ridge — the "sun" */}
      <mesh position={[0, 22, -82]}>
        <sphereGeometry args={[3.2, 48, 48]} />
        <PulsingEmissiveMaterial
          color="#FFD58A"
          speed={0.7}
          intensity={2.4}
          noise={0.1}
        />
      </mesh>
    </group>
  );
}
