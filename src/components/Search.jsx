import { useRef, useEffect } from "react";

const Search = ({
  handleSelectLocation,
  locationList,
  setLocationList,
  isSearching,
  searchTerm,
  setSearchTerm,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setLocationList([]);
      }
    };
    if (locationList.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [locationList]);

  return (
    <section className="flex flex-col items-center justify-center text-center w-full px-4">
      <h1 className="py-4 sm:text-5xl text-3xl">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-center py-4 gap-2 px-4 md:min-w-[450px] md:w-full w-screen">
          <div
            ref={inputRef}
            className="flex relative dark:bg-Neutral-800 bg-Neutral-0 px-3 py-2 gap-2 rounded-md w-full md:min-w-xl lg:min-w-[450px] cursor-pointer focus-within:outline-none focus-within:ring-1 focus-within:ring-Neutral-200"
          >
            <img src="icon-search.svg" alt="" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full cursor-pointer outline-0"
              type="text"
              placeholder="Search for a place..."
            />
            {locationList.length > 0 && (
              <div className="absolute flex flex-col left-0 mt-10 p-2 rounded-lg shadow-lg w-full bg-Neutral-0 dark:bg-Neutral-800 z-10">
                {isSearching ? (
                  <div className="inline-flex gap-x-2 px-3 py-1">
                    <img
                      className="animate-spin"
                      src="icon-loading.svg"
                      alt=""
                    />
                    <p>Search in progress</p>
                  </div>
                ) : (
                  locationList.map((location) => (
                    <button
                      className="text-left px-3 py-2 rounded-md focus:outline-none hover:bg-blue-100 focus:bg-blue-300 ring-blue-200 dark:focus:bg-Neutral-600 dark:hover:bg-Neutral-700 dark:focus:ring-Neutral-600 focus:ring-1"
                      onClick={() => {
                        handleSelectLocation(location);
                        setSearchTerm("");
                        setLocationList([]);
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
            onClick={() => setLocationList(locationList)}
            type="button"
            className="primary-button w-full md:min-w-30"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;
