'use client'

import { coordinate, WeatherResponse } from '@/api/services/weather/model'
import { useTodayWeatherQuery } from '@/api/services/weather/quries'

export const TodayWeatherInfo = () => {
  const coordinate: coordinate = { lat: 37.715133, lon: 126.734086 }

  const todayWeather = useTodayWeatherQuery(coordinate).data as WeatherResponse

  return (
    <div className="flex h-[97px] w-[528px] content-center items-start self-stretch">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-notosanko text-[36px] text-weatherTitle">
            {todayWeather?.city.name}
          </h1>
          <span className="font-notosanko text-weatherSub text-weatherSubColor">
            September 09, 2024
          </span>
        </div>
        <div className="flex flex-col content-center items-end">
          <h1 className="font-notosanko text-weatherTem">
            Low: {Math.round(todayWeather?.list[0].main.temp_min)}°C / High:
            {Math.round(todayWeather?.list[0].main.temp_max)}°C
          </h1>
          <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
            Feels Like: {Math.round(todayWeather?.list[0].main.feels_like)}°C
          </p>
          <p className="font-notosanko text-weatherSpan text-weatherSubColor">
            🌧️ {todayWeather?.list[0].pop * 100}% 💧{' '}
            {Math.round(todayWeather?.list[0].main.humidity)}% 💨{' '}
            {Math.round(todayWeather?.list[0].wind.speed * 3.6)}
            km/h
          </p>
        </div>
      </div>
    </div>
  )
}
