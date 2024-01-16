const defaultCity = `London`;
const defaultUnits = `metric`;
const apiKey = `e0fceb01398f5422268df38928be67d4`;


const searchInput = $(`#search-input`);
const searchBtn = $(`#search-button`);
console.log(apiKey);

// new
let savedSearches = JSON.parse(localStorage.getItem(`savedSearches`)) || [];

function displayTime() {
  $(`#TimeNow`).text(dayjs().format(`dddd, MMMM D, YYYY`))
  $(`#dateNow`).text(dayjs().format(`HH:mm A`))
}

// update every second
setInterval(displayTime, 1000)

getCurrentWeather(defaultCity);

function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${defaultUnits}`;
  fetch(queryURL)
    .then(function (response) {
      // Calling .json() to access the json data stored inside the returned promise
      return response.json();
    })
    // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {
      // Log the queryURL
      console.log(queryURL);

      // Log the entire response object
      console.log(data);
      if (!savedSearches.includes(data.name)) {

        savedSearches.push(data.name);

        localStorage.setItem(`savedSearches`, JSON.stringify(savedSearches));
        displaySavedSearches();
      }
      $(`#today`).html(`<div class="card col-sm-10">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(data.dt * 1000).toLocaleDateString()}</h6>
        <p class="card-text">Condition ${data.weather[0].description}</p>
        <p class="card-text">Temp ${data.main.temp}C°</p>
        <p class="card-text">Humidity ${data.main.humidity}C°</p>
        <p class="card-text">Wind Speed ${data.wind.speed}</p>

      </div>
    </div>`)
    });
}
function getForecast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${defaultUnits}`;
  fetch(queryURL)
    .then(function (response) {
      // Calling .json() to access the json data stored inside the returned promise
      return response.json();
    })
    // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {
      // Log the queryURL
      console.log(queryURL);

      // Log the entire response object
      console.log(data);



      if (!savedSearches.includes(data.city.name)) {

        savedSearches.push(data.city.name);

        localStorage.setItem(`savedSearches`, JSON.stringify(savedSearches));
        displaySavedSearches();
      }
    });
}

searchBtn.on(`click`, function (e) {
  e.preventDefault()
  getCurrentWeather(searchInput.val());

  getForecast(searchInput.val())
})
function displaySavedSearches() {
  const $savedSearchList = $('#history');
  $savedSearchList.empty(); // Clear previous searches

  savedSearches.forEach(function (city) {
    $savedSearchList.append(`<button class="col-sm-12 mb-2">${city}</button>`);
  });
}
displaySavedSearches();

