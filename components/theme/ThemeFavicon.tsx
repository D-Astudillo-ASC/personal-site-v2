"use client";

import { applyThemeFavicon, resolveThemeIsDark } from "@/lib/themeFavicon";
import { useTheme } from "next-themes";
import { useLayoutEffect } from "react";

export default function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  useLayoutEffect(() => {
    const isDark = resolvedTheme
      ? resolvedTheme === "dark"
      : resolveThemeIsDark();
    applyThemeFavicon(isDark);
  }, [resolvedTheme]);

  return null;
}
