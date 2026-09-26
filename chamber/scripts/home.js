const API_KEY = "526e56b5118b9932300f77f5ab7e2dd0";

const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const eligibleMembers = members.filter(
            member => member.membership === 3 || member.membership === 2
        );

        const shuffledMembers = [...eligibleMembers].sort(
            () => Math.random() - 0.5
        );

        const selectedMembers = shuffledMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const membershipLevel =
                member.membership === 3 ? "Gold Member" : "Silver Member";

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p><strong>${membershipLevel}</strong></p>

                <p>${member.phone}</p>

                <p>${member.address}</p>

                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading company spotlights:", error);
    }
}

loadSpotlights();




const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast-container");

const latitude = -16.5000;
const longitude = -68.1500;

async function loadWeather() {
    try {
        const currentUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

        const forecastUrl =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

        const currentResponse = await fetch(currentUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error loading weather:", error);

        currentWeather.innerHTML = `
            <p>Weather information is currently unavailable.</p>
        `;
    }
}


function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    currentWeather.innerHTML = `
        <p><strong>Temperature:</strong> ${temperature}°F</p>
        <p><strong>Conditions:</strong> ${description}</p>
    `;
}




function displayForecast(data) {
    const forecastDays = [];

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);

        const dateKey = date.toLocaleDateString("en-US");

        if (!forecastDays.some(day => day.date === dateKey)) {
            forecastDays.push({
                date: dateKey,
                day: date.toLocaleDateString("en-US", {
                    weekday: "long"
                }),
                temperature: Math.round(item.main.temp)
            });
        }
    });

    const threeDays = forecastDays.slice(1, 4);

    forecastContainer.innerHTML = "";

    threeDays.forEach(day => {
        const forecast = document.createElement("p");

        forecast.innerHTML = `
            <strong>${day.day}:</strong> ${day.temperature}°F
        `;

        forecastContainer.appendChild(forecast);
    });
}

loadWeather();



const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});


const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;