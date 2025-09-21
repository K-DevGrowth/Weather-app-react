const Dropdown = ({ unit, setUnit }) => {
  console.log(unit);

  return (
    <div className="divide-y divide-Neutral-600">
      <DropdownContainer
        title="Temperature"
        storageKey="dropdown-temperature"
        options={["Celsius (C)", "Fahrenheit (F)"]}
        unit={unit}
        setUnit={setUnit}
      />
      <DropdownContainer
        title="Wind Speed"
        storageKey="dropdown-windspeed"
        options={["km/h", "mph"]}
        unit={unit}
        setUnit={setUnit}
      />
      <DropdownContainer
        title="Precipitation"
        storageKey="dropdown-precipitation"
        options={["Millimeters (mm)", "Inches (in)"]}
        unit={unit}
        setUnit={setUnit}
      />
    </div>
  );
};

const DropdownContainer = ({ title, options, unit, setUnit }) => {
  return (
    <div className="py-1">
      <p className="text-Neutral-300">{title}</p>
      <div>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              setUnit({
                ...unit,
                temp: unit.temp === "celsius" ? "fahrenheit" : "celsius",
              })
            }
            className={`flex justify-between p-2 rounded-md text-left w-full ${
              "" === option
                ? "bg-Neutral-700"
                : "bg-Neutral-800 hover:bg-Neutral-700"
            }`}
          >
            {option}
            {/* {selected === option && <img src="/icon-checkmark.svg" alt="" />} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
