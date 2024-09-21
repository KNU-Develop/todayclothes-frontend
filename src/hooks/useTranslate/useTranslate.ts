import {
  ENDPOINT,
  TRANSLATE_KEY,
  TRANSLATE_REGION,
} from '@/api/constants/header-key'
import axios from 'axios'
import Error from 'next/error'
import { useState } from 'react'

interface TranslationResponse {
  detectedLanguage: DetectedLanguage
  translations: Translation[]
}

interface DetectedLanguage {
  language: string
  score: number
}

interface Translation {
  text: string
  to: string
}

const translateText = async (text: any, toLanguage: any) => {
  const url = `${ENDPOINT}/translate?api-version=3.0&to=${toLanguage}`

  try {
    const response = await axios.post(url, [{ Text: text }], {
      headers: {
        'Ocp-Apim-Subscription-Key': TRANSLATE_KEY,
        'Ocp-Apim-Subscription-Region': TRANSLATE_REGION,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export const useTranslate = () => {
  const [translatedText, setTranslatedText] = useState<
    TranslationResponse[] | null
  >(null)
  const [error, setError] = useState<string | null>(null)

  const translate = async (text: string, toLanguage: string) => {
    setError(null)
    const result: TranslationResponse[] = await translateText(text, toLanguage)

    result[0].translations[0].text = result[0].translations[0].text.replace(
      /\(.*?\)/,
      '',
    )

    setTranslatedText(result)
  }

  return { translatedText, error, translate }
}
