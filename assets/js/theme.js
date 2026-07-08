export function initTheme() {
  const stored = localStorage.getItem("theme");
  const theme = stored || "dark";
  document.documentElement.setAttribute("data-theme", theme);
}

export function bindTheme() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  const sync = () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    btn.innerHTML = light
      ? '<i class="fas fa-moon" aria-hidden="true"></i>'
      : '<i class="fas fa-sun" aria-hidden="true"></i>';
    btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  };

  sync();
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });
}
