import type { FontFamily } from "@/types/font";

const STORAGE_KEY = "font";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function onStorageFromOtherTab() {
  emit();
}

/** Update body[data-font] only (no storage writes, no subscriber notify). */
export function applyFontToDocument(font: FontFamily) {
  if (typeof window === "undefined") return;
  if (font === "monospace") {
    document.body.setAttribute("data-font", "monospace");
  } else {
    document.body.removeAttribute("data-font");
  }
}

/**
 * Re-apply body[data-font] from localStorage. Call after hydration: React can strip
 * attributes the inline layout script set because the server HTML has no data-font.
 */
export function syncDocumentFontFromStorage() {
  applyFontToDocument(getFontPreferenceSnapshot());
}

/** For useSyncExternalStore: notifies when localStorage font changes (other tabs or same-tab commit). */
export function subscribeFontPreference(onStoreChange: () => void) {
  if (typeof window !== "undefined") {
    listeners.add(onStoreChange);
    if (listeners.size === 1) {
      window.addEventListener("storage", onStorageFromOtherTab);
    }
  }
  return () => {
    listeners.delete(onStoreChange);
    if (typeof window !== "undefined" && listeners.size === 0) {
      window.removeEventListener("storage", onStorageFromOtherTab);
    }
  };
}

export function getFontPreferenceSnapshot(): FontFamily {
  if (typeof window === "undefined") return "helvetica";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as FontFamily | null;
    if (saved === "helvetica" || saved === "monospace") return saved;
  } catch {
    /* private / blocked storage */
  }
  return "helvetica";
}

export function getFontPreferenceServerSnapshot(): FontFamily {
  return "helvetica";
}

export function commitFontPreference(font: FontFamily) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, font);
  } catch {
    /* still update DOM */
  }
  applyFontToDocument(font);
  emit();
}
