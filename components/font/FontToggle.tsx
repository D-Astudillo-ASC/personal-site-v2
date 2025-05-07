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
        opacity-0
        animate-fade-in
        transition-all duration-300 ease-in-out
        hover:scale-110
      `}
      aria-label={`Switch to ${font === "helvetica" ? "monospace" : "Helvetica Neue"} font`}
      title={`Current font: ${font === "helvetica" ? "Helvetica Neue" : "Monospace"}`}
    >
      <FontAwesomeIcon
        icon={faFont}
        className="w-5 h-5 hover:text-gray-200 dark:hover:text-gray-500 transition-colors duration-500 ease-in-out"
      />
    </button>
  );
}
