'use client'

import { useModal } from '@/hooks/useModal/useModal'
import { RootState } from '@/redux/store'
import { Camera, Image } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const ReviewModal = () => {
  const { isVisible, openModal, closeModal } = useModal()
  const language = useSelector((state: RootState) => state.language)

  // 토글 상태를 관리하기 위한 useState 선언
  const [selectedFeel, setSelectedFeel] = useState<string | null>(null)

  // 버튼 클릭 시 상태 변경
  const handleSelectFeel = (feel: string) => {
    setSelectedFeel(feel === selectedFeel ? null : feel) // 동일한 버튼 클릭 시 토글 처리
  }

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = () => {
    setSelectedFeel(null) // 선택한 상태 초기화
    closeModal() // 모달 닫기
  }

  return (
    <>
      <button
        onClick={openModal}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        {language === 'ko' ? '모달 열기' : 'Open Modal'}
      </button>
      {isVisible && (
        <div className="flex w-[410px] rounded-[8px] p-8 shadow-lg">
          <div className="flex flex-1 flex-col gap-9 font-notosanko">
            <p className="text-center text-[20px] font-semibold">
              {language === 'ko'
                ? '오늘의 옷차림은 어떠셨나요?'
                : 'How did your outfit feel?'}
            </p>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-medium text-zinc-400">
                  {language === 'ko' ? '옷차림 평가하기' : 'Outfit Feels'}
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleSelectFeel('perfect')}
                    className={`flex items-center justify-center rounded-[16px] p-4 ${selectedFeel === 'perfect' ? 'bg-zinc-600 text-white' : 'bg-zinc-100'}`}
                  >
                    {language === 'ko' ? '완벽함' : 'Perfect'}
                  </button>
                  <button
                    onClick={() => handleSelectFeel('too_hot')}
                    className={`flex items-center justify-center rounded-[16px] p-4 ${selectedFeel === 'too_hot' ? 'bg-zinc-600 text-white' : 'bg-zinc-100'}`}
                  >
                    {language === 'ko' ? '너무 더움' : 'Too Hot'}
                  </button>
                  <button
                    onClick={() => handleSelectFeel('too_cold')}
                    className={`flex items-center justify-center rounded-[16px] p-4 ${selectedFeel === 'too_cold' ? 'bg-zinc-600 text-white' : 'bg-zinc-100'}`}
                  >
                    {language === 'ko' ? '너무 추움' : 'Too Cold'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-zinc-400">
                {language === 'ko'
                  ? '오늘의 옷차림을 기록으로 남겨보세요(선택)'
                  : "Photo of today's outfit(Optional)"}
              </span>
              <div className="flex gap-2">
                <Camera size={24} />
                <Image size={24} />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 rounded-[6px] bg-zinc-100 px-4 py-2"
              >
                {language === 'ko' ? '취소' : 'Cancel'}
              </button>
              <button
                type="submit"
                onClick={handleCloseModal}
                className="flex-1 rounded-[6px] bg-zinc-600 px-4 py-2 text-white"
              >
                {language === 'ko' ? '작성' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewModal
