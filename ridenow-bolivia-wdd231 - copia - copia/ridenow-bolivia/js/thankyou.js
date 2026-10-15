import { setupNavigation } from "./modules/navigation.js";

setupNavigation();

const output = document.querySelector("#request-summary");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["pickup", "Pickup area"],
  ["destination", "Destination"],
  ["rideDate", "Travel date"],
  ["rideTime", "Preferred time"],
  ["passengers", "Passengers"],
  ["rideType", "Trip type"],
  ["notes", "Extra details"]
];

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

const hasRequest = params.has("firstName") && params.has("pickup") && params.has("destination");
if (!hasRequest) {
  output.innerHTML = `<div class="summary-error"><p>No ride request details were found in the URL.</p><a href="request.html">Start a ride request</a></div>`;
} else {
  output.innerHTML = `<div class="summary-data">${fields.map(([key, label]) => {
    const value = params.get(key);
    return value ? `<div class="summary-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>` : "";
  }).join("")}</div>
  <p class="summary-warning"><strong>Prototype only:</strong> This page displays URL parameters for the course requirement. The request has not been sent to a driver and is not a confirmed booking.</p>`;
}
