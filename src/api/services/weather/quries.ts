import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { coordinate, WeatherResponse } from './model'
import { WeatherService } from './service'
import { CustomQueryOptions } from '@/api/type'

export const WeatherOptions = {
  TodayWeatherInfo: (client: QueryClient, coordinate: coordinate) => ({
    queryKey: ['TodayWeather', coordinate],
    queryFn: () => WeatherService.weatherInfo(client, coordinate),
  }),
}
export const useTodayWeatherQuery = (
  coordinate: coordinate,
  options: CustomQueryOptions<WeatherResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<WeatherResponse>({
    ...WeatherOptions.TodayWeatherInfo(queryClient, coordinate),
    ...options,
  })
}
