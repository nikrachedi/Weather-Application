let now = new Date();
let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let months = [
  "Janurary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date}`;
currentTime.innerHTML = `Last updated ${hours}:${minutes}`;

function citySearch(event) {
  event.preventDefault();
  let cityImput = document.querySelector("#city-input");
  let city = document.querySelector("#city-id");
  city.innerHTML = `${cityImput.value}`;
}
let changeCity = document.querySelector("#city-form");
changeCity.addEventListener("submit", citySearch);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = response.data.name;
  let cityId = document.querySelector("#city-id");
  cityId.innerHTML = `${cityTemp}`;
  let realTemp = document.querySelector("#degree-today");
  realTemp.innerHTML = `${temperature}`;
  let high = Math.round(response.data.main.temp_min);
  let realHigh = document.querySelector("#high-temp");
  realHigh.innerHTML = `H: ${high}°`;
  let low = Math.round(response.data.main.temp_max);
  let realLow = document.querySelector("#low-temp");
  realLow.innerHTML = `L: ${low}°`;
  let forecast = response.data.weather[0].description;
  let realForecast = document.querySelector("#forecast");
  realForecast.innerHTML = `Forecast: ${forecast}`;
  let humidityPercent = Math.round(response.data.main.humidity);
  let realHumidity = document.querySelector("#humidity");
  realHumidity.innerHTML = `Humidity: ${humidityPercent}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let realWind = document.querySelector("#wind");
  realWind.innerHTML = `Wind: ${windSpeed} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "b8d2e31d5aa70bcb420f009b160b83e4";

  let cityInput = document.querySelector("#city-input");
  let cityD = document.querySelector("#city-id");
  cityD.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", searchCity);
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function positionNow(position) {
  let units = "metric";
  let apiKey = "b8d2e31d5aa70bcb420f009b160b83e4";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionNow);
}

let weatherNow = document.querySelector("#yourLocation");
weatherNow.addEventListener("click", getPosition);
