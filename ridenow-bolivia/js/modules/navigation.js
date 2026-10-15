export function setupNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (button && nav) {
    button.addEventListener("click", () => {
      const expanded = nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute("aria-label", expanded ? "Close navigation menu" : "Open navigation menu");
    });
  }

  document.querySelectorAll(".current-year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
}
