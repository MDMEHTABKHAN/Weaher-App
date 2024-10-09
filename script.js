const apiKey = "fcaec08b85fa6d6155bb162cefdcadcf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        let data = await response.json();

        if (response.status === 404) {
            alert("City not found");
            return;
        }

        // Update weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "assets/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
