// global Variables
var searchBtn = $("#search-btn");
var input = $("#input");
var seachHistory = $("#search-history");
var citySearch = $("section1");
var uvIndex = $("section2");
var forecast = $("section3");
var citySearchArr = [];

function getForecast(input) {
  var userInput = $("#input").val();
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    userInput +
    "&limit=5&appid=9539ef3d12e637ffcaf99d047bb46263";
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

searchBtn.on("click", getForecast);
