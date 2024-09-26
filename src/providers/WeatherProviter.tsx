// WeatherProvider.tsx
'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

// WeatherData 타입 정의
type WeatherData = {
  location?: string
  startTime?: string
  endTime?: string
}

// WeatherContext와 Provider 생성
const WeatherContext = createContext({
  weatherData: null as WeatherData | null,
  setWeatherData: (data: WeatherData) => {},
})

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => useContext(WeatherContext)
