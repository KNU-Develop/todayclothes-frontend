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
  activityWeatherInfo: (client: QueryClient) => ({
    mutationFn: (dto: ActivityWeatherInfo) =>
      ActivityService.activityInfo(client, dto),
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
  options: MutationOptions<
    ActivityWeatherResponse,
    Error,
    ActivityWeatherInfo
  > = {},
) => {
  const queryClient = useQueryClient()

  return useMutation<ActivityWeatherResponse, Error, ActivityWeatherInfo>({
    ...activityOptions.activityWeatherInfo(queryClient),
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
