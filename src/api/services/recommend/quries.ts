import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { ActivityService } from './service'
import { CustomQueryOptions } from '@/api/type'
import { ActivityWeatherResponse } from './model'

export const activityOptions = {
  activityWeatherInfo: (client: QueryClient) => ({
    queryKey: ['activity'],
    queryFn: () => ActivityService.activityInfo(client),
  }),
}

export const useActivityQuery = (
  options: CustomQueryOptions<ActivityWeatherResponse>={},
) => {
  const queryClient = useQueryClient()

  return useQuery<ActivityWeatherResponse>({
    ...activityOptions.activityWeatherInfo(queryClient),
    ...options,
  })
}
