"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { NeuralOrb } from "../effects/NeuralOrb";
import { ModelSlot } from "../assets/ModelSlot";
import { Character } from "../assets/Character";
import { LightShafts } from "../effects/LightShafts";
import { Hologram } from "../effects/Hologram";

const SCENE = getScene("cosmic");

/**
 * SCENE 1 — Cosmic Awakening
 * High Himalayan plateau before sunrise. Distant peaks, reflective black
 * stone ground, neural constellations, a meditating monk silhouette and a
 * giant floating orb of AI consciousness.
 */
export function CosmicAwakening() {
  const group = useRef<THREE.Group>(null);
  const { smoothRef } = useScrollProgress();

  // Distant stars — static, never re-uploaded
  const stars = useMemo(() => {
    const n = 350;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 90 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.7;
      a[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 + 10;
      a[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 30;
    }
    return a;
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    if (!group.current) return;

    // Cosmic spans the page start so its inFade is implicit (we just
    // begin visible). Fade out over a 0.08 window past scene end.
    const outFade = Math.min(1, Math.max(0, 1 - (t - SCENE.end) / 0.08));
    group.current.visible = outFade > 0.005;
    // Off-screen short-circuit.
    if (!group.current.visible) return;

    // Cheap orb lift — single object lookup, no full-graph traverse.
    const local = SCENE.local(t);
    const orb = group.current.getObjectByName("hero-orb");
    if (orb) {
      orb.position.y = 7.5 + local * 1.4;
      orb.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Reflective stone ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -10]}
        receiveShadow
      >
        <planeGeometry args={[120, 120, 1, 1]} />
        <meshStandardMaterial
          color="#0A0F22"
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Glowing cracks — long thin glowing strips on ground */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`crack-${i}`}
          rotation={[-Math.PI / 2, 0, (i / 8) * Math.PI]}
          position={[0, 0.01, -10]}
        >
          <planeGeometry args={[24 + i * 1.5, 0.06]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#FF8A1F" : "#36F5FF"}
            transparent
            opacity={0.45}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Distant Himalayan peaks — driven by cosmic.mountains GLB */}
      <ModelSlot slot="cosmic.mountains" />

      {/* Stars / neural constellations */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.length / 3}
            array={stars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          color="#E8EEF7"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Sanskrit-rune floating tiles — driven by cosmic.glyphs GLB */}
      <ModelSlot slot="cosmic.glyphs" />

      {/* Central Neural Orb */}
      <group name="hero-orb" position={[0, 7.5, -2]}>
        <NeuralOrb scale={2.4} intensity={1.2} />
      </group>

      {/* Yatri monk — driven by cosmic.character GLB */}
      <Character slot="cosmic.character" animation="yatri.meditate" />

      {/* Volumetric light shaft pouring from the orb down onto the plateau */}
      <LightShafts
        position={[0, 8, -2]}
        color="#FFD58A"
        height={14}
        radius={3.2}
        intensity={1.1}
      />

      {/* Floating identity holograms flanking the orb — feels like booting
          consciousness data into the cosmos */}
      <Hologram
        position={[-5, 9, -6]}
        rotation={[0, Math.PI / 6, 0]}
        width={2.4}
        height={1.4}
        color="#36F5FF"
        edgeColor="#FFB454"
        intensity={0.9}
      />
      <Hologram
        position={[5, 9, -6]}
        rotation={[0, -Math.PI / 6, 0]}
        width={2.4}
        height={1.4}
        color="#FF8A1F"
        edgeColor="#36F5FF"
        intensity={0.9}
      />

      {/* Aurora-like volumetric streaks */}
      {[
        { y: 14, c: "#FF8A1F" },
        { y: 17, c: "#36F5FF" },
        { y: 20, c: "#8A5BFF" },
      ].map((a, i) => (
        <mesh key={`aurora-${i}`} position={[0, a.y, -36]}>
          <planeGeometry args={[80, 3]} />
          <meshBasicMaterial
            color={a.c}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
