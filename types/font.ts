export type FontFamily = "helvetica" | "monospace";

export interface FontContextType {
  font: FontFamily;
  setFont: (font: FontFamily) => void;
}
