const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayMembers(data);
}

function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <p class="membership">${getMembershipLevel(member.membership)}</p>
            <p>${member.description}</p>
        `;

        membersContainer.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("member-list");
    membersContainer.classList.add("member-grid");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("member-grid");
    membersContainer.classList.add("member-list");
});

getMembers();

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;