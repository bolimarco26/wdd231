
export function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const mainNav = document.querySelector("#main-nav");

    if (!menuButton || !mainNav) {
        return;
    }

    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕ Close" : "☰ Menu";
    });
}
