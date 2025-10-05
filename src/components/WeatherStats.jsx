import PropTypes from "prop-types";
import { useState } from "react";

const WeatherStat = ({ label, value, unit }) => (
  <div className="card dark:bg-Neutral-700 dark:border-Neutral-600 w-full px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
    <p className="dark:text-Neutral-200 text-gray-500 text-md mb-1">{label}</p>
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

const WeatherStats = ({ weather, unit }) => {
  const [page, setPage] = useState(0);
  const states = [
    {
      label: "Feels like",
      value: weather.apparent_temperature,
      unit: unit.apparent_temperature,
    },
    {
      label: "Humidity",
      value: weather.relative_humidity_2m,
      unit: unit.relative_humidity_2m,
    },
    {
      label: "Wind",
      value: weather.wind_speed_10m,
      unit: unit.wind_speed_10m,
    },
    {
      label: "Precipitation",
      value: weather.precipitation,
      unit: unit.precipitation,
    },
    {
      label: "UV index",
      value: weather.uv_index,
      unit: unit.uv_index,
    },
    {
      label: "Visibility",
      value: weather.visibility,
      unit: unit.visibility,
    },
    {
      label: "Air pressure",
      value: weather.surface_pressure,
      unit: unit.surface_pressure,
    },
  ];

  const start = page * 4;
  const visibleItems = states.slice(start, start + 4);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {visibleItems.map((item) => (
          <WeatherStat key={item.label} {...item} />
        ))}
      </div>
      <div className="flex justify-center items-center border bg-gray-100 border-gray-200 dark:border-Neutral-600 rounded-md w-full max-w-24 dark:bg-Neutral-800 mx-auto">
        {[0, 1].map((i) => (
          <button
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            key={i}
            className={`px-5 cursor-pointer py-2 ${
              page === i
                ? "bg-Blue-500 hover:bg-Blue-500/90 rounded-md text-Neutral-0"
                : "hover:bg-gray-200 dark:hover:bg-Neutral-700 rounded-md"
            }`}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

WeatherStats.propTypes = {
  weather: PropTypes.shape({
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
    uv_index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    visibility: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    surface_pressure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  unit: PropTypes.shape({
    apparent_temperature: PropTypes.string,
    relative_humidity_2m: PropTypes.string,
    wind_speed_10m: PropTypes.string,
    precipitation: PropTypes.string,
    uv_index: PropTypes.string,
    visibility: PropTypes.string,
    surface_pressure: PropTypes.string,
  }).isRequired,
};

export default WeatherStats;
