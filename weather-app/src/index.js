// import my styles (order is important)
import "./styles/reset.css";
import "./styles/styles.css";
import "./styles/speedometer.css";
import "./styles/progressbar.css";

const PUBLIC_API_KEY = "0ca9d53d2b652c10a5a8656ff1807c73";
const cityImg = document.getElementById("city-img");

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

async function doSomething() {
  // validate user input and get geodata of city
  if (searchBar.value === "") return;
  const [geoData, geoError] = await to(getGeoData, searchBar.value);
  if (geoError) {
    console.log(geoError);
    return;
  }
  console.log(geoData);

  const validCityName = geoData[0].name;
  const [weatherData, pollutionData, forecastData, imageURL] =
    await Promise.all([
      to(getCurrentWeatherData, validCityName),
      to(getPollutionData, geoData[0].lat, geoData[0].lon),
      to(getFiveDayForecastData, validCityName),
      to(getCityImageURL, validCityName),
    ]).catch((error) => {
      console.log(error);
    });
  cityImg.src = imageURL[0];
  console.log(imageURL);
}

searchBar.addEventListener("keyup", () => {
  clearTimeout(timeout);
  timeout = setTimeout(doSomething, checkDelay);
});
