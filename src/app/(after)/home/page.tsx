'use client'

import { HomeAvatar } from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import { TodayWeatherInfo } from '@/components/Info/Weather'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const background = useSelector((state: RootState) => state.currentTemp)

  return (
    <div
      className={`flex flex-col gap-[2em] px-[2em] py-[2em] bg-${background}`}
    >
      <Header />
      <TodayWeatherInfo />
      <HomeAvatar />
      {/* <NavigationBar variant={'rose'} /> */}
    </div>
  )
}

export default HomePage
