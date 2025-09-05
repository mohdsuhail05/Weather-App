const inputBox = document.querySelector(".input-box");
const searchbtn = document.getElementById("search-btn");
const weather_img = document.querySelector(".weather_img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector('.description');
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function CheckWeather(City) {
    // ⚠️ Replace this with your own API key from OpenWeather
    const Api_Key = 'YOUR_API_KEY_HERE';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${Api_Key}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                return;
            } else if (response.status === 401) {
                alert("Invalid API key. Please check your API key.");
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                return;
            } else {
                alert("Error fetching weather data");
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                return;
            }
        }

        const weather_data = await response.json();

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        windspeed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "images/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "images/clear.png";
                break;
            case 'Rain':
                weather_img.src = "images/rain.png";
                break;
            case 'Mist':
                weather_img.src = "images/mist.png";
                break;
            case 'Snow':
                weather_img.src = "images/snow.png";
                break;
            default:
                weather_img.src = "images/default.png"; 
                break;
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch weather data. Please check your internet connection.");
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchbtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city === "") {
        alert("Please enter a location");
        return;
    }
    CheckWeather(city);
});
