const SearchBar = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-4 text-5xl font-header font-bold">
        How's the sky looking today?
      </h1>
      <div>
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="flex bg-Neutral-800 px-3 py-2 gap-2 rounded-md w-full min-w-[450px] cursor-pointer focus-within:outline-[1.5px] focus-within:outline-offset-2 focus-within:outline-Neutral-200">
            <img src="./icon-search.svg" alt="" />
            <input
              className="w-full cursor-pointer outline-0"
              type="text"
              placeholder="Search for a place..."
            />
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
