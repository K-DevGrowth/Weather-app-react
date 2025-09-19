import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
    <header className="p-4 flex items-center justify-between *:cursor-pointer">
      <img
        className="block max-w-full"
        src="/logo.svg"
        alt="Weather App Logo"
      />
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 bg-Neutral-800 hover:bg-Neutral-700 cursor-pointer"
        >
          <img src="/icon-units.svg" alt="Units Icon" />
          <span>Units</span>
          <img src="/icon-dropdown.svg" alt="Dropdown Arrow" />
        </button>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-52 p-2 rounded-md divide-y divide-Neutral-600 shadow-lg bg-Neutral-800"
          >
            <button
              type="button"
              className="bg-Neutral-700 px-2 py-1 rounded-md text-left w-full"
            >
              Switch to Imperial
            </button>
            <Dropdown />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
