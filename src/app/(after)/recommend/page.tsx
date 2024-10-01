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
import { getRecommendData } from '@/components/Date/getRecommendData'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import PlansModal from '@/components/PlansModal/PlansModal'
import { useModal } from '@/hooks/useModal/useModal'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { useWeatherContext } from '@/providers/WeatherProviter'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Recommend = () => {
  const { isVisible, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState<boolean>(true)
  const language = useSelector((state: RootState) => state.language)
  const activityWeather = useSelector(
    (state: RootState) => state.activityWeather,
  )
  const { translate, translatedText } = useTranslate()
  const { weatherData } = useWeatherContext()

  // POST
  const { data: activityInfo, mutate: mutateActivityInfo } = useActivityInfo({
    onSuccess: () => {
      console.log('SUCCESS')
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const { data: todayWeather } = useTodayWeatherQuery(
    weatherData?.location as coordinate,
    {
      enabled: !!weatherData?.location,
      retry: 3,
    },
  )
  // todayWeather 데이터로 시간에 따른 날씨 필터링
  useEffect(() => {
    if (todayWeather && weatherData?.location) {
      const filteredWeather = getRecommendData(todayWeather, {
        startTime: weatherData.startTime || '',
        endTime: weatherData.endTime || '',
      })

      const query = {
        location: todayWeather.city.name,
        time: {
          start: weatherData.startTime || '',
          end: weatherData.endTime || '',
        },
        type: weatherData.type || ActivityType.Indoor,
        style: weatherData.style || ActivityStyle.Amekaji,
        weather: filteredWeather.tempCode,
        wind: filteredWeather.wind,
        rain: filteredWeather.rain,
        humidity: filteredWeather.hydrate,
        feelsLike: filteredWeather.feels_like,
        temp: filteredWeather.temp,
      }

      console.log(query)

      mutateActivityInfo({
        location: todayWeather.city.name,
        time: {
          start: weatherData.startTime || '',
          end: weatherData.endTime || '',
        },
        type: weatherData.type || ActivityType.Indoor,
        style: weatherData.style || ActivityStyle.Amekaji,
        weather: filteredWeather.tempCode,
        wind: filteredWeather.wind,
        rain: filteredWeather.rain,
        humidity: filteredWeather.hydrate,
        feelsLike: filteredWeather.feels_like,
        temp: filteredWeather.temp,
      })
    }
  }, [weatherData?.location, todayWeather])

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
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [todayWeather])

  return (
    <div className="flex min-h-screen min-w-[600px] flex-col gap-9 p-9">
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
          <NavigationBar color="zinc" openModal={openModal} />
          <PlansModal isVisible={isVisible} closeModal={closeModal} />
        </>
      ) : (
        <LoadingAvatar />
      )}
    </div>
  )
}

export default Recommend
