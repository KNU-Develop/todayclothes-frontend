import { createSlice } from '@reduxjs/toolkit'

const TempSlice = createSlice({
  name: 'currentTemp',
  initialState: 'fresh',
  reducers: {
    setTemp: (state, action) => action.payload,
  },
})

export const { setTemp } = TempSlice.actions
export default TempSlice.reducer
