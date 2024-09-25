'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlansModal from '../../../../components/PlansModal'
import { RootState } from '@/redux/store'
import { setLanguage } from '@/redux/slice/languageSlice'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const page = () => {
  const language = useSelector((state: RootState) => state.language)

  const dispatch = useDispatch()

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage))
  }
  return (
    <div>
      <h1>Current Language: {language}</h1>
      <button onClick={() => handleLanguageChange('en')}>Set English</button>
      <button onClick={() => handleLanguageChange('ko')}>Set Korean</button>
      {/* PlansModal 사용 */}
      <PlansModal />
    </div>
  )
}

export default page
