import {
  MutationOptions,
  QueryClient,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { ActivityService } from './service'
import {
  activityHistoryResponse,
  ActivityReview,
  ActivityReviewResponse,
  ActivityWeatherInfo,
  ActivityWeatherResponse,
} from './model'

export const activityOptions = {
  activityWeatherInfo: (client: QueryClient, dto: ActivityWeatherInfo) => ({
    mutationFn: () => ActivityService.activityInfo(client, dto),
  }),
  activityWeatherHistory: (client: QueryClient) => ({
    queryKey: ['activityHistory'],
    queryFn: () => ActivityService.activityHistory(client),
  }),
  activityReview: (client: QueryClient) => ({
    mutationFn: (dto: ActivityReview) =>
      ActivityService.activityReview(client, dto),
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
export const useActivityHistory = (
  options: QueryOptions<activityHistoryResponse> = {},
) => {
  const queryClient = useQueryClient()

  return useQuery<activityHistoryResponse>({
    ...activityOptions.activityWeatherHistory(queryClient),
    ...options,
  })
}
export const useActivityReview = (
  options: MutationOptions<ActivityReviewResponse, Error, ActivityReview> = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<ActivityReviewResponse, Error, ActivityReview>({
    ...activityOptions.activityReview(queryClient),
    ...options,
  })
}
