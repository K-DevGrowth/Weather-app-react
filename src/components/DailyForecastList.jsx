import weatherData from "../weatherData";

const DailyForecastList = ({ data }) => {
  return (
    <div>
      <p className="font-semibold mt-8 py-4">Daily forecast</p>
      <div className="grid grid-cols-7 gap-4">
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
    </div>
  );
};

const DailyForecastItem = ({ date, tempMax, tempMin, weathercode }) => {
  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="bg-Neutral-700 border-[1.5px] border-Neutral-600 text-center w-full px-2 py-3 rounded-xl">
      <p>{weekday}</p>
      <img
        className="w-15 m-auto"
        src={weatherData.getWeatherIcon(weathercode)}
        alt=""
      />
      <div className="flex justify-between items-center gap-x-2">
        <p>{tempMax}°</p>
        <p>{tempMin}°</p>
      </div>
    </div>
  );
};

export default DailyForecastList;
