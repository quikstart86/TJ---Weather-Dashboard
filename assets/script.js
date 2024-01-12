

const apiKey = `e0fceb01398f5422268df38928be67d4`;
const queryURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}units=metric`;

console.log(apiKey);

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

    // Log the resulting object
    console.log(data);

  
  });