import weatherData from "../weatherData";
import PropTypes from "prop-types";

const getWeekday = (date) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "short" });

const DailyForecastItem = ({ date, tempMax, tempMin, weathercode }) => (
  <div className="bg-Neutral-700 border-[1.5px] border-Neutral-600 text-center w-full px-2 py-3 rounded-xl flex flex-col items-center justify-between min-w-0">
    <p className="mb-2">{getWeekday(date)}</p>
    <img
      className="w-12 h-12 mx-auto mb-2"
      src={weatherData.getWeatherIcon(weathercode)}
      alt="Weather icon"
    />
    <div className="flex justify-between items-center gap-x-3 w-full">
      <p>{tempMax}&deg;</p>
      <p>{tempMin}&deg;</p>
    </div>
  </div>
);

DailyForecastItem.propTypes = {
  date: PropTypes.string.isRequired,
  tempMax: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  weathercode: PropTypes.number.isRequired,
};

const DailyForecastList = ({ data }) => (
  <section className="w-full mx-auto">
    <p className="font-semibold mt-8 py-4 text-xl">Daily forecast</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
      {data.time.map((date, idx) => (
        <DailyForecastItem
          key={date}
          date={date}
          tempMax={data.temperature_2m_max[idx]}
          tempMin={data.temperature_2m_min[idx]}
          weathercode={data.weathercode[idx]}
        />
      ))}
    </div>
  </section>
);

DailyForecastList.propTypes = {
  data: PropTypes.shape({
    weathercode: PropTypes.arrayOf(PropTypes.number).isRequired,
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    temperature_2m_max: PropTypes.arrayOf(PropTypes.number).isRequired,
    temperature_2m_min: PropTypes.arrayOf(PropTypes.number).isRequired,
    precipitation_sum: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default DailyForecastList;
