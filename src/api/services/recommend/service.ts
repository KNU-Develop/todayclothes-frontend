import { QueryClient } from '@tanstack/react-query'
import {
  activityHistoryResponse,
  ActivityReview,
  ActivityReviewResponse,
  ActivityWeatherInfo,
  ActivityWeatherResponse,
} from './model'
import { APIBuilder } from '@/api/lib/fetcher'
import { act, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export const ActivityService = {
  async activityInfo(
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    dto: ActivityWeatherInfo,
  ) {
    return APIBuilder.post(`/clothes`)
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
    console.log(access, refresh)

    return APIBuilder.get(`/clothes`)
      .withCredentials(client, access, refresh, dispatch)
      .build()
      .call<activityHistoryResponse>()
  },
  async activityReview(
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    dto: ActivityReview,
  ) {
    return APIBuilder.post(`/clothes/review`)
      .withCredentials(client, access, refresh, dispatch)
      .build()
      .call<ActivityReviewResponse>({ body: JSON.stringify(dto) })
  },
}
