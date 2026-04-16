"use client";

import { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@/lib/fontawesome-icons";
import { setGlobalFont } from "@/utils/font";

type SiteFont = "helvetica" | "monospace";

export default function FontToggle() {
  // Initial render matches SSR; layout.tsx blocking script applies body font
  // before paint. Sync React state before paint (useLayoutEffect).
  const [font, setFont] = useState<SiteFont>("helvetica");

  useLayoutEffect(() => {
    const saved = window.localStorage.getItem("font") as SiteFont | null;
    if (saved === "helvetica" || saved === "monospace") {
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
        className="w-5 h-5"
      />
    </button>
  );
}
