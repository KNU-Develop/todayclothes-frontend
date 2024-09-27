// TestPage.tsx
'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWeatherContext } from '@/providers/WeatherProviter'

const TestPage = () => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const router = useRouter()
  const { setWeatherData } = useWeatherContext() // 컨텍스트에서 setWeatherData 가져오기

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // 입력한 lat과 lon을 coordinate로 변환하여 컨텍스트에 설정
    setWeatherData({
      location: {
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
      },
      startTime: `${startTime}Z`, // 'Z'를 붙임
      endTime: `${endTime}Z`, // 'Z'를 붙임
    })

    // /recommend로 리다이렉트
    router.push('/recommend')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Test Input Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            placeholder="Enter latitude"
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            placeholder="Enter longitude"
          />
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TestPage
