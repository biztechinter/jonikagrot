import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#19382D",
          light: "#234D3E",
          dark: "#10271F",
        },
        evergreen: {
          DEFAULT: "#10271F",
          dark: "#0B1B15",
        },
        ivory: {
          DEFAULT: "#F7F4EC",
          dark: "#EDE8DC",
          light: "#FCFAF6",
        },
        sand: {
          DEFAULT: "#E8DCC4",
          light: "#F2EBE0",
          dark: "#D4C3A3",
        },
        earth: {
          DEFAULT: "#A88B65",
          light: "#BFAB8C",
          dark: "#8C714E",
        },
        charcoal: {
          DEFAULT: "#282C29",
          dark: "#1A1D1B",
          muted: "#4A504B",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(16, 39, 31, 0.06), 0 1px 4px -1px rgba(16, 39, 31, 0.04)",
        elevated: "0 12px 24px -6px rgba(16, 39, 31, 0.12), 0 4px 8px -2px rgba(16, 39, 31, 0.06)",
        card: "0 4px 20px -2px rgba(16, 39, 31, 0.08)",
        "luxury-glow": "0 0 0 1px rgba(168, 139, 101, 0.15), 0 8px 32px -4px rgba(16, 39, 31, 0.14)",
        "inner-sand": "inset 0 1px 2px rgba(168, 139, 101, 0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in-slow": "fade-in-slow 1.2s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        shimmer: "shimmer 2.5s infinite linear",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;

