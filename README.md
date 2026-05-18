# The Digital Yatri

A cinematic 3D portfolio for **Shreeshail Vitkar** — a continuous scroll-driven
journey through AI, automation, and Indian futurism, told across seven scenes:

1. **Cosmic Awakening** — high-Himalayan plateau, neural orb, identity reveal
2. **Street of Systems** — cyberpunk Indian city, skill towers, data pipelines
3. **Hall of Projects** — courtyard of project portals (AgentMock, PublicMart, …)
4. **Temple of Knowledge** — Kailash-inspired hall with skill pillars
5. **Neural Cave** — AI brain, embedding rivers, glowing roots
6. **Timeline Path** — career milestones along a snowy mountain trail
7. **The Kailash Summit** — final reveal, memory orbs, contact + blogs

The whole site is one persistent R3F canvas with a scroll-bound cinematic
camera rig. HTML overlays animate over the top with Framer Motion. Smooth
scroll comes from Lenis. The hero orb rises again at the end to close the
loop.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **React Three Fiber** + **drei** for the procedural 3D experience (no GLBs)
- **Framer Motion** for overlay micro-interactions
- **Lenis** for buttery smooth scroll
- **GSAP** (available for future scroll-trigger work)
- Server-side Medium RSS fetch with 1h ISR cache + fallback posts
- Output mode `standalone` — ready for Docker / VPS hosting

---

## Local development

Requires Node 20+ and npm 10+.

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run typecheck    # TypeScript check
npm run lint         # Next.js / ESLint
npm run build        # production build
npm start            # run the production build locally
```

---

## Content

Per the design contract, **`portfolio.json` is a reference file only and is
not imported anywhere at runtime**. All page content lives in plain TypeScript
modules under [`lib/data/`](./lib/data):

- `person.ts`, `projects.ts`, `skills.ts`, `services.ts`,
  `highlights.ts`, `timeline.ts`, `vision.ts`, `links.ts`, `blogs.ts`

Edit those to update copy.

The Medium RSS feed is fetched server-side on the `/` route and revalidated
hourly. A JSON endpoint is also exposed at **`/api/medium`** (same cache).

---

## Deploying on a self-hosted VPS with Docker

```bash
# build the image
docker compose build

# run
docker compose up -d

# the app is now listening on http://<host>:3000
```

The Dockerfile uses Next.js `output: "standalone"` for a slim runtime image
(~150 MB) running as a non-root `nextjs` user, with a healthcheck on port 3000.

### Reverse proxy (recommended)

Put Nginx / Caddy / Traefik in front of port 3000 to terminate TLS, e.g. for
Caddy:

```caddy
shreeshail.dev {
    encode zstd gzip
    reverse_proxy 127.0.0.1:3000
}
```

---

## Project structure

```
app/
  layout.tsx           # Fonts, providers, global metadata
  page.tsx             # Cinematic single-page composition
  globals.css          # Design tokens, glass utility, mandala bg
  api/medium/route.ts  # JSON Medium feed endpoint
  icon.svg / robots.ts

components/
  canvas/
    Experience.tsx          # Main R3F canvas
    ExperienceMount.tsx     # Client-only dynamic mount + loading fallback
    CameraRig.tsx           # Scroll-driven cinematic camera
    effects/
      GlobalParticles.tsx   # Cosmic dust spanning the journey
      NeuralOrb.tsx         # Hero orb — reused in Scene 1 + Scene 7
    scenes/
      CosmicAwakening.tsx
      StreetOfSystems.tsx
      HallOfProjects.tsx
      TempleOfKnowledge.tsx
      NeuralCave.tsx
      TimelinePath.tsx
      KailashSummit.tsx

  overlay/
    Nav.tsx, JourneyProgress.tsx, ScrollHint.tsx
    CosmicOverlay.tsx, StreetOverlay.tsx, ProjectsOverlay.tsx,
    TempleOverlay.tsx, NeuralOverlay.tsx, TimelineOverlay.tsx,
    KailashOverlay.tsx, BlogsSection.tsx, UsefulLinks.tsx
    RotatingRoles.tsx, SectionEyebrow.tsx

  providers/
    LenisProvider.tsx
    ScrollProgressProvider.tsx

lib/
  scenes.ts              # Scene timeline ↔ scroll progress mapping
  utils.ts               # cn(), lerp, smoothstep, etc.
  medium.ts              # RSS fetcher + parser (server-side)
  data/                  # All copy & content modules (typed)
```

---

## Design system

- **Palette:** `cosmos` (deep black-blue) · `saffron` (warm Indian glow) ·
  `neon-cyan` · `neon-violet` · `neon-magenta` · `kailash` (snow / stone)
- **Display font:** Cinzel — modern Sanskrit-inspired feel
- **Body font:** Inter
- **Mono:** JetBrains Mono — used for HUD numerics
- Subtle `noise`, `glass`, `mandala-bg`, `hud-corner` utility helpers in
  `globals.css`

---

## Asset Pipeline — Phase 2 upgrade workflow

The cinematic experience is built on the **AI-assisted kitbash workflow**:

- **70 % asset kitbash** — sourced GLBs from Sketchfab, Poly Pizza, Quaternius,
  KitBash3D, Meshy AI, etc.
- **20 % shader magic** — Bloom, Vignette, Noise, Chromatic Aberration via
  `@react-three/postprocessing` (see `components/canvas/effects/PostFX.tsx`)
- **10 % custom hero assets** — orb, portals, mandala emblems

Every scene already has **named asset slots** wired in. Each slot wraps the
existing procedural fallback. The site runs entirely procedurally out of the
box; drop a GLB in and a slot to the registry, and that piece is upgraded.

### Quick start

```bash
# 1. Source a GLB (Meshy AI prompt / Sketchfab download / Blender export)
public/models/kailash/kailash.glb

# 2. Register it in lib/assets.ts:
export const MODEL_REGISTRY = {
  "kailash.summit": {
    path: "/models/kailash/kailash.glb",
    scale: 1.0,
    position: [0, 0, 0],
  },
};

# 3. Reload — the procedural pyramid is replaced by your sculpt.
```

### Slot catalogue (10 upgrade points)

See [`public/models/README.md`](./public/models/README.md) for the full
catalogue, sourcing recommendations and file-size budgets.

The most impactful upgrades (in priority order):

1. **`kailash.summit`** — emotional ending hero asset (Scene 7)
2. **`cosmic.character`** — ReadyPlayerMe avatar (Scene 1, also reusable
   in Street + Kailash)
3. **`cosmic.mountains`** — Himalayan ridgeline (Scene 1)
4. **`temple.architecture`** — Indian/fantasy temple kit (Scene 4)
5. **`street.cityblock`** — cyberpunk street kit (Scene 2)

### Asset robustness

- Errors are caught by `<AssetErrorBoundary>` — a missing file or bad GLB
  silently falls back to the procedural placeholder.
- Files in `public/models/` are served directly by Next.js — no API,
  no CDN required for self-hosted deployment.
- Draco mesh decompression is on by default (CDN-loaded decoder).
- Optimize files with [gltf.report](https://gltf.report).

## Performance notes

- The canvas is mounted client-only via `next/dynamic` to avoid SSR cost.
- DPR and particle counts adapt to mobile in
  [`Experience.tsx`](./components/canvas/Experience.tsx).
- The whole 3D layer is procedural — **no external GLB/HDRI assets** ship.
- `prefers-reduced-motion` disables Lenis and animation entirely.
- First Load JS is ~140 kB for the entire site (Next.js 14 build report).

---

## License

Personal portfolio — all rights reserved by Shreeshail Vitkar.
