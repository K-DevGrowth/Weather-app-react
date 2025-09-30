import { useState } from "react";

const SearchBar = ({
  handleSelectLocation,
  handleSearchLocation,
  location,
  loading,
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-4 text-5xl font-header font-bold">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="flex relative bg-Neutral-800 px-3 py-2 gap-2 rounded-md w-full min-w-[450px] cursor-pointer focus-within:outline-[1.5px] focus-within:outline-offset-2 focus-within:outline-Neutral-200">
            <img src="./icon-search.svg" alt="" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearchLocation(e.target.value);
              }}
              className="w-full cursor-pointer outline-0"
              type="text"
              placeholder="Search for a place..."
            />
            {location.length > 0 && (
              <div className="absolute flex flex-col left-0 mt-10 p-2 rounded-lg shadow-lg w-full bg-Neutral-800 z-10">
                {loading ? (
                  <div className="inline-flex gap-x-2 px-3">
                    <img src="icon-loading.svg" alt="" />
                    <p>Search in progress</p>
                  </div>
                ) : (
                  location.map((location) => (
                    <button
                      className="hover:bg-Neutral-700 text-left px-3 py-2 rounded-md focus:outline-none focus:bg-Neutral-700 focus:ring-Neutral-600 focus:ring-2"
                      onClick={() => handleSelectLocation(location)}
                      key={location.id}
                    >
                      {location.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="bg-Blue-500 hover:bg-Blue-700 px-3 py-2 rounded-md cursor-pointer focus:outline-[1.5px] outline-offset-2 outline-Blue-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
