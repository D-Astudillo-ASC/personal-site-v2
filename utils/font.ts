import { commitFontPreference } from "@/lib/fontPreferenceStore";

export function setGlobalFont(font: "helvetica" | "monospace") {
  commitFontPreference(font);
}
