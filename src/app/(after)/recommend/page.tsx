'use client'

import {
  ActivityStyle,
  ActivityType,
  coordinate,
  useActivityInfo,
  useTodayWeatherQuery,
  WeatherResponse,
} from '@/api'
import { ActivityWeatherInfo } from '@/api/services/recommend/model'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import { getRecommendData } from '@/components/Date/getRecommendData'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import { styleMapping, typeMapping } from '@/components/Mapping/mapping'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import PlansModal from '@/components/Modal/PlansModal'
import { useModal } from '@/hooks/useModal/useModal'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { useWeatherContext } from '@/providers/WeatherProvider'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

const Recommend = () => {
  const { isVisible, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState<boolean>(true)
  const language = useSelector((state: RootState) => state.language)
  const { translate, translatedText } = useTranslate()
  const { weatherData } = useWeatherContext()
  const [query, setQuery] = useState<ActivityWeatherInfo>()
  const queryClient = useQueryClient()

  // POST
  const { data: activityInfo, mutate: mutateActivityInfo } = useActivityInfo({
    onSuccess: () => {
      console.log('SUCCESS')
      queryClient.invalidateQueries({ queryKey: ['activityHistory'] })
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

      setQuery({
        location: todayWeather.city.name,
        startTime: weatherData.startTime || '',
        endTime: weatherData.endTime || '',
        type: typeMapping(
          weatherData.type || ActivityType.Indoor,
        ) as ActivityType,
        style: styleMapping(
          weatherData.style || ActivityStyle.Amekaji,
        ) as ActivityStyle,
        weather: filteredWeather.tempCode,
        wind: filteredWeather.wind,
        rain: filteredWeather.rain,
        humidity: filteredWeather.hydrate,
        feelsLike: filteredWeather.feels_like,
        temp: filteredWeather.temp,
      })

      mutateActivityInfo({
        location: todayWeather.city.name,
        startTime: weatherData.startTime || '',
        endTime: weatherData.endTime || '',
        type: typeMapping(
          weatherData.type || ActivityType.Indoor,
        ) as ActivityType,
        style: styleMapping(
          weatherData.style || ActivityStyle.Amekaji,
        ) as ActivityStyle,
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
    <div className="flex min-h-screen min-w-[600px] flex-col gap-9 bg-white p-9">
      {!loading ? (
        <>
          <Header />
          <ActivityWeather
            todayWeather={query as ActivityWeatherInfo}
            type={weatherData?.type as ActivityType}
            style={weatherData?.style as ActivityStyle}
          />
          <img
            src={activityInfo?.result?.imgPath}
            alt="이미지"
            className="h-[600px] w-full py-[30px]"
          />
          <p className="font-notosanko text-[20px] font-semibold text-gray-500">
            {language === 'en' && translatedText
              ? translatedText[0]?.translations[0]?.text
              : activityInfo?.result?.comment}
          </p>
          <NavigationBar color="zinc" openModal={openModal} />
          {isVisible && (
            <PlansModal isVisible={isVisible} closeModal={closeModal} />
          )}
        </>
      ) : (
        <LoadingAvatar />
      )}
    </div>
  )
}

export default Recommend
