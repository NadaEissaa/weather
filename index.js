const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("search").addEventListener("keyup", event => {
    search(event.target.value);
});

async function search(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d0fad72b47494e7192b164731241106&q=${location}&days=3`);
        const data = await response.json();
        
        if (data && data.location && data.current && data.forecast && data.forecast.forecastday) {
            displayCurrent(data.location, data.current);
            displayAnother(data.forecast.forecastday);
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        
    }
}

function displayCurrent(location, current) {
    if (current != null) {
        const lastUpdated = new Date(current.last_updated.replace(" ", "T"));

        const currentWeather = `
            <div class="firstCard text-center rounded-3 m-4 text-color vh-40">
                <div class="header rounded-2 p-2">
                    <div class="details d-flex justify-content-evenly">
                        <p class="text-light">${days[lastUpdated.getDay()]}</p>
                        <p class="text-light">${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}</p>
                    </div>
                </div>
                <h2 class="text-white">${location.name}</h2>
                <p class="temp fw-bold text-white h1">${current.temp_c}<sup>o</sup>C</p>
                <img src="https:${current.condition.icon}" alt="" width=90>
                <p class="text-light">${current.condition.text}</p>
                <div class="WIcons d-flex justify-content-center align-content-lg-between">
                    <i class="fa fa-umbrella p-2 fs-5" >  ${current.precip_mm} mm</i>
                    <i class="fa fa-cloud  p-2 fs-5">${current.wind_kph} km/h</i>
                    <i class="fa fa-compass  p-2 fs-5">E${current.wind_dir}</i>
                </div>
            </div>`;

        document.getElementById("forecast").innerHTML = currentWeather;
    }
}
function displayAnother(forecastDays) {
    // Check if there are at least two forecast days available
    if (forecastDays.length > 1) {
        // First forecast day (1)
        const firstForecastDay = forecastDays[1];
        const firstDate = new Date(firstForecastDay.date.replace(" ", "T"));
        
        const firstForecastHtml = `
            <div class="firstCard text-center vh-40 rounded-3 m-4 text-color">
                <div class="header rounded-2 p-2">
                    <div class="details d-flex justify-content-evenly">
                        <p class="text-light">${days[firstDate.getDay()]}</p>
                        <p class="text-light">${firstDate.getDate()} ${monthNames[firstDate.getMonth()]}</p>
                    </div>
                </div>
                <img src="https:${firstForecastDay.day.condition.icon}" alt="" width=90>
                <p class="fw-bold text-white h1">${firstForecastDay.day.maxtemp_c}<sup>o</sup>C</p>
                <span class="span-color fw-bold">${firstForecastDay.day.mintemp_c}<sup>o</sup></span>
                <p class="text-light">${firstForecastDay.day.condition.text}</p>
            </div>`;

        // Second forecast day (2)
        const secondForecastDay = forecastDays[2];
        const secondDate = new Date(secondForecastDay.date.replace(" ", "T"));
        
        const secondForecastHtml = `
            <div class="firstCard text-center vh-40 rounded-3 m-4 text-color">
                <div class="header rounded-2 p-2">
                    <div class="details d-flex justify-content-evenly">
                        <p class="text-light">${days[secondDate.getDay()]}</p>
                        <p class="text-light">${secondDate.getDate()} ${monthNames[secondDate.getMonth()]}</p>
                    </div>
                </div>
                <img src="https:${secondForecastDay.day.condition.icon}" alt="" width=90>
                <p class="fw-bold text-white h1">${secondForecastDay.day.maxtemp_c}<sup>o</sup>C</p>
                <span class="span-color fw-bold">${secondForecastDay.day.mintemp_c}<sup>o</sup></span>
                <p class="text-light">${secondForecastDay.day.condition.text}</p>
            </div>`;

        document.getElementById("first-forecast").innerHTML = firstForecastHtml;
        document.getElementById("second-forecast").innerHTML = secondForecastHtml;
    }
}


// Initial search to display weather for Giza
search('Giza');
