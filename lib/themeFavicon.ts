export const THEME_FAVICON_ID = "theme-favicon";
export const THEME_FAVICON_DARK = "/favicon-dark.svg";
export const THEME_FAVICON_LIGHT = "/favicon-light.svg";

export function getThemeFaviconHref(isDark: boolean): string {
  return isDark ? THEME_FAVICON_DARK : THEME_FAVICON_LIGHT;
}

export function resolveThemeIsDark(): boolean {
  if (typeof window === "undefined") return true;

  try {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return true;
  }
}

export function applyThemeFavicon(isDark: boolean): void {
  if (typeof document === "undefined") return;

  const href = getThemeFaviconHref(isDark);
  let link = document.getElementById(THEME_FAVICON_ID) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.id = THEME_FAVICON_ID;
    link.rel = "icon";
    link.type = "image/svg+xml";
    document.head.appendChild(link);
  }

  if (link.getAttribute("href") !== href) {
    link.setAttribute("href", href);
  }
}
