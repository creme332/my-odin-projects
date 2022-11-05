// import my styles (order is important)
import "./styles/reset.css";
import "./styles/styles.css";
import "./styles/speedometer.css";
import "./styles/progressbar.css";
import "./styles/loader.css";

import cloudSnowImgSrc from "./assets/weather/cloud-snow.svg";
import cloudSunRainImgSrc from "./assets/weather/cloud-sun-rain.svg";
import cloudSunImgSrc from "./assets/weather/cloud-sun.svg";
import cloudImgSrc from "./assets/weather/cloud.svg";
import lightningImgSrc from "./assets/weather/lightning.svg";
import sunImgSrc from "./assets/weather/sun.svg";

const PUBLIC_API_KEY = "0ca9d53d2b652c10a5a8656ff1807c73";

const view = (() => {
  const sidebarEl = document.querySelector(".sidebar");

  function toggleLoadingAnimation(showLoader = true) {
    const loader = sidebarEl.querySelector(".loader");
    if (showLoader) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }

  function setCityImage(src) {
    const cityImg = document.getElementById("city-img");
    cityImg.src = src;
  }

  function setCityImageCaption(text) {
    const cityNameEl = document.getElementById("city-name");
    cityNameEl.textContent = text;
  }

  function setCurrentWeatherImage(weatherID) {
    const sidebarWeatherImage = sidebarEl.querySelector(".weather-icon");

    if (weatherID >= 200 && weatherID < 300) {
      // thunderstorm
      sidebarWeatherImage.src = lightningImgSrc;
      return;
    }

    if (weatherID >= 300 && weatherID < 600) {
      // drizzle
      sidebarWeatherImage.src = cloudSunRainImgSrc;
      return;
    }

    if (weatherID >= 600 && weatherID < 700) {
      // snow
      sidebarWeatherImage.src = cloudSnowImgSrc;
      return;
    }
    if (weatherID >= 700 && weatherID < 800) {
      // atmosphere
      sidebarWeatherImage.src = sunImgSrc;
    }
    if (weatherID === 800) {
      // clear
      sidebarWeatherImage.src = sunImgSrc;
    }
    if (weatherID === 801) {
      sidebarWeatherImage.src = cloudSunImgSrc;
    }
    if (weatherID >= 802 && weatherID < 900) {
      // clouds
      sidebarWeatherImage.src = cloudImgSrc;
    }
  }

  function setMainTemperature(tempInKelvin) {
    const tempInCelcius = parseInt(tempInKelvin - 273.15, 10);
    sidebarEl.querySelector(".temperature .number").textContent = tempInCelcius;
  }

  function extractLocalDate(dt, timezone) {
    const utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    const localDate = new Date(utcMilliseconds).toUTCString();
    return localDate;
  }

  function extractLocalTime(localDate) {
    const hour = localDate.slice(17, 19);
    const minute = localDate.slice(20, 22);
    return `${hour}:${minute}`;
  }

  function setDate(unixTimestamp, timezone) {
    const localDate = extractLocalDate(unixTimestamp, timezone); //local date in city
    const formatTime = extractLocalTime(localDate);
    const day = localDate.slice(0, 3); // abbreviated day
    console.log(formatTime);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const fullDay = days.filter((val) => val.slice(0, 3) === day)[0];
    sidebarEl.querySelector(".date .day").textContent = `${fullDay}, `;
    sidebarEl.querySelector(".date .time").textContent = formatTime;
  }

  function setWindSpeed(speed) {
    document.querySelector("#wind-card .number").textContent = speed;
  }

  function setHumidity(humidityPercent) {
    document.querySelector("#humidity-card .number").textContent =
      humidityPercent;

    const statusEl = document.querySelector("#humidity-card .status");
    const progressBar = document.querySelector("#humidity-card .progress-bar");

    if (humidityPercent < 50) {
      setStatus(
        statusEl,
        humidityPercent,
        [0, 24],
        [25, 30],
        [31, 60],
        progressBar
      );
    } else {
      setStatus(
        statusEl,
        humidityPercent,
        [71, 100],
        [61, 70],
        [30, 60],
        progressBar
      );
    }
  }

  function setStatus(
    statusEl,
    value,
    badThreshold,
    avgThreshold,
    goodThreshold,
    progressBar
  ) {
    statusEl.classList.remove("bad");
    statusEl.classList.remove("good");
    statusEl.classList.remove("average");

    if (badThreshold[0] <= value && value <= badThreshold[1]) {
      statusEl.classList.add("bad");
    }

    if (avgThreshold[0] <= value && value <= avgThreshold[1]) {
      statusEl.classList.add("average");
    }

    if (goodThreshold[0] <= value && value <= goodThreshold[1]) {
      statusEl.classList.add("good");
    }

    if (!progressBar) return;

    function setProgressBar() {
      const inputs = progressBar.querySelectorAll("input");
      inputs.forEach((i) => i.removeAttribute("checked"));
      if (statusEl.classList.contains("bad")) {
        inputs[2].setAttribute("checked", "checked");
        return;
      }
      if (statusEl.classList.contains("average")) {
        inputs[1].setAttribute("checked", "checked");
        return;
      }
      if (statusEl.classList.contains("good")) {
        inputs[0].setAttribute("checked", "checked");
      }
    }
    setProgressBar();
  }

  function setVisibility(visibility) {
    document.querySelector("#visibility-card .number").textContent = visibility;

    const statusEl = document.querySelector("#visibility-card .status");
    setStatus(statusEl, visibility, [0, 3000], [3000, 7000], [7000, 10000]);
  }

  function setAirQuality(airIndex) {
    document.querySelector("#air-card .number").textContent = airIndex;
    const statusEl = document.querySelector("#air-card .status");
    const progressBar = document.querySelector("#air-card .progress-bar");
    setStatus(statusEl, airIndex, [4, 5], [3, 3], [1, 2], progressBar);
  }

  function setSunrise(unixTimestamp, timezone) {
    document.querySelector("#sunrise-time").textContent = extractLocalTime(
      extractLocalDate(unixTimestamp, timezone)
    );
  }

  function setSunset(unixTimestamp, timezone) {
    document.querySelector("#sunset-time").textContent = extractLocalTime(
      extractLocalDate(unixTimestamp, timezone)
    );
  }

  function setPressure(val) {
    const maxPressure = 1600;
    const minPressure = 860;
    const delta = parseInt(val, 10) - minPressure;
    const rotationDeg = parseInt(
      (180 * delta) / (maxPressure - minPressure),
      10
    );

    const tickerElement = document.querySelector(".speedometer .scorer-1-tick");

    //reset tickerElement
    tickerElement.style.removeProperty("transform");

    //play animation
    document.documentElement.style.setProperty(
      "--speedometer-rotation-angle",
      `${rotationDeg}deg`
    );
    tickerElement.classList.add("play-speedometer-animation");

    tickerElement.addEventListener(
      "animationend",
      () => {
        console.log("end");
        tickerElement.classList.remove("play-speedometer-animation");
        tickerElement.style.transform = `rotate(${rotationDeg}deg)`;
      },
      { once: true }
    );
    document.querySelector("#speedometer-value .number").textContent = val;
  }

  return {
    setCityImage,
    setCurrentWeatherImage,
    toggleLoadingAnimation,
    setCityImageCaption,
    setMainTemperature,
    setDate,
    setVisibility,
    setAirQuality,
    setHumidity,
    setWindSpeed,
    setSunrise,
    setSunset,
    setPressure,
  };
})();

const model = (() => {})();

const controller = (() => {})();

async function to(func, ...params) {
  let result = null;
  let error = null;
  try {
    result = await func(...params);
  } catch (e) {
    error = e;
  }
  return [result, error];
}

async function getCityImageURL(cityName) {
  const URL = `https://source.unsplash.com/random/200x300/?${cityName}-landscape`;

  const [response, err1] = await to(fetch, URL);
  if (err1) {
    throw new Error(`Cannot fetch image ${cityName}`, err1);
  }

  if (response.status !== 200) {
    throw new Error("Invalid status code", response);
  }

  const NotFoundURL =
    "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
  const defaultURL =
    "https://images.unsplash.com/photo-1505521377774-103a8cc2f735?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2NzYzNTI3MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200";

  if (response.url === NotFoundURL) {
    return defaultURL;
  }
  return response.url;
}

async function getGeoData(cityName) {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${PUBLIC_API_KEY}`;
  const [response, err1] = await to(fetch, URL);
  if (err1) {
    throw new Error(`Cannot fetch geo data of ${cityName}`, err1);
  }

  if (response.status !== 200) {
    throw new Error("Invalid status code", response);
  }

  const geoDataJSON = await response.json();

  if (geoDataJSON.length === 0) {
    throw new Error("Invalid city name", geoDataJSON);
  }
  return geoDataJSON;
}

async function getCurrentWeatherData(cityName) {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${PUBLIC_API_KEY}`;
  const [response, err1] = await to(fetch, URL);
  if (err1) {
    throw new Error(`Cannot fetch current weather data of ${cityName}`, err1);
  }
  if (response.status !== 200) {
    throw new Error("Invalid status code", response);
  }

  const weather = await response.json();
  return weather;
}

async function getPollutionData(latitude, longitude) {
  const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${PUBLIC_API_KEY}`;
  const [response, err1] = await to(fetch, URL);
  if (err1) {
    throw new Error(
      `Cannot fetch pollution data of (${latitude}, ${longitude})`,
      err1
    );
  }
  if (response.status !== 200) {
    throw new Error(
      `Invalid status code coordinates(${latitude}, ${longitude})`,
      response
    );
  }
  const weather = await response.json();
  return weather;
}

async function getFiveDayForecastData(cityName) {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${PUBLIC_API_KEY}`;
  const [response, err1] = await to(fetch, URL);
  if (err1) {
    throw new Error(`Cannot fetch current forecase data of ${cityName}`, err1);
  }
  if (response.status !== 200) {
    throw new Error("Invalid status code", response);
  }
  const forecast = await response.json();
  return forecast;
}

const searchBar = document.querySelector("#search-input");
const checkDelay = 1000; // delay after user input for verification IN ms.
let timeout = null;

searchBar.value = "mexico city";
doSomething();

async function doSomething() {
  if (searchBar.value === "") return;

  view.toggleLoadingAnimation(); // start loading animation

  const [geoData, geoError] = await to(getGeoData, searchBar.value);
  if (geoError) {
    console.log(geoError);
    return;
  }

  const validCityName = geoData[0].name;
  const validCountryName = geoData[0].country;
  const [
    weatherData = null,
    pollutionData = null,
    forecastData = null,
    imageURL = null,
  ] = await Promise.all([
    getCurrentWeatherData(validCityName),
    getPollutionData(geoData[0].lat, geoData[0].lon),
    getFiveDayForecastData(validCityName),
    getCityImageURL(validCityName),
  ]).catch((error) => {
    console.log(error);
  });

  view.toggleLoadingAnimation(false); // stop loading animation

  view.setCityImage(imageURL);
  view.setCityImageCaption(`${validCityName}, ${validCountryName}`);
  view.setCurrentWeatherImage(weatherData.weather[0].id);
  view.setMainTemperature(weatherData.main.temp);

  view.setVisibility(weatherData.visibility);
  view.setAirQuality(pollutionData.list[0].main.aqi);
  view.setWindSpeed(weatherData.wind.speed);
  view.setHumidity(weatherData.main.humidity);
  view.setPressure(weatherData.main.pressure);

  view.setDate(weatherData.dt, weatherData.timezone);
  view.setSunrise(weatherData.sys.sunrise, weatherData.timezone);
  view.setSunset(weatherData.sys.sunset, weatherData.timezone);
}

searchBar.addEventListener("keyup", () => {
  clearTimeout(timeout);
  timeout = setTimeout(doSomething, checkDelay);
});
