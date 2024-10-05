import { WeatherResponse } from '@/api'
import { hydrate } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export function getRecommendData(
  todayWeather: WeatherResponse,
  weatherData: { startTime: string; endTime: string },
) {
  const { startTime, endTime } = weatherData

  const start = dayjs(startTime)
  const end = dayjs(endTime)

  // 필터된 날씨 데이터 추출
  const filteredWeather = todayWeather.list.filter((entry: any) => {
    const weatherTime = dayjs(entry.dt_txt)
    const weatherTimeKR = weatherTime.add(9, 'hour')
    return weatherTimeKR.isBetween(start, end, null, '[]')
  })

  // 필터된 날씨 데이터에서 평균을 계산
  const averages = filteredWeather.reduce(
    (acc: any, curr: any, arr: any) => {
      acc.tempCode = curr.weather[0].id
      acc.temp += curr.main.temp
      acc.feels_like += curr.main.feels_like
      acc.rain += curr.pop
      acc.hydrate += curr.main.humidity
      acc.wind += curr.wind.speed

      return acc
    },
    { tempCode: 0, temp: 0, feels_like: 0, rain: 0, hydrate: 0, wind: 0 },
  )

  const count = filteredWeather.length

  if (count > 0) {
    // 각 항목에 대한 평균값 계산
    averages.temp = averages.temp / count
    averages.feels_like = averages.feels_like / count
    averages.rain = averages.rain / count
    averages.hydrate = averages.hydrate / count
    averages.wind = averages.wind / count
  }

  return {
    tempCode: averages.tempCode,
    temp: averages.temp.toFixed(2),
    feels_like: averages.feels_like.toFixed(2),
    rain: averages.rain.toFixed(2),
    hydrate: averages.hydrate.toFixed(2),
    wind: averages.wind.toFixed(2),
  }
}
