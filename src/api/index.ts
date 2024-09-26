//model, quries, service 추가

//Weather
export type { coordinate, WeatherResponse } from './services/weather/model'
export { useTodayWeatherQuery } from './services/weather/quries'

//Recommend
export { ActivityType, ActivityStyle } from './services/recommend/model'
export { useActivityQuery } from './services/recommend/quries'
