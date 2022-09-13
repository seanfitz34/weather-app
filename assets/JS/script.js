// global Variables
//  apiKey = 9539ef3d12e637ffcaf99d047bb46263
var searchBtn = document.querySelector("#search-btn");
var history = document.querySelector("#history-container");
var seachHistory = document.querySelector("#search-history");
var input = document.querySelector("#input");
var displaySearch = document.querySelector("#section2");
var forecast = document.querySelector("#section3");
var fiveDay = document.querySelector("#section-4");
var citySearchArr = [];
// getting user input value
function getUserInput() {
  var userInput = document.querySelector("#input").value;
  fetchCurrentWeather(userInput);
}

// fetching City weather
function fetchCurrentWeather(city) {
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=73e30e235368e0da0d19b61f0af2e5d3";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildDisplaySearch(data);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      fetchForcast(lat, lon);
    });
}

// function to get lat, lon of city search
function fetchForcast(lat, lon) {
  var url =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=73e30e235368e0da0d19b61f0af2e5d3";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildForcast(data);
    });
}
// local storage

function addToArray(userInput) {
  citySearchArr.push(userInput);
  addToLocalStorage();
}

function getLocalStorage() {
  citySearchArr = JSON.parse(localStorage.getItem("CityList"));
}
function addToLocalStorage() {
  localStorage.setItem("CityList", citySearchArr);
}

console.log(localStorage);

// function to display 5 day forcast
function buildDisplaySearch(cityData) {
  // console.log(cityData);
  var cityCard = document.createElement("div");
  cityCard.setAttribute("class", "city-card m-1 bg-primary text-center");

  var name = cityData.name;
  var temperature = "Temperature is:" + cityData.main.temp + "°F";
  var humidity = "Humidity is:" + cityData.main.humidity + "%";
  var wind = "Wind:" + cityData.wind.speed + "km/h";

  var dsName = document.createElement("h2");
  dsName.textContent = name;
  cityCard.appendChild(dsName);

  var dsTemp = document.createElement("h3");
  dsTemp.textContent = temperature;
  cityCard.appendChild(dsTemp);

  var dsHum = document.createElement("h3");
  dsHum.textContent = humidity;
  cityCard.appendChild(dsHum);

  var dsWind = document.createElement("h3");
  dsWind.textContent = wind;
  cityCard.appendChild(dsWind);
  displaySearch.appendChild(cityCard);
}

function buildForcast(forcastData) {
  var futureForcastList = forcastData.list;
  for (let i = 1; i < 6; i++) {
    const day = futureForcastList[i];
    console.log(day);

    var card = document.createElement("div");
    card.setAttribute("class", "col m-1 py-2 bg-success");

    var cardDate = document.createElement("h4");
    cardDate.textContent = moment.unix(day.dt).format("M/D/YYYY");
    card.appendChild(cardDate);

    var nextDayTemp = document.createElement("p");
    var nextDayWind = document.createElement("p");
    var nextDayHumid = document.createElement("p");

    nextDayTemp.textContent = "Temp: " + day.main.temp + "°F";
    nextDayHumid.textContent = "Humidity: " + day.main.humidity + "%";
    nextDayWind.textContent = "Wind: " + day.wind.speed + " MPH";

    card.appendChild(nextDayTemp);
    card.appendChild(nextDayWind);
    card.appendChild(nextDayHumid);

    forecast.appendChild(card);
  }
}
// making search btn active
searchBtn.addEventListener("click", getUserInput);
