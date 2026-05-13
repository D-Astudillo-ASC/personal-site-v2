"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { FontFamily, FontContextType } from "@/types/font";
import {
  commitFontPreference,
  getFontPreferenceServerSnapshot,
  getFontPreferenceSnapshot,
  subscribeFontPreference,
} from "@/lib/fontPreferenceStore";

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const font = useSyncExternalStore(
    subscribeFontPreference,
    getFontPreferenceSnapshot,
    getFontPreferenceServerSnapshot,
  );

  const handleSetFont = useCallback((newFont: FontFamily) => {
    commitFontPreference(newFont);
  }, []);

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
