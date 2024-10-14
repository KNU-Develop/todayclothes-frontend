export enum ActivityType {
  Indoor = 'INDOORS',
  Outdoor = 'OUTDOORS',
}

export enum ActivityStyle {
  BusinessCasual = 'BUSINESS_CASUAL',
  Minimal = 'MINIMAL',
  Street = 'STREET',
  Casual = 'CASUAL',
  Sports = 'SPORTS',
  Amekaji = 'AMEKAJI',
}

export enum Feedback {
  Perfect = 'PERFECT',
  Too_Hot = 'HOT',
  Too_Cold = 'COLD',
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
