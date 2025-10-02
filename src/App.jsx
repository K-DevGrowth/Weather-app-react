import { use, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";

const API_LOCATION_URL = "https://geocoding-api.open-meteo.com/v1/search";
const API_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const API_REVERSE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const DEFAULT_LOCATION = {
  name: "Ho Chi Minh City",
  country: "Vietnam",
  latitude: 10.8231,
  longitude: 106.6297,
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [country, setCountry] = useState(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchLocation = async (query = "") => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${API_LOCATION_URL}?name=${encodeURIComponent(query)}&count=5`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data) {
        setErrorMessage(data.Error || "No locations found.");
        setLocationList([]);
        return;
      }

      setLocationList(data.results || []);
    } catch (error) {
      console.error("Error fetching location:", error);
      setErrorMessage("Failed to fetch location data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchWeather = async (latitude, longitude) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation,relative_humidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&temperature_unit=${
          unit.temp || "celsius"
        }&wind_speed_unit=${unit.wind || "kmh"}&precipitation_unit=${
          unit.precipitation || "mm"
        }&timezone=auto`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data) {
        setErrorMessage(data.Error || "No weather data found.");
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setErrorMessage("Failed to fetch weather data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `${API_REVERSE_GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        setCountry({
          name:
            data.city ||
            data.locality ||
            data.principalSubdivision ||
            "Unknown",
          country: data.countryName || data.countryCode || "Unknown",
          latitude: latitude,
          longitude: longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching location name:", error);

      setCountry({
        name: "Current Location",
        country: "",
        latitude: latitude,
        longitude: longitude,
      });
    }
  };

  const handleSelectLocation = (location) => {
    setCountry({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    fetchWeather(location.latitude, location.longitude);
    setLocationList([]);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await Promise.all([
          fetchWeather(latitude, longitude),
          fetchLocationName(latitude, longitude),
        ]);
      },
      async () => {
        await Promise.all([
          fetchWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude),
          fetchLocationName(
            DEFAULT_LOCATION.latitude,
            DEFAULT_LOCATION.longitude
          ),
        ]);
      }
    );
  }, []);

  useEffect(() => {
    if (country) {
      fetchWeather(country.latitude, country.longitude);
    }
  }, [unit, country]);


  return (
    <main className="relative bg-blue-100 dark:bg-Neutral-900 dark:text-Neutral-0 p-4 w-screen h-dvh overflow-x-hidden">
      <Navbar unit={unit} setUnit={setUnit} />
      <Search
        handleSelectLocation={handleSelectLocation}
        locationList={locationList}
        isLoading={isLoading}
        errorMessage={errorMessage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="grid lg:grid-cols-[2fr_1fr] py-4 lg:px-8 sm:px-4 gap-6">
        {weather && (
          <>
            <div>
              <CurrentWeatherCard country={country} data={weather.current} />
              <WeatherStats
                data={weather.current}
                unit={weather.current_units}
              />
              <DailyForecastList data={weather.daily} />
            </div>
            <HourlyForecastList data={weather.hourly} />
          </>
        )}
      </div>
    </main>
  );
};

export default App;
