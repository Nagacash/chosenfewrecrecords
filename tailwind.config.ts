import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141210",
        surface: "#1C1915",
        surface2: "#28241F",
        accent: {
          DEFAULT: "#FF6A00",
          hover: "#FF8A33",
        },
        gold: "#D4B55A",
        caribbean: "#2D6A4F",
        kraft: "#E8DCC4",
        cream: "#F7F3EA",
        muted: "#A39E93",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "2px",
        none: "0",
      },
      letterSpacing: {
        section: "0.25em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "280ms",
        slow: "500ms",
      },
      zIndex: {
        nav: "200",
        overlay: "300",
        grain: "400",
      },
    },
  },
  plugins: [],
};
export default config;
