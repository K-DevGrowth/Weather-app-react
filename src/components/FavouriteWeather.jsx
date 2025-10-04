const FavouriteWeather = ({ favourite, handleSelectLocation }) => {
  console.log(favourite[0]);
  return (
    <section className="p-4 sm:m-0 mx-4 my-2 border dark:bg-Neutral-800 dark:border-Neutral-600 rounded-xl">
      <h2 className="pb-3">Favourite weather</h2>
      <ul className="flex flex-col gap-3">
        {favourite.map((countryItem) => (
          <li
            key={countryItem.name}
            className="flex justify-between cursor-pointer items-center gap-3 rounded-md dark:border-Neutral-600 dark:bg-Neutral-700 border px-3 py-2"
            onClick={() => {
              handleSelectLocation(countryItem);
            }}
          >
            {countryItem.name}{" "}
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
