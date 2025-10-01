const Search = ({
  handleSelectLocation,
  getCurrentLocation,
  locationList,
  isLoading,
  errorMessage,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <section className="flex flex-col items-center justify-center text-center w-full">
      <h1 className="py-4 sm:text-5xl text-3xl">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-center py-4 gap-2 px-4 md:min-w-[450px] md:w-full w-screen">
          <div className="flex relative bg-Neutral-800 px-3 py-2 gap-2 rounded-md w-full md:min-w-xl lg:min-w-[450px] cursor-pointer focus-within:outline-none focus-within:ring-1 focus-within:ring-Neutral-200">
            <img src="icon-search.svg" alt="" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full cursor-pointer outline-0"
              type="text"
              placeholder="Search for a place..."
            />

            {locationList.length > 0 && (
              <div className="absolute flex flex-col left-0 mt-10 p-2 rounded-lg shadow-lg w-full bg-Neutral-800 z-10">
                {isLoading ? (
                  <div className="inline-flex gap-x-2 px-3 py-1">
                    <img src="icon-loading.svg" alt="" />
                    <p>Search in progress</p>
                  </div>
                ) : errorMessage ? (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                ) : (
                  locationList.map((location) => (
                    <button
                      className="hover:bg-Neutral-700 text-left px-3 py-2 rounded-md focus:outline-none focus:bg-Neutral-700 focus:ring-Neutral-600 focus:ring-1"
                      onClick={() => {
                        handleSelectLocation(location);
                        setSearchTerm("");
                      }}
                      key={location.id}
                    >
                      {location.name}, {location.country}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="bg-Blue-500 w-full md:min-w-30 hover:bg-Blue-700 px-3 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-Blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;
