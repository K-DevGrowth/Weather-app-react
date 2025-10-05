import { useEffect, useState } from "react";

const API_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const useWeather = (latitude, longitude, unit) => {
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem("weather");
    return saved ? JSON.parse(saved) : null
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
          `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index,visibility,surface_pressure&hourly=temperature_2m,precipitation,relative_humidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&temperature_unit=${unit.temp || "celsius"}&wind_speed_unit=${unit.wind || "kmh"}&precipitation_unit=${unit.precipitation || "mm"}&timezone=auto`
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
}

export default useWeather;