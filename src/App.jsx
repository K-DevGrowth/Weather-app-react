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

const DEFAULT_LOCATION = {
  name: "Ho Chi Minh City",
  country: "Vietnam",
  latitude: 10.8231,
  longitude: 106.6297,
};

const App = () => {
  const [favourite, setFavourite] = useState([]);
  const [compareWeather, setCompareWeather] = useState([]);
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const {
    searchTerm,
    setSearchTerm,
    locationList,
    setLocationList,
    isSearching,
  } = useLocationSearch();

  const { country, isLocating, handleSelectLocation, requestLocation } =
    useCurrentLocation(DEFAULT_LOCATION);

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
        darkMode={darkMode}
      />
      <div className="grid lg:grid-cols-[0.75fr_2fr_1fr] gap-2 sm:p-3">
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
              />
            </div>
            <div>
              <CurrentWeatherCard
                compareWeather={compareWeather}
                setCompareWeather={setCompareWeather}
                favourite={favourite}
                setFavourite={setFavourite}
                country={country}
                weather={weather.current}
              />
              <WeatherStats
                weather={weather.current}
                unit={weather.current_units}
              />
              <DailyForecastList data={weather.daily} />
            </div>
            <div className="p-4 sm:p-0">
              <HourlyForecastList data={weather.hourly} />
            </div>
          </>
        )}
      </div>
      <CompareWeather compareWeather={compareWeather} />
    </main>
  );
};

export default App;
