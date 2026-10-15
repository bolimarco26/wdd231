import { setupNavigation } from "./modules/navigation.js";
import { loadServiceAreas } from "./modules/service-data.js";

setupNavigation();

const grid = document.querySelector("#area-grid");
const searchInput = document.querySelector("#area-search");
const cityFilter = document.querySelector("#city-filter");
const categoryFilter = document.querySelector("#category-filter");
const count = document.querySelector("#area-count");
const emptyState = document.querySelector("#empty-state");
const resetButton = document.querySelector("#reset-filters");
const favoritesButton = document.querySelector("#favorites-filter");
const dialog = document.querySelector("#area-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogClose = document.querySelector("#dialog-close");
const STORAGE_KEY = "ridenow-saved-areas";
let allAreas = [];
let showFavoritesOnly = false;
let savedIds = readSavedIds();

function readSavedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSavedIds() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function populateCategories() {
  const categories = [...new Set(allAreas.map((area) => area.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
}

function filteredAreas() {
  const term = searchInput.value.trim().toLowerCase();
  return allAreas.filter((area) => {
    const searchable = `${area.name} ${area.city} ${area.category} ${area.description} ${area.pickupPoint}`.toLowerCase();
    const matchesSearch = searchable.includes(term);
    const matchesCity = cityFilter.value === "all" || area.city === cityFilter.value;
    const matchesCategory = categoryFilter.value === "all" || area.category === categoryFilter.value;
    const matchesSaved = !showFavoritesOnly || savedIds.includes(area.id);
    return matchesSearch && matchesCity && matchesCategory && matchesSaved;
  });
}

function renderAreas() {
  const areas = filteredAreas();
  count.textContent = `${areas.length} ${areas.length === 1 ? "area" : "areas"} shown`;
  emptyState.hidden = areas.length !== 0;
  grid.innerHTML = areas.map((area) => `
    <article class="area-card">
      <div class="area-card-top">
        <div><span class="area-city">${escapeHTML(area.city)}</span><h2>${escapeHTML(area.name)}</h2><span class="category-pill">${escapeHTML(area.category)}</span></div>
        <button class="favorite-button" type="button" data-save="${escapeHTML(area.id)}" aria-label="${savedIds.includes(area.id) ? "Remove" : "Save"} ${escapeHTML(area.name)}" aria-pressed="${savedIds.includes(area.id)}">${savedIds.includes(area.id) ? "♥" : "♡"}</button>
      </div>
      <p>${escapeHTML(area.description)}</p>
      <div class="area-details">
        <div class="area-detail"><span>Suggested pickup</span><strong>${escapeHTML(area.pickupPoint)}</strong></div>
        <div class="area-detail"><span>Indicative time</span><strong>~${Number(area.estimatedMinutes)} min</strong></div>
      </div>
      <div class="area-card-footer"><button type="button" data-details="${escapeHTML(area.id)}">View details ↗</button><a href="request.html?pickup=${encodeURIComponent(area.name)}">Request ride →</a></div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.save;
      savedIds = savedIds.includes(id) ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id];
      saveSavedIds();
      renderAreas();
    });
  });

  grid.querySelectorAll("[data-details]").forEach((button) => {
    button.addEventListener("click", () => showDetails(button.dataset.details));
  });

  favoritesButton.setAttribute("aria-pressed", String(showFavoritesOnly));
  favoritesButton.querySelector("span").textContent = showFavoritesOnly ? "Show all areas" : "Saved areas";
}

function showDetails(id) {
  const area = allAreas.find((item) => item.id === id);
  if (!area) return;
  dialogBody.innerHTML = `
    <div class="dialog-content">
      <p class="dialog-kicker">${escapeHTML(area.city)} · ${escapeHTML(area.category)}</p>
      <h2 id="dialog-title">${escapeHTML(area.name)}</h2>
      <p>${escapeHTML(area.description)}</p>
      <div class="dialog-info">
        <div><span>Suggested pickup point</span><strong>${escapeHTML(area.pickupPoint)}</strong></div>
        <div><span>Indicative service hours</span><strong>${escapeHTML(area.serviceHours)}</strong></div>
        <div><span>Illustrative city travel time</span><strong>About ${Number(area.estimatedMinutes)} minutes</strong></div>
        <div><span>Availability</span><strong>Must be confirmed</strong></div>
      </div>
      <div class="dialog-actions"><a class="button button-lime" href="request.html?pickup=${encodeURIComponent(area.name)}">Request a ride →</a><button class="button button-outline" type="button" id="dialog-save">${savedIds.includes(area.id) ? "♥ Saved area" : "♡ Save area"}</button></div>
    </div>`;
  dialogBody.querySelector("#dialog-save").addEventListener("click", () => {
    savedIds = savedIds.includes(area.id) ? savedIds.filter((savedId) => savedId !== area.id) : [...savedIds, area.id];
    saveSavedIds();
    renderAreas();
    dialogBody.querySelector("#dialog-save").textContent = savedIds.includes(area.id) ? "♥ Saved area" : "♡ Save area";
  });
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert(`${area.name}: ${area.description}`);
}

searchInput.addEventListener("input", renderAreas);
cityFilter.addEventListener("change", renderAreas);
categoryFilter.addEventListener("change", renderAreas);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  cityFilter.value = "all";
  categoryFilter.value = "all";
  showFavoritesOnly = false;
  renderAreas();
});
favoritesButton.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  renderAreas();
});
dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

allAreas = await loadServiceAreas();
if (allAreas.length) {
  populateCategories();
  renderAreas();
} else {
  grid.innerHTML = '<p class="empty-state">Service area data could not be loaded. Please run this site through GitHub Pages or a local web server.</p>';
  count.textContent = "Data unavailable";
}
