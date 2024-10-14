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
import { CustomQueryOptions } from '@/api/type'

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
    mutationFn: (formData: FormData) =>
      ActivityService.activityReview(client, access, refresh, dispatch, formData),
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
  options: CustomQueryOptions<activityHistoryResponse> = {},
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
  options: MutationOptions<ActivityReviewResponse, Error, FormData> = {},
) => {
  const queryClient = useQueryClient()

  const access = useSelector((state: RootState) => state.login.accessToken)
  const refresh = useSelector((state: RootState) => state.login.refreshToken)
  const dispatch = useDispatch()

  return useMutation<ActivityReviewResponse, Error, FormData>({
    ...activityOptions.activityReview(queryClient, access, refresh, dispatch),
    ...options,
  })
}
