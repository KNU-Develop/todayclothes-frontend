'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

export default function Home() {
  const token = useSelector((state: RootState) => state.login.accessToken)
  const router = useRouter()

  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  return <main>{token ? <p>홈 페이지 내용</p> : null}</main>
}
