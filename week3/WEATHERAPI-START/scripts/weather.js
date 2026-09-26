// SELECT HTML ELEMENTS IN THE DOCUMENT
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');


// CREATE REQUIRED VARIABLES FOR THE URL
const myKey = "YOUR_NEW_API_KEY";
const myLat = "-16.495522263095058";
const myLong = "-68.12753952939413";


// CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;


// TRY TO GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
    try {
        const response = await fetch(myURL);

        if (response.ok) {
            const data = await response.json();

            console.log(data); // testing only

            displayResults(data);

        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}


// DISPLAY THE JSON DATA ONTO MY WEB PAGE
function displayResults(data) {
    console.log('hello');

    myTown.innerHTML = data.name;

    myDescription.innerHTML = data.weather[0].description;

    myTemperature.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    myGraphic.setAttribute('src', iconsrc);

    myGraphic.setAttribute('alt', data.weather[0].description);
}


// START THE PROCESS
apiFetch();