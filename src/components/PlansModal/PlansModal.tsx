import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm, Controller } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { useWeatherContext } from '@/providers/WeatherProviter'
import { ActivityStyle, ActivityType } from '@/api'

interface PlansModalProps {
  isVisible: boolean
  closeModal: () => void
}

interface Option {
  label: string
  value: {
    place_id: string
  }
}

interface FormValues {
  activityType: ActivityType.Indoor | ActivityType.Outdoor | null
  activityStyle: ActivityStyle | null
  startTime: Dayjs | null
  endTime: Dayjs | null
  selectedPlace: Option | null
  placeCoordinates: {
    lat: number | null
    lon: number | null
  }
}

const PlansModal: React.FC<PlansModalProps> = ({ isVisible, closeModal }) => {
  const language = useSelector((state: RootState) => state.language)
  const router = useRouter()
  const weatherData = useWeatherContext()

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<FormValues>({
      defaultValues: {
        activityType: null,
        activityStyle: null,
        startTime: null,
        endTime: null,
        selectedPlace: null,
        placeCoordinates: { lat: null, lon: null },
      },
    })

  const activityStyles =
    language === 'ko'
      ? [
          ActivityStyle.BusinessCasual,
          ActivityStyle.Minimal,
          ActivityStyle.Casual,
          ActivityStyle.Street,
          ActivityStyle.Sports,
          ActivityStyle.Amekaji,
        ]
      : ['Business Casual', 'Minimal', 'Casual', 'Street', 'Sports', 'Amekaji']

  const handlePlaceChange = async (newValue: Option | null) => {
    setValue('selectedPlace', newValue)

    const placeId = newValue?.value?.place_id
    if (placeId) {
      const results = await geocodeByPlaceId(placeId)

      if (results[0]?.geometry?.location) {
        setValue('placeCoordinates', {
          lat: results[0].geometry.location.lat(),
          lon: results[0].geometry.location.lng(),
        })
      }
    } else {
      console.error('Invalid placeId:', placeId)
    }
  }

  const handleLog = (data: FormValues) => {
    const { activityType, activityStyle, startTime, endTime, selectedPlace } =
      data

    const now = dayjs()

    if (
      !activityType ||
      !activityStyle ||
      !startTime ||
      !endTime ||
      !selectedPlace
    ) {
      toast.error(
        language === 'ko'
          ? '필수 값이 입력되지 않았습니다.'
          : 'Required fields are missing.',
      )
      return
    }

    if (startTime.isBefore(now)) {
      toast.error(
        language === 'ko'
          ? '시작 시간은 현재 시간보다 이후여야 합니다.'
          : 'Start time must be later than the current time.',
      )
      return
    }

    if (endTime.isBefore(now)) {
      toast.error(
        language === 'ko'
          ? '종료 시간은 현재 시간보다 이후여야 합니다.'
          : 'End time must be later than the current time.',
      )
      return
    }

    console.log('Form Data:', data)
    weatherData.setWeatherData({
      location: {
        lat: data.placeCoordinates.lat || 0,
        lon: data.placeCoordinates.lon || 0,
      },
      startTime: data.startTime?.format('YYYY-MM-DDTHH:mm') || '',
      endTime: data.endTime?.format('YYYY-MM-DDTHH:mm') || '',
      type: data.activityType,
      style: data.activityStyle,
    })
    router.push('/recommend')
    reset()
    closeModal()
  }

  const handleClose = () => {
    reset()
    closeModal()
  }

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[25rem] rounded-[8px] bg-white p-[32px] shadow-lg">
            <h2 className="mb-[36px] text-center text-[20px] font-semibold leading-normal tracking-[-0.1px]">
              {language === 'ko'
                ? '오늘의 주요 일정을 입력해주세요.'
                : 'What are your main plans for today?'}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(handleLog)}>
              {/* Activity Time */}
              <div className="flex flex-col gap-[4px]">
                <label className="font-notosanko text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 시간' : 'Activity Time'}
                </label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label={language === 'ko' ? '시작 시간' : 'Start Time'}
                        {...field}
                        value={field.value || null}
                        sx={{
                          backgroundColor: 'rgb(241, 241, 244)',
                          border: 'none',
                          borderRadius: '16px',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: 'none',
                            },
                            '&:hover fieldset': {
                              border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label={language === 'ko' ? '종료 시간' : 'End Time'}
                        {...field}
                        value={field.value || null}
                        sx={{
                          backgroundColor: 'rgb(241, 241, 244)',
                          border: 'none',
                          borderRadius: '16px',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: 'none',
                            },
                            '&:hover fieldset': {
                              border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>

              {/* Activity Location - Google Places Autocomplete */}
              <div>
                <label className="font-notosanko text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 장소' : 'Activity Location'}
                </label>
                <div className="max-w-full">
                  <Controller
                    name="selectedPlace"
                    control={control}
                    render={({ field }) => (
                      <GooglePlacesAutocomplete
                        selectProps={{
                          value: field.value,
                          onChange: handlePlaceChange,
                          placeholder:
                            language === 'ko'
                              ? '활동 장소를 입력하세요.'
                              : 'Enter activity location.',
                          styles: {
                            control: (provided) => ({
                              ...provided,
                              height: '3rem',
                              backgroundColor: 'rgb(241 241 244)',
                              border: '0px solid',
                              borderRadius: '8px',
                              color: '#3C4350',
                            }),
                            input: (provided) => ({
                              ...provided,
                              color: '#3C4350',
                            }),
                          },
                        }}
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Activity Type */}
              <div>
                <label className="font-notosanko text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 종류' : 'Activity Type'}
                </label>
                <Controller
                  name="activityType"
                  control={control}
                  render={({ field }) => (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => field.onChange(ActivityType.Indoor)}
                        className={`flex-1 rounded-[16px] px-4 py-2 ${
                          field.value === ActivityType.Indoor
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {language === 'ko' ? '실내' : 'Indoors'}
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange(ActivityType.Outdoor)}
                        className={`flex-1 rounded-[16px] px-4 py-2 ${
                          field.value === ActivityType.Outdoor
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {language === 'ko' ? '실외' : 'Outdoors'}
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Activity Style */}
              <div>
                <label className="font-notosanko text-[12px] font-medium leading-normal text-zinc-400">
                  {language === 'ko' ? '활동 분위기' : 'Activity Style'}
                </label>
                <Controller
                  name="activityStyle"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {activityStyles.map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => field.onChange(style)}
                          className={`h-[3rem] rounded-[8px] px-4 py-2 ${
                            field.value === style
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-[8px] bg-red-100 py-2 text-red-600"
                >
                  {language === 'ko' ? '취소' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-[8px] bg-red-500 py-2 font-notosanko text-white"
                >
                  {language === 'ko' ? '생성' : 'Generate'}
                </button>
              </div>
            </form>

            {/* Toast container for notifications */}
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  )
}

export default PlansModal
