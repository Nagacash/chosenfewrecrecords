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
        background: "#090909",
        surface: "#111111",
        surface2: "#1A1A1A",
        accent: "#FF6A00",
        gold: "#C8A84B",
        green: "#1A3028",
        cream: "#F0EDE6",
        muted: "#888888",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "6px",
      },
      letterSpacing: {
        section: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
