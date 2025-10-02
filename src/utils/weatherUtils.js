const weatherIcons = {
    0: "icon-sunny.webp",
    2: "icon-partly-cloudy.webp",
    3: "icon-overcast.webp",
    45: "icon-fog.webp",
    55: "icon-drizzle.webp",
    61: "icon-rain.webp",
    71: "icon-snow.webp",
    95: "icon-storm.webp",
};

const getWeatherIcon = (code) => weatherIcons[code] || "icon-sunny.webp";

const getWeekday = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short" });

export default { getWeatherIcon, getWeekday }