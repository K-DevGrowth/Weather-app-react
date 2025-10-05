import PropTypes from "prop-types";

const CompareWeather = ({ compareWeather, setCompareWeather }) => {
  const getComparisonClass = (
    currentValue,
    allValues,
    higherIsBetter = true
  ) => {
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);

    if (currentValue === max) {
      return higherIsBetter ? "text-green-400" : "text-red-400";
    }

    if (currentValue === min) {
      return higherIsBetter ? "text-red-400" : "text-green-400";
    }

    return "text-Neutral-300";
  };

  const weatherMetrics = [
    {
      key: "temperature_2m",
      label: "Temperature",
      higherIsBetter: true,
    },
    {
      key: "apparent_temperature",
      label: "Feel likes",
      higherIsBetter: true,
    },
    {
      key: "relative_humidity_2m",
      label: "Humidity",
      higherIsBetter: false,
    },
    {
      key: "wind_speed_10m",
      label: "Wind",
      higherIsBetter: false,
    },
    {
      key: "precipitation",
      label: "Precipitation",
      higherIsBetter: false,
    },
    {
      key: "uv_index",
      label: "UV index",
      higherIsBetter: false,
    },
    {
      key: "visibility",
      label: "Visibility",
      higherIsBetter: true,
    },
  ];

  const allValuesMap = weatherMetrics.reduce((acc, metric) => {
    acc[metric.key] = compareWeather.map((item) => item.weather[metric.key]);
    return acc;
  }, {});

  const handleDeleteCompare = (idx) => {
    setCompareWeather((prev) => {
      const updated = prev.filter(
        (item) => item.name !== compareWeather[idx].name
      );
      localStorage.removeItem("compareWeather", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="p-4 border-t dark:border-Neutral-600 border-gray-800 shadow-sm">
      <h2 className="text-center pb-5 dark:text-Neutral-0 text-gray-800">
        Compare Weather
      </h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-4 items-center">
        {compareWeather.map((item, idx) => (
          <div
            className="card rounded-xl w-full max-w-xl mx-auto dark:bg-Neutral-800 dark:border-Neutral-600"
            key={item.name}
          >
            <div className="relative py-2">
              <h3 className="font-bold text-center text-lg w-full mx-auto max-w-50 sm:max-w-sm text-gray-700 dark:text-Neutral-0">
                {item.name}, {item.countryName}
              </h3>
              <button
                type="button"
                className="absolute top-0 p-2 pr-4 right-0 z-10"
                onClick={() => handleDeleteCompare(idx)}
              >
                <i className="fa-solid fa-plus fa-lg rotate-45 hover:scale-125 hover:text-red-400 transition-transform"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              {weatherMetrics.map((metric) => (
                <div
                  key={metric.key}
                  className="dark:bg-Neutral-700 first:col-span-2 bg-white w-full shadow border-gray-400 border dark:border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center"
                >
                  <p className="dark:text-Neutral-200 font-semibold text-gray-600 text-md mb-1">
                    {metric.label}
                  </p>
                  <p
                    className={`${getComparisonClass(
                      item.weather[metric.key],
                      allValuesMap[metric.key],
                      metric.higherIsBetter
                    )} text-2xl mt-2 font-medium`}
                  >
                    {item.weather[metric.key]} {item.unit[metric.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

CompareWeather.propTypes = {
  compareWeather: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      countryName: PropTypes.string.isRequired,
      weather: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      ).isRequired,
      unit: PropTypes.objectOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  setCompareWeather: PropTypes.func.isRequired,
};

export default CompareWeather;
