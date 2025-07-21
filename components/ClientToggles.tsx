"use client";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/theme/ThemeToggle";
import FontToggle from "@/components/font/FontToggle";

export default function ClientToggles() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FontToggle />
      <ThemeToggle />
    </ThemeProvider>
  );
} 