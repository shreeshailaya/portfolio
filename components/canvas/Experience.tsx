"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { CameraRig } from "./CameraRig";
import { CosmicAwakening } from "./scenes/CosmicAwakening";
import { StreetOfSystems } from "./scenes/StreetOfSystems";
import { HallOfProjects } from "./scenes/HallOfProjects";
import { TempleOfKnowledge } from "./scenes/TempleOfKnowledge";
import { NeuralCave } from "./scenes/NeuralCave";
import { TimelinePath } from "./scenes/TimelinePath";
import { KailashSummit } from "./scenes/KailashSummit";
import { GlobalParticles } from "./effects/GlobalParticles";
import { SceneSparkles } from "./effects/SceneSparkles";
import { PostFX } from "./effects/PostFX";
import { SceneAtmosphere } from "./effects/SceneAtmosphere";

/**
 * Cinematic baseline (matches the requested AAA setup):
 *   - camera: [0, 6, 24] @ fov 45, near 0.1, far 2000 (far=2000 lets
 *     distant kailash/cave assets render without clipping)
 *   - fog:    #050816 from 60 → 260 (more spacious than before, so the
 *     atmosphere reads as breathable but the horizon still dies into haze)
 *   - lighting: ambient 0.4, directional [20,40,20] @ intensity 2 with
 *     castShadow on. SceneAtmosphere modulates these per-scene.
 *   - shadows: soft PCF on Canvas, opt-in per mesh via castShadow/receiveShadow.
 *   - gl:    antialias true, sRGB output, ACES Filmic tone mapping (default
 *     in three r155+ behaves physically correctly without legacy lights).
 */
export function Experience() {
  const { isMobile } = useScrollProgress();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);

  const dpr = useMemo<[number, number]>(
    () => (isMobile ? [1, 1.5] : [1, 2]),
    [isMobile],
  );

  return (
    <div className="yatri-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows="soft"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          position: [0, 6, 24],
          fov: 45,
          near: 0.1,
          far: 2000,
        }}
      >
        <color attach="background" args={["#050816"]} />
        <fog attach="fog" args={["#050816", 60, 260]} />

        <ambientLight ref={ambientRef} intensity={0.4} color="#9CB8FF" />
        <directionalLight
          ref={directionalRef}
          position={[20, 40, 20]}
          intensity={2}
          color="#FFE6B8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={120}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-bias={-0.0005}
        />

        <Suspense fallback={null}>
          <CameraRig />
          <SceneAtmosphere
            ambientRef={ambientRef}
            directionalRef={directionalRef}
          />

          <CosmicAwakening />
          <StreetOfSystems />
          <HallOfProjects />
          <TempleOfKnowledge />
          <NeuralCave />
          <TimelinePath />
          <KailashSummit />

          <GlobalParticles count={isMobile ? 600 : 1400} />
          <SceneSparkles isMobile={isMobile} />

          {/* Cinematic post-processing — disabled on mobile for perf */}
          <PostFX enabled={!isMobile} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
