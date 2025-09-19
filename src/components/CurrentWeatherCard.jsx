const CurrentWeatherCard = ({ data, timezone, unit }) => {
  return (
    <div className="relative">
      <img src="/bg-today-large.svg" alt="Current Weather" />
      <p>{timezone}</p>
    </div>
  );
};

export default CurrentWeatherCard;
