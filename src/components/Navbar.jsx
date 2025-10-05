import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const UNIT_SYSTEMS = {
  metric: {
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  },
  imperial: {
    temp: "fahrenheit",
    wind: "mph",
    precipitation: "inch",
  },
};

const DROPDOWN_CONFIG = [
  {
    label: "Temperature",
    key: "temp",
    options: [
      { label: "Celsius (C)", value: "celsius" },
      { label: "Fahrenheit (F)", value: "fahrenheit" },
    ],
  },
  {
    label: "Wind Speed",
    key: "wind",
    options: [
      { label: "km/h", value: "kmh" },
      { label: "mph", value: "mph" },
    ],
  },
  {
    label: "Precipitation",
    key: "precipitation",
    options: [
      { label: "Millimeters (mm)", value: "mm" },
      { label: "Inches (in)", value: "inch" },
    ],
  },
];

const Dropdown = ({ unit, setUnit }) => {
  const handleSwitch = (key, value) => {
    setUnit((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="divide-y divide-Neutral-800 dark:divide-Neutral-600 w-full max-w-xs dark:bg-Neutral-800 rounded-lg p-2">
      {DROPDOWN_CONFIG.map(({ label, key, options }) => (
        <div key={key} className="py-1">
          <p className="dark:text-Neutral-300 text-Neutral-600 font-semibold mb-1">
            {label}
          </p>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSwitch(key, option.value)}
                className={`flex justify-between cursor-pointer dark:hover:bg-Neutral-700 items-center p-2 rounded-md w-full text-left transition-colors duration-150 ${
                  unit[key] === option.value
                    ? "dark:bg-Neutral-700 font-semibold bg-gray-200"
                    : "hover:bg-gray-300"
                }`}
              >
                {option.label}
                {unit[key] === option.value && (
                  <img
                    className="dark:brightness-100 brightness-0"
                    src="icon-checkmark.svg"
                    alt=""
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Dropdown.propTypes = {
  unit: PropTypes.object.isRequired,
  setUnit: PropTypes.func.isRequired,
};

const SwitchUnitButton = ({ system, handleSwitch }) => {
  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="hover:bg-gray-300 focus:bg-gray-300 font-semibold dark:hover:bg-Neutral-700 dark:focus:bg-Neutral-700 p-2 rounded-md text-left w-full cursor-pointer outline-none"
      aria-label={`Switch to ${
        system === "imperial" ? "Metric" : "Imperial"
      } units`}
    >
      Switch to {system === "imperial" ? "Metric" : "Imperial"}
    </button>
  );
};

SwitchUnitButton.propTypes = {
  system: PropTypes.string.isRequired,
  handleSwitch: PropTypes.func.isRequired,
};

const Navbar = ({ unit, setUnit, darkMode, handleToggleDarkMode }) => {
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState("metric");
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleSwitch = () => {
    const nextSystem = system === "imperial" ? "metric" : "imperial";
    setSystem(nextSystem);
    setUnit(UNIT_SYSTEMS[nextSystem]);
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

  return (
    <header className="lg:px-10 p-4 flex sm:items-center justify-between">
      <div className="flex justify-center items-center gap-x-3">
        <div className="overflow-hidden w-10 h-10">
          <img
            src="logo.svg"
            alt="weather logo"
            className="w-full h-full object-left object-cover"
          />
        </div>
        <span className="font-bold text-xl">Weather Now</span>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-4">
        <button
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={handleToggleDarkMode}
          className="sm:self-auto w-10 p-2 self-end shadow-sm  dark:shadow-none rounded-md bg-gray-100 dark:text-Neutral-0 hover:bg-gray-200 text-gray-700 dark:bg-Neutral-800 dark:hover:bg-Neutral-700"
        >
          {darkMode ? (
            <i className="fa-solid fa-cloud-sun fa-lg brightness-0 dark:brightness-100"></i>
          ) : (
            <i className="fa-solid fa-moon fa-lg brightness-0 dark:brightness-100"></i>
          )}
        </button>
        <div className="relative inline-block">
          <button
            type="button"
            ref={buttonRef}
            aria-haspopup="true"
            aria-controls="units-menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-x-1.5 secondary-button shadow-sm dark:shadow-none dark:text-Neutral-0 dark:bg-Neutral-800 dark:hover:bg-Neutral-700"
          >
            <img
              className="dark:brightness-100 brightness-0"
              src="icon-units.svg"
              alt="Units Icon"
            />
            <span>Units</span>
            <img
              className={`dark:brightness-100 brightness-0 ${
                open ? "rotate-180" : ""
              } transition-transform`}
              src="icon-dropdown.svg"
              alt="Dropdown Arrow"
            />
          </button>
          {open && (
            <div
              ref={menuRef}
              id="units-menu"
              role="menu"
              aria-label="Units menu"
              className="absolute right-0 z-10 mt-2 w-52 p-2 rounded-md shadow-lg bg-white dark:bg-Neutral-800"
            >
              <SwitchUnitButton system={system} handleSwitch={handleSwitch} />
              <Dropdown unit={unit} setUnit={setUnit} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  unit: PropTypes.object.isRequired,
  setUnit: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  handleToggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
