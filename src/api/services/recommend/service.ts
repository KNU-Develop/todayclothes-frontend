import { QueryClient } from '@tanstack/react-query'
import { ActivityWeatherResponse } from './model'
import { APIBuilder } from '@/api/lib/fetcher'

export const ActivityService = {
  async activityInfo(client: QueryClient) {
    return (
      APIBuilder.get('/clothes')
        // .withCredentials(client)
        .build()
        .call<ActivityWeatherResponse>()
    )
  },
}
