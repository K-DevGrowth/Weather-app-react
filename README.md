# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Add geolocation detection to automatically show weather for the user's current location on first visit
- Implement a favorites/saved locations system where users can bookmark frequently checked locations
- Implement a "Compare Locations" feature to view weather side-by-side for multiple locations
- Include UV index, visibility, and air pressure data (available via Open-Meteo)
- Create dark/light mode themes that adapt to the time of day

### Screenshot

![](<./public/Screenshot%20(31).png>)
![](<./public/Screenshot%20(32).png>)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://https://tailwindcss.com/)
- [Open-Meteo API](https://open-meteo.com/) – Free weather API
- LocalStorage API for state persistence
- Geolocation API for user’s current position

### What I learned

To see how you can add code snippets, see below:

```javascript
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

ref = { menuRef };
```

```javascript
import { useEffect, useState } from "react";

const API_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const useWeather = (latitude, longitude, unit) => {
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem("weather");
    return saved ? JSON.parse(saved) : null;
  });
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [isWeatherError, setIsWeatherError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      try {
        setIsWeatherLoading(true);
        setIsWeatherError(null);

        const res = await fetch(
          `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index,visibility,surface_pressure&hourly=temperature_2m,precipitation,relative_humidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&temperature_unit=${
            unit.temp || "celsius"
          }&wind_speed_unit=${unit.wind || "kmh"}&precipitation_unit=${
            unit.precipitation || "mm"
          }&timezone=auto`
        );
        if (!res.ok) throw new Error("Weather API failed");

        const data = await res.json();
        setWeather(data);
        localStorage.setItem("weather", JSON.stringify(data));
      } catch (err) {
        setIsWeatherError(err.message);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, unit]);

  return { weather, isWeatherLoading, isWeatherError };
};

export default useWeather;
```

```javascript
const fetchLocationName = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `${API_REVERSE_GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await res.json();
    return {
      name:
        data.city || data.locality || data.principalSubdivision || "Unknown",
      country: data.countryName || "Unknown",
      latitude,
      longitude,
    };
  } catch (err) {
    return defaultLocation;
  }
};

const requestLocation = () => {
  setIsLocating(true);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await fetchLocationName(latitude, longitude);
        setCountry(locationName);
        setIsLocating(false);
        localStorage.setItem("selectedLocation", JSON.stringify(locationName));
      },
      () => {
        setCountry(defaultLocation);
        setIsLocating(false);
      }
    );
  } else {
    setCountry(defaultLocation);
    setIsLocating(false);
  }
};
```

```javascript
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
```

```javascript
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, handleToggleDarkMode };
};

export default useDarkMode;
```

```javascript
const [page, setPage] = useState(0);

const start = page * 4;
const visibleItems = states.slice(start, start + 4);

{
  [0, 1].map((i) => (
    <button
      type="button"
      key={i}
      className={`px-5 cursor-pointer py-2 ${
        page === i
          ? "bg-Blue-500 hover:bg-Blue-500/90 rounded-md text-Neutral-0"
          : "hover:bg-gray-200 dark:hover:bg-Neutral-700 rounded-md"
      }`}
      onClick={() => setPage(i)}
    >
      {i + 1}
    </button>
  ));
}
```

```javascript
const date = new Date();
const formattedDate = date.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
```

```javascript
const handleAddToCompare = () => {
  setCompareWeather((prev) => {
    const exists = prev.some((item) => item.name === country.name);
    if (exists || prev.length >= 2) return prev;

    if (prev.length > 0) {
      const firstUnit = prev[0].unit;
      const sameUnit =
        firstUnit.temperature_2m === unit.temperature_2m &&
        firstUnit.precipitation === unit.precipitation &&
        firstUnit.wind_speed_10m === unit.wind_speed_10m;

      if (!sameUnit) {
        return prev;
      }
    }

    localStorage.setItem(
      "compareWeather",
      JSON.stringify([
        ...prev,
        {
          name: country.name,
          countryName: country.country,
          weather,
          unit: unit,
        },
      ])
    );

    return [
      ...prev,
      {
        name: country.name,
        countryName: country.country,
        weather,
        unit: unit,
      },
    ];
  });
};

const handleAddFavourite = () => {
  setFavourites((prev) => {
    const exits = prev.some((item) => item.name === country.name);
    if (exits) return prev;
    localStorage.setItem(
      "favouriteWeather",
      JSON.stringify([...prev, country])
    );
    return [...prev, country];
  });
};

const handleDeleteFavourite = () => {
  setFavourites((prev) => {
    const updated = prev.filter((item) => item.name !== country.name);
    localStorage.setItem("favouriteWeather", JSON.stringify(updated));
    return updated;
  });
};
```

```javascript
const getComparisonClass = (currentValue, allValues, higherIsBetter = true) => {
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);

  if (currentValue === max) {
    return higherIsBetter ? "text-green-400" : "text-red-400";
  }

  if (currentValue === min) {
    return higherIsBetter ? "text-red-400" : "text-green-400";
  }

  return "text-Neutral-300";
};

const weatherMetrics = [
  {
    key: "temperature_2m",
    label: "Temperature",
    higherIsBetter: true,
  },
  {
    key: "apparent_temperature",
    label: "Feel likes",
    higherIsBetter: true,
  },
  {
    key: "relative_humidity_2m",
    label: "Humidity",
    higherIsBetter: false,
  },
  {
    key: "wind_speed_10m",
    label: "Wind",
    higherIsBetter: false,
  },
  {
    key: "precipitation",
    label: "Precipitation",
    higherIsBetter: false,
  },
  {
    key: "uv_index",
    label: "UV index",
    higherIsBetter: false,
  },
  {
    key: "visibility",
    label: "Visibility",
    higherIsBetter: true,
  },
];

const allValuesMap = weatherMetrics.reduce((acc, metric) => {
  acc[metric.key] = compareWeather.map((item) => item.weather[metric.key]);
  return acc;
}, {});

const handleDeleteCompare = (idx) => {
  setCompareWeather((prev) => {
    const updated = prev.filter(
      (item) => item.name !== compareWeather[idx].name
    );
    localStorage.removeItem("compareWeather", JSON.stringify(updated));
    return updated;
  });
};
```

### Continued development

Js, ReactJS, Tailwindcss, and more...

### Useful resources

- [Open-Meteo API Docs](https://open-meteo.com/en/docs) – for integrating weather data
- [React](https://reactjs.org/) - JS library
- [Tailwind UI Components](https://tailwindui.com/) – inspiration for clean design

## Author

- Youtube - [K dev](https://www.youtube.com/@Kdev6)
- Frontend Mentor - [@K-DevGrowth](https://www.frontendmentor.io/profile/K-DevGrowth)
