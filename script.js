// Selectors
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const videoSource = [
  {
    bgVideo: "night",
    source: "./assets/bg-videos/night.mp4",
  },
  {
    bgVideo: "raining",
    source: "./assets/bg-videos/raining.mp4",
  },
  {
    bgVideo: "evening",
    source: "./assets/bg-videos/evening.mp4",
  },
  {
    bgVideo: "clouds",
    source: "./assets/bg-videos/clouds.mp4",
  },
  {
    bgVideo: "sunny-sky",
    source: "./assets/bg-videos/sunny-sky.mp4",
  },
  {
    bgVideo: "snowfall",
    source: "./assets/bg-videos/snow.mp4",
  },
  {
    bgVideo: "haze",
    source: "./assets/bg-videos/haze.mp4",
  },
];

const search = document.querySelector("#search");
const place = document.querySelector("#place");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const temperatureValue = document.querySelector("#temperature-value");
const icon = document.querySelector("#icon");
const myVideo = document.querySelector("#myVideo");
const weatherContainer = document.querySelector("#weather-box");

// EventListeners
search.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let value = e.target.value.trim();
    if (value != "") searchWeather(value);
    e.target.value = "";
  }
});

function searchWeather(value) {
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&apikey=cd2867c84db4c712cdfe85f7d5c120a2`;

  //Requesting Api
  fetch(apiWeather)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("You have entered a wrong city name! Try Again");
      } else {
        myVideo.src = getBackgroundWeather(
          data.weather[0].id,
          data.weather[0].icon
        );
        showWeatherDetails(data);
      }
    });
}

function showWeatherDetails(data) {
  place.innerHTML = data.name;
  humidity.innerHTML = `Humidity: ${data.main.humidity}`;
  windSpeed.innerHTML = `Wind Speed: ${Math.round(data.wind.speed)} km/h`;
  temperatureValue.innerHTML = Math.round(data.main.temp);
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function setWeatherBox(rgbaColor, color) {
  weatherContainer.style.backgroundColor = rgbaColor;
  weatherContainer.style.border = `2px solid $color`;
  weatherContainer.style.color = color;
}

function getBackgroundWeather(id, icon) {
  setWeatherBox("rgba(176, 230, 225, 0.7)", "black");
  
  if (id == 800) {
    if (icon[2] == "n") return videoSource[0].source; // night
    return videoSource[4].source;
  }
  id = Math.round(id / 100);
  switch (id) {
    case 2:
    case 3:
    case 5:
      return videoSource[1].source; // raining
    case 6:
      return videoSource[5].source; // snowfall
    case 7: {
      return videoSource[6].source; // haze
    }
    case 8:
      if (icon[2] == "n") {
        setWeatherBox("rgba(0, 0, 0, 0.7)", "white")
        return videoSource[0].source;
      } // night
      return videoSource[3].source; // clouding
  }
}
