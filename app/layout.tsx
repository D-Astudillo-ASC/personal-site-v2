import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import { FontProvider } from "./providers/FontProvider";
import FontWrapper from "@/components/font/FontWrapper";

const helveticaNeue = localFont({
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
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Daniel Astudillo | Software Engineer",
  description: "Software Engineer specializing in full-stack development with React, TypeScript, and Node.js. Building intuitive user interfaces and scalable architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TODO: Add favicon for light and dark mode...*/}
        <link rel="icon" type="image/x-icon" href="/favicon-dark.ico" />
      </head>
      <body className={helveticaNeue.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FontProvider>
            <FontWrapper>
              <div className="flex flex-col overflow-x-clip min-h-screen bg-background text-text transition-standard [--border-color:theme(colors.black)] [--text-color:theme(colors.black)] [--background-color:theme(colors.white)] dark:[--border-color:theme(colors.white)] dark:[--text-color:theme(colors.white)] dark:[--background-color:theme(colors.black)]">
                <Header />
                <main className="flex flex-grow flex-col">{children}</main>
                <Footer />
              </div>
            </FontWrapper>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
