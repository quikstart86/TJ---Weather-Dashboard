const defaultCity = `london`;
const defaultUnits = `metric`;
const apiKey = `e0fceb01398f5422268df38928be67d4`;
const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${apiKey}&units=${defaultUnits}`;

console.log(apiKey);

// new
let savedSearches = JSON.parse(localStorage.getItem(`savedSearches`)) || [];

function displayTime() {
    $(`#TimeNow`).text(dayjs().format(`dddd, MMMM D, YYYY`))
    $(`#dateNow`).text(dayjs().format(`HH:mm A`))
}

// update every second
setInterval(displayTime, 1000)

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

    savedSearches.push(defaultCity);

    localStorage.setItem(`savedSearches`, JSON.stringify(savedSearches));
    displaySavedSearches();
  });

  function displaySavedSearches() {
    const $savedSearchList = $('#savedSearchList');
    $savedSearchList.empty(); // Clear previous searches

    savedSearches.forEach(function (city) {
        $savedSearchList.append(`<button>${city}</button>`);
    });
}


// Load a home screen with local weather set to london (4/5days)
// able to search for other cities in a search bar
// save searched cities to local storage
// clear all search items


  // Load a home screen with local weather set to london (4/5days)
  // able to search for other cities in a search bar
  // save seached cities to local storage
  // clear all search items