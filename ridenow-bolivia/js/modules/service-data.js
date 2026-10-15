export async function loadServiceAreas() {
  try {
    const response = await fetch("./data/service-areas.json");
    if (!response.ok) {
      throw new Error(`Service-area data could not be loaded (${response.status}).`);
    }
    const areas = await response.json();
    if (!Array.isArray(areas)) {
      throw new Error("The service-area file has an unexpected format.");
    }
    return areas;
  } catch (error) {
    console.error("RideNow data error:", error);
    return [];
  }
}
