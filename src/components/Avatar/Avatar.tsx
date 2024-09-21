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

export const HomeAvatar = () => {
  const temp = useSelector((data: RootState) => data.currentTemp)

  const getImageArray = () => {
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
    <div className="flex items-center justify-center px-[8em] py-[5em]">
      {randomImage ? (
        <Image src={randomImage} alt="Avatar" width={200} height={500} />
      ) : (
        <p>No Image</p>
      )}
    </div>
  )
}
