const LoadingSkeleton = () => {
  return (
    <>
      <div>
        <section className="h-60 flex flex-col items-center justify-center bg-Neutral-800 rounded-xl ">
          <div className="w-30 h-10 overflow-hidden">
            <img
              className="w-30 h-30 rotate-180 object-cover"
              src="icon-loading.svg"
              alt="Current Weather"
            />
          </div>
          <p>Loading...</p>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4">
          <div className="bg-Neutral-700 w-full border-[1.5px] border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
            <p className="text-Neutral-200 text-md mb-1">Feel likes</p>
            <p className="text-2xl mt-2 font-semibold">-</p>
          </div>
          <div className="bg-Neutral-700 w-full border-[1.5px] border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
            <p className="text-Neutral-200 text-md mb-1">Humidity</p>
            <p className="text-2xl mt-2 font-semibold">-</p>
          </div>
          <div className="bg-Neutral-700 w-full border-[1.5px] border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
            <p className="text-Neutral-200 text-md mb-1">Wind</p>
            <p className="text-2xl mt-2 font-semibold">-</p>
          </div>
          <div className="bg-Neutral-700 w-full border-[1.5px] border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0">
            <p className="text-Neutral-200 text-md mb-1">Precipitation</p>
            <p className="text-2xl mt-2 font-semibold">-</p>
          </div>
        </section>

        <section className="w-full mx-auto">
          <p className="font-semibold mt-8 py-4 text-xl">Daily forecast</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 h-35">
            {Array(7)
              .fill("")
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-Neutral-700 border-[1.5px] border-Neutral-600 text-center w-full px-2 py-3 rounded-xl flex flex-col items-center justify-between min-w-0"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>
      </div>

      <section className="bg-Neutral-800 p-4 rounded-xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Hourly forecast</p>
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={open}
              aria-label="days-menu"
              type="button"
              className="inline-flex cursor-pointer gap-x-2 px-3 py-2 rounded-md focus:outline-[1.5px] focus:outline-Neutral-0 focus:outline-offset-2 bg-Neutral-600 hover:bg-Neutral-700"
            >
              <span>-</span>
              <img src="/icon-dropdown.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {Array(8)
            .fill("")
            .map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 py-1 h-13 rounded-md border-[1.5px] border-Neutral-600 bg-Neutral-700"
              >
                {item}
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default LoadingSkeleton;
