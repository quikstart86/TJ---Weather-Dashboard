const defaultCity = `London`;
const defaultUnits = `metric`;
const apiKey = `e0fceb01398f5422268df38928be67d4`;


const searchInput = $(`#search-input`);
const searchBtn = $(`#search-button`);


// new
let savedSearches = JSON.parse(localStorage.getItem(`savedSearches`)) || [];

if (!Array.isArray(savedSearches)) {
  savedSearches = [];
}

function displayTime() {
  $(`#TimeNow`).text(dayjs().format(`dddd, MMMM D, YYYY`))
  $(`#dateNow`).text(dayjs().format(`HH:mm A`))
}

// update every second
setInterval(displayTime, 1000)





// function to get current weather of city api
function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${defaultUnits}`;
  fetchWeatherData(queryURL, 'today');
}
// calling the function
getCurrentWeather(defaultCity);

// function to get 5 day forecast api
function getFiveDayForecast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${defaultUnits}`;
  fetchWeatherData(queryURL, 'forecastList');
}

function fetchWeatherData(queryURL, containerId) {
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(queryURL);
      console.log(data);

      if (!savedSearches.includes(data.name)) {
        savedSearches.push(data.name);
        localStorage.setItem(`savedSearches`, JSON.stringify(savedSearches));
        displaySavedSearches();
      }

      if (containerId === 'today') {
        displayCurrentWeather(data);
      } else if (containerId === 'forecastList') {
        displayFiveDayForecast(data);
      }
    });
}

function displayCurrentWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  $(`#today`).html(`<div class="card col-sm-10">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(data.dt * 1000).toLocaleDateString()}</h6>
      <img src="${iconUrl}" alt="Weather Icon">
      <p class="card-text">Condition: ${data.weather[0].description}</p>
      <p class="card-text">Temperature: ${data.main.temp}°C</p>
      <p class="card-text">Humidity: ${data.main.humidity}%</p>
      <p class="card-text">Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  </div>`);
}

function displayFiveDayForecast(data) {
  const forecastList = $('#forecastList');
  forecastList.empty();

  // Loop through the 5-day forecast data
  for (let i = 0; i < data.list.length; i += 8) {
    const forecastData = data.list[i];
    const iconCode = forecastData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    forecastList.append(`<div class="card col-sm-2">
      <div class="card-body">
        <h5 class="card-title">${new Date(forecastData.dt * 1000).toLocaleDateString()}</h5>
        <img src="${iconUrl}" alt="Weather Icon">
        <p class="card-text">Condition: ${forecastData.weather[0].description}</p>
        <p class="card-text">Temperature: ${forecastData.main.temp}°C</p>
        <p class="card-text">Humidity: ${forecastData.main.humidity}%</p>
        <p class="card-text">Wind Speed: ${forecastData.wind.speed} m/s</p>
      </div>
    </div>`);
  }
}

searchBtn.on(`click`, function (e) {
  e.preventDefault();
  const city = searchInput.val();
  getCurrentWeather(city);
  getFiveDayForecast(city);
});

function displaySavedSearches() {
  const $savedSearchList = $('#history');
  $savedSearchList.empty();

  savedSearches.forEach(function (city) {
    $savedSearchList.append(`<button class="col-sm-12 mb-2">${city}</button>`);
  });
}

displaySavedSearches();
