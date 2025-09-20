import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";
import weatherService from "./services/weather";
import { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lan = position.coords.latitude;
      const lon = position.coords.longitude;
      const data = await weatherService.getAll(lan, lon);
      console.log(data);
      setWeather(data);
    });
  }, []);

  if (!weather) return <h1>Loading...</h1>;

  return (
    <div className="relative w-screen min-h-dvh overflow-x-hidden text-Neutral-0 bg-Neutral-900">
      <Navbar />
      <SearchBar />
      <div className="grid grid-cols-2 p-4">
        <div>
          <CurrentWeatherCard
            timezone={weather.timezone}
            data={weather.current_weather}
            unit={weather.current_weather_units}
          />
          <WeatherStats data={weather.current_weather} unit={weather.current_weather_units} />
          <DailyForecastList
            data={weather.hourly}
            unit={weather.hourly_units}
          />
        </div>
        <HourlyForecastList />
      </div>
    </div>
  );
};

export default App;
