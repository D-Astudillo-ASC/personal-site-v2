"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { useFont } from "@/app/providers/FontProvider";
import { useEffect, useState } from "react";

export default function FontToggle() {
  const [mounted, setMounted] = useState(false);
  const { font, setFont } = useFont();

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setFont(font === "helvetica" ? "monospace" : "helvetica")}
      className={`
        rounded-full
        transition-slow
        hover:scale-110
      `}
      aria-label={`Switch to ${font === "helvetica" ? "monospace" : "Helvetica Neue"} font`}
      title={`Current font: ${font === "helvetica" ? "Helvetica Neue" : "Monospace"}`}
    >
      <FontAwesomeIcon
        icon={faFont}
        className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-slower"
      />
    </button>
  );
}
