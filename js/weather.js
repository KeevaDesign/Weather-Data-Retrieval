require("dotenv").config();
const apiKey = process.env.API_KEY;
// const apiKey = "07d67f84cd34e2452408a52a5a0c1414";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

// const cityName = "Toronto";
// const countryCode = "CA";

// https://api.openweathermap.org/data/2.5/weather?q=Toronto,canada&appid=07d67f84cd34e2452408a52a5a0c1414

// Current Weather Conditions
// Location
// Icon (this is an image, look into the API documentation for details)
// Temperature (in celsius, look into the API documentation for details)

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
  var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

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
