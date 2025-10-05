const NoResult = () => {
  return (
    <div className="text-center w-full mx-auto max-w-lg mt-10">
      <img
        className="block mx-auto w-8 brightness-0 dark:brightness-100 opacity-70"
        src="icon-empty.svg"
        alt="no result icon"
      />
      <h1 className="text-3xl font-semibold mt-3 mb-2">
        No search result found
      </h1>
      <p className="text-gray-500 dark:text-Neutral-300">
        Try searching for another city or check your spelling.
      </p>
    </div>
  );
};

export default NoResult;
