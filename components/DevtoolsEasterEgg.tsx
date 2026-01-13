"use client";

import { useEffect } from "react";

function isDevtoolsLikelyOpen(): boolean {
  // Heuristic based on window chrome deltas. Not perfect, but lightweight and widely used.
  // Threshold tuned to avoid false positives from minor browser UI changes.
  const threshold = 160;
  const widthDelta = Math.abs(window.outerWidth - window.innerWidth);
  const heightDelta = Math.abs(window.outerHeight - window.innerHeight);
  return widthDelta > threshold || heightDelta > threshold;
}

export default function DevtoolsEasterEgg() {
  useEffect(() => {
    let hasLogged = false;

    const logMessage = () => {
      if (hasLogged) return;
      hasLogged = true;

      const prefersDark =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const accent = "font-weight: 800; font-size: 14px; color: #a78bfa;";
      const text = prefersDark ? "color: #e5e7eb;" : "color: #111827;";
      const muted = prefersDark ? "color: #9ca3af;" : "color: #6b7280;";

      // Note: this logs once per page load/session. If you want it to log every time DevTools
      // opens/closes, remove the `hasLogged` guard.
      // eslint-disable-next-line no-console
      console.log(
        "%cHello there! What a pleasant surprise to see you here.\n\nI’m assuming you’re either a fellow developer, a curious explorer, or someone who clicked the wrong thing and is now committing to the bit.\n\nEither way: welcome to the back room.",
        accent
      );
      // eslint-disable-next-line no-console
      console.log("%cA few fun facts while you’re here:", `font-weight: 700; ${text}`);
      // eslint-disable-next-line no-console
      console.log(
        "%c- This site is built with Next.js + TypeScript.\n- I care a lot about performance, UX, and clean code.\n- If you found a bug… congratulations, you’re now the honorary QA lead.",
        text
      );
      // eslint-disable-next-line no-console
      console.log(
        "%cIf you want to collaborate, talk shop, or send a meme that made you exhale through your nose, hit the Contact page.\n\n%cP.S. You’re officially allowed to view-source. I won’t tell anyone.",
        text,
        `font-style: italic; ${muted}`
      );
    };

    const check = () => {
      if (!hasLogged && isDevtoolsLikelyOpen()) logMessage();
    };

    // If DevTools is already open on load, catch it quickly.
    check();

    const onResize = () => check();
    window.addEventListener("resize", onResize);

    const intervalId = window.setInterval(check, 750);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}

