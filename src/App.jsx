import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecastList from "./components/DailyForecastList";
import HourlyForecastList from "./components/HourlyForecastList";

const App = () => {
  return (
    <div className="relative w-screen min-h-dvh overflow-x-hidden text-Neutral-0 bg-Neutral-900">
      <Navbar />
      <SearchBar />
      <div className="grid grid-cols-2">
        <div>
          <CurrentWeatherCard />
          <WeatherStats />
          <DailyForecastList />
        </div>
        <HourlyForecastList />
      </div>
    </div>
  );
};

export default App;
