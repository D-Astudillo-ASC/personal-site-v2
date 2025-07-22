import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import FontClientScript from "@/components/font/FontClientScript";
import StructuredData from "./structured-data";
import { helveticaNeue } from "./fonts";
import { ThemeProvider } from "next-themes";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: "Daniel Astudillo | Software Engineer",
    template: "%s | Daniel Astudillo"
  },
  description: "Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core. Specializing in full-stack development, payment systems, and recommendation engines.",
  keywords: [
    "Daniel Astudillo",
    "Software Engineer",
    "Daniel Astudillo Software Engineer",
    "Daniel Astudillo Visa",
    "Daniel Astudillo Wayfair",
    "Software Engineer at Visa",
    "Payment Systems Engineer",
    "Visa Software Engineer",
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
    "Financial Technology",
    "API Development",
    "Microservices Architecture",
    "Software Development",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer Portfolio",
    "Software Developer Portfolio",
    "Software Engineer Contact",
    "Software Developer Contact",
    "Open to Work",
    "Software Engineer Available",
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
    title: 'Daniel Astudillo | Software Engineer',
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
    title: 'Daniel Astudillo | Software Engineer',
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
        <link rel="amphtml" href="https://danielastudillo.io/amp.html" />
        <StructuredData />
        <link rel="preconnect" href="https://danielastudillo.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://danielastudillo.io" />
      </head>
      <body className={helveticaNeue.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FontClientScript />
          <Header />
          <main className="flex flex-grow flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
