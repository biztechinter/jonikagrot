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
      },
    },
  },
  plugins: [],
};
export default config;
