
import { setupNavigation } from "./modules/navigation.js";
import { getServiceAreas } from "./modules/service-data.js";



const summary = document.querySelector("#request-summary");

if (summary) {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const phone = params.get("phone");
    const pickup = params.get("pickup");
    const destination = params.get("destination");
    const date = params.get("date");
    const passengers = params.get("passengers");
    const tripType = params.get("tripType");

    if (
        name && phone && pickup && destination &&
        date && passengers && tripType
    ) {
        const details = [
            ["Name", name],
            ["Phone", phone],
            ["Pickup", pickup],
            ["Destination", destination],
            ["Travel Date", date],
            ["Passengers", passengers],
            ["Trip Type", tripType]
        ];

        summary.innerHTML = "";

        details.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = `${label}: `;
            paragraph.appendChild(strong);
            paragraph.appendChild(document.createTextNode(value));

            summary.appendChild(paragraph);
        });
    } else {
        summary.textContent =
            "No complete ride request was found. Please return to the form and enter your information.";
    }
}


async function loadServiceAreas() {
    const container = document.querySelector("#areas-container");

    if (!container) {
        return;
    }

    try {
        const areas = await getServiceAreas();

        const searchInput = document.querySelector("#area-search");

        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const searchText = searchInput.value
                    .toLowerCase()
                    .trim();

                const filteredAreas = areas.filter((area) => {
                    return (
                        area.name.toLowerCase().includes(searchText) ||
                        area.city.toLowerCase().includes(searchText)
                    );
                });

                displayAreas(filteredAreas);
            });
        }

        displayAreas(areas);



    } catch (error) {
        container.textContent =
            "Sorry, service areas could not be loaded.";

        console.error("Error loading service areas:", error);
    }
}

function displayAreas(areas) {
    const container = document.querySelector("#areas-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    const resultsCount = document.querySelector("#results-count");

    if (resultsCount) {
        const cityNames = areas.map((area) => area.city);
        const uniqueCities = [...new Set(cityNames)];

        const citySummary = uniqueCities.join(" and ");

        const totalAreas = areas.reduce((total) => total + 1, 0);

        resultsCount.textContent =
            `Showing ${totalAreas} service areas in ${citySummary}`;
    }


    if (areas.length === 0) {
        container.textContent = "No service areas found.";
        return;
    }

    areas.forEach((area) => {
        const card = document.createElement("article");

        const favorites = JSON.parse(
            localStorage.getItem("rideFavorites") || "[]"
        );

        card.innerHTML = `
            <h4>${area.name}</h4>
            <p><strong>City:</strong> ${area.city}</p>
            <p><strong>Category:</strong> ${area.category}</p>
            <p>${area.description}</p>
            <button type="button" class="details-button">
                View Details
            </button>
            <button type="button" class="favorite-button">
                ${favorites.includes(area.id)
                ? "Remove Favorite"
                : "Save Favorite"}
            </button>
        `;

        // Open the details dialog
        const detailsButton = card.querySelector(".details-button");

        detailsButton.addEventListener("click", () => {
            showAreaDetails(area);
        });

        // Save or remove a favorite
        const favoriteButton = card.querySelector(".favorite-button");

        favoriteButton.addEventListener("click", () => {
            let savedFavorites = JSON.parse(
                localStorage.getItem("rideFavorites") || "[]"
            );

            if (savedFavorites.includes(area.id)) {
                savedFavorites = savedFavorites.filter(
                    (id) => id !== area.id
                );
            } else {
                savedFavorites.push(area.id);
            }

            localStorage.setItem(
                "rideFavorites",
                JSON.stringify(savedFavorites)
            );

            favoriteButton.textContent =
                savedFavorites.includes(area.id)
                    ? "Remove Favorite"
                    : "Save Favorite";
        });

        container.appendChild(card);
    });
}

function showAreaDetails(area) {
    const dialog = document.querySelector("#area-dialog");
    const dialogTitle = document.querySelector("#dialog-title");
    const dialogContent = document.querySelector("#dialog-content");

    if (!dialog || !dialogTitle || !dialogContent) {
        return;
    }

    dialogTitle.textContent = area.name;

    dialogContent.innerHTML = `
        <p><strong>City:</strong> ${area.city}</p>
        <p><strong>Category:</strong> ${area.category}</p>
        <p>${area.description}</p>
        <p><strong>Pickup point:</strong> ${area.pickupPoint}</p>
    `;

    dialog.showModal();
}

// Close the details dialog
const closeDialogButton = document.querySelector("#close-dialog");

if (closeDialogButton) {
    closeDialogButton.addEventListener("click", () => {
        const dialog = document.querySelector("#area-dialog");

        if (dialog) {
            dialog.close();
        }
    });
}

loadServiceAreas();
setupNavigation();




