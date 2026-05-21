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
 *
 * Dark cave with a giant central neural sphere. Glowing roots radiate
 * from the floor, embeddings flow like a river toward the brain.
 *
 * Performance:
 *   - Flow particles are GPU-driven (uTime uniform, no CPU loop).
 *   - useFrame early-returns when the scene is not visible — the cave
 *     contributes ~0 work to other scenes' frames.
 */
export function NeuralCave() {
  const group = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Group>(null);
  const flowMatRef = useRef<THREE.ShaderMaterial>(null);
  const { smoothRef } = useScrollProgress();

  // Glowing root strands — static geometry
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

  // Embedding river particles — positions are seeds + offsets, motion
  // computed in vertex shader using `uTime`.
  const FLOW_COUNT = 600;
  const { flowPositions, flowSeeds } = useMemo(() => {
    const flowPositions = new Float32Array(FLOW_COUNT * 3);
    const flowSeeds = new Float32Array(FLOW_COUNT);
    for (let i = 0; i < FLOW_COUNT; i++) {
      flowPositions[i * 3] = (Math.random() - 0.5) * 18;
      flowPositions[i * 3 + 1] = 0.4 + Math.random() * 6;
      flowPositions[i * 3 + 2] = -22 - Math.random() * 22;
      flowSeeds[i] = Math.random();
    }
    return { flowPositions, flowSeeds };
  }, []);

  const flowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPxRatio: { value: 1 },
        uColor: { value: new THREE.Color("#B388FF") },
        uOpacity: { value: 0.85 },
      },
      vertexShader: /* glsl */ `
        attribute float seed;
        uniform float uTime;
        uniform float uPxRatio;

        void main() {
          // Push each particle along z toward the brain (z = -38) using
          // a phase based on seed so they loop independently. Modulo
          // wraps them back to the start when they reach the brain.
          float phase = mod(seed + uTime * 0.06, 1.0);
          float startZ = -22.0;
          float endZ = -38.0;
          vec3 p = position;
          p.z = mix(startZ, endZ, phase);
          // Slight x drift toward the centre (axis of flow).
          p.x = position.x * (1.0 - phase * 0.6);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 5.0 * uPxRatio * (1.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
  }, []);

  useFrame((state) => {
    const t = smoothRef.current;
    const time = state.clock.elapsedTime;
    if (!group.current) return;

    // Visibility envelope — matches temple/timeline overlap for clean
    // crossfade. Same envelope used to gate per-frame work below.
    const inFade = Math.min(1, Math.max(0, (t - (SCENE.start - 0.06)) / 0.08));
    const outFade = Math.min(1, Math.max(0, 1 - (t - SCENE.end) / 0.08));
    const visibility = inFade * outFade;
    group.current.visible = visibility > 0.005;

    // Off-screen short-circuit. Saves all the work below when scrolling
    // through other scenes — by far the biggest perf win of the page.
    if (!group.current.visible) return;

    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.12;
      brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    if (flowMatRef.current) {
      flowMatRef.current.uniforms.uTime.value = time;
      flowMatRef.current.uniforms.uPxRatio.value = Math.min(
        2,
        state.gl.getPixelRatio(),
      );
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
          <mesh position={[0, r.h, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshBasicMaterial color={r.c} transparent opacity={0.9} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Embedding river — GPU shader, zero CPU work per frame */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={FLOW_COUNT}
            array={flowPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-seed"
            count={FLOW_COUNT}
            array={flowSeeds}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive ref={flowMatRef} object={flowMaterial} attach="material" />
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
