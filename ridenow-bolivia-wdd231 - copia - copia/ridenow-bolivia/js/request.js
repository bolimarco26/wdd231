import { setupNavigation } from "./modules/navigation.js";
import { loadServiceAreas } from "./modules/service-data.js";

setupNavigation();

const pickupSelect = document.querySelector("#pickup");
const destinationSelect = document.querySelector("#destination");
const dateInput = document.querySelector("#ride-date");
const form = document.querySelector(".ride-form");

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = localDateString(new Date());

function fillAreaOptions(select, areas) {
  const grouped = areas.reduce((groups, area) => {
    groups[area.city] ??= [];
    groups[area.city].push(area);
    return groups;
  }, {});
  Object.entries(grouped).forEach(([city, cityAreas]) => {
    const group = document.createElement("optgroup");
    group.label = city;
    cityAreas.forEach((area) => {
      const option = document.createElement("option");
      option.value = area.name;
      option.textContent = area.name;
      group.append(option);
    });
    select.append(group);
  });
}

const areas = await loadServiceAreas();
if (areas.length) {
  fillAreaOptions(pickupSelect, areas);
  fillAreaOptions(destinationSelect, areas);
  const params = new URLSearchParams(window.location.search);
  const suggestedPickup = params.get("pickup");
  if (suggestedPickup && [...pickupSelect.options].some((option) => option.value === suggestedPickup)) {
    pickupSelect.value = suggestedPickup;
  }
}

form.addEventListener("submit", (event) => {
  if (pickupSelect.value && destinationSelect.value && pickupSelect.value === destinationSelect.value) {
    event.preventDefault();
    destinationSelect.setCustomValidity("Choose a destination different from your pickup area.");
    destinationSelect.reportValidity();
  } else {
    destinationSelect.setCustomValidity("");
  }
});

destinationSelect.addEventListener("change", () => destinationSelect.setCustomValidity(""));
