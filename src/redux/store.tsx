'use client'

import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/Login'
import languageReducer from './slice/languageSlice'
import TempReducer from './slice/CurrentTempSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    language: languageReducer,
    currentTemp: TempReducer,
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
