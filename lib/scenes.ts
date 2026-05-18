/**
 * Master scene timeline.
 *
 * The whole page is one long scroll. We give each scene a [start, end] range
 * along normalized scroll progress (0 → 1). All camera moves, environment
 * fades and overlay reveals consult these ranges so the experience feels like
 * one continuous cinematic journey.
 *
 * Total scenes: 7. Hero gets a slightly longer hold so the entrance feels
 * intentional, and Kailash holds at the end so the contact moment lands.
 */

export type SceneId =
  | "cosmic"
  | "street"
  | "projects"
  | "temple"
  | "neural"
  | "timeline"
  | "kailash";

export interface SceneSpec {
  id: SceneId;
  title: string;
  subtitle: string;
  /** Scroll length for this scene as a fraction of total (must sum to 1). */
  length: number;
}

export const SCENES: SceneSpec[] = [
  { id: "cosmic",   title: "Cosmic Awakening",  subtitle: "Identity",     length: 0.16 },
  { id: "street",   title: "Street of Systems", subtitle: "Engineering",  length: 0.15 },
  { id: "projects", title: "Hall of Projects",  subtitle: "Builds",       length: 0.16 },
  { id: "temple",   title: "Temple of Knowledge", subtitle: "Skills",     length: 0.14 },
  { id: "neural",   title: "Neural Cave",       subtitle: "AI & Vision",  length: 0.13 },
  { id: "timeline", title: "Timeline Path",     subtitle: "Journey",      length: 0.12 },
  { id: "kailash",  title: "The Kailash Summit", subtitle: "Contact",     length: 0.14 },
];

export interface SceneRange {
  id: SceneId;
  start: number;
  end: number;
  /** Local progress getter — given global scroll t in [0,1], returns [0,1] for this scene. */
  local: (t: number) => number;
}

export const SCENE_RANGES: SceneRange[] = (() => {
  let acc = 0;
  return SCENES.map((s) => {
    const start = acc;
    const end = acc + s.length;
    acc = end;
    return {
      id: s.id,
      start,
      end,
      local: (t: number) => {
        if (t <= start) return 0;
        if (t >= end) return 1;
        return (t - start) / (end - start);
      },
    };
  });
})();

/** Total scroll "tracks" used by the page (each ~100vh). */
export const TOTAL_SCROLL_VH = 750; // ≈ 7 scenes × ~1.07 vh per scene

export function getScene(id: SceneId): SceneRange {
  const r = SCENE_RANGES.find((s) => s.id === id);
  if (!r) throw new Error(`Unknown scene id: ${id}`);
  return r;
}

/** Returns global scroll t at which a given scene midpoint sits. */
export function sceneMid(id: SceneId): number {
  const r = getScene(id);
  return (r.start + r.end) / 2;
}
