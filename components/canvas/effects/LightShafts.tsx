"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Volumetric light-shaft proxy.
 *
 * A real GodRays pass needs a sun-mesh reference + an extra render target,
 * which gets expensive on a 7-scene scroll page. This is a far cheaper
 * stand-in that reads as "thick light pouring through fog":
 *
 *   - one tall, additive cone that flares from the source downward (or in
 *     any direction)
 *   - a soft halo sphere at the source itself for the bloom pass to catch
 *   - subtle anim on opacity & scale so it breathes
 *
 * Combined with Bloom + Sparkles + Fog, the eye reads it as god-rays.
 */
export function LightShafts({
  position = [0, 8, -20],
  color = "#FFD58A",
  height = 18,
  radius = 5,
  intensity = 1,
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  color?: string;
  height?: number;
  radius?: number;
  intensity?: number;
  rotation?: [number, number, number];
}) {
  const coneRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  // Custom additive material with vertical gradient (alpha falls off toward
  // the wide base so the shaft looks like it dissipates into the fog).
  const coneMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
        uIntensity: { value: intensity },
      },
      vertexShader: /* glsl */ `
        varying float vY;
        void main() {
          // cone is tip-down by default; we flip via rotation. Y goes 0 at
          // tip → -height at base.
          vY = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uIntensity;
        varying float vY;
        void main() {
          // vY runs from ~+halfH (tip) to -halfH (base). Normalize to 0..1
          // where 0 = tip (bright) and 1 = base (transparent).
          float t = clamp(0.5 - vY * 0.5, 0.0, 1.0);
          float falloff = pow(1.0 - t, 2.2);
          // slow breathing
          float pulse = 0.85 + 0.15 * sin(uTime * 0.8);
          float a = falloff * 0.28 * uIntensity * pulse;
          gl_FragColor = vec4(uColor, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    return mat;
  }, [color, intensity]);

  useFrame((state) => {
    coneMat.uniforms.uTime.value = state.clock.elapsedTime;
    if (coneRef.current) {
      // Tiny rotational drift to break symmetry.
      coneRef.current.rotation.y += 0.0008;
    }
    if (haloRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
      haloRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Wide bright halo at the source — bloom catches this */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[radius * 0.35, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Light shaft cone — tip at source, flares downward */}
      <mesh
        ref={coneRef}
        position={[0, -height / 2, 0]}
        material={coneMat}
      >
        <coneGeometry
          args={[radius, height, 32, 1, true]}
        />
      </mesh>

      {/* Second offset shaft for layered depth */}
      <mesh
        position={[0, -height / 2, 0]}
        rotation={[0, Math.PI / 4, 0.05]}
        material={coneMat}
        scale={[0.7, 1, 0.7]}
      >
        <coneGeometry args={[radius, height, 24, 1, true]} />
      </mesh>
    </group>
  );
}
