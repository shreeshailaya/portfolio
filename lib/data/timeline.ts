import { Sparkles, GitBranch, Mic, BrainCircuit, Database, type LucideIcon } from "lucide-react";

export interface TimelinePoint {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  color: string;
}

export const TIMELINE: TimelinePoint[] = [
  {
    id: "mech2it",
    title: "Mech2IT",
    blurb:
      "Crossed over from mechanical engineering into software, building from a tiny startup hut and learning the craft the hard way.",
    icon: Sparkles,
    color: "#FF8A1F",
  },
  {
    id: "open-source",
    title: "Open Source",
    blurb:
      "Started contributing to public repos, sharing notes & helping others ship — a glowing GitHub shrine.",
    icon: GitBranch,
    color: "#36F5FF",
  },
  {
    id: "wordcamp",
    title: "WordCamp Speaker",
    blurb:
      "Stood on the WordCamp stage — sharing automation and engineering ideas with the community.",
    icon: Mic,
    color: "#FF3DA5",
  },
  {
    id: "ai-systems",
    title: "AI Systems",
    blurb:
      "Built AI-first products — chatbots that respect privacy, agents that prep candidates for interviews.",
    icon: BrainCircuit,
    color: "#B388FF",
  },
  {
    id: "data-eng",
    title: "Data Engineering",
    blurb:
      "Massive pipeline bridges — Glue, Airbyte, Databricks — moving glowing cubes of data where they belong.",
    icon: Database,
    color: "#7BA7FF",
  },
];
