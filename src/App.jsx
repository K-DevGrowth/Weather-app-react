import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";
import LoadingSkeleton from "./components/LoadingSkeleton";

import useWeather from "./hooks/useWeather";
import useCurrentLocation from "./hooks/useCurrentLocation";
import useLocationSearch from "./hooks/useLocationSearch";

// const API_OPTIONS = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//   },
// };

const DEFAULT_LOCATION = {
  name: "Ho Chi Minh City",
  country: "Vietnam",
  latitude: 10.8231,
  longitude: 106.6297,
};

const App = () => {
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const {
    searchTerm,
    setSearchTerm,
    locationList,
    setLocationList,
    isSearching,
  } = useLocationSearch();

  const {
    country,
    isCurrentLocationError,
    isLocating,
    handleSelectLocation,
    requestLocation,
  } = useCurrentLocation(DEFAULT_LOCATION);

  const { weather, isWeatherLoading, isWeatherError } = useWeather(
    country?.latitude,
    country?.longitude,
    unit
  );

  return (
    <main className="relative bg-blue-100 dark:bg-Neutral-900 dark:text-Neutral-0 w-screen h-dvh overflow-x-hidden">
      <Navbar
        unit={unit}
        setUnit={setUnit}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Search
        handleSelectLocation={handleSelectLocation}
        locationList={locationList}
        setLocationList={setLocationList}
        isSearching={isSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        requestLocation={requestLocation}
        darkMode={darkMode}
      />

      {isWeatherError && (
        <div className="text-center text-2xl">{isWeatherError}</div>
      )}

      {isCurrentLocationError && (
        <div className="text-center text-2xl">{isCurrentLocationError}</div>
      )}

      {isLocating || (isWeatherLoading && <LoadingSkeleton />)}
      
      {weather && (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-3 sm:p-3">
          <div>
            <CurrentWeatherCard country={country} data={weather.current} />
            <WeatherStats data={weather.current} unit={weather.current_units} />
            <DailyForecastList data={weather.daily} />
          </div>
          <div className="p-4 sm:p-0">
            <HourlyForecastList data={weather.hourly} />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
