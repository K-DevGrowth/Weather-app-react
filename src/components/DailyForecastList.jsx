import PropTypes from "prop-types";
import weatherUtils from "../utils/weatherUtils";

const DailyForecastItem = ({ date, tempMax, tempMin, weathercode }) => (
  <div className="card dark:bg-Neutral-700 dark:border-Neutral-600 text-center w-full px-2 py-3 rounded-xl flex flex-col items-center justify-between">
    <h3 className="mb-2">{weatherUtils.getWeekday(date)}</h3>
    <img
      className="w-12 h-12 mx-auto mb-2"
      src={weatherUtils.getWeatherIcon(weathercode)}
      alt={weatherUtils.getWeekday(date)}
      loading="lazy"
    />
    <div className="flex justify-between items-center lg:text-sm md:gap-x-2 gap-x-6">
      <p>{tempMax.toFixed(0)}&deg;</p>
      <p>{tempMin.toFixed(0)}&deg;</p>
    </div>
  </div>
);

DailyForecastItem.propTypes = {
  date: PropTypes.string.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  weathercode: PropTypes.number.isRequired,
};

const DailyForecastList = ({ weather }) => (
  <section className="w-full mx-auto p-4">
    <h2 className="py-4 dark:text-Neutral-0 text-gray-800">Daily Forecast</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
      {weather.time.map((date, idx) => (
        <DailyForecastItem
          key={date}
          date={date}
          tempMax={weather.temperature_2m_max[idx]}
          tempMin={weather.temperature_2m_min[idx]}
          weathercode={weather.weathercode[idx]}
        />
      ))}
    </div>
  </section>
);

DailyForecastList.propTypes = {
  weather: PropTypes.shape({
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    temperature_2m_max: PropTypes.arrayOf(PropTypes.number).isRequired,
    temperature_2m_min: PropTypes.arrayOf(PropTypes.number).isRequired,
    weathercode: PropTypes.arrayOf(PropTypes.number).isRequired,
    precipitation_sum: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default DailyForecastList;
