import { http, HttpResponse } from 'msw'

export const recommendHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, () => {
    return HttpResponse.json({
      code: 200,
      state: 'SUCCESS',
      result: {
        location: '서울',
        imgPath: 'https://pbs.twimg.com/media/Fdtt4qRaEAAZt_U.jpg',
        comment: '오늘은 집 밖에 안 나가시는 걸 추천합니다!',
        type: '실외',
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
