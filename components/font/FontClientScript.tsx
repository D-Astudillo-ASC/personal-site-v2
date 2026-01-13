"use client";
import { useEffect, useState } from "react";

// Custom event for font changes
export const FONT_CHANGE_EVENT = "fontChange";

export default function FontClientScript() {
  const [font, setFont] = useState(() => {
    if (typeof window === "undefined") return "helvetica";
    return window.localStorage.getItem("font") ?? "helvetica";
  });

  useEffect(() => {
    if (font === "monospace") {
      document.body.setAttribute("data-font", "monospace");
    } else {
      document.body.removeAttribute("data-font");
    }
  }, [font]);

  useEffect(() => {
    // Listen for font change events
    const handleFontChange = (event: Event) => {
      const { font: newFont } = (event as CustomEvent<{ font: string }>).detail;
      setFont(newFont);
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