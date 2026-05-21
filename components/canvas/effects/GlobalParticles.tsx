"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";

/**
 * Ambient cosmic dust that drifts through every scene.
 *
 * GPU-driven: motion is computed in the vertex shader from a `uTime`
 * uniform plus a per-particle `seed` attribute. The CPU never touches
 * the particle buffer after init, and there is no per-frame buffer
 * re-upload to the GPU. Cost per frame ≈ one uniform update.
 */
export function GlobalParticles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { smoothRef } = useScrollProgress();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50 + 4;
      positions[i * 3 + 2] = -Math.random() * 110 + 20;
      seeds[i] = Math.random() * 1000;
    }
    return { positions, seeds };
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.7 },
        uColor: { value: new THREE.Color("#9DB6FF") },
        uSize: { value: 6.0 },
        uPxRatio: { value: 1 },
      },
      vertexShader: /* glsl */ `
        attribute float seed;
        uniform float uTime;
        uniform float uSize;
        uniform float uPxRatio;

        void main() {
          // Cheap deterministic drift driven entirely on the GPU.
          vec3 p = position;
          p.y += sin(uTime * 0.4 + seed) * 1.2;
          p.x += cos(uTime * 0.3 + seed * 0.7) * 0.9;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          // Size attenuates with distance like sizeAttenuation: true.
          gl_PointSize = uSize * uPxRatio * (1.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          // Soft circular dot — cheaper than sampling a texture.
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
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uPxRatio.value = Math.min(2, state.gl.getPixelRatio());

    // Fade out near the very end so the sky reads as cleaner at Kailash.
    const t = smoothRef.current;
    matRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      0.55,
      0.85,
      1 - Math.abs(t - 0.5) * 2,
    );
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-seed"
          count={count}
          array={seeds}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive ref={matRef} object={material} attach="material" />
    </points>
  );
}
