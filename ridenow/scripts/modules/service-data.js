
export async function getServiceAreas() {
    try {
        const response = await fetch(
            new URL("../../data/service-areas.json", import.meta.url)
        );

        if (!response.ok) {
            throw new Error("Could not load service areas.");
        }

        const areas = await response.json();

        return areas;
    } catch (error) {
        console.error("Error loading service areas:", error);
        throw error;
    }
}
