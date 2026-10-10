
import { places } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const STORAGE_KEY = "discoverLastVisit";


function displayPlaces() {
    if (!discoverGrid) return;

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.classList.add(place.id);

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = place.image;
        image.alt = place.alt;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = place.name;

        figure.append(image, caption);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("learn-more");
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            const searchQuery = encodeURIComponent(
                `${place.name}, ${place.address}`
            );

            window.open(
                `https://www.google.com/maps/search/?api=1&query=${searchQuery}`,
                "_blank",
                "noopener,noreferrer"
            );
        });

        card.append(title, figure, address, description, button);
        discoverGrid.appendChild(card);
    });
}


function displayVisitMessage() {
    if (!visitMessage) return;

    const now = Date.now();
    const previousVisit = localStorage.getItem(STORAGE_KEY);

    if (previousVisit === null) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const previousTimestamp = Number(previousVisit);

        if (!Number.isFinite(previousTimestamp) || previousTimestamp <= 0) {
            visitMessage.textContent =
                "Welcome! Let us know if you have any questions.";
        } else {
            const difference = now - previousTimestamp;
            const daysPassed = Math.floor(
                difference / MILLISECONDS_PER_DAY
            );

            if (difference < 0) {
                visitMessage.textContent =
                    "Welcome! Let us know if you have any questions.";
            } else if (daysPassed < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else if (daysPassed === 1) {
                visitMessage.textContent = "You last visited 1 day ago.";
            } else {
                visitMessage.textContent =
                    `You last visited ${daysPassed} days ago.`;
            }
        }
    }

    localStorage.setItem(STORAGE_KEY, String(now));
}


function updateFooter() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#last-modified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

displayPlaces();
displayVisitMessage();
updateFooter();
