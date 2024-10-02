'use client'

import { coordinate, WeatherResponse } from '@/api/services/weather/model'
import { useTodayWeatherQuery } from '@/api/services/weather/quries'
import { HomeAvatar, LoadingAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { TodayWeatherInfo, WeatherSave } from '@/components/Info/Weather'
import LocationRequired from '@/components/LocationRequired/LocationRequried'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import PlansModal from '@/components/PlansModal/PlansModal'
import { useModal } from '@/hooks/useModal/useModal'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const { isVisible, openModal, closeModal } = useModal()
  const [geolocation, setGeolocation] = useState<coordinate | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [navigatorError, setNavigatorError] = useState<boolean>(false)
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          setNavigatorError(true)
        },
      )
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

  if (navigatorError) {
    return (
      <div
        className={`flex min-h-screen flex-col gap-[1vh] bg-rose-100 p-[2vw]`}
      >
        <Header />
        <LocationRequired />
        <HomeAvatar />
        <NavigationBar color="so_hot" openModal={openModal} />
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-screen flex-col p-[2vw] bg-${!loading ? background : 'white'}`}
    >
      {!loading && background ? (
        <div className="flex flex-col gap-9">
          <Header />
          <TodayWeatherInfo todayWeather={todayWeather as WeatherResponse} />
          <HomeAvatar />
          <NavigationBar color={background} openModal={openModal} />
          {isVisible && (
            <PlansModal isVisible={isVisible} closeModal={closeModal} />
          )}
        </div>
      ) : (
        <div>
          <LoadingAvatar />
        </div>
      )}
    </div>
  )
}

export default HomePage
