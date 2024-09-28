import {
  MutationOptions,
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { ActivityService } from './service'
import { ActivityWeatherInfo, ActivityWeatherResponse } from './model'

export const activityOptions = {
  activityWeatherInfo: (client: QueryClient, dto: ActivityWeatherInfo) => ({
    mutationFn: () => ActivityService.activityInfo(client, dto),
  }),
}

export const useActivityInfo = (
  dto: ActivityWeatherInfo,
  options: MutationOptions<ActivityWeatherResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<ActivityWeatherResponse>({
    ...activityOptions.activityWeatherInfo(queryClient, dto),
    ...options,
  })
}
