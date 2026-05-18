"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural neural orb — a translucent sphere with internal wireframe layers
 * and orbiting particles. Used in Scene 1 (hero) and Scene 7 (rises again).
 */
export function NeuralOrb({
  scale = 1,
  position = [0, 0, 0],
  intensity = 1,
}: {
  scale?: number;
  position?: [number, number, number];
  intensity?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const wire1 = useRef<THREE.Mesh>(null);
  const wire2 = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const { positions, count } = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.05 + Math.random() * 0.18;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.position.y =
        position[1] + Math.sin(t * 0.6) * 0.18 * intensity;
    }
    if (wire1.current) wire1.current.rotation.y = t * 0.45;
    if (wire2.current) {
      wire2.current.rotation.y = -t * 0.3;
      wire2.current.rotation.x = t * 0.22;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.15;
    if (inner.current) {
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 1.4) * 0.4 * intensity;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Inner glowing core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.78, 2]} />
        <meshStandardMaterial
          color="#0A1A4A"
          emissive="#FF8A1F"
          emissiveIntensity={1.4}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Translucent shell */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#36F5FF"
          emissive="#36F5FF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.18}
          metalness={0.3}
          roughness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Neural wireframes */}
      <mesh ref={wire1}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial
          color="#FF8A1F"
          wireframe
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={wire2}>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshBasicMaterial
          color="#8A5BFF"
          wireframe
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Equatorial Saturn-ish ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[1.45, 1.55, 96]} />
        <meshBasicMaterial
          color="#36F5FF"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#FFE6B8"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Outer halo */}
      <mesh scale={1.85}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FF8A1F"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
