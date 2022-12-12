function addZero(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return time;
}
let currentTime = new Date();
let currentHours = addZero(currentTime.getHours());
let currentMinutes = addZero(currentTime.getMinutes());
let currentDate = currentTime.getDate();
let currentYear = currentTime.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
let months = [
  "January",
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
let currentMonth = months[currentTime.getMonth()];
let list = document.querySelector("#date");
list.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHours}:${currentMinutes}, ${currentYear}`;

function showWeatherCondition(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let maximumTemperature = document.querySelector("#temp-max");
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);

  let minimumTemperature = document.querySelector("#temp-min");
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "bfc240cf31a65a4e102fbd1b857444e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherCondition);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function getCurrentLocation(position) {
  let apiKey = "bfc240cf31a65a4e102fbd1b857444e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherCondition);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrentLocation);

search("Berlin");
