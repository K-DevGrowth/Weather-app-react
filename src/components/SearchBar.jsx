const SearchBar = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-2 text-4xl font-header font-bold">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex bg-Neutral-800 px-3 py-2 gap-2 rounded-md min-w-90">
            <img src="./icon-search.svg" alt="" />
            <input
              className="w-full"
              type="text"
              placeholder="Search for a place..."
            />
          </div>
          <button
            type="button"
            className="bg-Blue-500 px-2 py-1 rounded-md cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
