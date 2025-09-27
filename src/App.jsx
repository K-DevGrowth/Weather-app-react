import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";
import weatherService from "./services/weather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await weatherService.getAll(latitude, longitude, unit);
      setWeather(data);
    });
  }, [unit]);

  if (!weather) return <h1>Loading...</h1>;

  return (
    <div className="relative w-screen h-dvh overflow-x-hidden p-4 text-Neutral-0 bg-Neutral-900">
      <Navbar unit={unit} setUnit={setUnit} />
      <SearchBar />
      <main className="grid grid-cols-[2fr_1fr] py-4 px-8 gap-6">
        <div>
          <CurrentWeatherCard
            timezone={weather.timezone}
            data={weather.current}
          />
          <WeatherStats data={weather.current} unit={weather.current_units} />
          <DailyForecastList data={weather.daily} />
        </div>
        <HourlyForecastList data={weather.hourly} />
      </main>
    </div>
  );
};

export default App;
