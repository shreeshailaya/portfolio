"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { getScene } from "@/lib/scenes";
import { ModelSlot } from "../assets/ModelSlot";

const SCENE = getScene("neural");

/**
 * SCENE 5 — Neural Cave
 * Dark cave with a giant central neural sphere. Glowing roots radiate from
 * the floor, embeddings flow like rivers. Mostly cool blue/violet light.
 */
export function NeuralCave() {
  const group = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Group>(null);
  const flowRef = useRef<THREE.Points>(null);
  const { smoothRef } = useScrollProgress();

  // Glowing root strands
  const roots = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 5,
        z: -38 + Math.sin(angle) * 5,
        h: 4 + Math.random() * 5,
        c: i % 2 === 0 ? "#8A5BFF" : "#36F5FF",
      };
    });
  }, []);

  // Flowing embedding particles forming a "river" toward the brain
  const flow = useMemo(() => {
    const n = 900;
    const pos = new Float32Array(n * 3);
    const speed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = 0.4 + Math.random() * 6;
      pos[i * 3 + 2] = -22 - Math.random() * 22;
      speed[i] = 0.5 + Math.random() * 1.4;
    }
    return { pos, speed, n };
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    const time = state.clock.elapsedTime;
    if (!group.current) return;

    const visibility =
      Math.min(1, Math.max(0, (t - (SCENE.start - 0.03)) / 0.04)) *
      Math.min(1, Math.max(0, 1 - (t - SCENE.end) * 12));
    group.current.visible = visibility > 0.02;

    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.12;
      brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    if (flowRef.current) {
      const geom = flowRef.current.geometry as THREE.BufferGeometry;
      const attr = geom.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < flow.n; i++) {
        // Push toward brain at z = -38
        const targetZ = -38;
        const dz = targetZ - arr[i * 3 + 2];
        const dx = -arr[i * 3 + 0] * 0.02;
        arr[i * 3] += dx * flow.speed[i] * 0.05;
        arr[i * 3 + 2] += dz * 0.005 * flow.speed[i];

        // Recycle particles that have arrived
        if (arr[i * 3 + 2] < -37) {
          arr[i * 3] = (Math.random() - 0.5) * 18;
          arr[i * 3 + 1] = 0.4 + Math.random() * 6;
          arr[i * 3 + 2] = -22;
        }
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Ground — dark wet stone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -32]}>
        <planeGeometry args={[60, 50]} />
        <meshStandardMaterial
          color="#06081A"
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>

      {/* Cave walls — driven by neural.cave GLB */}
      <ModelSlot slot="neural.cave" />

      {/* Glowing roots */}
      {roots.map((r, i) => (
        <group key={`root-${i}`} position={[r.x, 0, r.z]}>
          <mesh position={[0, r.h / 2, 0]}>
            <cylinderGeometry args={[0.04, 0.08, r.h, 6]} />
            <meshBasicMaterial color={r.c} transparent opacity={0.85} toneMapped={false} />
          </mesh>
          {/* glow halo at top */}
          <mesh position={[0, r.h, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshBasicMaterial color={r.c} transparent opacity={0.9} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Embedding river */}
      <points ref={flowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={flow.n}
            array={flow.pos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#B388FF"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Giant AI brain — central neural sphere */}
      <group ref={brainRef} position={[0, 3.5, -38]}>
        <mesh>
          <icosahedronGeometry args={[2.4, 3]} />
          <meshStandardMaterial
            color="#0B0F26"
            emissive="#8A5BFF"
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.25}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.2, 64, 64]} />
          <meshStandardMaterial
            color="#0B0F26"
            emissive="#36F5FF"
            emissiveIntensity={0.5}
            transparent
            opacity={0.25}
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
        {/* halo */}
        <mesh scale={1.6}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color="#8A5BFF"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Violet rim light streaks */}
      {[-1, 1].map((s, i) => (
        <mesh key={`rim-${i}`} position={[s * 7, 5, -36]}>
          <planeGeometry args={[0.4, 16]} />
          <meshBasicMaterial
            color="#8A5BFF"
            transparent
            opacity={0.18}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
