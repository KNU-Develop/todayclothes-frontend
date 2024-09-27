import { ActivityStyle, ActivityType, WeatherResponse } from '@/api'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { formatDate } from '../Date/formatDate'
import { useEffect } from 'react'
import { translateActivityStyle, translateActivityType } from './translation'

type Language = 'en' | 'ko'

// 날씨 데이터를 필터링하는 함수
const filterWeatherByTime = (
  weatherList: WeatherResponse['list'] | undefined,
  startTime: string,
  endTime: string,
) => {
  if (!weatherList) {
    return [] // weatherList가 없을 경우 빈 배열 반환
  }

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
  const { translatedText, translate } = useTranslate()

  const translatedType = translateActivityType(type, language)
  const translatedStyle = translateActivityStyle(style, language)

  useEffect(() => {
    if (todayWeather?.city.name && language == 'ko') {
      translate(todayWeather?.city.name, language)
    }
  }, [todayWeather?.city.name, language])

  // 입력된 시간 범위에 맞는 날씨 데이터를 필터링
  const filteredWeather = filterWeatherByTime(
    todayWeather?.list,
    startTime,
    endTime,
  )

  if (!filteredWeather.length) {
    return <p>No weather data available for the selected time range.</p> // 필터링된 데이터가 없을 때 처리
  }

  // 평균 온도 계산
  const averageTemperature =
    filteredWeather.reduce((sum, item) => sum + item.main.temp, 0) /
    filteredWeather.length

  const averageFeelsLike =
    filteredWeather.reduce((sum, item) => sum + item.main.feels_like, 0) /
    filteredWeather.length

  // 첫 번째 날씨 상태 정보를 가져옴
  const weatherCondition = filteredWeather[0].weather[0]

  // 날씨 상태를 구분하는 함수
  const getWeatherDescription = (conditionId: number) => {
    let description = ''
    let emoji = ''

    if (conditionId >= 200 && conditionId <= 232) {
      description = language === 'ko' ? '천둥번개' : 'Thunderstorm'
      emoji = '⛈️'
    } else if (conditionId >= 300 && conditionId <= 321) {
      description = language === 'ko' ? '이슬비' : 'Drizzle'
      emoji = '🌧️'
    } else if (conditionId >= 500 && conditionId <= 504) {
      description = language === 'ko' ? '비' : 'Rain'
      emoji = '🌧️'
    } else if (conditionId === 511) {
      description = language === 'ko' ? '얼어붙은 비' : 'Freezing Rain'
      emoji = '🌧️'
    } else if (conditionId >= 520 && conditionId <= 531) {
      description = language === 'ko' ? '소나기' : 'Shower Rain'
      emoji = '🌦️'
    } else if (conditionId >= 600 && conditionId <= 622) {
      description = language === 'ko' ? '눈' : 'Snow'
      emoji = '❄️'
    } else if (conditionId >= 701 && conditionId <= 781) {
      description = language === 'ko' ? '안개' : 'Fog'
      emoji = '🌫️'
    } else if (conditionId === 800) {
      description = language === 'ko' ? '맑음' : 'Clear'
      emoji = '☀️'
    } else if (conditionId >= 801 && conditionId <= 803) {
      description = language === 'ko' ? '구름 많음' : 'Cloudy'
      emoji = '🌥️'
    } else if (conditionId === 804) {
      description = language === 'ko' ? '흐림' : 'Overcast'
      emoji = '☁️'
    }

    return { description, emoji }
  }

  const { description: weatherDescription, emoji } = getWeatherDescription(
    weatherCondition.id,
  )

  return (
    <div className="flex w-full content-center items-start self-stretch">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-notosanko text-weatherTitle">
            {language == 'ko' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : todayWeather?.city.name}
          </h1>
          <span className="font-notosanko text-weatherSub text-weatherSubColor">
            {formatDate(language)}
          </span>
          <span className="font-notosanko text-[20px] font-medium">
            {translatedType}, {translatedStyle}
          </span>
        </div>

        <div className="flex flex-col content-center items-end gap-[8px]">
          <h1 className="font-notosanko text-weatherTem">
            <span className="font-toss">{emoji}</span>{' '}
            {Math.round(averageTemperature)}°C ({weatherDescription})
          </h1>
          <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
            {language == 'en' ? 'Feels Like: ' : '체감온도: '}{' '}
            {Math.round(averageFeelsLike)}°C
          </p>
          <p className="font-notosanko text-weatherSpan text-weatherSubColor">
            🌧️ {Math.round(filteredWeather[0].pop * 100)}% 💧{' '}
            {Math.round(filteredWeather[0].main.humidity)}% 💨{' '}
            {Math.round(filteredWeather[0].wind.speed * 3.6)}km/h
          </p>
        </div>
      </div>
    </div>
  )
}
