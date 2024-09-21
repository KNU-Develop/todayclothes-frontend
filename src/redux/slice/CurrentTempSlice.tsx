import { createSlice } from '@reduxjs/toolkit'

const TempSlice = createSlice({
  name: 'currentTemp',
  initialState: null,
  reducers: {
    setTemp: (state, action) => action.payload,
  },
})

export const { setTemp } = TempSlice.actions
export default TempSlice.reducer
