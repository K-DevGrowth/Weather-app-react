import PropTypes from "prop-types";

const WeatherStat = ({ label, value, unit }) => (
  <div className="dark:bg-Neutral-700 bg-white w-full border-blue-300 border dark:border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
    <p className="dark:text-Neutral-200 text-gray-700 text-md mb-1">{label}</p>
    <p className="text-2xl mt-2 font-medium">
      {value} {unit}
    </p>
  </div>
);

WeatherStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
};

const WeatherStats = ({ data, unit }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4">
    <WeatherStat
      label="Feels like"
      value={data.apparent_temperature}
      unit={unit.apparent_temperature}
    />
    <WeatherStat
      label="Humidity"
      value={data.relative_humidity_2m}
      unit={unit.relative_humidity_2m}
    />
    <WeatherStat
      label="Wind"
      value={data.wind_speed_10m}
      unit={unit.wind_speed_10m}
    />
    <WeatherStat
      label="Precipitation"
      value={data.precipitation}
      unit={unit.precipitation}
    />
  </div>
);

WeatherStats.propTypes = {
  data: PropTypes.shape({
    apparent_temperature: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    relative_humidity_2m: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    wind_speed_10m: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    precipitation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  unit: PropTypes.shape({
    apparent_temperature: PropTypes.string,
    relative_humidity_2m: PropTypes.string,
    wind_speed_10m: PropTypes.string,
    precipitation: PropTypes.string,
  }).isRequired,
};

export default WeatherStats;
