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
  const geolocation = useRef<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const background = useSelector((state: RootState) => state.currentTemp)
  const dispatch = useDispatch()

  const todayWeather = useTodayWeatherQuery(geolocation.current as coordinate, {
    enabled: !!geolocation,
  }).data as WeatherResponse

  // 현재 브라우저 좌표 탐색
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        geolocation.current = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      })
    }
  }, [])
  // 체감 온도에 해당하는 온도 설정(so_hot, hot...)
  useEffect(() => {
    if (todayWeather) {
      WeatherSave(todayWeather, dispatch)
    }
  }, [todayWeather])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log(loading, todayWeather)
  }, [loading, todayWeather])

  return (
    <div
      className={`flex min-h-screen flex-col gap-[2vh] p-[2vw] bg-${!loading ? background : 'white'}`}
    >
      {!loading && todayWeather ? (
        <>
          <Header />
          <TodayWeatherInfo todayWeather={todayWeather} />
          <HomeAvatar />
          <NavigationBar color={'rose'} />
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
