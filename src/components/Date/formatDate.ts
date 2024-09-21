import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export const formatDate = () => {
  const language = useSelector((state: RootState) => state.language)
  const today = new Date()

  if (language === 'ko') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return today.toLocaleDateString('ko-KR', options)
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return today.toLocaleDateString('en-US', options)
  }
}
