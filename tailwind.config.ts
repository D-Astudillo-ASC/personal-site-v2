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
        primary: {
          light: "#f8f9fa",
          dark: "#121212",
        },
        text: {
          light: "#1a1a1a",
          dark: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-helvetica-neue)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
