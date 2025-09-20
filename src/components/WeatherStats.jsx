const WeatherStats = ({ data, unit }) => {
  return (
    <div className="grid grid-cols-4 mt-4 gap-4">
      <WeatherStat
        label="Feels like"
        value={`${data.apparent_temperature}°`}
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
};

const WeatherStat = ({ label, value, unit }) => {
  return (
    <div className="bg-Neutral-700 w-full px-4 py-3 rounded-xl border-Neutral-600 border-1">
      <p className="text-Neutral-200">{label}</p>
      <p className="text-2xl mt-2">
        {value} {unit}
      </p>
    </div>
  );
};

export default WeatherStats;
