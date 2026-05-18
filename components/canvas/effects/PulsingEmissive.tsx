"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Animated emissive shader material. Drop-in replacement for
 * <meshStandardMaterial emissive> on any mesh that should pulse, breathe,
 * or pulse with a noisy aura.
 *
 * Use a plain <mesh> with whatever geometry you want, then place
 * <PulsingEmissiveMaterial /> as the child. Example:
 *
 *   <mesh>
 *     <sphereGeometry args={[1, 32, 32]} />
 *     <PulsingEmissiveMaterial color="#FF8A1F" speed={1.4} />
 *   </mesh>
 */
export function PulsingEmissiveMaterial({
  color = "#FF8A1F",
  speed = 1,
  intensity = 1.4,
  noise = 0.25,
}: {
  color?: string;
  speed?: number;
  intensity?: number;
  noise?: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
        uNoise: { value: noise },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uNoise;
        varying vec3 vNormal;
        varying vec3 vPos;

        float hash(vec3 p) {
          return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
        }
        float noise3(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float n = mix(
            mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
          return n;
        }

        void main() {
          // Fresnel-style rim
          vec3 viewDir = normalize(cameraPosition - vPos);
          float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.4);

          // Breathing pulse
          float pulse = 0.7 + 0.3 * sin(uTime * 1.6 * uSpeed);

          // Soft noise aura
          float n = noise3(vPos * 1.4 + vec3(uTime * 0.4 * uSpeed));
          n = mix(1.0, n, uNoise);

          float core = 0.65 + fres * 0.8;
          vec3 col = uColor * core * pulse * n * uIntensity;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      transparent: false,
      toneMapped: false,
    });
  }, [color, speed, intensity, noise]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <primitive ref={matRef} object={material} attach="material" />;
}
