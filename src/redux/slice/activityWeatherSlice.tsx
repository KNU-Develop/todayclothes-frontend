import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ActivityWeatherState {
  wind: number
  rain: number
  humidity: number
  feelsLike: number
  temp: number
}

const initialState: ActivityWeatherState = {
  wind: 0,
  rain: 0,
  humidity: 0,
  feelsLike: 0,
  temp: 0,
}

const activityWeatherSlice = createSlice({
  name: 'activityWeather',
  initialState,
  reducers: {
    setActivityWeather: (
      state,
      action: PayloadAction<ActivityWeatherState>,
    ) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setActivityWeather } = activityWeatherSlice.actions
export default activityWeatherSlice.reducer
