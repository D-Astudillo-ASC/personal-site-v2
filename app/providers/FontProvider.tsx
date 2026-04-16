"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FontFamily, FontContextType } from "@/types/font";

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontFamily>("helvetica");

  useEffect(() => {
    const saved = window.localStorage.getItem("font") as FontFamily | null;
    if (saved === "helvetica" || saved === "monospace") {
      setFont(saved);
    }
  }, []);

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