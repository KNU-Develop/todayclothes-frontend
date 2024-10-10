'use client'

import { setAccessToken } from '@/redux/slice/Login'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

const AuthToken = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { accessToken } = useSelector((state: RootState) => state.login)

  // const fetchNewAccessToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
  //       {
  //         withCredentials: true, // Refresh Token은 HttpOnly Cookie로 전송
  //       },
  //     )
  //     console.log(response)

  //     const authHeader = response.headers['Authorization'] // 헤더에서 Access Token 추출
  //     const newAccessToken = authHeader?.split(' ')[1] // 'Bearer <token>'에서 <token>만 추출

  //     if (newAccessToken) {
  //       dispatch(setAccessToken(newAccessToken)) // 새로운 Access Token을 Redux에 저장
  //     } else {
  //       throw new Error('No access token in response')
  //     }
  //   } catch (error) {
  //     console.error('Failed to refresh token:', error)
  //     router.push('/login') // 실패 시 로그인 페이지로 이동
  //   }
  // }

  useEffect(() => {
    console.log('Current accessToken:', accessToken) // accessToken 확인
    
    if (accessToken != null) {
      // Access Token이 Redux에 존재하면 홈으로 이동
      router.push('/home')
    } else {
      // Access Token이 없으면 Refresh Token으로 새로운 Access Token 요청
      // fetchNewAccessToken()
    }
  }, [accessToken, dispatch, router])

  return null
}

export default AuthToken
