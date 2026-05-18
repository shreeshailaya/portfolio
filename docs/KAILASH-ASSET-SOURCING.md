# 3D Assets — Complete Sourcing & Integration Guide

The master reference for every 3D component that maximizes the visual impact
of *The Digital Yatri*. Every named slot in the site is listed below with:

- a description of what the asset does in the scene,
- one or more **direct Poly Pizza URLs** (CC0/CC-BY, free) ranked best-first,
- a **Meshy AI prompt** for AI-generated alternatives,
- the **exact file path** to save it under, and
- the **copy-paste code snippet** for `lib/assets.ts`.

> The site is fully cinematic with **zero assets** (procedural fallback). Every
> asset below is a **visual upgrade**, never a blocker. Drop in just the ones
> you like.

---

## Table of contents

1. [Strategy & philosophy](#strategy--philosophy)
2. [Quick-start: 5 assets for 80 % of the impact](#quick-start-5-assets-for-80-of-the-impact)
3. [Master slot map (every slot, every scene)](#master-slot-map-every-slot-every-scene)
4. **Scene-by-scene catalogue**
   - [Scene 1 — Cosmic Awakening](#scene-1--cosmic-awakening)
   - [Scene 2 — Street of Systems](#scene-2--street-of-systems)
   - [Scene 3 — Hall of Projects](#scene-3--hall-of-projects)
   - [Scene 4 — Temple of Knowledge](#scene-4--temple-of-knowledge)
   - [Scene 5 — Neural Cave](#scene-5--neural-cave)
   - [Scene 6 — Timeline Path](#scene-6--timeline-path)
   - [Scene 7 — Kailash Summit (HERO)](#scene-7--kailash-summit-hero)
5. [Character pipeline (ReadyPlayerMe + Mixamo)](#character-pipeline-readyplayerme--mixamo)
6. [Asset preparation pipeline (Poly Pizza → GLB → Draco)](#asset-preparation-pipeline-poly-pizza--glb--draco)
7. [Tuning scale / position / rotation](#tuning-scale--position--rotation)
8. [Performance budget](#performance-budget)
9. [Troubleshooting](#troubleshooting)
10. [License compliance](#license-compliance)

---

## Strategy & philosophy

Per the AI-assisted cinematic kitbash workflow:

| Layer | Percentage | Where it lives |
|-------|-----------|----------------|
| Asset kitbash (Poly Pizza, Sketchfab, Meshy AI) | **70 %** | `public/models/` + `lib/assets.ts` |
| Shader magic (Bloom, Vignette, atmosphere, particles) | **20 %** | Already shipped in `components/canvas/effects/` |
| Custom hero (orb, portals, mandala, glyphs) | **10 %** | Already shipped procedurally |

Your job in Phase 2 is the **70 %** — drop assets in, the site does the rest.

---

## Quick-start: 5 assets for 80 % of the impact

If you only have 30 minutes, do these five. Each takes ~5 minutes.

| # | Slot | Source | Why |
|---|------|--------|-----|
| 1 | `kailash.summit` | https://poly.pizza/m/7HYR2s9JVi | The emotional ending — biggest single payoff |
| 2 | `cosmic.character` | https://poly.pizza/m/P5FzFYgG5z (Monk) | Replaces the abstract figure with a real character |
| 3 | `cosmic.mountains` | https://poly.pizza/m/w9VBrh7Nz0 | First impression — what users see first |
| 4 | `temple.architecture` | https://poly.pizza/m/CE2Mn7lh6A | Skills section reads as a real temple |
| 5 | `street.cityblock` | https://poly.pizza/bundle/Cyberpunk-Game-Kit-Hkfxa8K8zF | One bundle covers the whole street |

That's it. Five files, five registry entries, ~30 minutes of effort, and the
portfolio transforms from procedural-cinematic to fully kitbashed-cinematic.

---

## Master slot map (every slot, every scene)

This is the authoritative list. Slots in **bold** are highest-impact.

| Scene | Slot key | Component | Status |
|-------|----------|-----------|--------|
| 1 — Cosmic Awakening | **`cosmic.character`** | Meditating monk | Reuse in Scenes 2 + 7 |
| 1 — Cosmic Awakening | **`cosmic.mountains`** | Distant Himalayan ridge | High impact |
| 1 — Cosmic Awakening | `cosmic.glyphs` | Floating Sanskrit runes | Polish |
| 2 — Street of Systems | **`street.cityblock`** | Cyberpunk buildings | High impact |
| 2 — Street of Systems | `street.lampprops` | Lamps, signs, holograms | Polish |
| 2 — Street of Systems | `street.character` | Walking avatar (reuses `cosmic.character`) | Reuse |
| 3 — Hall of Projects | `projects.archway` | Hall architecture / frames | Medium |
| 4 — Temple of Knowledge | **`temple.architecture`** | Indian temple shell | High impact |
| 4 — Temple of Knowledge | `temple.pillarBase` | Stone pillar bases | Polish |
| 5 — Neural Cave | `neural.cave` | Cave rocks / crystals | Medium (shaders carry this scene) |
| 6 — Timeline Path | `timeline.peaks` | Snowy peaks lining trail | Medium |
| 6 — Timeline Path | `timeline.shrine` | Milestone shrine prop (×5) | Polish |
| 7 — Kailash Summit | **`kailash.summit`** | The hero mountain — biggest upgrade | THE PRIORITY |
| 7 — Kailash Summit | `kailash.steps` | Stone summit steps | Polish |

Total slots: **13**. Recommended ordered upgrade path: rows in this order:
`kailash.summit` → `cosmic.character` → `cosmic.mountains` → `street.cityblock`
→ `temple.architecture` → everything else.

---

## Scene 1 — Cosmic Awakening

> *High Himalayan plateau before sunrise. A traveller sits meditating before
> a floating neural orb. Camera descends from space to plateau.*

### `cosmic.character` — Meditating monk (HIGH IMPACT)

**The single biggest character upgrade** — and reusable across Scenes 2 & 7.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Monk** → https://poly.pizza/m/P5FzFYgG5z
  *Low-poly, hooded robe, perfect for the "modern Indian tech monk" feel.
  CC0, FBX + glTF.*

**Alternatives:**

- Quaternius — Animated Human → https://poly.pizza/m/c3Ibh9I3udk *(has rig + idle animation built in)*
- Quaternius — Man (basic) → https://poly.pizza/m/HMnuH5geEG
- **Highest fidelity:** ReadyPlayerMe + Mixamo — see [character pipeline](#character-pipeline-readyplayerme--mixamo) below.

**Meshy AI prompt:** *(use only if you need photoreal/stylized character)*

> "Modern Indian technologist meditating in lotus pose, dark hoodie with
> traditional scarf draped over shoulder, calm expression, sitting on a
> stone block, mid-poly stylized, isolated on transparent background."

**Save to:** `public/models/avatars/yatri.glb`

**Register in `lib/assets.ts`:**

```ts
"cosmic.character": {
  path: "/models/avatars/yatri.glb",
  scale: 1.0,             // Quaternius Monk is ~1.7 units → matches scene
  position: [0, 0, 3],
  rotation: [0, 0, 0],
  tint: "#1A2050",        // dark cosmic blue glow on emissive surfaces
},
```

**Tuning:** If the monk looks too small, scale 1.5–2. If too large, 0.6–0.8.
A camera-relative test: zoom in on Scene 1 — the figure should occupy
about 1/8 of the visible height.

---

### `cosmic.mountains` — Distant Himalayan ridgeline (HIGH IMPACT)

The horizon line that frames the meditating monk and the orb. Replaces 14
procedural cones.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Mountains** → https://poly.pizza/m/w9VBrh7Nz0
  *Wide ridgeline, CC0.*
- Quaternius — Mountain Group → https://poly.pizza/m/a52gSEEq8X
- Quaternius — Mountain (single peak) → https://poly.pizza/m/7HYR2s9JVi

**Pro tip:** Download both `Mountains` and `Mountain Group`, drop both in,
register the wide one as the back ridge and the group as a middle ridge —
gives parallax depth.

**Meshy AI prompt:**

> "Himalayan ridgeline at dawn, dark blue snow-capped jagged peaks,
> stylized low-poly geometric, isolated on transparent background, wide
> aspect ratio."

**Save to:** `public/models/cosmic/mountains.glb`

**Register:**

```ts
"cosmic.mountains": {
  path: "/models/cosmic/mountains.glb",
  scale: 5,
  position: [0, 0, -40],
  rotation: [0, 0, 0],
},
```

**Tuning:** Mountains tend to be wider than tall — start with `scale: 5`.
If the ridgeline disappears below the horizon, raise the `y` to 1 or 2.
If it occludes the orb, push `z` further back (-50, -60).

---

### `cosmic.glyphs` — Floating Sanskrit glyph plates (POLISH)

Glowing rune-like plates floating in the sky. The procedural orange planes
read fine — only upgrade this if you want detailed runes.

**Recommended:**

- *Poly Pizza:* no direct match — most rune assets are too game-y.
- ⭐ **Best path:** Meshy AI or custom shader.

**Meshy AI prompt:**

> "Floating glowing Sanskrit symbol plates, ornate brass etching, ancient
> Indian script, mid-poly, isolated on transparent background, set of 5
> variations."

**Save to:** `public/models/cosmic/glyphs.glb`

**Register:**

```ts
"cosmic.glyphs": {
  path: "/models/cosmic/glyphs.glb",
  scale: 0.4,
  position: [0, 8, -12],
  tint: "#FFB454",        // saffron glow
  hologram: true,         // makes them transparent + emissive
},
```

---

## Scene 2 — Street of Systems

> *Cyberpunk Pune-inspired corridor. Skill towers, holographic dashboards,
> reflective rainy road, neon reflections, floating containers.*

### `street.cityblock` — Cyberpunk buildings (HIGH IMPACT)

The single best upgrade for Scene 2. Replaces 22 procedural building boxes.

**Recommended Poly Pizza:**

- ⭐⭐ **Quaternius — Cyberpunk Game Kit (bundle)** → https://poly.pizza/bundle/Cyberpunk-Game-Kit-Hkfxa8K8zF
  *43 modular models (buildings, platforms, signs, props). Download once,
  combine in Blender into one or two GLBs.*
- Quaternius — Cyberpunk Platform → https://poly.pizza/m/ctQ5CDmraQ
- Quaternius — Cyberpunk Platform (variant) → https://poly.pizza/m/s0rwPHWMpY
- Quaternius — Cyberpunk Platform (variant) → https://poly.pizza/m/dHymLbsOMY
- Quaternius — Building (generic) → https://poly.pizza/m/ZSYgIuHfYb

**Workflow with the Cyberpunk Game Kit:**

1. Download the bundle ZIP.
2. Open Blender → drag 6–10 building variants into the scene.
3. Arrange them as a two-sided street tunnel (mirror across X axis).
4. Export as one combined GLB: `File → Export → glTF Binary (.glb)`.

**Meshy AI prompt** *(skip if using the kit)*:

> "Cyberpunk street block, futuristic Indian city, neon-lit tall buildings,
> data pipes running between them, mid-poly stylized, isolated on
> transparent background, modular game asset."

**Save to:** `public/models/street/cyberpunk-block.glb`

**Register:**

```ts
"street.cityblock": {
  path: "/models/street/cyberpunk-block.glb",
  scale: 1.0,
  position: [0, 0, -20],
  rotation: [0, 0, 0],
  tint: "#36F5FF",        // neon cyan emissive boost
},
```

---

### `street.lampprops` — Street lamps, signs, holograms (POLISH)

Detail layer scattered along the street.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Sign** → https://poly.pizza/m/Kg1kxfrItG
- Isa Lousberg — Street Lantern → https://poly.pizza/m/Zp1b44poac (CC0)
- Kay Lousberg — Lantern → https://poly.pizza/m/CtHBJ1ufeW (CC0)
- *(From the Cyberpunk Game Kit:)* turrets, signs, scaffolding props

**Meshy AI prompt:**

> "Cyberpunk neon street sign, glowing magenta and cyan, futuristic Indian
> script on it, mid-poly, isolated on transparent background."

**Save to:** `public/models/street/props.glb`

**Register:**

```ts
"street.lampprops": {
  path: "/models/street/props.glb",
  scale: 0.6,
  position: [0, 0, -10],
  hologram: true,
  tint: "#FF3DA5",        // neon magenta
},
```

---

### `street.character` — Walking avatar (REUSE)

You don't need a new asset — reuse `cosmic.character`. Just register the
same path with a different position. Scene 2 will pick it up.

**Register (optional — only if you want a different position/pose):**

```ts
"street.character": {
  path: "/models/avatars/yatri.glb",  // same file as cosmic.character
  scale: 1.0,
  position: [0, 0, -4],
  rotation: [0, Math.PI, 0],          // facing camera as it follows
},
```

For walking animation, see [character pipeline](#character-pipeline-readyplayerme--mixamo).

---

## Scene 3 — Hall of Projects

> *Open futuristic courtyard with project portals (purple AgentMock,
> saffron PublicMart) and four mini portals.*

### `projects.archway` — Hall architecture (MEDIUM)

Replaces the two procedural framing pillars. The portals themselves should
stay procedural — they're the custom shader hero of this scene.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Torii Gate** → https://poly.pizza/m/7SyXZ62xR5 (CC0)
  *Surprisingly perfect — reads as both Asian temple gate and futuristic
  portal frame.*
- Quaternius — Arch → https://poly.pizza/m/QwWdOcNIMh (CC0)
- Quaternius — Arch Door → https://poly.pizza/m/MVVMLXOfg1 (CC0)
- Quaternius — Watch Tower → https://poly.pizza/m/f2J0aSLVi4 (CC0)

**Meshy AI prompt:**

> "Futuristic Indian temple gateway arch, dark stone with glowing saffron
> inlays, ornate carvings, mid-poly cinematic, isolated."

**Save to:** `public/models/projects/archway.glb`

**Register:**

```ts
"projects.archway": {
  path: "/models/projects/archway.glb",
  scale: 3,
  position: [0, 0, -18],
  rotation: [0, 0, 0],
  tint: "#FF8A1F",
},
```

---

## Scene 4 — Temple of Knowledge

> *Kailash-meets-Hampi inspired circular hall with skill pillars, mandala
> floor and cosmic yantra ceiling.*

### `temple.architecture` — Indian temple shell (HIGH IMPACT)

Replaces the procedural arch ring.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Temple** → https://poly.pizza/m/CE2Mn7lh6A (CC0)
  *Pyramid-stepped temple — fits Kailasa / Hampi aesthetic.*
- Quaternius — Temple (alternate) → https://poly.pizza/m/nR264crTSr (CC0)

**Meshy AI prompt:**

> "Ancient Indian rock-cut temple, Kailasa-style pyramidal stepped
> architecture, dark stone with glowing saffron inscriptions, ornate
> mandala carvings on walls, mid-poly cinematic, isolated."

**Save to:** `public/models/temple/temple.glb`

**Register:**

```ts
"temple.architecture": {
  path: "/models/temple/temple.glb",
  scale: 2.5,
  position: [0, 0, -28],
  rotation: [0, 0, 0],
  tint: "#FF8A1F",       // saffron emissive pulse
},
```

---

### `temple.pillarBase` — Stone pillar bases (POLISH)

Decorates the base of each of the 6 skill pillars. Reused 6× by the scene.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Column** → https://poly.pizza/m/wLubNpOTX4 (CC0)
- Kenney — Column → https://poly.pizza/m/xYMugFbtWK (CC0)
- Kay Lousberg — Shrine → https://poly.pizza/m/tFxdxO5clk (CC0)
  *Tiny shrine prop — great as a pillar base.*

**Save to:** `public/models/temple/pillar-base.glb`

**Register:**

```ts
"temple.pillarBase": {
  path: "/models/temple/pillar-base.glb",
  scale: 0.5,
  position: [0, 0, 0],   // positioned relative to each pillar in the scene
  rotation: [0, 0, 0],
},
```

---

## Scene 5 — Neural Cave

> *Dark cave with central AI brain, glowing neural roots, embedding rivers.
> This scene is **mostly shaders** — assets here are background-only.*

### `neural.cave` — Cave rocks & crystals (MEDIUM)

Replaces 40 procedural icosahedron rocks.

**Recommended Poly Pizza** *(combine 2–3 of these for variety):*

- ⭐ **Kenney — Rock Formation** → https://poly.pizza/m/pRY9BCFbmQ (CC0)
- ⭐ **Quaternius — Big Crystal** → https://poly.pizza/m/pf5lzmgr2J (CC0)
  *Perfect for the violet AI energy theme.*
- iPoly3D — Crystal → https://poly.pizza/m/ySa8IekR6i (CC0)
- Quaternius — Rock → https://poly.pizza/m/4vHWF8XUBn (CC0)

**Workflow:** Open Blender, drop all four assets into one scene, scatter
them naturally, export as one combined `cave.glb`.

**Meshy AI prompt:**

> "Dark sci-fi crystal cave interior, jagged dark stone walls with
> protruding violet glowing crystals, neural energy roots, mid-poly
> cinematic, isolated."

**Save to:** `public/models/neural/cave.glb`

**Register:**

```ts
"neural.cave": {
  path: "/models/neural/cave.glb",
  scale: 1.5,
  position: [0, 0, -36],
  rotation: [0, 0, 0],
  tint: "#8A5BFF",        // violet glow on crystal surfaces
},
```

---

## Scene 6 — Timeline Path

> *Stone path snaking through snowy Himalayas, with 5 milestone shrines
> along the route.*

### `timeline.peaks` — Snowy peaks lining the trail (MEDIUM)

Replaces 16 procedural snow-capped cones.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Mountain Group** → https://poly.pizza/m/a52gSEEq8X (CC0)
  *Has multiple peaks in one model — already a "range".*
- Quaternius — Mountains → https://poly.pizza/m/w9VBrh7Nz0 (CC0)
  *(can reuse the same file from Scene 1)*

**Pro tip:** If you used `cosmic.mountains` already, you can point this slot
to the *same* file. Different scale/position will make it read differently.

**Meshy AI prompt:**

> "Snowy alpine mountain pass, sharp white-capped peaks lining a valley,
> stylized low-poly, isolated on transparent background."

**Save to:** `public/models/timeline/peaks.glb`

**Register:**

```ts
"timeline.peaks": {
  path: "/models/timeline/peaks.glb",
  scale: 3,
  position: [0, 0, -50],
  rotation: [0, 0, 0],
},
```

---

### `timeline.shrine` — Milestone shrines (POLISH)

5 milestone stops along the path (Mech2IT, Open Source, WordCamp, AI
Systems, Data Engineering). Currently rendered as 3-stone cairns.

**Recommended Poly Pizza:**

- ⭐ **Kay Lousberg — Shrine** → https://poly.pizza/m/tFxdxO5clk (CC0)
  *Stone shrine with offering bowl — perfect for milestone stops.*
- Quaternius — Stag Statue → https://poly.pizza/m/cKloIsNcT8 (CC0)
- Quaternius — Fox Statue → https://poly.pizza/m/abxyXID5EA (CC0)
- Kay Lousberg — Lantern → https://poly.pizza/m/CtHBJ1ufeW (CC0)

**Meshy AI prompt:**

> "Small Himalayan stone shrine cairn with prayer flag pole, stacked weathered
> stones, mid-poly stylized, isolated."

**Save to:** `public/models/timeline/shrine.glb`

**Register:**

```ts
"timeline.shrine": {
  path: "/models/timeline/shrine.glb",
  scale: 0.7,
  position: [0, 0, 0],   // positioned per milestone by the scene component
  rotation: [0, 0, 0],
},
```

---

## Scene 7 — Kailash Summit (HERO)

> *Snowstorm clears. Mount Kailash is revealed in cinematic glory. Final
> emotional moment. The most important visual upgrade in the entire site.*

### `kailash.summit` — The hero mountain (HIGHEST IMPACT)

**This is the asset to spend the most effort on.** Everything builds toward
this moment.

**Recommended Poly Pizza:**

- ⭐⭐ **Quaternius — Mountain (single peak)** → https://poly.pizza/m/7HYR2s9JVi
  *Solo peak with snow cap, isolated against sky — fits perfectly. CC0.*
- Quaternius — Mountain (alternate) → https://poly.pizza/m/XY4ej3Zg3I (CC0)

**Premium alternatives** (if you want unique):

- **Meshy AI** (recommended for hero) — generate a unique sacred mountain
  with the prompt below.
- **Sketchfab** → search "Mount Kailash" → several free CC-BY mountain
  models exist; pick one and credit the author in your footer.
- **Blender sculpt** — for the truly bespoke route, sculpt your own from
  a base displacement.

**Meshy AI prompt** *(strongly recommended for hero)*:

> "Mount Kailash, sacred four-sided pyramidal peak, dark blue and grey
> stone with bright snow cap, isolated against transparent background,
> ancient mystical aura, dawn lighting, mid-poly cinematic stylized,
> hero asset, dramatic silhouette."

**Save to:** `public/models/kailash/kailash.glb`

**Register:**

```ts
"kailash.summit": {
  path: "/models/kailash/kailash.glb",
  scale: 8,
  position: [0, 0, -78],
  rotation: [0, Math.PI * 0.25, 0],   // 45° rotation = corner edge faces camera
  tint: "#FFE6B8",                    // warm dawn glow on snow
},
```

**Tuning:** This is the moment users will judge the site. Spend 10 minutes
fine-tuning:

- **Scale:** start at 8 → adjust by ±1 until the mountain dominates the
  frame at scroll position 95 %.
- **Rotation:** 45° gives the iconic "corner-edge-facing-camera" silhouette.
  Try 0° if your model has a "front" face you want shown.
- **Position Y:** raise to 2 or 3 if the base is buried below the horizon.
- **Tint:** push toward `#FFB454` for sunset feel, `#E8EEF7` for cold
  dawn.

---

### `kailash.steps` — Stone summit steps (POLISH)

The final 6 steps the character climbs.

**Recommended Poly Pizza:**

- ⭐ **Quaternius — Rock Medium** → https://poly.pizza/m/s1OJ3bBzqc (CC0)
  *(repeated 6× as procedural steps)*

**Save to:** `public/models/kailash/steps.glb`

**Register:**

```ts
"kailash.steps": {
  path: "/models/kailash/steps.glb",
  scale: 1.2,
  position: [0, 0, -64],
  rotation: [0, 0, 0],
},
```

---

## Character pipeline (ReadyPlayerMe + Mixamo)

The Quaternius Monk is the fastest path. But if you want a **personalized
avatar** that looks like you, plus walking/meditating/climbing animations,
this is the workflow.

### Step 1 — Build the avatar

1. Go to https://readyplayer.me → **Create Avatar**.
2. Use the photo-from-camera flow, or pick style options.
3. **Customize:**
   - Skin tone: medium-warm
   - Hair: short black
   - Outfit: dark hoodie (closest to "tech monk")
   - Add: scarf if available, or use Blender to add one later
4. Click **Download GLB**.

### Step 2 — Source animations from Mixamo

1. Go to https://www.mixamo.com (free Adobe account).
2. **Upload your ReadyPlayerMe GLB** in the upper-right — Mixamo will
   auto-rig it.
3. Search and download each animation as **FBX with skin** (or "in place"
   for stationary clips):
   - **"Meditation Idle"** or **"Praying Idle"** → meditate (Scene 1, 7)
   - **"Walking"** → walk (Scene 2)
   - **"Climb to Top"** or **"Walking Up Stairs"** → climb (Scene 7)

### Step 3 — Combine in Blender

1. Open Blender, delete the default cube.
2. **File → Import → glTF (.glb)** → your ReadyPlayerMe avatar.
3. For each Mixamo FBX:
   - **File → Import → FBX (.fbx)**
   - Select the new armature → Action Editor → **rename the action** to
     `meditate`, `walk`, `climb`.
   - Hit the **shield (Fake User)** icon next to each action — this keeps
     them when you save.
4. Delete the duplicate Mixamo armatures (you only need the actions).
5. **File → Export → glTF 2.0 (.glb)** with:
   - **Include → Animations ✓**
   - **Include → Selected Objects** only if you have multiple meshes
6. Save as `public/models/avatars/yatri.glb`.

### Step 4 — Register animations

```ts
// lib/assets.ts

export const MODEL_REGISTRY = {
  "cosmic.character": {
    path: "/models/avatars/yatri.glb",
    scale: 1.0,
    position: [0, 0, 3],
    rotation: [0, 0, 0],
  },
};

// Optional — if your animations are in SEPARATE GLBs (not baked into
// the avatar GLB), point to them here:
export const ANIMATION_REGISTRY = {
  "yatri.meditate": { path: "/models/animations/meditate.glb" },
  "yatri.walk":     { path: "/models/animations/walk.glb"     },
  "yatri.climb":    { path: "/models/animations/climb.glb"    },
};
```

The `<Character>` component already takes `animation="yatri.meditate"` —
the scene wires this for you in Scene 1.

---

## Asset preparation pipeline (Poly Pizza → GLB → Draco)

Every asset you drop in should go through this pipeline. Takes ~2 minutes
per asset and shaves 70–90 % off file size.

### 1. Download from Poly Pizza

- Click **Download** on the model page.
- Choose **glTF** format.
- You'll get a `.zip` containing one or more of:
  - `.gltf` + `.bin` + textures folder, **or**
  - a single `.glb` (rare).

### 2. Convert to single-file GLB (if needed)

If you got separate `.gltf + .bin + textures`:

**Option A — gltf.report (recommended, zero install):**

1. Go to https://gltf.report
2. Drag the **whole folder** (or zipped folder) onto the page.
3. Click **Export** → **GLB**.

**Option B — Blender:**

1. Import the `.gltf` file (it'll pull in `.bin` + textures automatically).
2. Export as glTF 2.0 → format: **glTF Binary (.glb)**.

### 3. Compress with Draco

Still on https://gltf.report:

1. With your GLB loaded, go to the **Edit** tab.
2. Click **Compress → Draco**.
3. Click **Compress → Texture** → format **KTX2** (Basis Universal).
4. Click **Export** → save the optimized `.glb`.

**Typical results:**

| Asset | Original | Draco+KTX2 |
|-------|---------|-----------|
| Quaternius Mountain | 600 KB | 80 KB |
| Cyberpunk building | 2.4 MB | 280 KB |
| Temple | 1.8 MB | 320 KB |
| Character (RPM) | 8 MB | 1.5 MB |

### 4. Place in `public/models/`

Follow the file paths in each slot's section above. Keep a consistent
directory structure:

```
public/models/
├── avatars/
│   └── yatri.glb
├── cosmic/
│   ├── mountains.glb
│   └── glyphs.glb
├── kailash/
│   ├── kailash.glb
│   └── steps.glb
├── neural/
│   └── cave.glb
├── projects/
│   └── archway.glb
├── street/
│   ├── cyberpunk-block.glb
│   └── props.glb
├── temple/
│   ├── temple.glb
│   └── pillar-base.glb
└── timeline/
    ├── peaks.glb
    └── shrine.glb
```

### 5. Register & reload

Edit `lib/assets.ts`, uncomment the relevant block(s), `npm run dev`, and
hard-reload (`Ctrl+Shift+R`) in the browser.

---

## Tuning scale / position / rotation

After registering an asset, you'll almost certainly need to tweak its
transform. Here's how to dial it in.

### Scale guide by asset type

| Asset type | Typical scale | Notes |
|-----------|---------------|-------|
| Character (ReadyPlayerMe / RPM-sized) | `0.9 – 1.2` | RPM models are ~1.7 m tall |
| Quaternius character | `0.8 – 1.5` | Smaller bodies than RPM |
| Mountain (Quaternius single) | `4 – 8` | Wide assets need bigger scale |
| Mountain (Mountain Group) | `3 – 5` | Already wide |
| Kailash (Quaternius) | `6 – 10` | The hero — make it big |
| Temple | `2 – 4` | Read at distance |
| Cave rocks / crystals | `1 – 2` | Scatter, don't dominate |
| Lamps / props | `0.4 – 0.8` | Detail elements |
| Buildings (cyberpunk kit) | `0.8 – 1.5` | Pre-sized for game scale |

### How to find the right scale fast

1. Set `scale: 1` first, reload.
2. Look at the rendered scene — count how many "rooms tall" the asset is.
3. If it should be the height of a mountain (≈20 units), and it currently
   reads as 2 units, set `scale: 10`. Halve from there.
4. **Reload (Ctrl+R)** between each change — no need to rebuild.

### Position units

The scene uses world units where:

- `1 unit ≈ 1 meter`
- Camera starts at `[0, 2, 18]` (eye level, slightly back)
- Each scene anchors are pre-positioned — see `CameraRig.tsx`

So:

- `position: [0, 0, -20]` = on the ground, 20 m in front of camera
- `position: [5, 3, -10]` = 5 m to the right, 3 m up, 10 m forward

### Rotation values

- `rotation: [x, y, z]` in **radians**.
- Common values:
  - `0` — no rotation
  - `Math.PI / 4` — 45°
  - `Math.PI / 2` — 90°
  - `Math.PI` — 180°
  - `-Math.PI / 2` — -90°
- The Y axis is up. To rotate around the vertical (turn left/right),
  use `[0, Math.PI / 4, 0]`.

---

## Performance budget

The site loads in **< 2 seconds** on a 4G connection with only the procedural
fallback. Each asset adds load time. Stay within these limits to keep it
that way.

| Tier | Max per asset | Max total |
|------|---------------|----------|
| **Hero** (Kailash, Temple, City) | 2 MB | 8 MB |
| **Medium** (Mountains, Cave, Archway) | 800 KB | 4 MB |
| **Polish** (Lamps, Shrines, Glyphs) | 300 KB | 2 MB |
| **Character** | 1.5 MB | 1.5 MB |
| **Site total** | — | **< 15 MB desktop / < 5 MB mobile** |

If you exceed these, the postprocessing-heavy first paint will stutter on
mid-range mobile. Use `gltf.report`'s Draco + KTX2 to stay under budget.

---

## Troubleshooting

### "Nothing changed after I added the registry entry"

- Check the file path matches exactly: `/models/...` (leading slash, no
  `public/` prefix in the path).
- Hard-reload the browser (`Ctrl+Shift+R` or `Cmd+Shift+R`).
- Open DevTools → Network → reload → search for the `.glb` file. If it's
  404, the path is wrong.

### "The asset shows up but it's invisible / way off-screen"

- Scale is wrong. Set `scale: 1` first, then read the size of the asset in
  the scene. Scale up/down accordingly.
- Or the asset's pivot is far from origin. Use `position` to nudge it.

### "The asset shows up but it's way too dark"

- Procedural lighting in scenes is intentionally moody. Add a `tint` to
  the registry entry to boost the emissive — even non-emissive surfaces
  pick up some glow.
- For obviously-too-dark assets, set `hologram: true` for a glowing
  appearance.

### "Animations don't play"

- The avatar GLB must have animations baked in (Blender export with
  Animations checked) OR you must register them separately in
  `ANIMATION_REGISTRY`.
- Animation names must match: the `<Character>` component plays the first
  clip by default. Pass `animation="yatri.meditate"` to play a specific
  one.

### "My asset throws a 404 / parse error"

- The `<AssetErrorBoundary>` silently falls back to the procedural
  placeholder. Open DevTools → Console — look for `[ModelSlot] asset
  load failed →` warnings (dev mode only).
- Check the GLB is valid by opening it on https://gltf.report — if the
  viewer fails, the file is broken.

### "TypeScript complains about my slot key"

- The slot name must be one of the keys in `ModelSlotName` union type in
  `lib/assets.ts`. Don't add new slot keys without also adding them to
  that union and wiring them into a scene component.

---

## License compliance

| Source | License | What to do |
|--------|---------|-----------|
| Quaternius / Kenney (most Poly Pizza) | CC0 | No attribution required, but a thank-you in your footer is karma. |
| Other Poly Pizza authors | CC-BY | Credit the author + link to the model in the page footer. |
| Sketchfab CC-BY | CC-BY | Credit + link required. |
| Meshy AI | Per Meshy's terms | Generally free for personal/commercial. Check current Meshy ToS. |
| KitBash3D / CGTrader (paid) | Per licence | Read the licence file you got with the kit. |
| ReadyPlayerMe avatars | Per RPM terms | Free for personal use. |
| Mixamo animations | Free | No attribution required for use. |

Add an attribution footer fragment if any of your assets need CC-BY credit:

```tsx
// components/overlay/AttributionFooter.tsx (suggested)
<div className="text-[10px] text-foreground/40">
  3D assets:{" "}
  <a href="https://poly.pizza/u/Quaternius">Quaternius</a> ·{" "}
  <a href="https://poly.pizza/u/Kay%20Lousberg">Kay Lousberg</a> · CC0/CC-BY
</div>
```

---

## Final advice

1. **Don't try to register all 13 slots on day one.** Pick the [top 5
   quick-start](#quick-start-5-assets-for-80-of-the-impact) and ship.
2. **Iterate per scene.** Register one slot, reload, tune, register the
   next.
3. **Trust the fallback.** If an asset isn't quite right, just comment out
   its registry block — the procedural version comes back instantly.
4. **The orb, portals, mandala, neural sphere, particles, post-FX, and
   atmosphere stay procedural** — they're the soul of the site.
5. **Don't sweat photorealism.** Stylized low-poly + cinematic lighting
   (which we already have) reads as more premium than mid-quality realism.

You can launch this portfolio today even with zero assets registered. Every
asset is pure upgrade.
