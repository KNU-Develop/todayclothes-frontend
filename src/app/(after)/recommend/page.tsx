// Recommend.tsx
'use client'

import {
  ActivityStyle,
  ActivityType,
  coordinate,
  useActivityInfo,
  useTodayWeatherQuery,
  WeatherResponse,
} from '@/api'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { useWeatherContext } from '@/providers/WeatherProviter'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Recommend = () => {
  const [geolocation, setGeolocation] = useState<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const language = useSelector((state: RootState) => state.language)
  const activityWeather = useSelector(
    (state: RootState) => state.activityWeather,
  )
  const { translate, translatedText } = useTranslate()
  const { weatherData } = useWeatherContext()

  // POST
  const { data: activityInfo, mutate: mutateActivityInfo } = useActivityInfo(
    {
      location: '서울',
      time: {
        start: weatherData?.startTime || '',
        end: weatherData?.endTime || '',
      },
      type: weatherData?.type || ActivityType.Indoor,
      style: weatherData?.style || ActivityStyle.Amekaji,
      wind: activityWeather.wind,
      rain: activityWeather.rain,
      humidity: activityWeather.humidity,
      feelsLike: activityWeather.feelsLike,
      temp: activityWeather.temp,
    },
    {
      onSuccess: () => {
        console.log('SUCCESS')
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  const { data: todayWeather } = useTodayWeatherQuery(
    geolocation as coordinate,
    {
      enabled: !!geolocation,
      retry: 3,
    },
  )

  // geolocation과 loading 상태에 따라 mutate 호출
  useEffect(() => {
    if (weatherData?.location) {
      setGeolocation({
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
      })
    }

    if (loading) {
      mutateActivityInfo()
    }
  }, [weatherData?.location, loading, mutateActivityInfo])

  // comment 번역
  useEffect(() => {
    if (activityInfo?.result?.comment && language === 'en') {
      translate(activityInfo.result.comment, language)
    }
  }, [activityInfo?.result?.comment, language])

  // todayWeather 로딩 상태 관리
  useEffect(() => {
    if (todayWeather) {
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
            type={activityInfo?.result.type || ActivityType.Indoor}
            style={activityInfo?.result.style || ActivityStyle.BusinessCasual}
          />
          <img
            src={activityInfo?.result?.imgPath}
            alt="이미지"
            className="h-[600px] w-full py-[30px]"
          />
          <p className="text-[20px] font-semibold text-gray-500">
            {language === 'en' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : activityInfo?.result?.comment}
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
