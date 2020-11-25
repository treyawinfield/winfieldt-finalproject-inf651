// Store HTML elements as variables to plug into API and event listeners
const form = document.querySelector(".top-section form");
const input = document.querySelector(".top-section input");
const submitBtn = document.querySelector(".top-section button");
const msg = document.querySelector(".top-section .msg");
const list = document.querySelector(".bottom-section .cities");
const clearBtn = document.querySelector(".button-section button");
let weatherCity = document.querySelector(".weather-city");
let weatherCountry = document.querySelector(".weather-country");
let weatherTemp = document.querySelector(".weather-temp");
let weatherIcon = document.querySelector(".weather-icon");
let weatherDescription = document.querySelector(".weather-description");

// Store API key as a variable
const apiKey = "51d8bcff5bdd0f065542270b04c731f8";

// If there is a location saved in local storage, use it as a default location
if (localStorage.getItem('test')) {
  let savedCity = localStorage.getItem('test');
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${savedCity}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      console.log(city);
      const country = data.sys.country;
      console.log(country);
      const temp = data.main.temp;
      console.log(temp);
      const weather = data.weather[0].description;
      console.log(weather);
      const icon = data.weather[0].icon;
      console.log(icon);

      // Plug the Open Weather Map data into the HTML
      list.innerHTML = `<h2 tabindex="0" class="city-name" data-name="${city},${country}">
      <span>${city}</span>
      <sup>${country}</sup>
      </h2>
      <div tabindex="0" class="city-temp">${Math.round(temp)}<sup>°F</sup></div>
      <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg" alt="${icon}">
      <div tabindex="0" class="city-description">${weather}</div>
      `;
    });
}  // If local storage is empty, use geolocation to set default location
else  {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      fetch(url)
      .then(response => response.json())
      .then(data => {
        const city = data.name;
        console.log(city);
        const country = data.sys.country;
        console.log(country);
        const temp = data.main.temp;
        console.log(temp);
        const weather = data.weather[0].description;
        console.log(weather);
        const icon = data.weather[0].icon;
        console.log(icon);
  
        list.innerHTML = `<h2 tabindex="0" class="city-name" data-name="${city},${country}">
        <span>${city}</span>
        <sup>${country}</sup>
        </h2>
        <div tabindex="0" class="city-temp">${Math.round(temp)}<sup>°F</sup></div>
        <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg" alt="${icon}">
        <div tabindex="0" class="city-description">${weather}</div>`;
      });
    })
  }
}

// Add an event listener for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateScreenReaderConfirmation(newLocation, "submitted");
});

// Add an event listener for submit button (also saves location to local storage)
submitBtn.addEventListener('click', function() {
  let inputVal = input.value;
  // update persistent data
  localStorage.setItem('test', inputVal);
 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      console.log(city);
      const country = data.sys.country;
      console.log(country);
      const temp = data.main.temp;
      console.log(temp);
      const weather = data.weather[0].description;
      console.log(weather);
      const icon = data.weather[0].icon;
      console.log(icon);

      list.innerHTML = `<h2 tabindex="0" class="city-name" data-name="${city},${country}">
      <span>${city}</span>
      <sup>${country}</sup>
      </h2>
      <div tabindex="0" class="city-temp">${Math.round(temp)}<sup>°F</sup></div>
      <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg" alt="${icon}">
      <div tabindex="0" class="city-description">${weather}</div>
      `;

    }) // If the city name is invalid, an error message will appear
    .catch(() => {
      msg.textContent = "Invalid city name. Please try again.";
    });
 
  msg.textContent = "";  // sets message to blank string
  form.reset();  // resets the input form
});

// Clear persistent data from local storage, displays geolocation instead
clearBtn.addEventListener('click', function() {
  localStorage.removeItem('test');
});

// Screen reader will read the new location and the action verb to 
// confirm the form input has been submitted
function updateScreenReaderConfirmation(newLocation, actionVerb) {
  document.getElementById("confirmation").textContent = `${newLocation} ${actionVerb}.`;
}



  




















