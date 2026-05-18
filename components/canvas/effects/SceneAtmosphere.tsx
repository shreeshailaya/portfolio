"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "@/components/providers/ScrollProgressProvider";
import { SCENES, SCENE_RANGES } from "@/lib/scenes";

/**
 * Per-scene atmosphere — fog color/density, ambient light color/intensity,
 * directional light tint. Crossfades smoothly across the cinematic journey
 * so each scene reads with its own emotional tone.
 *
 * Cosmic awakening = cold cosmic blue. Street = saffron-magenta neon. Hall =
 * deep midnight. Temple = warm saffron. Cave = deep violet. Timeline =
 * icy white-blue. Kailash = golden-pink dawn.
 */

interface AtmoBeat {
  bg: string;
  fog: string;
  fogNear: number;
  fogFar: number;
  ambient: string;
  ambientI: number;
  directional: string;
  directionalI: number;
}

/**
 * Baseline target: fog [60, 260], ambient ~0.4, directional ~2.0.
 * Each beat modulates around this baseline to give scenes their own mood
 * without breaking the AAA breathing-room of the new global fog/lighting.
 */
const BEATS: Record<string, AtmoBeat> = {
  cosmic: {
    bg: "#050816",
    fog: "#070B1F",
    fogNear: 70,
    fogFar: 260,
    ambient: "#9CB8FF",
    ambientI: 0.45,
    directional: "#FFD7A8",
    directionalI: 1.6,
  },
  street: {
    bg: "#06051A",
    fog: "#150A30",
    fogNear: 45,
    fogFar: 200,
    ambient: "#B084FF",
    ambientI: 0.55,
    directional: "#FF8A1F",
    directionalI: 2.0,
  },
  projects: {
    bg: "#070B26",
    fog: "#0E1538",
    fogNear: 50,
    fogFar: 230,
    // Cool neutral fill so the overlay glass/text reads cleanly. The
    // saffron portal lights still provide warm accent locally.
    ambient: "#BFD2FF",
    ambientI: 0.65,
    directional: "#F2E8D8",
    directionalI: 1.2,
  },
  temple: {
    bg: "#0A0820",
    fog: "#1A1426",
    fogNear: 60,
    fogFar: 260,
    // Warm-neutral ambient keeps overlay text readable; directional is
    // strong enough to model the temple's stone facades without flooding.
    ambient: "#E8DCC8",
    ambientI: 0.85,
    directional: "#FFD2A0",
    directionalI: 1.9,
  },
  neural: {
    bg: "#06051F",
    fog: "#120A2E",
    fogNear: 40,
    fogFar: 200,
    ambient: "#8A5BFF",
    ambientI: 0.5,
    directional: "#B388FF",
    directionalI: 1.4,
  },
  timeline: {
    bg: "#0A0E2A",
    fog: "#141A36",
    fogNear: 65,
    fogFar: 280,
    ambient: "#C9DCFF",
    ambientI: 0.5,
    directional: "#E8EEF7",
    directionalI: 1.9,
  },
  kailash: {
    bg: "#070A1C",
    fog: "#1F1428",
    fogNear: 75,
    fogFar: 320,
    ambient: "#FFC58A",
    ambientI: 0.65,
    directional: "#FFE6B8",
    directionalI: 2.8,
  },
};

const _c1 = new THREE.Color();
const _c2 = new THREE.Color();
const _c3 = new THREE.Color();
const _c4 = new THREE.Color();

interface Props {
  ambientRef: React.RefObject<THREE.AmbientLight>;
  directionalRef: React.RefObject<THREE.DirectionalLight>;
}

export function SceneAtmosphere({ ambientRef, directionalRef }: Props) {
  const { smoothRef } = useScrollProgress();
  const { scene } = useThree();
  const lastIdx = useRef(-1);

  useFrame(() => {
    const t = smoothRef.current;

    let idx = SCENE_RANGES.findIndex((r) => t >= r.start && t <= r.end);
    if (idx === -1) idx = t < 0.5 ? 0 : SCENE_RANGES.length - 1;
    const seg = SCENE_RANGES[idx];
    const local = seg.local(t);
    const eased = local * local * (3 - 2 * local);

    const cur = BEATS[SCENES[idx].id];
    const next = BEATS[SCENES[Math.min(idx + 1, SCENES.length - 1)].id];

    _c1.set(cur.bg).lerp(_c2.set(next.bg), eased);
    _c3.set(cur.fog).lerp(_c4.set(next.fog), eased);

    if (scene.background instanceof THREE.Color) {
      scene.background.copy(_c1);
    } else {
      scene.background = _c1.clone();
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(_c3);
      scene.fog.near = THREE.MathUtils.lerp(cur.fogNear, next.fogNear, eased);
      scene.fog.far = THREE.MathUtils.lerp(cur.fogFar, next.fogFar, eased);
    }

    const amb = ambientRef.current;
    if (amb) {
      amb.color.set(cur.ambient).lerp(_c2.set(next.ambient), eased);
      amb.intensity = THREE.MathUtils.lerp(
        cur.ambientI,
        next.ambientI,
        eased,
      );
    }
    const dir = directionalRef.current;
    if (dir) {
      dir.color.set(cur.directional).lerp(
        _c2.set(next.directional),
        eased,
      );
      dir.intensity = THREE.MathUtils.lerp(
        cur.directionalI,
        next.directionalI,
        eased,
      );
    }

    lastIdx.current = idx;
  });

  return null;
}
