import { ActivityStyle, ActivityType, WeatherResponse } from '@/api'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../Date/formatDate'
import { useEffect, useRef } from 'react'
import { translateActivityStyle, translateActivityType } from './translation'
import { setActivityWeather } from '@/redux/slice/activityWeatherSlice'
import { getWeatherDescription } from './condition'

type Language = 'en' | 'ko'

type WeatherData = {
  wind: number
  rain: number
  humidity: number
  feelsLike: number
  temp: number
}

// 날씨 데이터를 필터링하는 함수
const filterWeatherByTime = (
  weatherList: WeatherResponse['list'] | undefined,
  startTime: string,
  endTime: string,
) => {
  if (!weatherList) return []

  return weatherList.filter((item) => {
    const itemTime = new Date(item.dt * 1000) // Unix timestamp -> Date 변환
    return itemTime >= new Date(startTime) && itemTime <= new Date(endTime)
  })
}

export const ActivityWeather: React.FC<{
  todayWeather: WeatherResponse
  startTime: string
  endTime: string
  type: ActivityType
  style: ActivityStyle
}> = ({ todayWeather, startTime, endTime, type, style }) => {
  const language = useSelector((state: RootState) => state.language) as Language
  const dispatch = useDispatch()
  const { translatedText, translate } = useTranslate()

  const translatedType = translateActivityType(type, language)
  const translatedStyle = translateActivityStyle(style, language)

  useEffect(() => {
    if (todayWeather?.city.name && language === 'ko') {
      translate(todayWeather.city.name, language)
    }
  }, [todayWeather?.city.name, language])

  const filteredWeather = filterWeatherByTime(
    todayWeather?.list,
    startTime,
    endTime,
  )

  if (!filteredWeather.length) {
    return <p>No weather data available for the selected time range.</p>
  }

  // 평균 온도 및 체감 온도 계산
  const calculateAverage = (
    key: keyof (typeof filteredWeather)[number]['main'],
  ) =>
    filteredWeather.reduce((sum, item) => sum + item.main[key], 0) /
    filteredWeather.length

  const averageTemperature = calculateAverage('temp')
  const averageFeelsLike = calculateAverage('feels_like')

  const weatherCondition = filteredWeather[0].weather[0]

  const { description: weatherDescription, emoji } = getWeatherDescription(
    weatherCondition.id,
    language,
  )

  const previousWeatherDataRef = useRef<WeatherData | null>(null)

  useEffect(() => {
    if (filteredWeather.length > 0) {
      const weatherData = {
        wind: Math.round(filteredWeather[0].wind.speed * 3.6),
        rain: Math.round(filteredWeather[0].pop * 100),
        humidity: Math.round(filteredWeather[0].main.humidity),
        feelsLike: Math.round(averageFeelsLike),
        temp: Math.round(averageTemperature),
      }

      // 이전 날씨 데이터와 비교
      if (
        !previousWeatherDataRef.current ||
        JSON.stringify(previousWeatherDataRef.current) !==
          JSON.stringify(weatherData)
      ) {
        // 상태가 변경된 경우에만 dispatch 호출
        dispatch(setActivityWeather(weatherData))
        previousWeatherDataRef.current = weatherData
      }
    }
  }, [dispatch, filteredWeather, averageFeelsLike, averageTemperature])

  return (
    <div className="flex w-full content-center items-start self-stretch">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-notosanko text-weatherTitle">
            {language === 'ko' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : todayWeather?.city.name}
          </h1>
          <span className="font-notosanko text-weatherSub text-weatherSubColor">
            {formatDate(language)}
          </span>
          <span className="font-notosanko text-[20px] font-medium">
            {translatedType},{translatedStyle}
          </span>
        </div>

        <div className="flex flex-col content-center items-end gap-[8px]">
          <h1 className="font-notosanko text-weatherTem">
            <span className="font-toss">{emoji}</span>{' '}
            {Math.round(averageTemperature)}°C ({weatherDescription})
          </h1>
          <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
            {language === 'en' ? 'Feels Like: ' : '체감온도: '}{' '}
            {Math.round(averageFeelsLike)}°C
          </p>
          <p className="font-notosanko text-weatherSpan text-weatherSubColor">
            <span className="font-toss">🌧️</span>{' '}
            {Math.round(filteredWeather[0].pop * 100)}%{' '}
            <span className="font-toss">💧</span>{' '}
            {Math.round(filteredWeather[0].main.humidity)}%{' '}
            <span className="font-toss">💨</span>{' '}
            {Math.round(filteredWeather[0].wind.speed * 3.6)}km/h
          </p>
        </div>
      </div>
    </div>
  )
}
