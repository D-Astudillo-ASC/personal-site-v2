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
import StructuredData from "./structured-data";

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
  description: "Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core. Specializing in full-stack development, payment systems, and recommendation engines.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer", 
    "React Developer",
    "TypeScript Developer",
    "Next.js Developer",
    ".NET Developer",
    "Java Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Spring Boot Developer",
    "Visa Developer",
    "Payment Systems",
    "Software Development",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer Portfolio",
    "Software Developer Portfolio",
    "Software Engineer Contact",
    "Software Developer Contact",
    "Technical Collaboration",
    "Development Projects"
  ],
  authors: [{ name: "Daniel Astudillo" }],
  creator: "Daniel Astudillo",
  publisher: "Daniel Astudillo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danielastudillo.io',
    title: 'Daniel Astudillo | Software Engineer | Full-Stack Developer',
    description: 'Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core.',
    siteName: 'Daniel Astudillo Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Astudillo - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Astudillo | Software Engineer | Full-Stack Developer',
    description: 'Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://danielastudillo.io',
  },
  verification: {
    google: 'google-site-verification=meze9z3hYiB2JgJvuX2cIUCJGlj8oY3YlKIxDh23_g4', // Add your Google Search Console verification code
  },
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
        <StructuredData />
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
