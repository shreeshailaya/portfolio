import { ExperienceMount } from "@/components/canvas/ExperienceMount";
import { Nav } from "@/components/overlay/Nav";
import { ScrollHint } from "@/components/overlay/ScrollHint";
import { JourneyProgress } from "@/components/overlay/JourneyProgress";
import { AmbientAudio } from "@/components/overlay/AmbientAudio";
import { CosmicOverlay } from "@/components/overlay/CosmicOverlay";
import { StreetOverlay } from "@/components/overlay/StreetOverlay";
import { ProjectsOverlay } from "@/components/overlay/ProjectsOverlay";
import { TempleOverlay } from "@/components/overlay/TempleOverlay";
import { NeuralOverlay } from "@/components/overlay/NeuralOverlay";
import { TimelineOverlay } from "@/components/overlay/TimelineOverlay";
import { KailashOverlay } from "@/components/overlay/KailashOverlay";
import { fetchBlogs } from "@/lib/medium";

// Revalidate the page (and its Medium feed) every hour.
export const revalidate = 3600;

export default async function Page() {
  const posts = await fetchBlogs();

  return (
    <main className="relative">
      {/* Persistent fixed 3D canvas */}
      <ExperienceMount />

      {/* Subtle vignette + grain on top of canvas for cinematic feel */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(2,3,10,0.55) 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] noise mix-blend-screen"
        aria-hidden="true"
      />

      <Nav />
      <JourneyProgress />
      <ScrollHint />
      <AmbientAudio />

      <CosmicOverlay />
      <StreetOverlay />
      <ProjectsOverlay />
      <TempleOverlay />
      <NeuralOverlay />
      <TimelineOverlay />
      <KailashOverlay posts={posts} />
    </main>
  );
}
