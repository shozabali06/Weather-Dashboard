// Input elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

// Current weather elements
const currentCity = document.getElementById("currentCity");
const currentDate = document.getElementById("currentDate");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const currentTemp = document.getElementById("currentTemp");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");

// Forecast elements
const forecastContainer = document.getElementById("forecastContainer");

// States
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const weatherContent = document.getElementById("weatherContent");
const errorMessage = document.getElementById("errorMessage");

// OpenWeather Configs
const apiKey = "3a34a8f532adaa77a52589fefcc4b5ac";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const iconUrl = "https://openweathermap.org/img/wn";

// Functions
const showWeatherContent = () => {
  weatherContent.classList.remove("hidden");
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
};

const getWeatherByCoords = async (lat, lon) => {
  try {
    const [currentWeather, forecast] = await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchForecast(lat, lon),
    ]);

    displayCurrentWeather(currentWeather);
    displayForecast(forecast);
    showWeatherContent();
  } catch (error) {
    showError(error.message);
  }
};

const loadDefaultCity = async () => {
  getWeatherByCity("Islamabad");
};

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    },
    (error) => {
      showError(
        "Unable to retrieve your location. Please enter a city manually."
      );
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          message = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          message = "An unknown error occurred.";
          break;
        default:
          message = "An unknown error occurred.";
          break;
      }
      showError(message);
    }
  );
};

const getWeatherByCity = async (city) => {
  showLoading();
  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      throw new Error(
        "City not found. Please check the spelling and try again."
      );
    }

    const { lat, lon } = geoData[0];
    await getWeatherByCoords(lat, lon);
  } catch (error) {
    showError(error.message);
  }
};

const handleSearch = () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
    cityInput.value = "";
  }
};

const fetchCurrentWeather = async (lat, lon) => {
  const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.Please try again.");
  }

  return await response.json();
};

const fetchForecast = async (lat, lon) => {
  const url = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data. Please try again.");
  }

  return await response.json();
};

const displayCurrentWeather = (data) => {
  currentCity.textContent = `${data.name}, ${data.sys.country}`;
  currentDate.textContent = formatDate(new Date());

  const iconCode = data.weather[0].icon;
  currentWeatherIcon.src = `${iconUrl}/${iconCode}@2x.png`;
  currentWeatherIcon.alt = data.weather[0].description;

  currentTemp.textContent = `${Math.round(data.main.temp)}°`;
  weatherDescription.textContent = data.weather[0].description;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;

  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  pressure.textContent = `${data.main.pressure} hPa`;
};

const displayForecast = (data) => {
  forecastContainer.innerHTML = "";

  const dailyForecasts = processForecastData(data.list);
  dailyForecasts.slice(0, 3).forEach((forecast) => {
    const forecastElement = createForecastElement(forecast);
    forecastContainer.appendChild(forecastElement);
  });
};

const processForecastData = (forecastList) => {
  const dailyData = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: date,
        temps: [],
        weather: item.weather[0],
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      };
    }

    dailyData[dateKey].temps.push(item.main.temp);
  });

  return Object.values(dailyData).map((day) => ({
    date: day.date,
    weather: day.weather,
    tempMax: Math.round(Math.max(...day.temps)),
    tempMin: Math.round(Math.min(...day.temps)),
    humidity: day.humidity,
    windSpeed: Math.round(day.windSpeed * 3.6),
  }));
};

const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
};

const createForecastElement = (forecast) => {
  const forecastItem = document.createElement("div");
  forecastItem.className = "forecast-item";

  const date = forecast.date;
  const isTodayCheck = isToday(date);
  const isTomorrowCheck = isTomorrow(date);

  let dateText;
  if (isTodayCheck) {
    dateText = "Today";
  } else if (isTomorrowCheck) {
    dateText = "Tomorrow";
  } else {
    dateText = date.toLocaleDateString("en-US", { weekday: "long" });
  }

  forecastItem.innerHTML = `
            <div class="forecast-date">${dateText}</div>
            <div class="forecast-icon">
                <img src="${iconUrl}/${forecast.weather.icon}@2x.png" alt="${forecast.weather.description}">
            </div>
            <div class="forecast-temps">
                <span class="forecast-high">${forecast.tempMax}°</span>
                <span class="forecast-low">${forecast.tempMin}°</span>
            </div>
            <div class="forecast-desc">${forecast.weather.description}</div>
        `;

  return forecastItem;
};

const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

const showLoading = () => {
  loadingState.classList.remove("hidden");
  errorState.classList.add("hidden");
  weatherContent.classList.add("hidden");
};

const showError = (message) => {
  errorMessage.textContent = message;
  errorState.classList.remove("hidden");
  loadingState.classList.add("hidden");
  weatherContent.classList.add("hidden");
};

// Event listeners
searchBtn.addEventListener("click", () => handleSearch());
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});
locationBtn.addEventListener("click", () => getCurrentLocation());

// Runs on first page load
loadDefaultCity();
