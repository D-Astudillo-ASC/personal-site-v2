"use client";

import { useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@/lib/fontawesome-icons";
import { setGlobalFont } from "@/utils/font";
import {
  getFontPreferenceServerSnapshot,
  getFontPreferenceSnapshot,
  subscribeFontPreference,
} from "@/lib/fontPreferenceStore";

export default function FontToggle() {
  const font = useSyncExternalStore(
    subscribeFontPreference,
    getFontPreferenceSnapshot,
    getFontPreferenceServerSnapshot,
  );

  const toggleFont = () => {
    const newFont = font === "helvetica" ? "monospace" : "helvetica";
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
