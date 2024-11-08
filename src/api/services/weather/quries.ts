import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { coordinate, WeatherResponse } from './model'
import { WeatherService } from './service'
import { CustomQueryOptions } from '@/api/type'

export const WeatherOptions = {
  TodayWeatherInfo: (
    client: QueryClient,
    coordinate: coordinate,
    day: number,
  ) => ({
    queryKey: ['TodayWeather', coordinate, day],
    queryFn: () => WeatherService.weatherInfo(client, coordinate, day),
  }),
}
export const useTodayWeatherQuery = (
  coordinate: coordinate,
  options: CustomQueryOptions<WeatherResponse> = {},
  day: number = 24,
) => {
  const queryClient = useQueryClient()

  return useQuery<WeatherResponse>({
    ...WeatherOptions.TodayWeatherInfo(queryClient, coordinate, day),
    ...options,
  })
}
