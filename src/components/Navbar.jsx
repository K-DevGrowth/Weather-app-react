import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const Navbar = ({ unit, setUnit }) => {
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState("metric");
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleSwitch = () => {
    setSystem(system === "imperial" ? "metric" : "imperial");
    if (system === "metric") {
      setUnit({
        temp: "celsius",
        wind: "kmh",
        precipitation: "mm",
      });
    } else {
      setUnit({
        temp: "fahrenheit",
        wind: "mph",
        precipitation: "inch",
      });
    }
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
    <header className="px-10 pt-4 flex items-center justify-between *:cursor-pointer">
      <img src="/logo.svg" alt="Weather App Logo" />
      <div className="relative inline-block">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 focus:outline-[1.5px] focus:outline-offset-2 bg-Neutral-800 hover:bg-Neutral-700 cursor-pointer"
        >
          <img src="/icon-units.svg" alt="Units Icon" />
          <span>Units</span>
          <img src="/icon-dropdown.svg" alt="Dropdown Arrow" />
        </button>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 z-10 mt-2 w-52 p-2 rounded-md  shadow-lg bg-Neutral-800"
          >
            <button
              type="button"
              onClick={handleSwitch}
              className="hover:bg-Neutral-700 focus:bg-Neutral-700 p-2 rounded-md text-left w-full cursor-pointer focus:outline focus:outline-offset-2"
            >
              Switch to {system === "imperial" ? "Metric" : "Imperial"}
            </button>
            <Dropdown unit={unit} setUnit={setUnit} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
