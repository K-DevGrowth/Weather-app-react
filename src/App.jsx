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
    precipitation: "mm"
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const data = await weatherService.getAll(lat, lon, unit);
      console.log(data);
      setWeather(data);
    });
  }, [unit]);

  if (!weather) return <h1>Loading...</h1>;

  return (
    <div className="relative w-screen h-dvh overflow-x-hidden text-Neutral-0 bg-Neutral-900">
      <Navbar unit={unit} setUnit={setUnit} />
      <SearchBar />
      <div className="grid grid-cols-[2fr_1fr] py-4 px-10 gap-6">
        <div>
          <CurrentWeatherCard
            timezone={weather.timezone}
            data={weather.current}
          />
          <WeatherStats data={weather.current} unit={weather.current_units} />
          <DailyForecastList data={weather.daily} />
        </div>
        <HourlyForecastList data={weather.hourly} />
      </div>
    </div>
  );
};

export default App;
