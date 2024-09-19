export const TodayWeatherInfo = () => {
  return (
    <div className="flex h-[97px] w-[528px] content-center items-start self-stretch">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-weatherTitle font-notosanko text-[36px]">
            SEOUL
          </h1>
          <span className="text-weatherSub text-weatherSubColor font-notosanko">
            September 09, 2024
          </span>
        </div>
        <div className="flex flex-col content-center items-end">
          <h1 className="text-weatherTem font-notosanko">
            Low: 24C / High: 28C
          </h1>
          <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
            Feels Like: 22C
          </p>
          <p className="font-notosanko text-weatherSpan text-weatherSubColor">
            🌧️ 80% 💧 65% 💨 15 km/h
          </p>
        </div>
      </div>
    </div>
  )
}
