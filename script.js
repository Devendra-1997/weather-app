async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "acd83bc0438695afc5d9b38316efb8de";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const location = data.name;
  const temp = `${Math.round(data.main.temp)}°C`;
  const description = data.weather[0].description;
  const humidity = `${data.main.humidity}%`;
  const windSpeed = `${data.wind.speed} km/h`;

  document.querySelector(".location").textContent = location;
  document.querySelector(".temp").textContent = temp;
  document.querySelector(".description").textContent = description;
  document.getElementById("humidity").textContent = humidity;
  document.getElementById("wind-speed").textContent = windSpeed;
}
