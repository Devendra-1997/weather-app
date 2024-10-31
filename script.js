function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "acd83bc0438695afc5d9b38316efb8de";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Unable to retrieve location data");

          const data = await response.json();
          displayWeather(data);
        } catch (error) {
          alert(error.message);
        }
      },
      () => {
        alert("Location access denied. Enter city name manually.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

async function getWeather(city = document.getElementById("cityInput").value) {
  const apiKey = "acd83bc0438695afc5d9b38316efb8de";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    if (!city) throw new Error("Please enter a city name.");
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404)
        throw new Error("City not found. Please check the name.");
      throw new Error("Failed to fetch weather data. Try again later.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}
// Automatically fetch weather for user's location on page load
window.onload = () => {
  getLocationWeather();
};

window.onload = () => {
  getWeather("Sydney"); // Load weather for Sydney by default
};

function displayWeather(data) {
  const location = data.name;
  const temp = `${Math.round(data.main.temp)}°C`;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const humidity = `${data.main.humidity}%`;
  const windSpeed = `${data.wind.speed} km/h`;
  const pressure = `${data.main.pressure} hPa`;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  document.querySelector(".location").textContent = location;
  document.querySelector(".temp").textContent = temp;
  document.querySelector(".description").textContent = description;
  document.getElementById("humidity").textContent = humidity;
  document.getElementById("wind-speed").textContent = windSpeed;
  document.getElementById("pressure").textContent = pressure;
  document.getElementById("sunrise").textContent = sunrise;
  document.getElementById("sunset").textContent = sunset;

  // Set the weather icon
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weatherIcon").src = iconUrl;
  document.getElementById("weatherIcon").alt = description;
}
