import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useModal } from '@/hooks/useModal/useModal'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'

interface Option {
  label: string
  value: string
}

const PlansModal: React.FC = () => {
  const { isVisible, openModal, closeModal } = useModal()

  // Redux에서 언어 상태 가져오기
  const language = useSelector((state: RootState) => state.language)

  const [activityType, setActivityType] = useState<
    'Indoors' | 'Outdoors' | null
  >(null)
  const [activityStyle, setActivityStyle] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [isTimePickerOpen, setTimePickerOpen] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<Option | null>(null)
  const [placeCoordinates, setPlaceCoordinates] = useState<{
    lat: number | null
    lng: number | null
  }>({ lat: null, lng: null })

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

  const handleTimeInputClick = () => {
    setTimePickerOpen(!isTimePickerOpen)
  }

  const handleTimeConfirm = () => {
    setTimePickerOpen(false)
  }

  const handleTimeCancel = () => {
    setStartTime(null)
    setEndTime(null)
    setTimePickerOpen(false)
  }

  const handlePlaceChange = async (newValue: any) => {
    setSelectedPlace(newValue)

    if (newValue?.value?.place_id) {
      const results = await geocodeByPlaceId(newValue.value.place_id)

      if (results[0]?.geometry?.location) {
        setPlaceCoordinates({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
      }
    }
  }

  const handleLog = () => {
    console.log('Start Time:', startTime)
    console.log('End Time:', endTime)
    console.log('Selected Place:', selectedPlace)
    console.log('Place Coordinates:', placeCoordinates)
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
                  className="w-full cursor-pointer rounded-[8px] bg-gray-100 px-4 py-2 text-gray-400"
                  onClick={handleTimeInputClick}
                  value={
                    startTime && endTime
                      ? `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`
                      : ''
                  }
                  readOnly
                />
                {isTimePickerOpen && (
                  <div className="absolute left-1/2 z-10 mt-2 flex max-w-[300px] -translate-x-1/2 rounded-[8px] bg-white shadow-lg">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="mb-2 flex flex-col gap-[10px] p-2">
                        <TimePicker
                          label={language === 'ko' ? '시작 시간' : 'Start Time'}
                          value={startTime}
                          onChange={(newValue) => setStartTime(newValue)}
                        />
                        <TimePicker
                          label={language === 'ko' ? '종료 시간' : 'End Time'}
                          value={endTime}
                          onChange={(newValue) => setEndTime(newValue)}
                        />
                        <div className="mx-2 mt-2 flex justify-around">
                          <button
                            type="button"
                            onClick={handleTimeCancel}
                            className="w-2/5 rounded-[8px] bg-red-100 text-red-600"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={handleTimeConfirm}
                            className="h-[30px] w-2/5 rounded-[8px] bg-red-500 text-white"
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    </LocalizationProvider>
                  </div>
                )}
              </div>

              {/* Activity Location - Google Places Autocomplete */}
              <div>
                <label className="font-noto-sans-kr text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 장소' : 'Activity Location'}
                </label>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value: selectedPlace,
                    onChange: handlePlaceChange,
                    placeholder:
                      language === 'ko'
                        ? '활동 장소를 입력하세요.'
                        : 'Enter activity location.',
                  }}
                  apiKey="AIzaSyDwc2OTKdRIff0dY0eB640xRV_6DGTUcWY"
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
                  type="button"
                  className="flex-1 rounded-[6px] bg-red-500 py-2 text-white"
                  onClick={handleLog}
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
