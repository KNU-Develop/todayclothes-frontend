'use client'

import Header from '@/components/Header/Header'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const Login = () => {
  const language = useSelector((state: RootState) => state.language)

  const textContent =
    language === 'ko'
      ? {
          welcome:
            '고민 없이 하루를 시작하는\n가장 편하고 빠른 방법,\n오늘의 옷장에 오신 걸 환영합니다.',
          signupPrompt: '5초 가입으로 하루를 가장 빠르게 시작해보세요',
          google: '구글로 시작하기',
          kakao: '카카오로 시작하기',
        }
      : {
          welcome:
            "Welcome to Today's Closet,\n\nThe easiest way to start your day\nwithout any hesitation",
          signupPrompt:
            'Sign up in just 5 seconds and get your day off to a quick start!',
          google: 'Start with Google',
          kakao: 'Start with Kakao',
        }

  return (
    <div className="flex h-screen w-[600px] flex-col items-start justify-center gap-[314px] bg-gray-100 px-9 py-36">
      <div className="flex w-[528px] flex-col gap-4 py-8">
        <p className="font-notosanko text-[28px] font-bold">
          {textContent.welcome.split('\n').map((text, index) => (
            <span key={index}>
              {text}
              <br />
            </span>
          ))}
        </p>
        <p className="font-notosanko text-[18px] font-medium">
          {textContent.signupPrompt}
        </p>
      </div>
      <div className="flex w-[528px] flex-col gap-6 rounded-sm px-6 py-12">
        <button className="flex items-center justify-between bg-white px-4 py-[10px] hover:bg-slate-50">
          <img src="/icon/google.svg" alt="google" width="24" height="24" />
          <p className="flex-1 font-notosanko text-[12px] font-medium">
            {textContent.google}
          </p>
        </button>
        <button className="flex items-center bg-yellow-300 px-4 py-[10px] hover:bg-yellow-200">
          <img src="/icon/kakao.svg" alt="kakao" width="24" height="24" />
          <p className="flex-1 font-notosanko text-[12px] font-medium">
            {textContent.kakao}
          </p>
        </button>
      </div>
    </div>
  )
}

export default Login
