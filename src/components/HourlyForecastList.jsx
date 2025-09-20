const HourlyForecastList = () => {
  return (
    <div className="bg-Neutral-800 p-5 rounded-xl">
      <div className="flex justify-between items-center pb-4">
        <p>Hourly forecast</p>
        <button>Monday</button>
      </div>
      <HourlyForcastItem />
    </div>
  )
}

const HourlyForcastItem = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 rounded-md bg-Neutral-700">
      <div>
        3 PM
      </div>
      <p>20.</p>
    </div>
  )
}


export default HourlyForecastList