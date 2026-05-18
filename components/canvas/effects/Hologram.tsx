"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Floating hologram panel — animated emissive plane with scanlines, glowing
 * border, and a subtle hover. Pure shader, zero textures, zero DOM cost.
 *
 * Use anywhere we want "diegetic UI" floating in the world (street scene,
 * temple skill caps, kailash memory orbs, etc.).
 */
export function Hologram({
  position = [0, 4, -10],
  rotation = [0, 0, 0],
  width = 2.2,
  height = 1.3,
  color = "#36F5FF",
  edgeColor = "#FF8A1F",
  speed = 1,
  intensity = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  color?: string;
  edgeColor?: string;
  speed?: number;
  intensity?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uEdge: { value: new THREE.Color(edgeColor) },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uEdge;
        uniform float uIntensity;
        uniform float uSpeed;
        varying vec2 vUv;

        // Pseudo-noise for the flicker
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

        void main() {
          // Scanlines moving vertically
          float scan = 0.5 + 0.5 * sin((vUv.y * 80.0) + uTime * 6.0 * uSpeed);
          scan = pow(scan, 6.0) * 0.35;

          // Border glow — strongest near edges
          vec2 d = abs(vUv - 0.5) * 2.0;
          float border = max(d.x, d.y);
          float edge = smoothstep(0.85, 1.0, border);

          // Soft inner fill
          float fill = (1.0 - edge) * 0.18;

          // Sweep light bar
          float sweep = smoothstep(0.0, 0.04, abs(vUv.y - (0.5 + 0.5 * sin(uTime * 0.6 * uSpeed))));
          sweep = (1.0 - sweep) * 0.4;

          // Flicker noise
          float n = hash(vec2(floor(vUv.y * 40.0), floor(uTime * 8.0)));
          float flicker = 0.92 + n * 0.08;

          vec3 col = uColor * (fill + sweep + scan * 0.6) + uEdge * edge * 1.4;
          float a = (fill + sweep + edge + scan * 0.4) * flicker * uIntensity;

          gl_FragColor = vec4(col, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
  }, [color, edgeColor, speed, intensity]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (group.current) {
      // Gentle bob & tilt
      group.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.6 * speed) * 0.08;
      group.current.rotation.y =
        rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.04;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh material={material}>
        <planeGeometry args={[width, height, 1, 1]} />
      </mesh>
      {/* Backside ghost — gives it a holographic shimmer when viewed at angle */}
      <mesh material={material} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height, 1, 1]} />
      </mesh>
    </group>
  );
}
