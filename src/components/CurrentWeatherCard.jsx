import weatherData from "../weatherData";

const CurrentWeatherCard = ({ data, timezone }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative">
      <img
        className="w-full rounded-xl h-60 object-cover"
        src="/bg-today-large.svg"
        alt="Current Weather"
      />
      <div className="absolute inset-0 p-4 flex justify-between items-center gap-4">
        <div>
          <p className="font-bold text-2xl">
            {timezone.replaceAll("_", " ").replace("/", ", ")}
          </p>
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-6">
          <img
            className="w-20"
            src={weatherData.getWeatherIcon(data?.weathercode)}
            alt=""
          />
          <p className="text-6xl font-bold">{data?.temperature_2m}°</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
