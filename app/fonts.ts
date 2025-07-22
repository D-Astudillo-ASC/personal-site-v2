import localFont from "next/font/local";

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
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
  variable: "--font-helvetica-neue",
});
