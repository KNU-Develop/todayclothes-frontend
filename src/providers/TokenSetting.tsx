'use client'

import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function TokenSetting() {
  const router = useRouter()
  const access = useSelector((state: RootState) => state.login.accessToken)
  const refresh = useSelector((state: RootState) => state.login.refreshToken)

  useEffect(() => {
    if (access && refresh) {
      router.push('/home')
    } else {
      router.push('/login')
    }
  })

  console.log(access)

  return null
}
