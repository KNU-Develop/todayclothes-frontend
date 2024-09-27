import { DefaultResponse } from '@/api/services/recommend/model'
import { http, HttpResponse } from 'msw'

export const recommendHandlers = [
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, () => {
    return HttpResponse.json<DefaultResponse>({
      code: 'SUCCESS'
    })
  }),
]
