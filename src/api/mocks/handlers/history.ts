import { http, HttpResponse } from 'msw'

const history = [
  {
    clothesId: '7e5db0d0-8fcd-4b11-9d61-1c7b1d02a5c6',
    imgPath: '/image/history/one.png',
    location: 'Seoul',
    review: {
      feedback: null,
    },
    wind: 15.67,
    rain: 0.8,
    humidity: 65,
    feelsLike: 22,
    temp: 24,
  },
  {
    clothesId: 'be48d1c4-f218-41b9-80b3-fd9a2e85a5d7',
    imgPath: '/image/history/two.png',
    location: 'Young-In',
    review: {
      feedback: 'Too-Hot',
    },
    wind: 8,
    rain: 0.5,
    humidity: 20,
    feelsLike: 20,
    temp: 25,
  },
  {
    clothesId: '7e5db0d0-8fcd-4b11-9d61-1c7b1d02a5c6',
    imgPath: '/image/history/one.png',
    location: 'Alaska',
    review: {
      feedback: 'Too-cold',
    },
    wind: 28,
    rain: 90,
    humidity: 97,
    feelsLike: -8,
    temp: -10,
  },
]

export const HistoryHandler = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, () => {
    return HttpResponse.json({
      code: 200,
      message: 'SUCCESS',
      result: history,
    })
  }),
  http.post<{ clothesId: string; feedback: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/clothes/review`,
    async (req) => {
      const { clothesId, feedback } = req.params

      console.log(clothesId, feedback)

      const itemIndex = history.findIndex((idx) => idx.clothesId === clothesId)

      if (itemIndex !== -1) {
        history[itemIndex].review.feedback = feedback

        return HttpResponse.json({
          code: 200,
          message: 'SUCCESS',
          result: history[itemIndex],
        })
      } else {
        return HttpResponse.json({
          code: 404,
          message: 'Fail',
          result: null,
        })
      }
    },
  ),
]
