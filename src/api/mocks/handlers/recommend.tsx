import { http, HttpResponse } from 'msw'

export const recommendHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      result: {
        location: '서울',
        imgPath: 'https://pbs.twimg.com/media/Fdtt4qRaEAAZt_U.jpg',
        comment: '오늘은 집 밖에 안 나가시는 걸 추천합니다!',
        time: {
          start: '2024-09-27T00:00Z',
          end: '2024-09-27T00:00Z',
        },
        type: '야외',
        style: '아메카지',
        wind: '',
        rain: '',
        humidty: '',
        feelsLike: '',
        temp: '',
      },
    })
  }),
]
