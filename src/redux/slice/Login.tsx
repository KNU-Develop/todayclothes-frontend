'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from 'postcss/lib/list'

interface LoginState {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: LoginState = {
  accessToken: null,
  refreshToken: null,
}
export const Login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state) => {
      state.accessToken = null
    },
  },
})
export const { setAccessToken, setRefreshToken } = Login.actions
export default Login.reducer
