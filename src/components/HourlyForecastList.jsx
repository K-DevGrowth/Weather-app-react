import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import weatherUtils from "../utils/weatherUtils";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const HourlyForecastList = ({ weather }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const days = Array.from(
    new Set(
      weather.time.map((date) => {
        const day = new Date(date);
        return WEEKDAYS[day.getDay()];
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

  const filteredIndexes = weather.time
    .map((date, idx) => ({ idx, day: WEEKDAYS[new Date(date).getDay()] }))
    .filter((item) => item.day === selectedDay)
    .map((item) => item.idx);

  return (
    <section className="card dark:bg-Neutral-800 dark:border-Neutral-600 p-4 rounded-xl w-full mx-auto">
      <div className="flex justify-between items-center">
        <h2>Hourly Forecast</h2>
        <div className="relative">
          <button
            ref={buttonRef}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="days-menu"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            className="primary-button inline-flex gap-x-2 dark:focus:ring-Neutral-200 dark:bg-Neutral-600 dark:hover:bg-Neutral-700"
          >
            <span>{selectedDay}</span>
            <img className={`${open && 'rotate-180'} transition-transform`} src="/icon-dropdown.svg" alt="" />
          </button>
          {open && (
            <div
              role="menu"
              aria-label="days menu"
              ref={menuRef}
              className="absolute right-0 mt-2 w-42 z-20 p-2 bg-white border-gray-200 shadow-sm border rounded-xl dark:bg-Neutral-800 dark:border-Neutral-600"
            >
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleSelectedDay(day)}
                  className="dark:hover:bg-Neutral-700 cursor-pointer hover:bg-gray-200 rounded-md px-3 py-2 w-full text-left"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 h-full sm:max-h-133 max-h-90 overflow-x-hidden overflow-y-auto scroll-smooth">
        {filteredIndexes?.map((idx) => (
          <HourlyForecastItem
            key={weather.time[idx]}
            date={weather.time[idx]}
            temp={weather.temperature_2m[idx]}
            weathercode={weather.weathercode[idx]}
          />
        ))}
      </div>
    </section>
  );
};

const HourlyForecastItem = ({ date, temp, weathercode }) => {
  const hour = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  return (
    <div className="flex justify-between items-center px-3 py-1 rounded-md bg-gray-100 border-gray-200 border dark:border-Neutral-600 dark:bg-Neutral-700">
      <div className="flex items-center gap-x-4">
        <img
          className="w-10"
          src={weatherUtils.getWeatherIcon(weathercode)}
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
  weather: PropTypes.shape({
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    temperature_2m: PropTypes.array.isRequired,
    weathercode: PropTypes.array.isRequired,
  }).isRequired,
};

export default HourlyForecastList;
