import { setupNavigation } from "./modules/navigation.js";
import { loadServiceAreas } from "./modules/service-data.js";

setupNavigation();

const areas = await loadServiceAreas();
const stats = document.querySelector(".preview-stats");
if (stats && areas.length) {
  stats.querySelector("div:first-child strong").textContent = String(areas.length);
  const cities = new Set(areas.map((area) => area.city));
  stats.querySelector("div:nth-child(2) strong").textContent = String(cities.size);
}
