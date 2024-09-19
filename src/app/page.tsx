'use client'

import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Home() {
  const token = useSelector((state: RootState) => state.login.accessToken)
  console.log(token)

  return <main></main>
}
