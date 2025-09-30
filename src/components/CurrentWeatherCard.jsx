import weatherData from "../weatherData";
import PropTypes from "prop-types";

const CurrentWeatherCard = ({ data, country }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative">
      <img
        className="w-full rounded-xl h-60 object-cover"
        src="/bg-today-large.svg"
        alt="Current Weather"
      />
      <div className="absolute inset-0 p-4 flex justify-between items-center gap-4">
        <div>
          <p className="font-bold text-2xl">
            {country.name}, {country.country}
          </p>
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-6">
          <img
            className="w-20"
            src={weatherData.getWeatherIcon(data?.weathercode)}
            alt=""
          />
          <p className="text-6xl font-bold">{data?.temperature_2m}°</p>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherCard;
