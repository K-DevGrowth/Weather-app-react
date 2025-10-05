import { useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import HourlyForecastList from "./components/HourlyForecastList";
import DailyForecastList from "./components/DailyForecastList";
import FavouriteWeather from "./components/FavouriteWeather";
import CompareWeather from "./components/CompareWeather";
import LoadingSkeleton from "./components/LoadingSkeleton";
import useWeather from "./hooks/useWeather";
import useCurrentLocation from "./hooks/useCurrentLocation";
import useLocationSearch from "./hooks/useLocationSearch";
import useDarkMode from "./hooks/useDarkMode";
import ErrorPage from "./components/ErrorPage";

const defaultLocation = {
  name: "Ho Chi Minh City",
  country: "Vietnam",
  latitude: 10.8231,
  longitude: 106.6297,
};

const App = () => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favouriteWeather");
    return saved ? JSON.parse(saved) : [];
  });

  const [compareWeather, setCompareWeather] = useState(() => {
    const saved = localStorage.getItem("compareWeather");
    return saved ? JSON.parse(saved) : [];
  });

  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const savedLocation = localStorage.getItem("selectedLocation");
  const initialLocation = savedLocation
    ? JSON.parse(savedLocation)
    : defaultLocation;

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
    <main className="relative bg-gray-50 text-gray-800 dark:bg-Neutral-900 transition-colors duration-300 dark:text-Neutral-0 w-screen h-dvh overflow-x-hidden">
      <Navbar
        unit={unit}
        setUnit={setUnit}
        darkMode={darkMode}
        handleToggleDarkMode={handleToggleDarkMode}
      />

      {isWeatherError ? (
        <ErrorPage />
      ) : (
        <>
          <Search
            handleSelectLocation={handleSelectLocation}
            locationList={locationList}
            setLocationList={setLocationList}
            isSearching={isSearching}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            requestLocation={requestLocation}
          />
          {isWeatherLoading ? (
            <LoadingSkeleton />
          ) : (
            weather && (
              <>
                <div className="grid lg:grid-cols-[0.7fr_2fr_1fr] gap-3 sm:p-3">
                  <div className="md:p-4 lg:p-0">
                    <FavouriteWeather
                      handleSelectLocation={handleSelectLocation}
                      favourites={favourites}
                      country={country}
                    />
                  </div>
                  <div>
                    <CurrentWeatherCard
                      setCompareWeather={setCompareWeather}
                      favourites={favourites}
                      setFavourites={setFavourites}
                      country={country}
                      weather={weather.current}
                      unit={weather?.current_units}
                    />
                    <WeatherStats
                      weather={weather.current}
                      unit={weather.current_units}
                    />
                    <DailyForecastList weather={weather.daily} />
                  </div>
                  <div className="p-4 lg:p-0">
                    <HourlyForecastList weather={weather.hourly} />
                  </div>
                </div>
                <CompareWeather
                  setCompareWeather={setCompareWeather}
                  compareWeather={compareWeather}
                />
              </>
            )
          )}
        </>
      )}
    </main>
  );
};

export default App;
