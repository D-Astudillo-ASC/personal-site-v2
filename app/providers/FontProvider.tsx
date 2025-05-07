"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FontFamily, FontContextType } from "@/types/font";

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontFamily>("helvetica");
  const [mounted, setMounted] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const savedFont = localStorage.getItem("font") as FontFamily | null;
    if (savedFont) {
      setFont(savedFont);
    }
    setMounted(true);
  }, []);

  // Save preference when it changes
  const handleSetFont = (newFont: FontFamily) => {
    setFont(newFont);
    localStorage.setItem("font", newFont);
  };

  if (!mounted) {
    return null;
  }

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