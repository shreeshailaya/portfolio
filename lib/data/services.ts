import {
  Rocket,
  Bot,
  Palette,
  MessageSquare,
  Server,
  Workflow,
  Mail,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  idealFor: string;
  gradient: string;
}

export const SERVICES: Service[] = [
  {
    icon: Rocket,
    title: "Product Engineering & MVP Development",
    description:
      "From idea to launch — fast and focused. We transform concepts into real, working software: prototypes, proofs of concept, or full MVPs that are scalable, clean and cost-efficient.",
    idealFor: "Startups, entrepreneurs, SaaS builders",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    icon: Bot,
    title: "AI & Automation Workflows",
    description:
      "Automate repetitive tasks and scale smarter. Intelligent workflows using Python, N8N and custom APIs to automate your business logic — from lead capture to customer support.",
    idealFor: "Agencies, digital sellers, B2B systems",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    icon: Palette,
    title: "Custom Web Design & Development",
    description:
      "Beautiful. Functional. Optimized. Modern, responsive websites tailored to your brand — portfolios, landing pages, business sites. Mobile-friendly, SEO-ready, lightning-fast.",
    idealFor: "Personal brands, businesses, consultants",
    gradient: "from-green-600 to-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Bulk SMS Services",
    description:
      "Reach thousands, instantly. Promotional, transactional or OTP SMS with reliable bulk messaging. Integrate with your CRM, website or backend systems.",
    idealFor: "Schools, retailers, logistics",
    gradient: "from-orange-600 to-red-600",
  },
  {
    icon: Server,
    title: "Web Hosting",
    description:
      "Reliable and secure hosting to keep you online. Affordable, fast hosting for sites, web apps, and landing pages — with support and uptime monitoring.",
    idealFor: "WordPress sites, custom sites, landing pages",
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    icon: Workflow,
    title: "N8N Workflow Hosting",
    description:
      "Self-hosted N8N for full control of your automations. Optimized hosting so you can build powerful no-code/low-code workflows without platform limits.",
    idealFor: "Automation lovers, technical founders",
    gradient: "from-teal-600 to-green-600",
  },
  {
    icon: Mail,
    title: "Email Hosting",
    description:
      "Branded email that works. Professional you@yourdomain.com addresses with secure, easy-to-manage hosting. Webmail, IMAP/SMTP, spam protection.",
    idealFor: "Businesses, freelancers, teams",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: Globe,
    title: "WordPress Design & Development",
    description:
      "Full control, endless possibilities. Custom plugins, themes, advanced customization, performance optimization and integrations.",
    idealFor: "Self-hosted CMS solutions",
    gradient: "from-gray-600 to-blue-600",
  },
];
