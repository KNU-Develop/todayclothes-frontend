'use client'

import { coordinate, WeatherResponse } from '@/api/services/weather/model'
import { useTodayWeatherQuery } from '@/api/services/weather/quries'
import { HomeAvatar, LoadingAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { TodayWeatherInfo, WeatherSave } from '@/components/Info/Weather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const [geolocation, setGeolocation] = useState<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const background = useSelector((state: RootState) => state.currentTemp)
  const dispatch = useDispatch()

  const { data: todayWeather, isFetching } = useTodayWeatherQuery(
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
          // lat: position.coords.latitude,
          // lon: position.coords.longitude,

          // 베이징 좌표
          // lat: 39.9035,
          // lon: 116.388,

          // 워싱턴 좌표
          lat: 38.895,
          lon: -77.015,
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
    <div
      className={`flex min-h-screen flex-col gap-[2vh] p-[2vw] bg-${!loading ? background : 'white'}`}
    >
      {!loading && background ? (
        <>
          <Header />
          <TodayWeatherInfo todayWeather={todayWeather as WeatherResponse} />
          <HomeAvatar />
          <NavigationBar color={background} />
        </>
      ) : (
        <>
          <LoadingAvatar />
        </>
      )}
    </div>
  )
}

export default HomePage
