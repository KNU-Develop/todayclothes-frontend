'use client'

import { setLanguage } from '@/redux/slice/languageSlice'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()

  const language = useSelector((state: RootState) => state.language)

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang))
  }

  return (
    <div className="flex items-center justify-between">
      {language === 'ko' ? (
        <div className="font-jalnan text-[24px]">오늘의 옷장</div>
      ) : (
        <div className="font-jalnan text-[24px]">Today's Closet</div>
      )}

      <div className="flex gap-4">
        <button
          className="font-toss text-[32px]"
          onClick={() => handleLanguageChange('en')}
        >
          🇺🇸
        </button>
        <button
          className="font-toss text-[32px]"
          onClick={() => handleLanguageChange('ko')}
        >
          🇰🇷
        </button>
      </div>
    </div>
  )
}

export default Header
