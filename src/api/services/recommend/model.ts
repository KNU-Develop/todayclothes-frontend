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

export enum Feedback {
  Perfect = '완벽함',
  Too_Hot = '너무 더움',
  Too_Cold = '너무 추움',
}

export interface ActivityWeatherInfo {
  location: string
  startTime: string
  endTime: string
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
  message: string
  result: activityHistoryInfo[] | []
}

export interface ActivityWeatherResponse {
  code: number
  message: string
  result: {
    location: string,
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
  feedback: Feedback
}

export interface ActivityReview {
  clothesId: string
  feedback: Feedback
  imageFile?: File
}

export interface ActivityReviewResponse {
  code: number
  message: string
  result: null
}

export interface DefaultResponse {
  code: string
}
