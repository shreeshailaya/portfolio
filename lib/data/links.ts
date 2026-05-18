import {
  Bot,
  Mail,
  MessageSquare,
  ShoppingCart,
  BookOpen,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface UsefulLink {
  title: string;
  displayUrl: string;
  href: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export const USEFUL_LINKS: UsefulLink[] = [
  {
    title: "Agent Mock",
    displayUrl: "agentmock.com",
    href: "https://agentmock.com",
    description: "AI HR platform to hire the suitable candidate",
    icon: Bot,
    gradient: "from-purple-600 to-blue-600",
  },
  {
    title: "Email Login",
    displayUrl: "email.linksinbio.in",
    href: "https://email.linksinbio.in",
    description: "Professional email hosting and management portal",
    icon: Mail,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "SMS Panel",
    displayUrl: "sms.hishree.com",
    href: "http://sms.hishree.com",
    description: "Bulk SMS services and messaging platform",
    icon: MessageSquare,
    gradient: "from-green-600 to-blue-600",
  },
  {
    title: "PublicMart E-Comm Store",
    displayUrl: "publicmart.in",
    href: "https://publicmart.in",
    description: "Digital marketplace for creative products and digital packs",
    icon: ShoppingCart,
    gradient: "from-orange-600 to-red-600",
  },
  {
    title: "CDAC Notes",
    displayUrl: "github.com/shreeshailaya/C-DAC-Notes",
    href: "https://github.com/shreeshailaya/C-DAC-Notes",
    description: "Comprehensive study materials and notes for CDAC courses",
    icon: BookOpen,
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    title: "Job Portal",
    displayUrl: "linksinbio.in/jobs",
    href: "https://linksinbio.in/jobs",
    description: "Find and post job opportunities in technology and development",
    icon: Briefcase,
    gradient: "from-teal-600 to-green-600",
  },
];
