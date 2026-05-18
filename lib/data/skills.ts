import {
  Code,
  Cloud,
  Globe,
  Zap,
  Database,
  Bot,
  type LucideIcon,
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
  /** Tailwind gradient classes from-X to-Y */
  gradient: string;
  /** Hex color used inside the 3D temple pillar. */
  pillarColor: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Python", "Java", "Shell", "JavaScript"],
    gradient: "from-blue-500 to-purple-600",
    pillarColor: "#6B8AFF",
  },
  {
    title: "Cloud & Infra",
    icon: Cloud,
    skills: ["AWS (IOT, Lambda, S3, AppFlow)", "Docker", "CI/CD"],
    gradient: "from-emerald-500 to-cyan-500",
    pillarColor: "#36F5FF",
  },
  {
    title: "APIs",
    icon: Globe,
    skills: [
      "Salesforce",
      "Google Drive",
      "WooCommerce REST",
      "Microsoft Dynamics Web API",
    ],
    gradient: "from-fuchsia-500 to-pink-500",
    pillarColor: "#FF3DA5",
  },
  {
    title: "Automation",
    icon: Zap,
    skills: ["N8N", "Webhooks", "FastAPI", "Event-based Architecture"],
    gradient: "from-amber-400 to-orange-500",
    pillarColor: "#FF8A1F",
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["Glue", "ETL pipelines", "Airbyte", "Databricks"],
    gradient: "from-indigo-500 to-sky-500",
    pillarColor: "#7BA7FF",
  },
  {
    title: "AI/ML Stack",
    icon: Bot,
    skills: ["PyTorch", "Open-source LLMs", "Contextual Chatbots"],
    gradient: "from-rose-500 to-purple-600",
    pillarColor: "#B388FF",
  },
];

export interface CoreStrength {
  name: string;
  level: number; // 0-100
}

export const CORE_STRENGTHS: CoreStrength[] = [
  { name: "Python Development", level: 95 },
  { name: "API Integration", level: 90 },
  { name: "Cloud Architecture", level: 85 },
  { name: "Automation Systems", level: 92 },
  { name: "Data Engineering", level: 88 },
  { name: "AI/ML Implementation", level: 85 },
];
