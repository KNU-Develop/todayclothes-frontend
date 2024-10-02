import { ActivityStyle, ActivityType, WeatherResponse } from '@/api'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../Date/formatDate'
import { useEffect, useRef } from 'react'
import { translateActivityStyle, translateActivityType } from './translation'
import { getWeatherDescription } from './condition'
import { ActivityWeatherInfo } from '@/api/services/recommend/model'

type Language = 'en' | 'ko'

export const ActivityWeather: React.FC<{
  todayWeather: ActivityWeatherInfo
  type: ActivityType
  style: ActivityStyle
}> = ({ todayWeather, type, style }) => {
  const language = useSelector((state: RootState) => state.language) as Language
  const { translatedText, translate } = useTranslate()

  const translatedType = translateActivityType(type, language)
  const translatedStyle = translateActivityStyle(style, language)
  const { emoji, description } = getWeatherDescription(
    todayWeather.weather,
    language,
  )

  useEffect(() => {
    if (todayWeather.location && language === 'ko') {
      translate(todayWeather.location, language)
    }
  }, [todayWeather.location, language])

  return (
    <div className="flex w-full content-center items-start self-stretch">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-notosanko text-weatherTitle">
            {language === 'ko' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : todayWeather.location}
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
            {Math.round(todayWeather.temp)}°C ({description})
          </h1>
          <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
            {language === 'en' ? 'Feels Like: ' : '체감온도: '}{' '}
            {Math.round(todayWeather.feelsLike)}°C
          </p>
          <p className="font-notosanko text-weatherSpan text-weatherSubColor">
            <span className="font-toss">🌧️</span>{' '}
            {Math.round(todayWeather.rain * 100)}%{' '}
            <span className="font-toss">💧</span>{' '}
            {Math.round(todayWeather.humidity)}%{' '}
            <span className="font-toss">💨</span>{' '}
            {Math.round(todayWeather.wind * 3.6)}km/h
          </p>
        </div>
      </div>
    </div>
  )
}
