/**
 * Asset registry.
 *
 * Each scene has named "slots" that procedural geometry currently fills.
 * Add an entry here once you've sourced/exported a GLB and dropped it under
 * `public/models/...`. The corresponding scene component will switch from
 * procedural primitives to the loaded model automatically, with no other
 * code changes.
 *
 * Leave a slot un-set (or absent from this map) to keep the procedural
 * fallback. Mix and match freely.
 *
 * Scale calibration baseline:
 *   - Reference: `temple.architecture` reads well at scale 10.
 *   - Most Quaternius assets are 0.5–2 units tall natively, so big
 *     environmental pieces (mountains, cityblocks, caves) usually need
 *     scale 10–30 to read at distance.
 *   - Characters are ~1.7 units tall (RPM) or ~1.5 (Quaternius) — so a
 *     scale of 1.5–2.5 puts them at human size in this world.
 *
 * If an asset is invisible after rescale, check the position next:
 *   - Asset behind camera anchor → push the slot's `position.z` further
 *     into the negative.
 *   - Asset clipping below ground → bump `position.y` up by 1–3.
 *   - Asset's pivot is offset → check the `.glb` in https://gltf.report and
 *     either re-export with origin at base, or compensate with `position`.
 *
 * Recommended file conventions:
 *   - GLB only (no GLTF + bin pairs)
 *   - Draco-compressed (see gltf-pipeline / gltf.report)
 *   - < 5 MB per asset on desktop, < 1.5 MB on mobile-sensitive scenes
 *   - World-space origin at the asset base; transform via the slot below
 */

export interface ModelSlot {
  /** Public path to the .glb file. */
  path: string;
  /** Uniform scale (default 1). */
  scale?: number;
  /** XYZ offset in world units (relative to the slot anchor). */
  position?: [number, number, number];
  /** Euler rotation in radians. */
  rotation?: [number, number, number];
  /** Whether to enable Draco mesh decompression. Defaults true. */
  draco?: boolean;
  /** Apply the slot color as material override (rough heuristic: emissive). */
  tint?: string;
  /** Marks meshes as transparent and ramps emissive intensity — useful for
   *  hologram/portal assets that should glow. */
  hologram?: boolean;
}

export type ModelSlotName =
  // Scene 1 — Cosmic Awakening
  | "cosmic.character"     // meditating Indian tech-monk (ReadyPlayerMe + sit pose)
  | "cosmic.mountains"     // distant Himalayan ridgeline
  | "cosmic.glyphs"        // floating Sanskrit glyph plates
  // Scene 2 — Street of Systems
  | "street.cityblock"     // cyberpunk street kit (left/right buildings as one model)
  | "street.lampprops"     // streetlamps / signs
  | "street.character"     // walking avatar
  // Scene 3 — Hall of Projects
  | "projects.archway"     // hall architecture / floor base
  // Scene 4 — Temple of Knowledge
  | "temple.architecture"  // Indian/fantasy temple base
  | "temple.pillarBase"    // optional decorative pillar base (replaces box)
  // Scene 5 — Neural Cave
  | "neural.cave"          // cave rocks / walls
  // Scene 6 — Timeline Path
  | "timeline.peaks"       // mountain range
  | "timeline.shrine"      // milestone shrine prop (repeated 5x)
  // Scene 7 — Kailash Summit (the HERO asset)
  | "kailash.summit"       // Kailash mountain mesh — most important
  | "kailash.steps";       // stone summit steps

/**
 * Live asset registry. The site runs entirely procedurally for any slot
 * that is absent or commented out — drops in/out are non-destructive.
 *
 * See:
 *   - docs/KAILASH-ASSET-SOURCING.md for the full sourcing guide
 *   - public/models/README.md for the catalogue of all slots
 */
export const MODEL_REGISTRY: Partial<Record<ModelSlotName, ModelSlot>> = {
  // ──────────────────────────────────────────────────────────────────────
  // SCENE 1 — Cosmic Awakening
  // Camera anchor: pos [0, 6, 24] → look [0, 4, 0]
  // ──────────────────────────────────────────────────────────────────────

  "cosmic.mountains": {
    path: "/models/cosmic/mountains.glb",
    scale: 25,
    position: [0, -2, -55],
    rotation: [0, Math.PI * 0.05, 0],
  },

  "cosmic.character": {
    path: "/models/avatars/yatri.glb",
    scale: 2.6,
    position: [0, 0, 4],
    rotation: [0, Math.PI, 0],
  },

  "cosmic.glyphs": {
    path: "/models/cosmic/glyphs.glb",
    scale: 4,
    position: [0, 11, -16],
    hologram: true,
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 2 — Street of Systems
  // Camera anchor: pos [0, 3.6, 12] → look [0, 3, -8]
  // ──────────────────────────────────────────────────────────────────────

  "street.cityblock": {
    path: "/models/street/cyberpunk-blockx.glb",
    scale: 18,
    position: [0, -0.5, -22],
    rotation: [0, 0, 0],
  },

  "street.lampprops": {
    path: "/models/street/props.glb",
    scale: 3.5,
    position: [0, 0, -14],
    hologram: true,
    tint: "#FF3DA5",
  },

  "street.character": {
    path: "/models/avatars/yatri.glb",
    scale: 2.2,
    position: [0, 0, -6],
    rotation: [0, Math.PI, 0],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 3 — Hall of Projects
  // Camera anchor: pos [0, 4.5, 6] → look [0, 3.5, -22]
  // Portals sit at z=-22. Archway should frame the hall just behind them.
  // ──────────────────────────────────────────────────────────────────────

  "projects.archway": {
    path: "/models/projects/archway.glb",
    scale: 10,
    position: [0, 0, -28],
    rotation: [0, 0, 0],
    // tint removed — was forcing saffron over the architecture
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 4 — Temple of Knowledge
  // Camera anchor: pos [0, 6, 0] → look [0, 6, -28]
  // Mandala floor at z=-28. Temple sits just behind so the camera flies
  // into the colonnade.
  // ──────────────────────────────────────────────────────────────────────

  "temple.architecture": {
    path: "/models/temple/indian-temple.glb",
    // HERO of this scene — the temple needs to dominate. The source
    // GLB is small natively, so it needs a big scale boost to read.
    // Sits at the mandala centre so it rises *through* the pillar
    // ring as the cinematic focal point.
    scale: 10,
    position: [0, 0, -28],
    rotation: [0, 0, 0],
  },

  "temple.pillarBase": {
    path: "/models/timeline/shrine.glb",
    // Pillar GLB is large natively — keep it small enough that the
    // temple architecture clearly out-scales each individual pillar
    // (target: pillar ≈ 1/6 of temple silhouette).
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 5 — Neural Cave
  // Camera anchor: pos [0, 1.6, -10] → look [0, 1.8, -38]
  // ──────────────────────────────────────────────────────────────────────

  "neural.cave": {
    path: "/models/neural/cave.glb",
    scale: 12,
    position: [0, -2, -42],
    rotation: [0, 0, 0],
    tint: "#8A5BFF",
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 6 — Timeline Path
  // Camera anchor: pos [0, 4, -22] → look [0, 4, -52]
  // ──────────────────────────────────────────────────────────────────────

  "timeline.peaks": {
    path: "/models/timeline/peaks.glb",
    scale: 15,
    position: [0, -3, -65],
    rotation: [0, 0, 0],
  },

  "timeline.shrine": {
    path: "/models/timeline/shrine.glb",
    scale: 5,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SCENE 7 — Kailash Summit (HERO)
  // Camera anchor: pos [0, 11, -38] → look [0, 17, -78]
  // ──────────────────────────────────────────────────────────────────────

  "kailash.summit": {
    path: "/models/kailash/main-peak.glb",
    scale: 35,
    position: [0, -8, -95],
    rotation: [0, Math.PI * 0.15, 0],
    tint: "#FFE6B8",
  },

  "kailash.steps": {
    path: "/models/kailash/steps.glb",
    scale: 6,
    position: [0, 0, -70],
    rotation: [0, 0, 0],
  },

};

export function getSlot(name: ModelSlotName): ModelSlot | null {
  return MODEL_REGISTRY[name] ?? null;
}

/**
 * Character animation slots — Mixamo FBX-as-GLB or any GLB with an animation
 * clip. Keys map to actions used in the scene; values are the public path
 * plus an optional clip name (defaults to the first clip in the file).
 */
export interface AnimationClipRef {
  path: string;
  /** Name of the animation clip inside the GLB. If absent, uses the first. */
  clip?: string;
}

export const ANIMATION_REGISTRY: Partial<Record<string, AnimationClipRef>> = {
  // "yatri.meditate": { path: "/models/animations/meditate.glb" },
  // "yatri.walk":     { path: "/models/animations/walk.glb" },
  // "yatri.climb":    { path: "/models/animations/climb.glb" },
};
