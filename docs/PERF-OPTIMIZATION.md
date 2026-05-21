# Performance Optimization Guide

This document captures the perf model of the site, what's already been
tuned, and how to optimize GLB assets before you ship them.

If "the site stutters while scrolling" or "the first paint takes ages",
start here.

---

## 1. What's already been done

### CPU → GPU particles

The biggest scroll-stutter source was two CPU loops running every
single frame:

| Component | Old cost / frame | New cost / frame |
| --- | --- | --- |
| `GlobalParticles` | 1400 sin/cos + 4200 array writes + buffer re-upload | 1 uniform write |
| `NeuralCave` flow | 900 sin/cos + 2700 array writes + buffer re-upload | 1 uniform write |

Both now use a `<shaderMaterial>` with a `uTime` uniform — motion is
computed entirely in the vertex shader on the GPU. The particle buffer
is uploaded once at mount and never touched again.

### Scene `useFrame` early-return

Every one of the 7 scenes used to run its per-frame animation logic
unconditionally — even while the camera was nowhere near it. Now each
scene's `useFrame` short-circuits via:

```ts
group.current.visible = visibility > 0.005;
if (!group.current.visible) return;
```

When you're scrolling through scene 1, scenes 2–7 contribute zero
per-frame work. This is by far the cheapest huge win in the page.

### Removed `group.traverse` opacity loops

`CosmicAwakening` and `StreetOfSystems` used to walk the entire scene
graph (including loaded GLB internals — hundreds of nodes) every frame
to tween material opacities. Replaced with a single `group.visible`
toggle. The crossfade is now controlled by the scene atmosphere
interpolation in `SceneAtmosphere.tsx`.

### Particle counts trimmed

| What | Was | Now |
| --- | --- | --- |
| `GlobalParticles` desktop | 1400 | 700 |
| `GlobalParticles` mobile | 600 | 250 |
| `NeuralCave` flow | 900 | 600 |
| `SceneSparkles` total desktop | ~990 | ~580 |
| `SceneSparkles` total mobile | ~445 | ~175 |
| `CosmicAwakening` stars | 900 | 350 |

### PostFX lite

- Bloom kernel `LARGE` → `MEDIUM` (≈ ½ cost, same look on the kind of
  high-contrast specular hits we have).
- `Noise` pass removed — adds a fullscreen draw that's redundant once
  you have fog + film grain in the bloom halo.
- Bloom intensity dropped from 1.45 → 1.0 so overlays read.

### DPR ceilings

Desktop: `[1, 1.75]` (was `[1, 2]`).
Mobile: `[1, 1.25]` (was `[1, 1.5]`).

Pixel count scales quadratically with DPR, so even a small ceiling cut
is a big GPU win on retina laptops and modern phones.

### Dead procedural fallbacks removed

The `<Character slot="cosmic.character">` block used to inline a
procedural monk silhouette as its loading fallback. Since `yatri.glb`
is registered, that code only ever rendered for ~150 ms during load.
Stripped, along with the now-unused `THREE` opacity tweens it used to
drive.

---

## 2. How to optimize GLBs

The repo ships a one-shot script. After dropping new GLBs into
`public/models/`, run:

```bash
npm install            # first time — installs gltf-pipeline + glob
npm run optimize:glb   # bulk-optimize every GLB in public/models/
```

### What it does

- Walks `public/models/**/*.glb` recursively
- Runs each through `gltf-pipeline` with Draco mesh compression
  (`compressionLevel: 7`, lossy on normals/uvs only)
- Replaces files in place (commit the originals before running so you
  can rerun with different settings)
- Prints before/after sizes per file + a total

### Variants

```bash
npm run optimize:glb:dry         # dry run — show savings, don't write
npm run optimize:glb -- foo.glb  # one file
```

### Typical savings

| Asset type | Typical reduction |
| --- | --- |
| Architectural meshes (temple, archway) | 60–80% |
| Sculpted characters (Yatri) | 40–60% |
| Sparse low-poly props | 20–35% |
| Textured PBR sets | 30–50% (only meshes; textures see step 3) |

The `ModelSlot` and `Character` loaders already configure the Draco
decoder (`gstatic.com/draco/versioned/decoders/1.5.7/`), so the
optimized files load transparently.

---

## 3. Optimizing textures (next step)

Draco only touches mesh data — for textured assets, the real bulk lives
in the embedded PNG/JPEGs. Two paths:

### a) Manual compression in `gltf.report`

1. Visit https://gltf.report
2. Drop the GLB on the page
3. Inspector tab → resize any 2K/4K texture down to 1024 or 512 (most
   web 3D doesn't benefit beyond 1K)
4. Compress tab → KTX2 / Basis with default ETC1S settings (60–90%
   reduction on textures)
5. Download — replace the file in `public/models/`

### b) CLI with `@gltf-transform/cli`

For repeatable batch optimization including textures:

```bash
npx -y @gltf-transform/cli@latest optimize \
  public/models/architecture/temple.glb \
  public/models/architecture/temple.optimized.glb \
  --texture-compress webp \
  --texture-size 1024
```

KTX2 requires the Three.js `KTX2Loader` to be wired in — switch to that
once enough assets need it. WebP works out of the box.

---

## 4. Pre-flight checklist for new assets

Before adding a new GLB to `lib/assets.ts`:

- [ ] Decimated in Blender? Aim for **< 30k tris** for hero meshes,
      **< 8k** for props.
- [ ] Joined small parts so the GLB has **< 10 mesh nodes**.
- [ ] Removed unused vertex colour / UV maps.
- [ ] Textures resized to a power of two, max **1024×1024** unless it's
      a hero close-up.
- [ ] Ran `npm run optimize:glb` after dropping the file.
- [ ] Verified in dev — open the page, check Network tab, file is
      smaller than 1 MB ideally.

---

## 5. Performance budget

Targets on a mid-2020 laptop (Intel UHD + 4-core i5):

| Metric | Target | How to check |
| --- | --- | --- |
| First Contentful Paint | < 1.8 s | Lighthouse |
| Largest Contentful Paint | < 2.5 s | Lighthouse |
| Total Blocking Time | < 250 ms | Lighthouse |
| Sustained scroll FPS | 50+ | Chrome DevTools Performance, scroll 10 s |
| Canvas frame time | < 16 ms | R3F devtools (`@react-three/perf` if added) |

---

## 6. If you're still hitting frame drops

Investigate in this order:

1. **DevTools Performance** → record a scroll → look for long frames
   (red bars). The flame graph will show which function is the
   bottleneck.
2. **`onCompile` cost** — a new shader compiling in mid-scroll causes a
   visible stall. Pre-compile with `gl.compile(scene, camera)` after
   load if needed.
3. **Layout thrash** — if a long frame has DOM work, audit any HTML
   overlays for forced reflows.
4. **GLB still too big** — even with Draco, a 5 MB GLB will block
   first paint for a slow connection. Texture-compress (see step 3).
5. **Reduce another scene** — drop a non-essential effect (e.g. a
   `LightShafts` instance) if a particular GPU is hitting the budget.
