const CurrentWeatherCard = ({ data, timezone, unit }) => {
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
          <p className="font-bold text-xl">
            {timezone.replaceAll("_", " ").replace("/", ", ")}
          </p>
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <img className="w-25" src="/icon-sunny.webp" alt="" />
          <p className="text-5xl font-bold">
            {data?.temperature_2m}
            {unit?.temperature_2m.replace("C", "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
