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
import { useWeatherContext } from '@/providers/WeatherProviter'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Recommend = () => {
  const [geolocation, setGeolocation] = useState<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
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

  // 현재 브라우저 좌표 탐색
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      })
    }
  }, [geolocation == null])

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
            startTime={weatherData?.startTime || '2024-09-27T00:00Z'}
            endTime={weatherData?.endTime || '2024-09-27T12:00Z'}
            type={activity?.result.type || ActivityType.Indoor}
            style={activity?.result.style || ActivityStyle.BusinessCasual}
          />
          <img src={activity?.result.imgPath} alt="이미지" />
          <p className="text-[20px] font-semibold text-gray-500">
            {activity?.result.comment}
          </p>
          <NavigationBar color="zinc" />
          {/* weatherData 출력
          {weatherData && (
            <div>
              <h2>Weather Data:</h2>
              <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            </div>
          )} */}
        </>
      ) : (
        <LoadingAvatar />
      )}
    </div>
  )
}

export default Recommend
