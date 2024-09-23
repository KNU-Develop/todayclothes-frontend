'use client'

import { WeatherResponse } from '@/api/services/weather/model'
import { formatDate } from '../Date/formatDate'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useTranslate } from '@/hooks/useTranslate/useTranslate'
import { setTemp } from '@/redux/slice/CurrentTempSlice'

export const TodayWeatherInfo: React.FC<{ todayWeather: WeatherResponse }> = ({
  todayWeather,
}) => {
  const language = useSelector((state: RootState) => state.language)
  const { translatedText, translate } = useTranslate()

  // 날씨 정보 호출 후, 언어 번역
  useEffect(() => {
    if (todayWeather?.city.name && language == 'ko') {
      translate(todayWeather?.city.name, language)
    }
  }, [todayWeather?.city.name, language])
  // 하루동안의 1시간 단위의 정보를 바탕으로 최고, 최저, 강수 확률 계산
  const SliceData =
    todayWeather?.list.slice(0, 13).map((item) => ({
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      rain: item.pop,
    })) || []

  const tempMin = Math.min(...SliceData.map((t) => t.tempMin))
  const tempMax = Math.max(...SliceData.map((t) => t.tempMax))
  const rainPercent =
    SliceData.reduce((acc, cur) => acc + cur.rain, 0) / SliceData.length

  return (
    <div className="flex h-[97px] w-full content-center items-start self-stretch">
      {
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-notosanko text-weatherTitle">
              {language == 'ko' && translatedText
                ? translatedText[0]?.translations[0]?.text
                : todayWeather?.city.name}
            </h1>
            <span className="font-notosanko text-weatherSub text-weatherSubColor">
              {formatDate()}
            </span>
          </div>
          <div className="flex flex-col content-center items-end">
            <h1 className="font-notosanko text-weatherTem">
              {language == 'en' ? 'Low: ' : '최저: '} {Math.round(tempMin)}°C /{' '}
              {language == 'en' ? 'High:' : '최고: '}
              {Math.round(tempMax)}°C
            </h1>
            <p className="font-notosanko text-weatherSpan text-weatherSpanColor">
              {language == 'en' ? 'Feels Like: ' : '체감온도'}{' '}
              {Math.round(todayWeather?.list[0].main.feels_like)}°C
            </p>
            <p className="font-notosanko text-weatherSpan text-weatherSubColor">
              🌧️ {Math.round(rainPercent * 100)}% 💧{' '}
              {Math.round(todayWeather?.list[0].main.humidity)}% 💨{' '}
              {Math.round(todayWeather?.list[0].wind.speed * 3.6)}
              km/h
            </p>
          </div>
        </div>
      }
    </div>
  )
}
export const WeatherSave = (data: WeatherResponse, dispatch: any) => {
  const temp = data.list[0].main.feels_like

  if (temp >= 29) {
    dispatch(setTemp('so_hot'))
  } else if (22 <= temp && temp < 29) {
    dispatch(setTemp('hot'))
  } else if (15 <= temp && temp < 22) {
    dispatch(setTemp('fresh'))
  } else if (9 <= temp && temp < 15) {
    dispatch(setTemp('cloud'))
  } else if (1 <= temp && temp < 9) {
    dispatch(setTemp('cold'))
  } else {
    dispatch(setTemp('so_cold'))
  }
}
