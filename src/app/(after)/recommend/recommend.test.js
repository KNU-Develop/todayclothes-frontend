const { describe } = require('node:test')
import {
  getRecommendData,
  getTimeData,
} from '@/components/Date/getRecommendData'

const mockWeatherResponse = {
  list: [
    {
      dt_txt: '2024-11-25 10:00:00',
      main: {
        temp: 18,
        feels_like: 17,
        humidity: 70,
      },
      weather: [{ id: 800 }],
      pop: 0.2,
      wind: { speed: 4 },
    },
    {
      dt_txt: '2024-11-25 11:00:00',
      main: {
        temp: 15,
        feels_like: 14,
        humidity: 80,
      },
      weather: [{ id: 802 }],
      pop: 0.5,
      wind: { speed: 6 },
    },
  ],
}
describe('getRecommendData', () => {
  it('should return correct weather data for the specified time range', () => {
    const result = getRecommendData(
      mockWeatherResponse,
      '2024-04-25T00:00:00Z',
      'EVENING',
    )

    expect(result).toEqual({
      tempCode: 802, // 마지막 날씨 코드 (NIGHT 범위에 맞는 마지막 값)
      temp: 16.5, // (18 + 15) / 2
      maxTemp: 18, // 최대 온도
      minTemp: 15, // 최소 온도
      feels_like: 15.5, // (17 + 14) / 2
      rain: 0.35, // (0.2 + 0.5) / 2
      hydrate: 75, // (70 + 80) / 2
      wind: 5, // (4 + 6) / 2
    })
  })
})

describe('getTimeData', () => {
  it('should return segmented weather data', () => {
    const result = getTimeData(mockWeatherResponse)

    expect(result.length).toBeGreaterThan(0)
    expect(result[1]).toHaveProperty('temp')
    expect(result[1]).toHaveProperty('timeOfDay')
  })
})
