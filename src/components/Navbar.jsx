import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

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

const SwitchUnitButton = ({ system, handleSwitch }) => {
  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="dark:hover:bg-Neutral-700 dark:focus:ring-Neutral-600 dark:focus:bg-Neutral-700 hover:bg-blue-50 focus:bg-blue-50 p-2 rounded-md text-left w-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300"
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
      <img
        src="logo.svg"
        alt="Weather App Logo"
        className="h-8 w-auto brightness-0 dark:brightness-100"
      />
      <div className="flex flex-col-reverse sm:flex-row gap-4">
        <button
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={handleToggleDarkMode}
          className="w-10 sm:self-auto p-1 self-end rounded-md bg-Neutral-0 dark:bg-Neutral-800 dark:hover:bg-Neutral-700"
        >
          {darkMode ? (
            <img className="" src="icon-sun.svg" alt="Light Mode Icon" />
          ) : (
            <img className="" src="icon-moon.svg" alt="Dark Mode Icon" />
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
            className="inline-flex items-center gap-x-1.5 secondary-button dark:text-Neutral-0 dark:bg-Neutral-800 dark:hover:bg-Neutral-700"
          >
            <img
              className="dark:brightness-100 brightness-0"
              src="icon-units.svg"
              alt="Units Icon"
            />
            <span>Units</span>
            <img
              className={`dark:brightness-100 brightness-0 ${open ? 'rotate-180' : ''} transition-transform`}
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
              className="absolute right-0 z-10 mt-2 w-52 p-2 rounded-md  shadow-lg bg-Neutral-0 dark:bg-Neutral-800"
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
  setUnit: PropTypes.object.isRequired,
};

export default Navbar;
