// 날씨

type Language = 'en' | 'ko'

export const getWeatherDescription = (
  conditionId: number,
  language: Language,
) => {
  const weatherConditions = [
    { range: [200, 232], ko: '천둥번개', en: 'Thunderstorm', emoji: '⛈️' },
    { range: [300, 321], ko: '이슬비', en: 'Drizzle', emoji: '🌧️' },
    { range: [500, 504], ko: '비', en: 'Rain', emoji: '🌧️' },
    { range: [511, 511], ko: '얼어붙은 비', en: 'Freezing Rain', emoji: '🌧️' },
    { range: [520, 531], ko: '소나기', en: 'Shower Rain', emoji: '🌦️' },
    { range: [600, 622], ko: '눈', en: 'Snow', emoji: '☃️' },
    { range: [701, 781], ko: '안개', en: 'Fog', emoji: '🌫️' },
    { range: [800, 800], ko: '맑음', en: 'Clear', emoji: '☀️' },
    { range: [801, 803], ko: '구름 많음', en: 'Cloudy', emoji: '🌥️' },
    { range: [804, 804], ko: '흐림', en: 'Overcast', emoji: '☁️' },
  ]

  const condition = weatherConditions.find(
    ({ range }) => conditionId >= range[0] && conditionId <= range[1],
  )

  return condition
    ? {
        description: language === 'ko' ? condition.ko : condition.en,
        emoji: condition.emoji,
      }
    : { description: '', emoji: '' }
}
