import { Zap, Shield, Lightbulb, Users, type LucideIcon } from "lucide-react";

export const VISION = {
  badge: "Vision & Future",
  title: { line1: "Simplifying Digital", highlight: "Complexity" },
  subtitle:
    "I'm on a mission to simplify digital complexity for solopreneurs, creators and businesses by delivering fast, privacy-respecting and AI-powered systems.",
  mission: {
    title: "My Mission",
    body: "Whether it's a fully automated product delivery system, a smart data pipeline, or a micro SaaS idea — I build with clarity, ownership and a focus on results.",
  },
  drivers: [
    "Building tools that generate real business value",
    "Enabling automation-first workflows for modern businesses",
    "Democratizing access to AI and automation technologies",
    "Creating privacy-respecting solutions in an AI-driven world",
  ],
  points: [
    {
      icon: Zap as LucideIcon,
      title: "Fast & Efficient",
      description:
        "Delivering solutions that work at speed without compromising quality",
    },
    {
      icon: Shield as LucideIcon,
      title: "Privacy-Respecting",
      description:
        "Building systems that protect user data and respect digital privacy",
    },
    {
      icon: Lightbulb as LucideIcon,
      title: "AI-Powered",
      description:
        "Leveraging artificial intelligence to solve complex business problems",
    },
    {
      icon: Users as LucideIcon,
      title: "User-Focused",
      description:
        "Creating tools that genuinely improve workflows and drive results",
    },
  ],
} as const;
