import { QueryClient } from '@tanstack/react-query'
import {
  activityHistoryResponse,
  ActivityReview,
  ActivityReviewResponse,
  ActivityWeatherInfo,
  ActivityWeatherResponse,
} from './model'
import { APIBuilder } from '@/api/lib/fetcher'
import { act } from 'react'

export const ActivityService = {
  async activityInfo(client: QueryClient, dto: ActivityWeatherInfo) {
    return (
      APIBuilder.post(`/clothes`)
        .withCredentials(client)
        .build()
        .call<ActivityWeatherResponse>({ body: JSON.stringify(dto) })
    )
  },
  async activityHistory(client: QueryClient) {
    return (
      APIBuilder.get(`/clothes`)
        .withCredentials(client)
        .build()
        .call<activityHistoryResponse>()
    )
  },
  async activityReview(client: QueryClient, dto: ActivityReview) {
    return (
      APIBuilder.post(`/clothes/review`)
        .withCredentials(client)
        .build()
        .call<ActivityReviewResponse>({ body: JSON.stringify(dto) })
    )
  },
}
