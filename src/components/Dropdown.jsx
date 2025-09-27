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
    <div className="divide-y divide-Neutral-600 w-full max-w-xs bg-Neutral-800 rounded-lg shadow-lg p-2">
      {DROPDOWN_CONFIG.map(({ label, key, options }) => (
        <div key={key} className="py-1">
          <p className="text-Neutral-300 font-semibold mb-1">{label}</p>
          <div className="flex gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSwitch(key, option.value)}
                className={`flex-1 p-2 rounded-md text-left w-full transition-colors duration-150 ${
                  unit[key] === option.value
                    ? "bg-Primary-500 text-white font-bold shadow"
                    : "bg-Neutral-700 text-Neutral-200 hover:bg-Primary-600 hover:text-white"
                }`}
              >
                {option.label}
                {unit[key] === option.value && (
                  <span className="ml-2 text-Primary-200" aria-label="selected">
                    &#10003;
                  </span>
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
