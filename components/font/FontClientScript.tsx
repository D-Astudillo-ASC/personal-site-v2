"use client";
import { useEffect } from "react";

// Custom event for font changes
export const FONT_CHANGE_EVENT = "fontChange";

export default function FontClientScript() {
  // Initial body[data-font] is applied by the blocking script in app/layout.tsx.

  useEffect(() => {
    // Listen for font change events
    const handleFontChange = (event: Event) => {
      const { font: newFont } = (event as CustomEvent<{ font: string }>).detail;
      localStorage.setItem("font", newFont);
      if (newFont === "monospace") {
        document.body.setAttribute("data-font", "monospace");
      } else {
        document.body.removeAttribute("data-font");
      }
    };

    window.addEventListener(FONT_CHANGE_EVENT, handleFontChange);

    return () => {
      window.removeEventListener(FONT_CHANGE_EVENT, handleFontChange);
    };
  }, []);

  return null;
}