import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";
import LoadingSkeleton from "./components/LoadingSkeleton";
import weatherService from "./services/weather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState([]);
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const handleSearchLocation = useCallback(
    debounce((query) => {
      setError(null); // Reset error on new search
      if (!query) {
        setLocation([]);
        return;
      }

      weatherService
        .getLocation(query)
        .then((res) => setLocation(res.results || []))
        .catch((err) => {
          setError(err);
          setLocation([]);
        });
    }, 500),
    []
  );

  const handleSelectLocation = (location) => {
    setError(null); // Reset error on new selection
    setIsLoading(true);
    weatherService
      .getWeather(location.latitude, location.longitude, unit)
      .then((res) => setWeather(res))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
    setCountry(location);
    setTimeout(() => {
      setLocation([]);
    }, 500);
  };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     const { latitude, longitude } = position.coords;
  //     const data = await weatherService.getWeather(latitude, longitude, unit);
  //     setWeather(data);
  //   });
  // }, [unit]);

  return (
    <main className="relative w-screen h-dvh overflow-x-hidden p-4 text-Neutral-0 bg-Neutral-900">
      <Navbar unit={unit} setUnit={setUnit} />
      <SearchBar
        handleSearchLocation={handleSearchLocation}
        handleSelectLocation={handleSelectLocation}
        location={location}
        loading={isLoading}
      />
      <div className="grid grid-cols-[2fr_1fr] py-4 px-8 gap-6">
        {!weather && <LoadingSkeleton />}
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
