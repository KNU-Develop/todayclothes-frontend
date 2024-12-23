'use client'

import {
  ActivityStyle,
  ActivityType,
  coordinate,
  useActivityInfo,
  useTodayWeatherQuery,
} from '@/api'
import { ActivityWeatherInfo, TimeOfDay } from '@/api/services/recommend/model'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { useModal } from '@/hooks/useModal/useModal'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { useWeatherContext } from '@/providers/WeatherProvider'
import { RootState } from '@/redux/store'
import { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { getRecommendData } from '@/components/Date/getRecommendData'
import { useRouter } from 'next/navigation'

const Recommend = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const language = useSelector((state: RootState) => state.language)
  const { translate, translatedText } = useTranslate()
  const { weatherData } = useWeatherContext()
  const [query, setQuery] = useState<ActivityWeatherInfo>()
  const [city, setCity] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // POST
  const { data: activityInfo, mutate: mutateActivityInfo } = useActivityInfo({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activityHistory'],
      })
    },
  })
  // 4일간의 특정 위치의 날씨 호출
  const { data: todayWeather } = useTodayWeatherQuery(
    weatherData?.location as coordinate,
    {
      enabled: !!weatherData?.location,
      retry: 3,
    },
    96,
  )
  // todayWeather 데이터로 시간에 따른 날씨 필터링
  useEffect(() => {
    if (todayWeather && weatherData && city) {
      const filteredWeather = getRecommendData(
        todayWeather,
        weatherData.startTime || '',
        weatherData.timezone as TimeOfDay,
      )
      setQuery({
        location: city,
        startTime: weatherData.startTime || '',
        timezone: weatherData.timezone,
        gender: weatherData.gender,
        type: weatherData.type || ActivityType.Indoor,
        style: weatherData.style || ActivityStyle.Casual,
        weather: filteredWeather.tempCode,
        wind: filteredWeather.wind,
        rain: filteredWeather.rain,
        humidity: filteredWeather.hydrate,
        feelsLike: filteredWeather.feels_like,
        temp: filteredWeather.temp,
      })

      mutateActivityInfo({
        location: city,
        startTime: weatherData.startTime || '',
        timezone: weatherData.timezone,
        gender: weatherData.gender,
        type: weatherData.type || ActivityType.Indoor,
        style: weatherData.style || ActivityStyle.Casual,
        weather: filteredWeather.tempCode,
        wind: filteredWeather.wind,
        rain: filteredWeather.rain,
        humidity: filteredWeather.hydrate,
        feelsLike: filteredWeather.feels_like,
        temp: filteredWeather.temp,
      })
    }
  }, [weatherData, todayWeather, city])

  useEffect(() => {
    if (!weatherData) {
      router.push('/home')
    }
  }, [])

  // comment 번역
  useEffect(() => {
    if (activityInfo?.result?.comment && language === 'en') {
      translate(activityInfo.result.comment, language)
    }
  }, [activityInfo?.result?.comment, language])
  // 로딩 화면 2초 지연
  useEffect(() => {
    if (todayWeather) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [todayWeather])
  // 지역명 구글맵 API로 호출
  useEffect(() => {
    const Location = async () => {
      try {
        if (weatherData?.location) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${weatherData.location.lat},${weatherData.location.lon}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`,
          )
          const data = await response.json()
          const cityName = data.plus_code.compound_code.split(' ')

          setCity(cityName[cityName.length - 1])
        }
      } catch (error) {
        console.log(error)
      }
    }
    Location()
  }, [weatherData])

  return (
    <>
      {!loading && todayWeather && query ? (
        <div className="flex min-h-screen flex-col gap-9 bg-white p-9">
          <Header />

          <div className="flex flex-1 flex-col justify-between gap-6">
            <ActivityWeather
              todayWeather={query}
              type={weatherData?.type as ActivityType}
              style={weatherData?.style as ActivityStyle}
            />
            <Image
              src={activityInfo?.result?.imgPath as ''}
              alt="추천 받은 옷 이미지"
              width={500}
              height={500}
              className="h-full w-full"
            />
            <p className="font-notosanko text-[15px] font-semibold text-gray-500 sm:text-[20px]">
              {language === 'en' && translatedText
                ? translatedText[0]?.translations[0]?.text
                : activityInfo?.result?.comment}
            </p>
            <NavigationBar color="zinc" />
          </div>
        </div>
      ) : (
        <LoadingAvatar />
      )}
    </>
  )
}

export default Recommend
