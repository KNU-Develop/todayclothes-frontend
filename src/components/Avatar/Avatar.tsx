'use client'

import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

import {
  freshImage,
  coldImage,
  so_coldImage,
  so_hotImage,
  hotImage,
  cloudImage,
} from './AvatarImg'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { clearTimeout } from 'timers'

export const HomeAvatar = () => {
  const temp = useSelector((data: RootState) => data.currentTemp)

  const getImageArray = () => {
    if (temp == null) return so_hotImage
    switch (temp) {
      case 'fresh':
        return freshImage
      case 'cloud':
        return cloudImage
      case 'so_hot':
        return so_hotImage
      case 'hot':
        return hotImage
      case 'cold':
        return coldImage
      case 'so_cold':
        return so_coldImage
      default:
        return []
    }
  }

  const imageArray = getImageArray()

  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)]

  return (
    <div className="flex flex-shrink items-center justify-center px-[8em] py-[5em]">
      {randomImage ? (
        <Image
          src={randomImage}
          alt="Avatar"
          width={200}
          height={450}
          style={{ height: '55vh' }}
        />
      ) : (
        <p>No Image</p>
      )}
    </div>
  )
}
export const LoadingAvatar = () => {
  const language = useSelector((state: RootState) => state.language)

  const imageArray = [
    ...so_hotImage,
    ...hotImage,
    ...freshImage,
    ...cloudImage,
    ...coldImage,
    ...so_coldImage,
  ]
  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)]
  return (
    <div className="flex flex-col items-center justify-end pt-[10vh]">
      {randomImage && (
        <Image
          src={randomImage}
          alt="Avatar"
          width={200}
          height={450}
          style={{ height: '60vh' }}
        />
      )}
      <p className="text-center align-middle font-notosanko text-[24px] font-bold">
        {language === 'en' ? (
          <>
            Generating styles...
            <br />
            Please wait a moment.
          </>
        ) : (
          <>
            오늘의 옷장에서 옷을 찾고 있어요.
            <br />
            조금만 기다려주세요!
          </>
        )}
      </p>
    </div>
  )
}
