import { FONT_CHANGE_EVENT } from "@/components/font/FontClientScript";

export function setGlobalFont(font: "helvetica" | "monospace") {
  // Dispatch custom event for font change
  window.dispatchEvent(
    new CustomEvent(FONT_CHANGE_EVENT, {
      detail: { font },
    }),
  );
}
