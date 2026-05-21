"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import {
  ANIMATION_REGISTRY,
  getSlot,
  type ModelSlotName,
} from "@/lib/assets";
import { AssetErrorBoundary } from "./AssetErrorBoundary";

const DRACO_DECODER =
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

interface CharacterProps {
  /** Model slot for the avatar GLB (e.g. ReadyPlayerMe export). */
  slot: ModelSlotName;
  /** Optional procedural fallback rendered while loading / missing.
   *  Omit once the slot's GLB is confirmed registered. */
  children?: ReactNode;
  /**
   * Animation key in ANIMATION_REGISTRY (e.g. "yatri.meditate"). If unset,
   * plays the first clip embedded in the avatar GLB (if any).
   */
  animation?: string;
  /** Animation speed multiplier (default 1). */
  speed?: number;
}

/**
 * Loads a character avatar (ReadyPlayerMe-friendly) with optional external
 * animation clips (Mixamo-friendly, GLB form, retargeted to the same
 * skeleton).
 *
 * For typical ReadyPlayerMe usage:
 *   1. Export GLB from ReadyPlayerMe
 *   2. Either bake animation in Blender → export as one GLB, OR
 *      keep a separate clip GLB and reference it via ANIMATION_REGISTRY.
 *
 * Falls back to the supplied procedural children if no slot is configured
 * or if loading fails (handled by <AssetErrorBoundary>).
 */
export function Character({
  slot,
  children = null,
  animation,
  speed = 1,
}: CharacterProps) {
  const config = getSlot(slot);
  if (!config) return <>{children}</>;
  return (
    <AssetErrorBoundary fallback={children}>
      <Suspense fallback={children}>
        <CharacterInner
          path={config.path}
          scale={config.scale ?? 1}
          position={config.position ?? [0, 0, 0]}
          rotation={config.rotation ?? [0, 0, 0]}
          draco={config.draco !== false}
          animation={animation}
          speed={speed}
        />
      </Suspense>
    </AssetErrorBoundary>
  );
}

function CharacterInner({
  path,
  scale,
  position,
  rotation,
  draco,
  animation,
  speed,
}: {
  path: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  draco: boolean;
  animation?: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(path, draco ? DRACO_DECODER : false) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const externalClip = animation ? ANIMATION_REGISTRY[animation] : undefined;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={cloned} />
      {externalClip ? (
        <ExternalAnimation
          path={externalClip.path}
          clipName={externalClip.clip}
          targetRef={groupRef}
          draco={draco}
          speed={speed}
        />
      ) : (
        <EmbeddedAnimation
          clips={gltf.animations ?? []}
          targetRef={groupRef}
          speed={speed}
        />
      )}
    </group>
  );
}

function EmbeddedAnimation({
  clips,
  targetRef,
  speed,
}: {
  clips: THREE.AnimationClip[];
  targetRef: React.RefObject<THREE.Object3D>;
  speed: number;
}) {
  const { actions, names } = useAnimations(clips, targetRef);

  useEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    if (action) {
      action.reset().fadeIn(0.4).play();
      action.timeScale = speed;
    }
    return () => {
      if (action) action.fadeOut(0.3);
    };
  }, [actions, names, speed]);

  return null;
}

function ExternalAnimation({
  path,
  clipName,
  targetRef,
  draco,
  speed,
}: {
  path: string;
  clipName?: string;
  targetRef: React.RefObject<THREE.Object3D>;
  draco: boolean;
  speed: number;
}) {
  const gltf = useGLTF(path, draco ? DRACO_DECODER : false) as unknown as {
    animations: THREE.AnimationClip[];
  };
  const { actions, names } = useAnimations(gltf.animations ?? [], targetRef);

  useEffect(() => {
    if (!names.length) return;
    const target = clipName ?? names[0];
    const action = actions[target];
    if (action) {
      action.reset().fadeIn(0.4).play();
      action.timeScale = speed;
    }
    return () => {
      if (action) action.fadeOut(0.3);
    };
  }, [actions, names, clipName, speed]);

  return null;
}
