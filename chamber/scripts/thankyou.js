const params = new URLSearchParams(window.location.search);

document.querySelector("#display-first-name").textContent =
    params.get("firstName") || "Not provided";

document.querySelector("#display-last-name").textContent =
    params.get("lastName") || "Not provided";

document.querySelector("#display-email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#display-phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#display-organization").textContent =
    params.get("organization") || "Not provided";

const timestampValue = params.get("timestamp");

if (timestampValue) {
    const date = new Date(timestampValue);

    document.querySelector("#display-timestamp").textContent =
        date.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short"
        });
} else {
    document.querySelector("#display-timestamp").textContent =
        "Not provided";
}


const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}