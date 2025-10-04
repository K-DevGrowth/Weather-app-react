import { useState } from "react";
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
import useDarkMode from "./hooks/useDarkMode";
import FavouriteWeather from "./components/FavouriteWeather";
import CompareWeather from "./components/CompareWeather";

const defalutLocation = {
  name: "Ho Chi Minh City",
  country: "Vietnam",
  latitude: 10.8231,
  longitude: 106.6297,
};

const defaultFavourite = [
  {
    name: "Ho Chi Minh City",
    country: "Vietnam",
    latitude: 10.8231,
    longitude: 106.6297,
  },
];

const defaultCompare = [
  {
    name: "Ho Chi Minh City",
    countryName: "Vietnam",
    weather: {
      temperature_2m: 32,
      apparent_temperature: 35,
      relative_humidity_2m: 70,
      wind_speed_10m: 10,
      precipitation: 0,
    },
    unit: {
      temperature_2m: "°C",
      apparent_temperature: "°C",
      relative_humidity_2m: "%",
      wind_speed_10m: "km/h",
      precipitation: "mm",
    },
  },
];

const App = () => {
  const [favourite, setFavourite] = useState(() => {
    const saved = localStorage.getItem("favourite");
    return saved ? JSON.parse(saved) : defaultFavourite;
  });
  const [compareWeather, setCompareWeather] = useState(() => {
    const saved = localStorage.getItem("compareWeather");
    return saved ? JSON.parse(saved) : defaultCompare;
  });
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const savedLocation = localStorage.getItem("selectedLocation");
  const initialLocation = savedLocation
    ? JSON.parse(savedLocation)
    : defalutLocation;

  const {
    searchTerm,
    setSearchTerm,
    locationList,
    setLocationList,
    isSearching,
  } = useLocationSearch();

  const { country, isLocating, handleSelectLocation, requestLocation } =
    useCurrentLocation(initialLocation);

  const { weather, isWeatherLoading, isWeatherError } = useWeather(
    country?.latitude,
    country?.longitude,
    unit
  );

  const { darkMode, handleToggleDarkMode } = useDarkMode();

  return (
    <main className="relative bg-blue-100 dark:bg-Neutral-900 dark:text-Neutral-0 w-screen h-dvh overflow-x-hidden">
      <Navbar
        unit={unit}
        setUnit={setUnit}
        darkMode={darkMode}
        handleToggleDarkMode={handleToggleDarkMode}
      />
      <Search
        handleSelectLocation={handleSelectLocation}
        locationList={locationList}
        setLocationList={setLocationList}
        isSearching={isSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        requestLocation={requestLocation}
      />
      <div className="grid lg:grid-cols-[0.7fr_2fr_1fr] gap-1 sm:p-3">
        {isWeatherError && (
          <div className="text-center text-2xl">{isWeatherError}</div>
        )}

        {isLocating || (isWeatherLoading && <LoadingSkeleton />)}

        {weather && (
          <>
            <div>
              <FavouriteWeather
                handleSelectLocation={handleSelectLocation}
                favourite={favourite}
                country={country}
              />
            </div>
            <div>
              <CurrentWeatherCard
                setCompareWeather={setCompareWeather}
                favourite={favourite}
                setFavourite={setFavourite}
                country={country}
                weather={weather.current}
                unit={weather?.current_units}
              />
              <WeatherStats
                weather={weather.current}
                unit={weather.current_units}
              />
              <DailyForecastList data={weather.daily} />
            </div>
            <div>
              <HourlyForecastList data={weather.hourly} />
            </div>
          </>
        )}
      </div>
      <CompareWeather
        compareWeather={compareWeather}
        setCompareWeather={setCompareWeather}
      />
    </main>
  );
};

export default App;
