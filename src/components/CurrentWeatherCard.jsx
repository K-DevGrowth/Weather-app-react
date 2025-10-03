import PropTypes from "prop-types";
import weatherUtils from "../utils/weatherUtils";

const CurrentWeatherCard = ({
  setFavourite,
  favourite,
  weather,
  country,
  compareWeather,
  setCompareWeather,
}) => {
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
      <button className="absolute top-1 right-5 p-4 z-20 hover:scale-120 transition-transform cursor-pointer">
        {favourite.includes(country) ? (
          <i
            onClick={() =>
              setFavourite((prev) =>
                prev.filter((item) => item.name !== country.name)
              )
            }
            className="fa-solid fa-star fa-xl text-yellow-400"
          ></i>
        ) : (
          <i
            onClick={() => {
              setFavourite((prev) => {
                const exits = prev.some((item) => item.name === country.name);
                if (exits) return prev;
                return [...favourite, country];
              });
            }}
            className="fa-regular fa-star fa-xl"
          ></i>
        )}
      </button>
      <button
        type="button"
        className="absolute right-5 bottom-1 p-4 z-20 cursor-pointer"
        onClick={(prev) => {
          const exits = compareWeather.some(
            (item) => item.name === country.name
          );
          if (exits || compareWeather.length >= 2) {
            return prev;
          }
          return setCompareWeather([
            ...compareWeather,
            {
              name: country.name,
              countryName: country.country,
              weather: weather,
            },
          ]);
        }}
      >
        Add
      </button>
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
            src={weatherUtils.getWeatherIcon(weather?.weathercode)}
            alt=""
          />
          <p className="text-6xl font-bold">{weather?.temperature_2m}°</p>
        </div>
      </div>
    </section>
  );
};

CurrentWeatherCard.propTypes = {
  weather: PropTypes.shape({
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
