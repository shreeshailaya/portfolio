import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Digital Yatri palette
        cosmos: {
          DEFAULT: "#05060A",
          deep: "#02030A",
          midnight: "#0A0F2C",
          ink: "#0E1330",
        },
        saffron: {
          DEFAULT: "#FF8A1F",
          glow: "#FFB454",
          ember: "#FF6B00",
        },
        neon: {
          cyan: "#36F5FF",
          violet: "#8A5BFF",
          magenta: "#FF3DA5",
        },
        kailash: {
          snow: "#E8EEF7",
          ash: "#C9D1E0",
          stone: "#1A1F33",
        },
        border: "rgba(255,255,255,0.08)",
        ring: "rgba(255,138,31,0.45)",
        background: "#05060A",
        foreground: "#E8EEF7",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.7", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(0.5px)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float-y": "float-y 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2.2s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
      },
      backgroundImage: {
        "yatri-gradient":
          "radial-gradient(1200px 600px at 50% 10%, rgba(255,138,31,0.18), transparent 60%), radial-gradient(900px 500px at 80% 80%, rgba(54,245,255,0.10), transparent 60%), radial-gradient(900px 500px at 20% 80%, rgba(138,91,255,0.12), transparent 60%)",
        "mandala":
          "conic-gradient(from 0deg at 50% 50%, rgba(255,138,31,0.10), rgba(54,245,255,0.08), rgba(138,91,255,0.10), rgba(255,138,31,0.10))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,138,31,0.35), 0 0 80px rgba(54,245,255,0.18)",
        "glow-cyan": "0 0 30px rgba(54,245,255,0.45)",
        "glow-violet": "0 0 30px rgba(138,91,255,0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
