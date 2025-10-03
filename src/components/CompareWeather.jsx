const CompareWeather = ({ compareWeather }) => {
  return (
    <section className="grid grid-cols-2 gap-x-4 h-100">
      {compareWeather.map((item) => (
        <div key={item.name}>
          <p>Name: {item.name}</p>
          <p>Country name: {item.countryName}</p>
          <p>Temperature: {item.weather.temperature_2m}</p>
          <p>Feel likes: {item.weather.apparent_temperature}</p>
          <p>Humidity: {item.weather.relative_humidity_2m}</p>
          <p>Wind: {item.weather.wind_speed_10m}</p>
          <p>Precipitation: {item.weather.precipitation}</p>
        </div>
      ))}
    </section>
  );
};

export default CompareWeather;
