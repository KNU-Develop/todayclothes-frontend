import { QueryClient } from '@tanstack/react-query'
import {
  activityHistoryResponse,
  ActivityReview,
  ActivityReviewResponse,
  ActivityWeatherInfo,
  ActivityWeatherResponse,
} from './model'
import { APIBuilder } from '@/api/lib/fetcher'

export const ActivityService = {
  async activityInfo(
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    dto: ActivityWeatherInfo,
  ) {
    return APIBuilder.post(`/event`)
      .withCredentials(client, access, refresh, dispatch)
      .build()
      .call<ActivityWeatherResponse>({ body: JSON.stringify(dto) })
  },
  async activityHistory(
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
  ) {
    return APIBuilder.get(`/event`)
      .withCredentials(client, access, refresh, dispatch)
      .build()
      .call<activityHistoryResponse>()
  },
  async activityReview(
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    formData: FormData,
  ) {
    return APIBuilder.post(`/clothes/review`)
      .withCredentials(client, access, refresh, dispatch)
      .build()
      .call<ActivityReviewResponse>({ body: formData })
  },
}
