import {
  Bot,
  ShoppingCart,
  FileText,
  Database,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface MainProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  href: string;
  tags: string[];
  // Portal theme — for procedural project portals
  portal: {
    color: string;       // hex tint for the portal core
    accent: string;      // hex tint for accent ring
    glow: string;        // hex tint for glow
  };
}

export interface OtherProject {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export const MAIN_PROJECTS: MainProject[] = [
  {
    id: "agentmock",
    title: "AgentMock.com",
    subtitle: "AI Product Studio",
    description:
      "A vision-led platform focused on creating lightweight AI tools and automations. From AI-powered chatbots trained on private documents, to job preparation engines.",
    features: [
      "Create Resume for This Job",
      "Prepare Me for This Interview",
      "Privacy-respecting AI agents",
      "Open models & serverless backends",
    ],
    icon: Bot,
    href: "https://agentmock.com",
    tags: ["AI", "Python", "Serverless", "Privacy-First"],
    portal: { color: "#8A5BFF", accent: "#36F5FF", glow: "#B388FF" },
  },
  {
    id: "publicmart",
    title: "PublicMart.in",
    subtitle: "Digital Marketplace",
    description:
      "An e-commerce site selling unique digital packs with automated delivery systems. Built with webhook-first automation using Python and AWS Lambda.",
    features: [
      "1500+ Animated Funny Reels",
      "1000+ Email Templates",
      "250+ Hindi-English eBooks",
      "Zero-touch fulfillment",
    ],
    icon: ShoppingCart,
    href: "https://publicmart.in",
    tags: ["E-commerce", "WooCommerce", "AWS Lambda", "Automation"],
    portal: { color: "#FF8A1F", accent: "#36F5FF", glow: "#FF3DA5" },
  },
];

export const OTHER_PROJECTS: OtherProject[] = [
  {
    title: "AI Chatbot from Documents",
    description:
      "Lightweight chatbot framework that answers only from uploaded document context with PDF parsing and multilingual support.",
    icon: FileText,
    tags: ["AI", "PDF Processing", "Multilingual"],
  },
  {
    title: "WooCommerce → Google Drive Integration",
    description:
      "Automated system to share private digital files via Drive API post-purchase using webhooks.",
    icon: Database,
    tags: ["API Integration", "Webhooks", "Automation"],
  },
  {
    title: "Microsoft Dynamics 365 Tools",
    description:
      "Async and secure Python-based contact insertion/deletion tools with performance optimization.",
    icon: Users,
    tags: ["Enterprise", "Python", "Performance"],
  },
  {
    title: "CSV-to-Database Mapper",
    description:
      "Automated mapping and ingestion system for mismatched CSVs and SQL table schemas.",
    icon: Zap,
    tags: ["Data Engineering", "ETL", "SQL"],
  },
];
