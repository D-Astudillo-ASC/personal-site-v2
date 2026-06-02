/** Inline blocking script — must stay in sync with resolveThemeIsDark() in themeFavicon.ts */
export const THEME_FAVICON_INIT_SCRIPT = `
(function () {
  function resolveIsDark() {
    try {
      var theme = localStorage.getItem("theme");
      if (theme === "dark") return true;
      if (theme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (_error) {
      return true;
    }
  }

  function apply() {
    var href = resolveIsDark() ? "/favicon-dark.svg" : "/favicon-light.svg";
    var link = document.getElementById("theme-favicon");

    if (!link) {
      link = document.createElement("link");
      link.id = "theme-favicon";
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }

    link.href = href;
  }

  apply();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  }
})();
`.trim();
