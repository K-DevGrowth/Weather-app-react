const LoadingSkeleton = () => {
  return (
    <>
      <div>
        <section className="h-60 flex flex-col items-center justify-center bg-blue-50 rounded-xl shadow-sm">
          <div className="w-30 h-10 overflow-hidden">
            <img
              className="w-30 h-30 rotate-180 object-cover"
              src="icon-loading.svg"
              alt="Current Weather"
            />
          </div>
          <p className="text-blue-700 font-semibold">Loading...</p>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4">
          {["Feel likes", "Humidity", "Wind", "Precipitation"].map(
            (label, idx) => (
              <div
                key={label}
                className="bg-white w-full border-blue-100 border-[1.5px] px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-0 shadow-sm"
              >
                <p className="text-blue-700 text-md mb-1 font-semibold">
                  {label}
                </p>
                <p className="text-2xl mt-2 font-semibold text-gray-700">-</p>
              </div>
            )
          )}
        </section>

        <section className="w-full mx-auto">
          <p className="font-semibold mt-8 py-4 text-xl text-blue-700">
            Daily forecast
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 h-35">
            {Array(7)
              .fill("")
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border-blue-100 text-center w-full px-2 py-3 rounded-xl flex flex-col items-center justify-between min-w-0 shadow-sm"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>
      </div>

      <section className="bg-blue-50 p-4 rounded-xl w-full max-w-md mx-auto shadow-sm">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-blue-700">Hourly forecast</p>
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={false}
              aria-label="days-menu"
              type="button"
              className="inline-flex cursor-pointer gap-x-2 px-3 py-2 rounded-md focus:outline-[1.5px] focus:outline-blue-100 focus:outline-offset-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold"
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
                className="flex justify-between items-center px-3 py-1 h-13 rounded-md border-[1.5px] border-blue-100 bg-white shadow-sm"
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
