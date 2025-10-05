import { useRef, useState, useEffect } from "react";

const Search = ({
  handleSelectLocation,
  locationList,
  setLocationList,
  isSearching,
  searchTerm,
  setSearchTerm,
  requestLocation,
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <section className="flex flex-col items-center justify-center text-center w-full px-4">
      <h1 className="py-2 sm:text-5xl text-3xl">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-2 md:min-w-[450px] md:w-full w-screen">
          <div
            ref={inputRef}
            className="flex flex-row relative dark:bg-Neutral-800 dark:border-Neutral-600 bg-white border shadow-sm border-gray-200 focus-within:ring-gray-200 px-3 py-1 gap-3 rounded-md w-full md:min-w-xl sm:min-w-md focus-within:ring-2 dark:focus-within:ring-Neutral-200"
          >
            <div className="flex flex-row flex-1 items-center gap-3">
              <img
                className="p-1 brightness-0 dark:brightness-100"
                src="icon-search.svg"
                alt=""
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full cursor-text text-gray-900 dark:text-Neutral-200 placeholder-gray-700 dark:placeholder-Neutral-300 outline-none py-2 bg-transparent"
                type="text"
                placeholder="Search for a place..."
              />
            </div>
            <button
              type="button"
              aria-label="Get current location"
              className="absolute right-0 top-0 p-3 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-Neutral-700 dark:active:bg-Neutral-600"
              onClick={requestLocation}
            >
              <i className="fa-solid fa-location-dot fa-lg brightness-0 dark:brightness-100"></i>
            </button>

            {showDropdown && searchTerm.trim() !== "" && (
              <div>
                {isSearching ? (
                  <div className="absolute inline-flex gap-x-2 left-0 mt-14 px-3 py-2 rounded-lg shadow-sm w-full bg-white border-gray-200 dark:shadow-none dark:border-Neutral-600 border dark:bg-Neutral-800 z-10 items-center">
                    <img
                      className="animate-spin brightness-0 dark:brightness-100"
                      src="icon-loading.svg"
                      alt=""
                    />
                    <p>Search in progress</p>
                  </div>
                ) : (
                  locationList.length > 0 && (
                    <div className="absolute flex flex-col left-0 mt-14 p-2 rounded-lg w-full z-30 bg-white border dark:shadow-none dark:border-Neutral-600 border-gray-200 shadow-sm dark:bg-Neutral-800">
                      {locationList.map((location) => (
                        <button
                          className="text-left px-3 py-2 rounded-md outline-none dark:focus:bg-Neutral-600 hover:bg-gray-200 cursor-pointer dark:hover:bg-Neutral-700 dark:focus:ring-Neutral-600 focus:ring-2"
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
              } else {
                alert("Please enter a location first!");
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
