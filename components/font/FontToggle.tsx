"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@/lib/fontawesome-icons";
import { setGlobalFont } from "@/utils/font";

export default function FontToggle() {
  const [font, setFont] = useState<"helvetica" | "monospace">("helvetica");

  useEffect(() => {
    const saved = localStorage.getItem("font") as "helvetica" | "monospace" | null;
    if (saved) {
      setFont(saved);
    }
  }, []);

  const toggleFont = () => {
    const newFont = font === "helvetica" ? "monospace" : "helvetica";
    setFont(newFont);
    setGlobalFont(newFont);
  };

  return (
    <button
      onClick={toggleFont}
      className={`
        rounded-full
        transition-slow
        hover:scale-110
      `}
      aria-label={`Switch to ${font === "helvetica" ? "Monospace" : "Helvetica Neue"} font`}
      title={`Current font: ${font === "helvetica" ? "Helvetica Neue" : "Monospace"}`}
    >
      <FontAwesomeIcon
        icon={faFont}
        className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-slower"
      />
    </button>
  );
}
