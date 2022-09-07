// global Variables
//  apiKey = 9539ef3d12e637ffcaf99d047bb46263
var searchBtn = document.querySelector("#search-btn");

var seachHistory = document.querySelector("#search-history");

var displaySearch = document.querySelector("#section2");
var forecast = document.querySelector("#section3");
var citySearchArr = [];

function getUserInput() {
  var userInput = document.querySelector("#input").value;
  fetchCurrentWeather(userInput);
}

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

function buildDisplaySearch(cityData) {
  console.log(cityData);
  var name = cityData.name;
  var temperature = cityData.main.temp;
  var humidity = cityData.main.humidity;
  var wind = cityData.wind.speed;
}

function buildForcast(forcastData) {
  // console.log(forcastData);
}

searchBtn.addEventListener("click", getUserInput);
