"use client";
import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Service worker registration failed:", err);
          }
        });
    }
  }, []);

  return null;
} 