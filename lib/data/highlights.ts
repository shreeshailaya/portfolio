import {
  Code2,
  Zap,
  Database,
  Bot,
  Users,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ABOUT = {
  badge: "About Me",
  title: { line1: "Building the Future with", highlight: "Code & Vision" },
  intro:
    "I'm a self-driven technologist, data engineer and automation enthusiast with a strong foundation in Python, cloud-native architecture and real-world API integrations. I specialize in building automated backend systems, AI-powered tools and digital commerce platforms that solve real business problems with speed and scale.",
  spotlight: {
    title: "Technical Excellence & Product Thinking",
    body: "I blend technical execution with product thinking, and have launched multiple MVPs that validate ideas, drive revenue and enable automation-first workflows.",
  },
};

export const HIGHLIGHTS: Highlight[] = [
  {
    icon: Code2,
    title: "Full-Stack Builder",
    description: "I don't just plan — I ship working tools and MVPs that generate value",
  },
  {
    icon: Zap,
    title: "End-to-End Automator",
    description:
      "From API integration to digital delivery to cloud-based workflows",
  },
  {
    icon: Database,
    title: "Business-Aware Technologist",
    description:
      "Every tool I build solves a real need and often results in product-market fit tests",
  },
  {
    icon: Bot,
    title: "AI & Automation Expert",
    description:
      "Constantly exploring new technologies in AI, data engineering and automation",
  },
  {
    icon: Users,
    title: "Supportive Mentor",
    description:
      "I've mentored junior engineers and encourage open-source contributions",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Architecture",
    description:
      "Strong foundation in Python, cloud-native architecture and real-world API integrations",
  },
];
