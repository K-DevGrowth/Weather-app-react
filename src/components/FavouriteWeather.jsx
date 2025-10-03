const FavouriteWeather = ({ favourite, handleSelectLocation }) => {
  return (
    <section className="p-4 border dark:bg-Neutral-800 dark:border-Neutral-600 rounded-xl">
      <h2 className="font-semibold pb-2">Favourite weather</h2>
      <ul className="flex flex-col gap-3">
        {favourite.map((country) => (
          <li
            key={country.name}
            className="flex justify-between cursor-pointer items-center gap-3 rounded-md dark:border-Neutral-600 dark:bg-Neutral-700 border px-3 py-2"
            onClick={() => {
              handleSelectLocation(country);
            }}
          >
            {country.name}{" "}
            {favourite.length > 0 ? (
              <i className="fa-solid fa-star fa-lg text-yellow-400"></i>
            ) : (
              <i className="fa-regular fa-star fa-lg"></i>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavouriteWeather;
