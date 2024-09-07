'use client'

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import loginReducer from './slice/Login'

export const store = configureStore({
  reducer: {
    login: loginReducer,
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
