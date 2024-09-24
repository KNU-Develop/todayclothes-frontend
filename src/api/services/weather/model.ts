export interface coordinate {
  lat: number
  lon: number
}
export interface WeatherResponse {
  cod: string
  message: number
  cnt: number
  list: WeatherEntry[]
  city: City
}
export interface WeatherEntry {
  dt: number
  main: MainWeather
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: Rain // Optional because rain data might not always be present
  sys: Sys
  dt_txt: string
}
export interface MainWeather {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}
export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Clouds {
  all: number
}
export interface Wind {
  speed: number
  deg: number
  gust: number
}
export interface Rain {
  '1h': number
}
export interface Sys {
  pod: string
}
export interface City {
  id: number
  name: string
  coord: coordinate
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}
