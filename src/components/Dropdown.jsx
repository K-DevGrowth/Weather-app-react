import { useEffect, useState } from "react";

const Dropdown = () => {
  return (
    <>
      <DropdownContainer
        title="Temperature"
        storageKey="dropdown-temperature"
        options={["Celsius (C)", "Fahrenheit (F)"]}
      />
      <DropdownContainer
        title="Wind Speed"
        storageKey="dropdown-windspeed"
        options={["km/h", "mph"]}
      />
      <DropdownContainer
        title="Precipitation"
        storageKey="dropdown-precipitation"
        options={["Millimeters (mm)", "Inches (in)"]}
      />
    </>
  );
};

const DropdownContainer = ({ title, options }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(title);
    if (saved && options.includes(saved)) {
      setSelected(saved);
    } else {
      setSelected(options[0]);
    }
  }, [options, title]);

  useEffect(() => {
    if (selected) {
      localStorage.setItem(title, selected);
    }
  }, [selected, title]);

  return (
    <div className="py-1">
      <p className="text-Neutral-300">{title}</p>
      <div>
        {options.map((option) => (
          <DropdownItem
            key={option}
            option={option}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

const DropdownItem = ({ option, selected, onSelect }) => {
  return (
    <button
      type="button"
      className={`flex justify-between px-2 py-1 rounded-md text-left w-full ${
        selected === option
          ? "bg-Neutral-700"
          : "bg-Neutral-800 hover:bg-Neutral-700"
      }`}
      onClick={() => onSelect(option)}
    >
      {option}
      {selected === option && <img src="/icon-checkmark.svg" alt="" />}
    </button>
  );
};

export default Dropdown;
