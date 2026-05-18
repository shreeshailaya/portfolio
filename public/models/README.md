# 3D Asset Drop Zone

This directory is the home for all GLB/GLTF assets used by the cinematic
experience. Drop files here, register them in `lib/assets.ts`, done.

## How the asset pipeline works

Every scene renders procedural placeholders by default. Each placeholder is
wrapped in a `<ModelSlot slot="...">` (or `<Character>`) that swaps in a real
asset *only if* the slot is registered in `lib/assets.ts`.

```
public/models/                  → drop GLB files here (any structure)
lib/assets.ts                   → register them by slot name
components/canvas/scenes/...    → already wrapped in <ModelSlot> calls
```

When you remove a registry entry (or the file 404s), the procedural fallback
returns automatically — the `<AssetErrorBoundary>` catches the failure.

## Slot catalogue

| Slot                  | Scene                  | Recommended source                                              |
| --------------------- | ---------------------- | --------------------------------------------------------------- |
| `cosmic.mountains`    | Cosmic Awakening       | Poly Pizza / Quaternius low-poly mountains, or Meshy AI         |
| `cosmic.character`    | Cosmic Awakening       | **ReadyPlayerMe** export (GLB) + meditate pose                  |
| `cosmic.glyphs`       | Cosmic Awakening       | Custom plane sprites or Meshy AI generated runes                |
| `street.cityblock`    | Street of Systems      | KitBash3D Neo-Tokyo / Sketchfab cyberpunk street kit            |
| `temple.architecture` | Temple of Knowledge    | Sketchfab Indian temple kits, Quaternius "Fantasy Town"         |
| `neural.cave`         | Neural Cave            | Poly Pizza cave rocks / Meshy AI prompt: "neural sci-fi cave"   |
| `timeline.peaks`      | Timeline Path          | Quaternius "Nature Pack — Mountains"                            |
| **`kailash.summit`**  | Kailash Summit (HERO)  | Sculpt in Blender or use Meshy AI: "Mt Kailash sacred mountain" |
| `projects.archway`    | Hall of Projects       | Sketchfab futuristic hall / pillars                             |

Bold = the most impactful upgrade (per the kitbash strategy).

## File guidelines

- **Format:** GLB (single file, embedded textures). Avoid GLTF + .bin pairs.
- **Compression:** Run through [gltf.report](https://gltf.report) → enable
  Draco compression on meshes, KTX2 / Basis on textures.
- **Budget:**
  - Desktop total: < 300 MB
  - Mobile total: < 80 MB
  - Per-scene hero asset: < 5 MB ideal, < 12 MB max
- **Origin:** Asset's pivot should be at its base on Y=0. Position via the
  slot's `position` field in `lib/assets.ts`.
- **Materials:** Use PBR (metalness/roughness). Set emissive on glowing
  surfaces — Bloom in the post-FX pipeline will make them sing.

## Workflow: replacing the Kailash hero asset

```bash
# 1. Source / generate the GLB (Meshy AI, Sketchfab, Blender sculpt, …).
#    Save it as: public/models/kailash/kailash.glb
#
# 2. Register it in lib/assets.ts:
#
#    export const MODEL_REGISTRY = {
#      "kailash.summit": {
#        path: "/models/kailash/kailash.glb",
#        scale: 1.0,
#        position: [0, 0, 0],  // adjust to taste
#      },
#    };
#
# 3. Reload the dev server — the procedural pyramid is replaced.
```

## Character workflow (ReadyPlayerMe + Mixamo)

1. Build an avatar at https://readyplayer.me → download GLB.
2. *(Optional)* For animation:
   - Download Mixamo animation as **FBX with skin** (or "in place" for
     locomotion-free clips like meditation).
   - Import the FBX in Blender → import your RPM avatar → retarget bones →
     bake animation → export combined GLB. Drop in `public/models/avatars/`.
3. Register both:

```ts
// lib/assets.ts
export const MODEL_REGISTRY = {
  "cosmic.character": {
    path: "/models/avatars/yatri.glb",
    scale: 1.0,
    position: [0, 0, 3],
  },
};

// Optional external clip (only if not baked into the avatar GLB):
export const ANIMATION_REGISTRY = {
  "yatri.meditate": { path: "/models/animations/meditate.glb" },
};
```

The `<Character slot="cosmic.character" animation="yatri.meditate" />` call
in [`CosmicAwakening.tsx`](../../components/canvas/scenes/CosmicAwakening.tsx)
will pick it up automatically.
