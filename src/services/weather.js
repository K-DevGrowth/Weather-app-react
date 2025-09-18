import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast"

const getAll = (lat, lon, hourly) => {
    const request = axios.get(`${baseUrl}/?latitude=${lat}&longitude=${lon}&hourly=${hourly}`)
    return request.then(res => res.data)
}

export default { getAll }