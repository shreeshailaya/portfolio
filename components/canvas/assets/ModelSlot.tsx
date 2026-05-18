"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  getSlot,
  type ModelSlot as ModelSlotConfig,
  type ModelSlotName,
} from "@/lib/assets";
import { AssetErrorBoundary } from "./AssetErrorBoundary";

const DRACO_DECODER =
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

interface ModelSlotProps {
  /** Slot key — must exist in MODEL_REGISTRY to load a model. */
  slot: ModelSlotName;
  /** Optional procedural fallback rendered while loading or if no model
   *  exists. Pass nothing to render the slot silently (recommended once
   *  the asset is confirmed present). */
  children?: ReactNode;
}

/**
 * Loads a registered GLB for the given slot. Renders nothing (or the
 * optional children) if the slot isn't registered or the GLB fails to load.
 *
 *   // confirmed asset, no procedural placeholder needed:
 *   <ModelSlot slot="kailash.summit" />
 *
 *   // optional asset with procedural fallback:
 *   <ModelSlot slot="cosmic.character">{proceduralMonk}</ModelSlot>
 */
export function ModelSlot({ slot, children = null }: ModelSlotProps) {
  const config = getSlot(slot);
  if (!config) {
    return <>{children}</>;
  }
  return (
    <AssetErrorBoundary fallback={children}>
      <Suspense fallback={children}>
        <LoadedModel config={config} />
      </Suspense>
    </AssetErrorBoundary>
  );
}

function LoadedModel({ config }: { config: ModelSlotConfig }) {
  const gltf = useGLTF(
    config.path,
    config.draco !== false ? DRACO_DECODER : false,
  ) as unknown as { scene: THREE.Group };

  // Clone so we can safely mount the same GLB in multiple places.
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Apply tint / hologram override across all materials.
  useEffect(() => {
    cloned.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const mat = mesh.material;
      if (!mat) return;
      const apply = (m: THREE.Material) => {
        const std = m as THREE.MeshStandardMaterial;
        if (config.hologram) {
          std.transparent = true;
          std.opacity = 0.75;
          if (std.emissive && config.tint) {
            std.emissive = new THREE.Color(config.tint);
            std.emissiveIntensity = 1.4;
          }
        } else if (config.tint && std.emissive) {
          std.emissive = new THREE.Color(config.tint);
          std.emissiveIntensity = Math.max(std.emissiveIntensity ?? 0, 0.4);
        }
      };
      if (Array.isArray(mat)) mat.forEach(apply);
      else apply(mat);
    });
  }, [cloned, config.hologram, config.tint]);

  return (
    <group
      position={config.position ?? [0, 0, 0]}
      rotation={config.rotation ?? [0, 0, 0]}
      scale={config.scale ?? 1}
    >
      <primitive object={cloned} />
    </group>
  );
}
