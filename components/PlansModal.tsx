import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useModal } from '@/hooks/useModal/useModal'

const PlansModal: React.FC = () => {
  const { isVisible, openModal, closeModal } = useModal()

  // Redux에서 언어 상태 가져오기
  const language = useSelector((state: RootState) => state.language)

  const [activityType, setActivityType] = useState<
    'Indoors' | 'Outdoors' | null
  >(null)
  const [activityStyle, setActivityStyle] = useState<string | null>(null)

  // 스타일을 영어와 한글로 나누어 정의
  const activityStyles =
    language === 'ko'
      ? [
          '비즈니스 캐주얼',
          '미니멀',
          '캐주얼',
          '스트리트',
          '스포츠',
          '아메카지',
        ]
      : ['Business Casual', 'Minimal', 'Casual', 'Street', 'Sports', 'Amekaji']

  const handleActivityTypeClick = (type: 'Indoors' | 'Outdoors') => {
    setActivityType(type)
  }

  const handleActivityStyleClick = (style: string) => {
    setActivityStyle(style)
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        {language === 'ko' ? '모달 열기' : 'Open Modal'}
      </button>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-[8px] rounded-xl bg-white p-[32px] shadow-lg">
            <h2 className="mb-[36px] text-center text-[20px] text-xl font-semibold">
              {language === 'ko'
                ? '오늘의 주요 일정을 입력해주세요.'
                : 'What are your main plans for today?'}
            </h2>

            <form className="space-y-4">
              {/* Activity Time */}
              <div>
                <label className="font-noto-sans-kr text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 시간' : 'Activity Time'}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === 'ko'
                      ? '활동 시간을 선택해주세요.'
                      : 'Please select the activity time.'
                  }
                  className="w-full rounded-[8px] bg-gray-100 px-4 py-2 text-gray-400"
                  disabled
                />
              </div>

              {/* Activity Location */}
              <div>
                <label className="font-noto-sans-kr text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 장소' : 'Activity Location'}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === 'ko'
                      ? '활동 장소를 선택해주세요.'
                      : 'Please select the activity type.'
                  }
                  className="w-full rounded-[8px] bg-gray-100 px-4 py-2 text-gray-400"
                  disabled
                />
              </div>

              {/* Activity Type */}
              <div>
                <label className="font-noto-sans-kr text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 종류' : 'Activity Type'}
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleActivityTypeClick('Indoors')}
                    className={`flex-1 rounded-[16px] px-4 py-2 ${
                      activityType === 'Indoors'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {language === 'ko' ? '실내' : 'Indoors'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActivityTypeClick('Outdoors')}
                    className={`flex-1 rounded-[16px] px-4 py-2 ${
                      activityType === 'Outdoors'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {language === 'ko' ? '실외' : 'Outdoors'}
                  </button>
                </div>
              </div>

              {/* Activity Style */}
              <div>
                <label className="font-noto-sans-kr text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 분위기' : 'Activity Style'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {activityStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleActivityStyleClick(style)}
                      className={`rounded-[16px] px-4 py-2 ${
                        activityStyle === style
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-[6px] bg-red-100 py-2 text-red-600"
                >
                  {language === 'ko' ? '취소' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-[6px] bg-red-500 py-2 text-white"
                >
                  {language === 'ko' ? '생성' : 'Generate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlansModal
