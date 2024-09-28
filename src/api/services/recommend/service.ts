import { QueryClient } from '@tanstack/react-query'
import { ActivityWeatherInfo, ActivityWeatherResponse } from './model'
import { APIBuilder } from '@/api/lib/fetcher'

export const ActivityService = {
  async activityInfo(client: QueryClient, dto: ActivityWeatherInfo) {
    return (
      APIBuilder.post('/clothes')
        // .withCredentials(client)
        .build()
        .call<ActivityWeatherResponse>({body: JSON.stringify(dto)})
    )
  },
}
