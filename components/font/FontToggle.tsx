"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@/lib/fontawesome-icons";
import { setGlobalFont } from "@/utils/font";

export default function FontToggle() {
  const [font, setFont] = useState<"helvetica" | "monospace">(() => {
    if (typeof window === "undefined") return "helvetica";
    const saved = window.localStorage.getItem("font") as
      | "helvetica"
      | "monospace"
      | null;
    return saved ?? "helvetica";
  });

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
        className="w-5 h-5"
      />
    </button>
  );
}
