"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@/lib/fontawesome-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
                rounded-full
                transition-slower
                hover:scale-110
                `}
      aria-label="Toggle theme"
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? faMoon : faSun}
        className="w-5 h-5"
      />
    </button>
  );
}
