export enum ActivityType {
  Indoor = '실내',
  Outdoor = '실외',
}

export enum ActivityStyle {
  BusinessCasual = '비즈니스 캐주얼',
  Minimal = '미니멀',
  Street = '스트릿',
  Casual = '캐주얼',
  Sports = '스포츠',
  Amekaji = '아메카지',
}

export interface ActivityTime {
  start: string
  end: string
}

export interface ActivityWeatherInfo {
  location: string
  time: ActivityTime
  type: ActivityType
  style: ActivityStyle
  wind: number
  rain: number
  humidity: number
  feelsLike: number
  temp: number
}

export interface ActivityWeatherResponse {
  code: number
  state: string
  result: {
    imgPath: string
    comment: string
    type: ActivityType
    style: ActivityStyle
    wind: number
    rain: number
    humidity: number
    feelsLike: number
    temp: number
  }
}

export interface DefaultResponse {
  code: string
}
