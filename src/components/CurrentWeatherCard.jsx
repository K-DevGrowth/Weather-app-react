import PropTypes from "prop-types";
import weatherUtils from "../utils/weatherUtils";

const CurrentWeatherCard = ({ data, country }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative sm:text-left text-center px-4 text-Neutral-0">
      <img
        className="w-full h-0 rounded-xl overflow-hidden sm:h-60 object-cover"
        src="bg-today-large.svg"
        alt="Current Weather"
      />
      <img
        className="w-full sm:h-0 overflow-hidden visible object-cover"
        src="bg-today-small.svg"
        alt=""
      />
      <div className="absolute inset-0 p-8 flex sm:flex-row flex-col justify-between items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl">
            {country.name}, {country.country}
          </h2>
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-6">
          <img
            className="w-20"
            src={weatherUtils.getWeatherIcon(data?.weathercode)}
            alt=""
          />
          <p className="text-6xl font-bold">{data?.temperature_2m}°</p>
        </div>
      </div>
    </section>
  );
};

CurrentWeatherCard.propTypes = {
  data: PropTypes.shape({
    temperature_2m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weathercode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  country: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default CurrentWeatherCard;
