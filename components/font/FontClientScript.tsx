"use client";
import { useEffect, useState } from "react";

// Custom event for font changes
export const FONT_CHANGE_EVENT = "fontChange";

export default function FontClientScript() {
  const [font, setFont] = useState("helvetica");

  useEffect(() => {
    // Read initial font from localStorage
    const saved = localStorage.getItem("font");
    if (saved) setFont(saved);

    // Set initial font on body
    if (font === "monospace") {
      document.body.setAttribute("data-font", "monospace");
    } else {
      document.body.removeAttribute("data-font");
    }

    // Listen for font change events
    const handleFontChange = (event: CustomEvent) => {
      const newFont = event.detail.font;
      setFont(newFont);
      localStorage.setItem("font", newFont);
      if (newFont === "monospace") {
        document.body.setAttribute("data-font", "monospace");
      } else {
        document.body.removeAttribute("data-font");
      }
    };

    window.addEventListener(FONT_CHANGE_EVENT, handleFontChange as EventListener);

    return () => {
      window.removeEventListener(FONT_CHANGE_EVENT, handleFontChange as EventListener);
    };
  }, [font]);

  return null;
}