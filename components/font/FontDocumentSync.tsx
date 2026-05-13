"use client";

import { useLayoutEffect } from "react";
import { syncDocumentFontFromStorage } from "@/lib/fontPreferenceStore";

/**
 * React hydration matches <body> to the server tree (no data-font). That can remove
 * the attribute set by the inline script in layout. Sync from storage before paint.
 */
export default function FontDocumentSync() {
  useLayoutEffect(() => {
    syncDocumentFontFromStorage();
  }, []);
  return null;
}
