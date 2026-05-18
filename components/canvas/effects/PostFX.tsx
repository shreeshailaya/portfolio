"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Vector2 } from "three";
import { useMemo } from "react";

/**
 * Cinematic post-processing stack — the "20% shader magic" layer.
 *
 * Bloom is the star: it makes the orb, neon city, mandala, portals and
 * Kailash halo all read as light sources rather than coloured shapes. The
 * rest are gentle: a subtle vignette focuses the eye, a touch of film grain
 * breaks up the otherwise-flat dark backgrounds, and a whisper of chroma
 * gives the cyberpunk scene that lens-glass feel.
 *
 * Disabled on mobile for performance.
 */
export function PostFX({ enabled = true }: { enabled?: boolean }) {
  // ChromaticAberration expects a Vector2 offset.
  const chromaOffset = useMemo(() => new Vector2(0.0008, 0.0012), []);

  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      {/* Aggressive Bloom — the keystone effect.
          Higher intensity + larger kernel + lower threshold makes every
          emissive element (orb, neon, mandala, holograms, kailash halo)
          read as honest light pouring into fog. */}
      <Bloom
        intensity={1.05}
        kernelSize={KernelSize.LARGE}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.55}
        mipmapBlur
        radius={0.8}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.7} />
      <Noise opacity={0.045} blendFunction={BlendFunction.OVERLAY} />
      <SMAA />
    </EffectComposer>
  );
}
