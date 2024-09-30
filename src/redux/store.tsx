'use client'

import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/Login'
import languageReducer from './slice/languageSlice'
import TempReducer from './slice/CurrentTempSlice'
import activityWeatherReducer from './slice/activityWeatherSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    language: languageReducer,
    currentTemp: TempReducer,
    activityWeather: activityWeatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['**'],
        ignoredPaths: ['register'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
