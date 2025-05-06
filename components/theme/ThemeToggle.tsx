"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
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
                opacity-0
                animate-fade-in
                transition-opacity duration-700 ease-out
                `}
      aria-label="Toggle theme"
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? faMoon : faSun}
        className="w-5 h-5 hover:text-gray-200 dark:hover:text-gray-500 transition-colors duration-500 ease-in-out"
      />
    </button>
  );
}
