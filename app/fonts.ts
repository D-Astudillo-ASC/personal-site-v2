import localFont from "next/font/local";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";

// Display font — hero name, major section headings
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

// Primary body/UI font — replaces Helvetica Neue as the default sans
export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

// Monospace — tech tags, code, metadata labels, font toggle target
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Kept for legacy: font toggle "helvetica" mode maps to Geist via CSS,
// but this variable remains available for the toggle script.
export const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeueUltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueRoman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueMedium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
  variable: "--font-helvetica-neue",
});
