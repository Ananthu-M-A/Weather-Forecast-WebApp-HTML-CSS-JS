const API_KEY = 'YOUR_API_KEY';
const weatherInfo = document.getElementById('weatherInfo');
const getWeatherButton = document.getElementById('getWeather');
const message = document.getElementById('message');
const toast = document.getElementById('toast');

getWeatherButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData, showError);
    } else {
        showToast("Geolocation is not supported by this browser.");
    }
});

function getWeatherData(position) {
    const { latitude, longitude } = position.coords;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => showToast("Error fetching weather data."));
}

function displayWeather(data) {
    const location = document.getElementById('location');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const weatherIcon = document.getElementById('weatherIcon');

    location.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherInfo.style.display = "block";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            showToast("Allow Weather App to access location");
            break;
        case error.POSITION_UNAVAILABLE:
            showToast("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            showToast("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showToast("An unknown error occurred.");
            break;
    }
}

function showToast(message) {
    message.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}