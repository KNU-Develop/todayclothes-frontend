import {
  ActivityStyle,
  ActivityType,
  ActivityWeatherResponse,
} from '@/api/services/recommend/model'
import { http, HttpResponse } from 'msw'

export const recommendHandlers = [
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, () => {
    return HttpResponse.json<ActivityWeatherResponse>({
      code: 200,
      state: 'SUCCESS',
      result: {
        imgPath: 'https://pbs.twimg.com/media/Fdtt4qRaEAAZt_U.jpg',
        comment: '이불밖은위험해',
        type: ActivityType.Outdoor,
        style: ActivityStyle.Casual,
        wind: 30,
        rain: 0,
        humidity: 50,
        feelsLike: 22,
        temp: 24,
      },
    })
  }),
]
