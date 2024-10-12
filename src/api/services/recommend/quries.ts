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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export const activityOptions = {
  activityWeatherInfo: (
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
  ) => ({
    mutationFn: (dto: ActivityWeatherInfo) =>
      ActivityService.activityInfo(client, access, refresh, dispatch, dto),
  }),
  activityWeatherHistory: (
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
  ) => ({
    queryKey: ['activityHistory'],
    queryFn: () =>
      ActivityService.activityHistory(client, access, refresh, dispatch),
  }),
  activityReview: (
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
  ) => ({
    mutationFn: (dto: ActivityReview) =>
      ActivityService.activityReview(client, access, refresh, dispatch, dto),
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

  const access = useSelector((state: RootState) => state.login.accessToken)
  const refresh = useSelector((state: RootState) => state.login.refreshToken)
  const dispatch = useDispatch()

  return useMutation<ActivityWeatherResponse, Error, ActivityWeatherInfo>({
    ...activityOptions.activityWeatherInfo(
      queryClient,
      access,
      refresh,
      dispatch,
    ),
    ...options,
  })
}
export const useActivityHistory = (
  options: QueryOptions<activityHistoryResponse> = {},
) => {
  const queryClient = useQueryClient()

  const access = useSelector((state: RootState) => state.login.accessToken)
  const refresh = useSelector((state: RootState) => state.login.refreshToken)
  const dispatch = useDispatch()

  return useQuery<activityHistoryResponse>({
    ...activityOptions.activityWeatherHistory(
      queryClient,
      access,
      refresh,
      dispatch,
    ),
    ...options,
  })
}
export const useActivityReview = (
  options: MutationOptions<ActivityReviewResponse, Error, ActivityReview> = {},
) => {
  const queryClient = useQueryClient()

  const access = useSelector((state: RootState) => state.login.accessToken)
  const refresh = useSelector((state: RootState) => state.login.refreshToken)
  const dispatch = useDispatch()

  return useMutation<ActivityReviewResponse, Error, ActivityReview>({
    ...activityOptions.activityReview(queryClient, access, refresh, dispatch),
    ...options,
  })
}
