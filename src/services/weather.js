import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast"

const getAll = (lat, lon) => {
    const request = axios.get(`${baseUrl}/?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`)
    return request.then(res => res.data)
}

export default { getAll }