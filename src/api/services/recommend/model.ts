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
  weather: number
  wind: number
  rain: number
  humidity: number
  feelsLike: number
  temp: number
}

export interface activityHistoryInfo {
  clothesId: string
  imgPath: string
  location: string
  type: ActivityType
  style: ActivityStyle
  review: WeatherReview
  weather: number
  wind: number
  rain: number
  humidity: number
  feelsLike: number
  temp: number
}

export interface activityHistoryResponse {
  code: number
  state: string
  result: activityHistoryInfo[] | []
}

export interface ActivityWeatherResponse {
  code: number
  state: string
  result: {
    imgPath: string
    comment: string
    type: ActivityType
    style: ActivityStyle
    weather: number
    wind: number
    rain: number
    humidity: number
    feelsLike: number
    temp: number
  }
}

export interface WeatherReview {
  feedback: string
}

export interface ActivityReview {
  clothesId: string
  feedback: string
  imageFile?: File
}

export interface ActivityReviewResponse {
  code: number
  state: string
  result: null
}

export interface DefaultResponse {
  code: string
}
