import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollProgressProvider } from "@/components/providers/ScrollProgressProvider";
import { ProjectModalProvider } from "@/components/providers/ProjectModalProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreeshail.dev"),
  title: {
    default:
      "Shreeshail Vitkar — The Digital Yatri | AI · Automation · Data Engineering",
    template: "%s — The Digital Yatri",
  },
  description:
    "A cinematic journey through AI, automation and Indian futurism. Portfolio of Shreeshail Vitkar — Technologist, Data Engineer & Automation Architect.",
  keywords: [
    "Shreeshail Vitkar",
    "AI engineer",
    "Data engineer",
    "Automation",
    "Python",
    "AWS",
    "FastAPI",
    "Portfolio",
    "3D portfolio",
    "Digital Yatri",
  ],
  authors: [{ name: "Shreeshail Vitkar" }],
  creator: "Shreeshail Vitkar",
  openGraph: {
    title: "Shreeshail Vitkar — The Digital Yatri",
    description:
      "A cinematic journey through AI, automation and Indian futurism.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreeshail Vitkar — The Digital Yatri",
    description: "AI · Automation · Engineering · Vision",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${mono.variable} dark`}
    >
      <body className="bg-cosmos text-foreground antialiased">
        <ScrollProgressProvider>
          <LenisProvider>
            <ProjectModalProvider>{children}</ProjectModalProvider>
          </LenisProvider>
        </ScrollProgressProvider>
      </body>
    </html>
  );
}
