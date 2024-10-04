//model, quries, service 추가

//Weather
export type { coordinate, WeatherResponse } from './services/weather/model'
export { useTodayWeatherQuery } from './services/weather/quries'

//Recommend
export { ActivityType, ActivityStyle, Feedback } from './services/recommend/model'
export { useActivityInfo } from './services/recommend/quries'
