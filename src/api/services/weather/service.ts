import { QueryClient } from '@tanstack/react-query'
import { coordinate, WeatherResponse } from './model'
import { WEATHER_API_KEY } from '@/api/constants/header-key'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export const WeatherService = {
  async weatherInfo(
    client: QueryClient,
    coordinate: coordinate,
  ): Promise<WeatherResponse> {
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=48`

    try {
      const response = await axios.get<WeatherResponse>(url)
      const weatherData = response.data

      return weatherData
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error)
      throw error
    }
  },
}
