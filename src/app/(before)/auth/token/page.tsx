'use client'

import { setAccessToken, setRefreshToken } from '@/redux/slice/Login'
import { RootState } from '@/redux/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AuthToken = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlAccessToken = searchParams.get('accessToken')
  const urlRefreshToken = searchParams.get('refreshToken')

  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.login,
  )

  useEffect(() => {
    if (urlAccessToken && urlRefreshToken) {
      // URL에서 받은 토큰을 Redux에 저장
      dispatch(setAccessToken(urlAccessToken))
      dispatch(setRefreshToken(urlRefreshToken))
    }

    if (accessToken && refreshToken) {
      router.push('/home') // 토큰이 있으면 홈으로 이동
    } else {
      router.push('/login') // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [
    accessToken,
    refreshToken,
    router,
    urlAccessToken,
    urlRefreshToken,
    dispatch,
  ])
}

export default AuthToken
