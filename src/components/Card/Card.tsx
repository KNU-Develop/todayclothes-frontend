import { activityHistoryInfo } from '@/api/services/recommend/model'
import React from 'react'
import { HistoryWeatherInfo } from '../Info/Weather'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Pencil } from 'lucide-react'
import { useActivityReview } from '@/api/services/recommend/quries'
import { useModal } from '@/hooks/useModal/useModal'
import ReviewModal from '../Modal/ReviewModal'

type Language = 'en' | 'ko'

const getReviewEmoji = (review: string) => {
  if (review === 'Perfect') {
    return '👍'
  } else if (review === 'Too Hot') {
    return '🥵'
  } else if (review === 'Too Cold') {
    return '🥶'
  } else if (review === 'Good') {
    return '😀'
  }
}

export const HistoryCard: React.FC<activityHistoryInfo> = (props) => {
  const language = useSelector((state: RootState) => state.language) as Language
  const reviewEmoji = getReviewEmoji(props.review.feedback)
  const { isVisible, openModal, closeModal } = useModal()

  const handleOnClick = () => {
    openModal()
  }

  return (
    <div className="flex flex-col gap-3">
      <HistoryWeatherInfo {...props} />
      <Image
        src={props.imgPath}
        alt="error"
        width={520}
        height={540}
        className="h-[540px] w-[520px]"
      />
      <div className="flex items-center justify-between rounded-[16px] bg-zinc-100 p-4 font-notosanko text-[16px]">
        {props.review.feedback ? (
          <span className={`${props.review.feedback ? 'text-zinc-400' : ''}`}>
            {language === 'en' ? 'Written Review' : '작성된 리뷰'}
          </span>
        ) : (
          <span>{language === 'en' ? 'Write Review' : '리뷰 작성하기'}</span>
        )}
        {props.review.feedback ? (
          <div className="flex items-center gap-2">
            <span className="font-bold">{props.review.feedback}</span>
            <span className="font-toss text-[1.5rem]">{reviewEmoji}</span>
          </div>
        ) : (
          <Pencil
            className="cursor-pointer"
            onClick={handleOnClick}
            size={20}
          />
        )}
      </div>

      {isVisible && (
        <>
          <ReviewModal
            clothesId={props.clothesId}
            isVisible={isVisible}
            closeModal={closeModal}
          />
        </>
      )}
    </div>
  )
}
