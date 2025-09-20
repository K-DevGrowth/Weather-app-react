const DailyForecastList = ({ data }) => {
  return (
    <div>
      <p className="font-semibold mt-4 py-4">Daily forecast</p>
      <div className="grid grid-cols-7 gap-4">
        {data.time.map((date, idx) => (
          <DailDailyForecastItem
            key={date}
            date={date}
            tempMax={data.temperature_2m_max[idx]}
            tempMin={data.temperature_2m_min[idx]}
            weathercode={data.weathercode[idx]}
          />
        ))}
      </div>
    </div>
  );
};

const DailDailyForecastItem = ({ date, tempMax, tempMin, weathercode }) => {
  const weatherIcons = {
    0: "icon-sunny.webp",
    2: "icon-partly-cloudy.webp",
    3: "icon-overcast.webp",
    45: "icon-fog.webp",
    55: "icon-drizzle.webp",
    61: "icon-rain.webp",
    71: "icon-snow.webp",
    95: "icon-storm.webp",
  };

  const getWeatherIcon = (code) => weatherIcons[code] || "icon-sunny.webp";

  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="bg-Neutral-700 text-center w-full px-2 py-3 rounded-xl border-Neutral-600 border-1">
      <p>{weekday}</p>
      <img className="w-15 m-auto" src={getWeatherIcon(weathercode)} alt="" />
      <div className="flex justify-between items-center gap-x-2">
        <p>{tempMax}°</p>
        <p>{tempMin}°</p>
      </div>
    </div>
  );
};

export default DailyForecastList;
