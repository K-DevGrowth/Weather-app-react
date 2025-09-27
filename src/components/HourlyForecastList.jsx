import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import weatherData from "../weatherData";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const HourlyForecastList = ({ data }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const days = Array.from(
    new Set(
      data.time.map((date) => {
        const d = new Date(date);
        return WEEKDAYS[d.getDay()];
      })
    )
  );

  const [selectedDay, setSelectedDay] = useState(days[0]);

  const handleSelectedDay = (day) => {
    setSelectedDay(day);
    setOpen(false);
  };

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

  const filteredIndexes = data.time
    .map((date, idx) => ({ idx, day: WEEKDAYS[new Date(date).getDay()] }))
    .filter((item) => item.day === selectedDay)
    .map((item) => item.idx);

  return (
    <div className="bg-Neutral-800 p-4 rounded-xl w-full max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Hourly forecast</p>
        <div className="relative">
          <button
            ref={buttonRef}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="days-menu"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            className="inline-flex cursor-pointer gap-x-2 px-3 py-2 rounded-md focus:outline-[1.5px] focus:outline-Neutral-0 focus:outline-offset-2 bg-Neutral-600 hover:bg-Neutral-700"
          >
            <span>{selectedDay}</span>
            <img src="/icon-dropdown.svg" alt="" />
          </button>
          {open && (
            <div
              role="menu"
              aria-label="days menu"
              ref={menuRef}
              className="absolute right-0 mt-2 w-42 z-20 p-2 border-Neutral-600 border-1 rounded-xl bg-Neutral-800"
            >
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleSelectedDay(day)}
                  className="hover:bg-Neutral-700 cursor-pointer rounded-md px-3 py-2 w-full text-left"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {filteredIndexes?.map((idx) => (
          <HourlyForecastItem
            key={data.time[idx]}
            date={data.time[idx]}
            temp={data.temperature_2m[idx]}
            weathercode={data.weathercode[idx]}
          />
        ))}
      </div>
    </div>
  );
};

const HourlyForecastItem = ({ date, temp, weathercode }) => {
  const hour = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  return (
    <div className="flex justify-between items-center px-3 py-1 rounded-md border-[1.5px] border-Neutral-600 bg-Neutral-700">
      <div className="flex items-center gap-x-4">
        <img
          className="w-10"
          src={weatherData.getWeatherIcon(weathercode)}
          alt="Weather icon"
        />
        <p>{hour}</p>
      </div>
      <p>{temp}°</p>
    </div>
  );
};

HourlyForecastItem.propTypes = {
  date: PropTypes.string.isRequired,
  temp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  weathercode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

HourlyForecastList.propTypes = {
  data: PropTypes.shape({
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    temperature_2m: PropTypes.array.isRequired,
    weathercode: PropTypes.array.isRequired,
  }).isRequired,
};

export default HourlyForecastList;
