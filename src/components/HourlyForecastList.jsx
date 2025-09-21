import { useEffect, useRef, useState } from "react";
import weatherData from "../weatherData";

const HourlyForecastList = ({ data }) => {
  const [open, setOpen] = useState(false);
  const weekday = new Date(data.time[0]).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentDate = new Date();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="bg-Neutral-800 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Hourly forecast</p>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            className="inline-flex cursor-pointer gap-x-2 px-3 py-2 rounded-md focus:outline-[1.5px] focus:outline-Neutral-0 focus:outline-offset-2 bg-Neutral-600 hover:bg-Neutral-700"
          >
            <span>{weekday}</span>
            <img src="/icon-dropdown.svg" alt="" />
          </button>
          {open && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-42 z-20 p-2 border-Neutral-600 border-1 rounded-xl bg-Neutral-800"
            >
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Sartuday",
                "Sunday",
              ].map((item) => (
                <div
                  key={item}
                  className="hover:bg-Neutral-700 cursor-pointer rounded-md px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {data.time
          .slice(currentDate.getHours(), currentDate.getHours() + 8)
          .map((date, idx) => (
            <HourlyForcastItem
              key={date}
              date={date}
              temp={data.temperature_2m[currentDate.getHours() + idx]}
              weathercode={data.weathercode[currentDate.getHours() + idx]}
            />
          ))}
      </div>
    </div>
  );
};

const HourlyForcastItem = ({ date, temp, weathercode }) => {
  const hour = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    hour: "numeric",
  });

  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="flex justify-between items-center px-3 py-1 rounded-md border-[1.5px] border-Neutral-600 bg-Neutral-700">
      <div className="flex items-center gap-x-4">
        <img
          className="w-10"
          src={weatherData.getWeatherIcon(weathercode)}
          alt=""
        />
        <p>{hour.replace(`${weekday}, `, "")}</p>
      </div>
      <p>{temp}°</p>
    </div>
  );
};

export default HourlyForecastList;
