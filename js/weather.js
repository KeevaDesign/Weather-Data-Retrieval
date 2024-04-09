

require("dotenv").config();




const apiKey = process.env.API_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

function getWeatherData(cityName, countryCode, resultElementId) {
  const url = `${baseURL}q=${cityName},${countryCode}&appid=${apiKey}&units=metric`;

  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displayWeatherData(data, resultElementId);
    },
  });
}

function displayWeatherData(data, resultElementId) {
  const timezoneOffsetInSeconds = data.timezone;
  const localDate = new Date((data.dt + timezoneOffsetInSeconds) * 1000);
  var iconcode = data.weather[0].icon;
  var iconurl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";

  const displayData = `
        <h4>${localDate.toLocaleString()}</h4>
        <h1>${data.name}, ${data.sys.country}</h1>
        <img src='${iconurl}'>
        <h3> ${data.main.temp} °C</h3>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;

  $(`#${resultElementId}`).html(displayData);
}

$(document).ready(function () {
  getWeatherData("Toronto", "CA", "weatherResult");
  getWeatherData("Hong Kong", "HK", "weatherHKResult");
});
