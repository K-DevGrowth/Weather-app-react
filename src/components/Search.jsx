import { useRef, useState, useEffect } from "react";

const Search = ({
  handleSelectLocation,
  locationList,
  setLocationList,
  isSearching,
  searchTerm,
  setSearchTerm,
  requestLocation,
  darkMode,
}) => {
  const inputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <section className="flex flex-col items-center justify-center text-center w-full px-4">
      <h1 className="py-2 sm:text-5xl text-3xl">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-x-2 md:min-w-[450px] md:w-full w-screen">
          <div
            ref={inputRef}
            className="flex flex-row relative dark:bg-Neutral-800 bg-Neutral-0 px-3 py-1 gap-3 rounded-md w-full lg:min-w-xl min-w-[450px] cursor-pointer focus-within:ring-1 focus-within:ring-Neutral-200"
          >
            <div className="flex flex-row flex-1 items-center gap-3">
              <img className="p-1" src="icon-search.svg" alt="" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="cursor-pointer text-Neutral-200 placeholder-Neutral-200 outline-none py-2 bg-transparent"
                type="text"
                placeholder="Search for a place..."
              />
            </div>
            <button
              type="button"
              className="w-10 h-10 p-1 rounded-md hover:bg-blue-100 active:bg-blue-300 dark:hover:bg-Neutral-700 dark:active:bg-Neutral-600"
              onClick={requestLocation}
            >
              {darkMode ? (
                <img src="icon-location-light.svg" alt="" />
              ) : (
                <img src="icon-location-dark.svg" alt="" />
              )}
            </button>

            {showDropdown && searchTerm.trim() !== "" && (
              <div>
                {isSearching ? (
                  <div className="absolute inline-flex gap-x-2 left-0 mt-14 px-3 py-2 rounded-lg shadow-lg w-full bg-Neutral-0 dark:bg-Neutral-800 z-10 items-center">
                    <img
                      className="animate-spin"
                      src="icon-loading.svg"
                      alt=""
                    />
                    <p>Search in progress</p>
                  </div>
                ) : (
                  locationList.length > 0 && (
                    <div className="absolute flex flex-col left-0 mt-14 p-2 rounded-lg shadow-lg w-full bg-Neutral-0 dark:bg-Neutral-800 z-10">
                      {locationList.map((location) => (
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
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (locationList.length > 0) {
                handleSelectLocation(locationList[0]);
                setSearchTerm("");
                setLocationList([]);
              }
            }}
            type="button"
            className="primary-button py-3 w-full md:min-w-30"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;
