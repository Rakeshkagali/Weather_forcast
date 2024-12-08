const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const tz = document.querySelector('.timezone');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const cityElement = document.querySelector('.city');
const stateElement = document.querySelector('.state');
const countryElement = document.querySelector('.country');
const gmtElement = document.querySelector('.gmt');

async function checkWeather(city) {
    const api_key = "a3a334889a72e87a8f4dcd475fb7f958";

    // Fetching weather data
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(weather_url).then(response => response.json());

    if (weather_data.cod === "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Error: Location not found");
        return;
    }

    // Fetching geocoding data to get the state
    const geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;
    const geo_data = await fetch(geo_url).then(response => response.json());

    const state = geo_data[0]?.state || "State not found"; // Safely fetch the state name

    console.log("Weather data received");

    // Hide error and show weather details
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Update weather details
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    // Update location details
    cityElement.textContent = weather_data.name;
    stateElement.textContent = state;
    countryElement.textContent = weather_data.sys.country;
    gmtElement.textContent = `${(weather_data.timezone / 3600).toFixed(1)}`;

    // Update weather icon based on conditions
    switch (weather_data.weather[0].main) {
        case "Clouds":
            weather_img.src = "assets/cloud.png";
            break;
        case "Clear":
            weather_img.src = "assets/clear.png";
            break;
        case "Rain":
            weather_img.src = "assets/rain.png";
            break;
        case "Mist":
            weather_img.src = "assets/mist.png";
            break;
        case "Snow":
            weather_img.src = "assets/snow.png";
            break;
        default:
            weather_img.src = "assets/default.png";
            break;
    }

    console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});
