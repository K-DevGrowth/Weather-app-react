import PropTypes from "prop-types";

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
          <p className="dark:text-Neutral-300 text-Neutral-600 font-semibold mb-1">{label}</p>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSwitch(key, option.value)}
                className={`flex justify-between cursor-pointer focus:ring-1 focus:ring-blue-300 dark:focus:ring-Neutral-600 hover:bg-blue-50 dark:hover:bg-Neutral-700 items-center p-2 rounded-md w-full text-left transition-colors duration-150 ${
                  unit[key] === option.value
                    ? "dark:bg-Neutral-700 bg-blue-50 text-Neural-0 font-semibold"
                    : ""
                }`}
              >
                {option.label}
                {unit[key] === option.value && (
                  <img className="dark:brightness-100 brightness-0" src="icon-checkmark.svg" alt="" />
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
  setUnit: PropTypes.object.isRequired,
};

export default Dropdown;
