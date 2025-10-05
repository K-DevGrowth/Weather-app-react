import PropTypes from "prop-types";
import weatherUtils from "../utils/weatherUtils";

const CurrentWeatherCard = ({
  setFavourites,
  favourites,
  weather,
  country,
  setCompareWeather,
  unit,
}) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleAddToCompare = () => {
    setCompareWeather((prev) => {
      const exists = prev.some((item) => item.name === country.name);
      if (exists || prev.length >= 2) return prev;

      if (prev.length > 0) {
        const firstUnit = prev[0].unit;
        const sameUnit =
          firstUnit.temperature_2m === unit.temperature_2m &&
          firstUnit.precipitation === unit.precipitation &&
          firstUnit.wind_speed_10m === unit.wind_speed_10m;

        if (!sameUnit) {
          alert("Cannot add to compare when units are different!");
          return prev;
        }
      }

      localStorage.setItem(
        "compareWeather",
        JSON.stringify([
          ...prev,
          {
            name: country.name,
            countryName: country.country,
            weather,
            unit: unit,
          },
        ])
      );

      return [
        ...prev,
        {
          name: country.name,
          countryName: country.country,
          weather,
          unit: unit,
        },
      ];
    });
  };

  const handleAddFavourite = () => {
    setFavourites((prev) => {
      const exits = prev.some((item) => item.name === country.name);
      if (exits) return prev;
      localStorage.setItem(
        "favouriteWeather",
        JSON.stringify([...prev, country])
      );
      return [...prev, country];
    });
  };

  const handleDeleteFavourite = () => {
    setFavourites((prev) => {
      const updated = prev.filter((item) => item.name !== country.name);
      localStorage.setItem("favouriteWeather", JSON.stringify(updated));
      return updated;
    });
  };

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
      <button
        type="button"
        aria-label={
          favourites.some((item) => item.name === country.name)
            ? "Remove from favourites"
            : "Add to favourites"
        }
        className="absolute top-1 right-5 p-4 z-20 hover:scale-125 focus:outline-none transition-transform cursor-pointer"
      >
        {favourites.some((item) => item.name === country.name) ? (
          <i
            onClick={handleDeleteFavourite}
            className="fa-solid fa-star fa-xl text-yellow-400"
          ></i>
        ) : (
          <i
            onClick={handleAddFavourite}
            className="fa-regular fa-star fa-xl"
          ></i>
        )}
      </button>
      <button
        type="button"
        aria-label="Add to compare"
        className="absolute group right-6 bottom-1 p-4 z-20 hover:scale-125 focus:outline-none transition-transform cursor-pointer"
        onClick={handleAddToCompare}
      >
        <i className="fa-solid fa-plus fa-xl text-Neutral-0"></i>
      </button>
      <div className="absolute inset-0 p-8 flex sm:flex-row flex-col justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl max-w-60 sm:max-w-full w-full">
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
    temperature_2m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    weathercode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
    })
  ).isRequired,
  setFavourites: PropTypes.func.isRequired,
  setCompareWeather: PropTypes.func.isRequired,
  unit: PropTypes.shape({
    temperature_2m: PropTypes.string,
    precipitation: PropTypes.string,
    wind_speed_10m: PropTypes.string,
  }).isRequired,
};

export default CurrentWeatherCard;
