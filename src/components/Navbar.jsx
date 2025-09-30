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
      className="hover:bg-Neutral-700 focus:bg-Neutral-700 p-2 rounded-md text-left w-full cursor-pointer focus:outline-none focus:ring-1"
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

const Navbar = ({ unit, setUnit }) => {
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
    <header className="px-1 sm:px-10 pt-4 flex items-center justify-between *:cursor-pointer">
      <img src="logo.svg" alt="Weather App Logo" className="h-8 w-auto" />
      <div className="relative inline-block">
        <button
          type="button"
          ref={buttonRef}
          aria-haspopup="true"
          aria-controls="units-menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 focus:ring-1 focus:outline-none bg-Neutral-800 hover:bg-Neutral-700 cursor-pointer"
        >
          <img src="icon-units.svg" alt="Units Icon" />
          <span>Units</span>
          <img src="icon-dropdown.svg" alt="Dropdown Arrow" />
        </button>
        {open && (
          <div
            ref={menuRef}
            id="units-menu"
            role="menu"
            aria-label="Units menu"
            className="absolute right-0 z-10 mt-2 w-52 p-2 rounded-md  shadow-lg bg-Neutral-800"
          >
            <SwitchUnitButton system={system} handleSwitch={handleSwitch} />
            <Dropdown unit={unit} setUnit={setUnit} />
          </div>
        )}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  unit: PropTypes.object.isRequired,
  setUnit: PropTypes.object.isRequired,
};

export default Navbar;
