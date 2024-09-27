// Recommend.tsx
'use client'

import {
  ActivityStyle,
  ActivityType,
  coordinate,
  useActivityQuery,
  useTodayWeatherQuery,
  WeatherResponse,
} from '@/api'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import { WeatherSave } from '@/components/Info/Weather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { useWeatherContext } from '@/providers/WeatherProviter'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Recommend = () => {
  const [geolocation, setGeolocation] = useState<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const language = useSelector((state: RootState) => state.language)
  const { translate, translatedText } = useTranslate()
  const dispatch = useDispatch()

  const { weatherData } = useWeatherContext()

  const { data: activity } = useActivityQuery()

  const { data: todayWeather } = useTodayWeatherQuery(
    geolocation as coordinate,
    {
      enabled: !!geolocation,
      retry: 3,
    },
  )

  // weatherData의 location을 geolocation으로 설정
  useEffect(() => {
    if (weatherData?.location) {
      setGeolocation({
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
      })
    }
  }, [weatherData?.location])

  //comment 번역
  useEffect(() => {
    if (activity?.result.comment && language == 'en') {
      translate(activity?.result.comment, language)
    }
  }, [activity?.result.comment, language])

  // 체감 온도에 해당하는 온도 설정(so_hot, hot...)
  useEffect(() => {
    if (todayWeather) {
      WeatherSave(todayWeather, dispatch)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [todayWeather])

  return (
    <div className="flex h-screen min-w-[600px] flex-col gap-9 p-9">
      {!loading ? (
        <>
          <Header />
          <ActivityWeather
            todayWeather={todayWeather as WeatherResponse}
            startTime={weatherData?.startTime || '2024-09-27T12:00Z'}
            endTime={weatherData?.endTime || '2024-09-27T18:00Z'}
            type={activity?.result.type || ActivityType.Indoor}
            style={activity?.result.style || ActivityStyle.BusinessCasual}
          />
          <img src={activity?.result.imgPath} alt="이미지" />
          <p className="text-[20px] font-semibold text-gray-500">
            {language == 'en' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : activity?.result.comment}
          </p>
          <NavigationBar color="zinc" />
        </>
      ) : (
        <LoadingAvatar />
      )}
    </div>
  )
}

export default Recommend
