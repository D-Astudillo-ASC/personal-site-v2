(function () {
  function apply() {
    try {
      if (localStorage.getItem("font") === "monospace" && document.body) {
        document.body.setAttribute("data-font", "monospace");
      }
    } catch (_error) {
      /* localStorage unavailable */
    }
  }

  if (document.body) {
    apply();
  } else {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  }
})();
