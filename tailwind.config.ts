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
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
      },
      transitionDuration: {
        "fast": "150ms",
        "normal": "200ms", 
        "slow": "300ms",
        "slower": "500ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      colors: {
        border: "var(--border-color)",
        text: "var(--text-color)",
        background: "var(--background-color)",
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
