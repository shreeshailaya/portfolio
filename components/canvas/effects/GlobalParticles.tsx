"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";

/**
 * Ambient cosmic dust that floats through every scene. Lives in world space
 * across the whole travel range so the camera always sees particles.
 */
export function GlobalParticles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { smoothRef } = useScrollProgress();

  const { positions, sizes, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50 + 4;
      positions[i * 3 + 2] = -Math.random() * 110 + 20; // along whole journey
      sizes[i] = Math.random() * 0.06 + 0.015;
      seeds[i] = Math.random() * 1000;
    }
    return { positions, sizes, seeds };
  }, [count]);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    const time = state.clock.elapsedTime;
    const t = smoothRef.current;

    const geom = points.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      arr[i * 3 + 1] += Math.sin(time * 0.4 + s) * 0.002;
      arr[i * 3 + 0] += Math.cos(time * 0.3 + s * 0.7) * 0.0015;
    }
    pos.needsUpdate = true;

    // Fade out near very end so the sky reads as cleaner at Kailash summit
    const mat = points.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(0.55, 0.85, 1 - Math.abs(t - 0.5) * 2);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#9DB6FF"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
