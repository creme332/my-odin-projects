// import my styles
import "./reset.css";
import "./styles.css";

async function getWeatherData(countryName) {
  const API_KEY = "0ca9d53d2b652c10a5a8656ff1807c73";
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${API_KEY}`;

  try {
    const response = await fetch(URL);
    // console.log(response);
    const weather = await response.json();
    console.log(weather);
  } catch (err) {
    console.log("teerre");
    console.log(err);
  }
}
async function getPollutionData(latitude, longitude) {
  const API_KEY = "0ca9d53d2b652c10a5a8656ff1807c73";
  const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const weather = await response.json();
    console.log(weather);
  } catch (err) {
    console.log("teerre");
    console.log(err);
  }
}

// getWeatherData("Port-Louis");
// getPollutionData(57,-20);