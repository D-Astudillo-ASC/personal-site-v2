import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    boxShadow: {
      top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
      },
      colors: {
        border: "var(--border-color)",
        text: "var(--text-color)",
        background: "var(--background-color)",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        helvetica: ["var(--font-helvetica)"],
      },
    },
  },
  plugins: [],
};
export default config;
