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
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const fetchWeather = (latitude, longitude) => {
    setError(null);
    setIsLoading(true);
    weatherService
      .getWeather(latitude, longitude, unit)
      .then((res) => setWeather(res))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearchLocation = useCallback(
    debounce((query) => {
      if (!query) return setLocation([]);

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
    setCountry({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    fetchWeather(location.latitude, location.longitude);
    setTimeout(() => {
      setLocation([]);
    }, 500);
  };

  useEffect(() => {
    if (country && country.latitude && country.longitude) {
      fetchWeather(country.latitude, country.longitude);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        weatherService.getWeather(latitude, longitude, unit).then((res) => {
          setWeather(res);
          const location = res.timezone.replaceAll("_", " ").split("/")[1];
          weatherService.getLocation(location).then((res) =>
            setCountry({
              name: res.results[0].name,
              country: res.results[0].country,
              latitude,
              longitude,
            })
          );
        });
      });
    }
  }, [unit, country]);

  return (
    <main className="relative w-screen h-dvh overflow-x-hidden p-4 text-Neutral-0 bg-Neutral-900">
      <Navbar unit={unit} setUnit={setUnit} />
      <SearchBar
        handleSearchLocation={handleSearchLocation}
        handleSelectLocation={handleSelectLocation}
        location={location}
        loading={isLoading}
      />
      <div className="grid lg:grid-cols-[2fr_1fr] py-4 lg:px-8 sm:px-4 gap-6">
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
