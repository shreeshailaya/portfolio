"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Vector2 } from "three";
import { useMemo } from "react";

/**
 * Cinematic post-processing stack — the "20% shader magic" layer.
 *
 * Tuned for perf:
 *   - Bloom kernel MEDIUM (was LARGE) — same look at ~half cost on
 *     mid-range GPUs.
 *   - Noise pass dropped — fog + film grain don't need a fullscreen
 *     dither pass; saves one fullscreen draw per frame.
 *   - ChromaticAberration kept (single cheap pass).
 *   - Vignette + SMAA round out the edges.
 *
 * Disabled on mobile via the `enabled` prop in Experience.
 */
export function PostFX({ enabled = true }: { enabled?: boolean }) {
  const chromaOffset = useMemo(() => new Vector2(0.0006, 0.001), []);

  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={1.0}
        kernelSize={KernelSize.MEDIUM}
        luminanceThreshold={0.22}
        luminanceSmoothing={0.55}
        mipmapBlur
        radius={0.75}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.65} />
      <SMAA />
    </EffectComposer>
  );
}
