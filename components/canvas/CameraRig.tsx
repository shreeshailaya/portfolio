"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { SCENE_RANGES } from "@/lib/scenes";

/**
 * Scene anchor positions in world space.
 * The camera glides from one anchor to the next as scroll progresses, then
 * holds inside each anchor while overlays animate. Anchors are spaced along
 * the Z axis so the journey reads as one continuous forward pull, with side
 * detours for variety.
 */
const ANCHORS = {
  cosmic:   { pos: new THREE.Vector3(0, 6, 24),     look: new THREE.Vector3(0, 4, 0)     },
  street:   { pos: new THREE.Vector3(0, 3.6, 12),   look: new THREE.Vector3(0, 3, -8)    },
  projects: { pos: new THREE.Vector3(0, 4.5, 6),    look: new THREE.Vector3(0, 3.5, -22) },
  temple:   { pos: new THREE.Vector3(0, 6, 0),      look: new THREE.Vector3(0, 6, -28)   },
  neural:   { pos: new THREE.Vector3(0, 1.6, -10),  look: new THREE.Vector3(0, 1.8, -38) },
  timeline: { pos: new THREE.Vector3(0, 4, -22),    look: new THREE.Vector3(0, 4, -52)   },
  kailash:  { pos: new THREE.Vector3(0, 11, -38),   look: new THREE.Vector3(0, 17, -78)  },
};

const TARGETS_POS: THREE.Vector3[] = SCENE_RANGES.map((s) => ANCHORS[s.id].pos);
const TARGETS_LOOK: THREE.Vector3[] = SCENE_RANGES.map(
  (s) => ANCHORS[s.id].look,
);

// Pre-allocated scratch
const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _swayPos = new THREE.Vector3();
const _swayLook = new THREE.Vector3();

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function CameraRig() {
  const { smoothRef } = useScrollProgress();
  const { camera } = useThree();
  const tPrev = useRef(0);

  useFrame((state) => {
    const t = smoothRef.current; // 0..1 global
    const time = state.clock.elapsedTime;

    // Find which scene segment we are inside
    let idx = SCENE_RANGES.findIndex((r) => t >= r.start && t <= r.end);
    if (idx === -1) idx = t < 0.5 ? 0 : SCENE_RANGES.length - 1;
    const seg = SCENE_RANGES[idx];
    const local = seg.local(t);
    const eased = smoothstep(local);

    const fromPos = TARGETS_POS[idx];
    const toPos = TARGETS_POS[Math.min(idx + 1, TARGETS_POS.length - 1)];
    _pos.copy(fromPos).lerp(toPos, eased);

    const fromLook = TARGETS_LOOK[idx];
    const toLook = TARGETS_LOOK[Math.min(idx + 1, TARGETS_LOOK.length - 1)];
    _look.copy(fromLook).lerp(toLook, eased);

    // Subtle camera sway — gives life. Reduced near transitions so the
    // narrative beats land cleanly.
    const swayAmt = 0.18;
    _swayPos.set(
      Math.sin(time * 0.35) * swayAmt,
      Math.cos(time * 0.28) * swayAmt * 0.6,
      Math.sin(time * 0.21) * swayAmt * 0.4,
    );
    _swayLook.set(
      Math.sin(time * 0.42 + 1.2) * swayAmt * 0.7,
      Math.cos(time * 0.3 + 0.4) * swayAmt * 0.5,
      0,
    );

    camera.position.lerp(_pos.clone().add(_swayPos), 0.12);
    const target = _look.clone().add(_swayLook);
    camera.lookAt(target);

    // Mild FOV breathing at scene boundaries to add cinematic punch
    const fovBoost = (1 - Math.abs(local - 0.5) * 2) * 1.5;
    const targetFov = 45 + fovBoost;
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.04);
    cam.updateProjectionMatrix();

    tPrev.current = t;
  });

  return null;
}
