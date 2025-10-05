const LoadingSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-[0.7fr_2fr_1fr] gap-3 sm:p-3">
      <div className="animate-pulse">
        <section className="p-4 border dark:bg-Neutral-800 dark:border-Neutral-600 rounded-xl"></section>
      </div>

      <div className="animate-pulse">
        <section className="h-60 bg-Neutral-800 flex flex-col items-center justify-center rounded-xl shadow-sm">
          <div className="w-30 h-10 overflow-hidden">
            <img
              className="w-30 h-30 rotate-180 object-cover animate-[spin_3s_linear_infinite]"
              src="icon-loading.svg"
              alt="Current Weather"
            />
          </div>
          <p className="font-semibold">Loading...</p>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4">
          {["Feel likes", "Humidity", "Wind", "Precipitation"].map((label) => (
            <div
              key={label}
              className="w-full border bg-Neutral-800 border-Neutral-600 px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0 shadow-sm"
            >
              <p className="text-md mb-1 font-semibold">{label}</p>
              <p className="text-2xl mt-2 font-semibold">-</p>
            </div>
          ))}
        </section>

        <section className="w-full mx-auto bg-Neutral-800 rounded-lg">
          <p className="font-semibold mt-8 p-4 text-xl">Daily forecast</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 h-35">
            {Array(7)
              .fill("")
              .map((item, idx) => (
                <div
                  key={idx}
                  className="text-center w-full px-2 py-3 rounded-xl flex flex-col items-center justify-between min-w-0 shadow-sm"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>
      </div>

      <div className="p-4 animate-pulse rounded-xl w-full max-w-md bg-Neutral-800 mx-auto shadow-sm">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Hourly forecast</p>
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={false}
              aria-label="days-menu"
              type="button"
              className="inline-flex cursor-pointer gap-x-2 px-3 py-2 rounded-md font-semibold"
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
                className="flex justify-between items-center px-3 py-1 h-13 rounded-md border-1 border-Neutral-600"
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
