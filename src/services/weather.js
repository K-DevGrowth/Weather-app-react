import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast"

const locationUrl = ""

const getAll = (lat, lon, units) => {
    const tempUnit = units.temp !== "celsius" ? "fahrenheit" : "celsius";
    const windUnit = units.wind !== "kmh" ? "mph" : "kmh";
    const precipUnit = units.precipitation !== "mm" ? "inch" : "mm";

    const request = axios.get(
        `${baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weathercode` +
        `&hourly=temperature_2m,precipitation,relative_humidity_2m,weathercode` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
        `&temperature_unit=${tempUnit}` +
        `&wind_speed_unit=${windUnit}` +
        `&precipitation_unit=${precipUnit}` +
        `&timezone=auto`)
    return request.then(res => res.data)
}

export default { getAll }