const key = "d328484df258cf95913c7e5b3b19b708";

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let getWeather = () => {
let cityValue = cityRef.value;

  
cityRef.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getWeather();
    }
  });

  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        console.log(data.main.feels_like);
        console.log(data.wind.speed);
        console.log(data.main.pressure);
        console.log(data.main.humidity);
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${Math.round(data.main.temp)} &#176;C</h1>
        <p class="feels">Feels like: ${Math.round(data.main.feels_like)} &#176;C</p>
        <p class="wind">Wind Speed: ${data.wind.speed} m/s</p>
        <p class="pressure">Pressure: ${data.main.pressure} hPa</p>
        <p class="humidity">Humidity: ${data.main.humidity}%</p>
        <div class="temp-container">
            <div>
                <h4 class="title">Min</h4>
                <h4 class="temp">${Math.round(data.main.temp_min)}&#176;C</h4>
            </div>
            <div>
                <h4 class="title">Max</h4>
                <h4 class="temp">${Math.round(data.main.temp_max)}&#176;C</h4>
            </div>
        </div>
        `;
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
