import PropTypes from "prop-types";

const FavouriteWeather = ({ favourites, handleSelectLocation }) => {
  return (
    <section className="card p-4 sm:m-0 mx-4 my-2 dark:shadow-none dark:bg-Neutral-800 dark:border-Neutral-600 rounded-xl">
      <h2 className="pb-3 dark:text-Neutral-0 text-gray-800">
        Favourite Locations
      </h2>
      {favourites.length === 0 ? (
        <p className="text-gray-500 dark:text-Neutral-400 italic">
          No favourite locations yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {favourites.map((countryItem) => (
            <li
              key={countryItem.name}
              className="flex justify-between cursor-pointer items-center gap-3 rounded-md dark:hover:bg-Neutral-600 transition-colors text-gray-700 dark:text-Neutral-0 hover:bg-gray-200 bg-gray-100 border-gray-200 dark:border-Neutral-600 dark:bg-Neutral-700 border px-3 py-2"
              onClick={() => handleSelectLocation(countryItem)}
            >
              <span>{countryItem.name}</span>
              <i className="fa-solid fa-star fa-lg text-yellow-400"></i>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

FavouriteWeather.propTypes = {
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
  handleSelectLocation: PropTypes.func.isRequired,
};

export default FavouriteWeather;
