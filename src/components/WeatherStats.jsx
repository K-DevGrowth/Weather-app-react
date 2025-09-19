const WeatherStats = () => {
  return (
    <div className="flex mt-4 gap-4">
      <WeatherStat label="Feels like" value="18" />
      <WeatherStat label="Humidity" value="46%" />
      <WeatherStat label="Wind" value="14 km/h" />
      <WeatherStat label="Precipitation" value="0 mm" />
    </div>
  );
};

const WeatherStat = ({ label, value }) => {
  return (
    <div className="bg-Neutral-700 w-full px-4 py-3 rounded-xl border-Neutral-600 border-1">
      <p className="text-Neutral-200">{label}</p>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

export default WeatherStats;
