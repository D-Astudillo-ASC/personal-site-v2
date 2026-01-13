"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FontFamily, FontContextType } from "@/types/font";

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontFamily>(() => {
    if (typeof window === "undefined") return "helvetica";
    const savedFont = window.localStorage.getItem("font") as FontFamily | null;
    return savedFont ?? "helvetica";
  });

  // Save preference when it changes
  const handleSetFont = (newFont: FontFamily) => {
    setFont(newFont);
    localStorage.setItem("font", newFont);
  };

  return (
    <FontContext.Provider value={{ font, setFont: handleSetFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
} 