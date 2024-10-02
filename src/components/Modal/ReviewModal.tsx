'use client'

import { RootState } from '@/redux/store'
import { Camera, ImageIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useActivityReview } from '@/api/services/recommend/quries'
import { ActivityReview } from '@/api/services/recommend/model'

const ReviewModal = ({
  clothesId,
  isVisible,
  closeModal,
}: {
  clothesId: string
  isVisible: boolean
  closeModal: () => void
}) => {
  const language = useSelector((state: RootState) => state.language)
  const activityReview = useActivityReview()

  const { handleSubmit, setValue, watch, reset } = useForm<{
    selectedFeel: string | null
    selectedFile: File | null
  }>({
    defaultValues: {
      selectedFeel: null,
      selectedFile: null,
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false) // 카메라가 켜졌는지 여부를 관리하는 상태

  // 이미지 미리보기 URL 생성
  const selectedFile = watch('selectedFile')
  const imagePreview = selectedFile ? URL.createObjectURL(selectedFile) : null

  // 파일 선택 시 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setValue('selectedFile', file) // react-hook-form의 setValue 사용
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
    if (isCameraOn) {
      stopCamera()
    }
  }

  // 카메라 열기
  const startCamera = async () => {
    setIsCameraOn(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error('Error accessing the camera:', error)
    }
  }

  // 카메라 끄기
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCameraOn(false) // 카메라 상태를 끔으로 변경
  }

  // 사진 찍기 처리
  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        )
        const imageBlob = await new Promise<Blob | null>((resolve) => {
          canvasRef.current?.toBlob(resolve, 'image/png')
        })

        if (imageBlob) {
          const photoFile = new File([imageBlob], 'photo.png', {
            type: 'image/png',
          })
          setValue('selectedFile', photoFile) // 촬영한 사진을 selectedFile에 설정
        }
      }
    }
  }

  const handleCameraClick = async () => {
    if (isCameraOn) {
      stopCamera()
    } else {
      await startCamera()
    }
  }

  const onSubmit = (data: {
    selectedFeel: string | null
    selectedFile: File | null
  }) => {
    const { selectedFeel, selectedFile } = data

    const dto: ActivityReview = {
      clothesId: clothesId,
      feedback: selectedFeel || '',
      imageFile: selectedFile || undefined,
    }

    activityReview.mutate(dto, {
      onSuccess: () => {
        console.log('Success:', dto)
        handleCloseModal()
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
    stopCamera()
  }

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex w-[410px] rounded-[8px] bg-white p-8 shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 flex-col gap-9 font-notosanko"
            >
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
                    {['Perfect', 'Too_Hot', 'Too_Cold'].map((feel) => (
                      <button
                        key={feel}
                        type="button"
                        onClick={() =>
                          setValue(
                            'selectedFeel',
                            watch('selectedFeel') === feel ? null : feel,
                          )
                        }
                        className={`flex items-center justify-center rounded-[16px] p-4 ${
                          watch('selectedFeel') === feel
                            ? 'bg-zinc-600 text-white'
                            : 'bg-zinc-100'
                        }`}
                      >
                        {language === 'ko'
                          ? feel === 'Perfect'
                            ? '완벽함'
                            : feel === 'Too_Hot'
                              ? '너무 더움'
                              : feel === 'Too_Cold'
                                ? '너무 추움'
                                : ''
                          : feel.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-zinc-400">
                    {language === 'ko'
                      ? '오늘의 옷차림을 기록으로 남겨보세요(선택)'
                      : "Photo of today's outfit(Optional)"}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Camera
                      size={24}
                      onClick={handleCameraClick}
                      className="cursor-pointer"
                    />
                    <ImageIcon
                      onClick={handleImageClick}
                      size={24}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/*사진 찍기*/}
                {isCameraOn && (
                  <>
                    <video ref={videoRef} autoPlay muted />
                    <button
                      type="button"
                      onClick={takePhoto}
                      className="rounded-2xl bg-zinc-100 p-4 hover:bg-zinc-600 hover:text-white"
                    >
                      {language === 'ko' ? '사진 찍기' : 'Take Photo'}
                    </button>
                    <canvas ref={canvasRef} className="hidden" />
                  </>
                )}
                {imagePreview && (
                  <img src={imagePreview} alt="이미지" className="w-full" />
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-[8px] bg-zinc-100 px-4 py-2"
                >
                  {language === 'ko' ? '취소' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!watch('selectedFeel')}
                  className={`flex-1 rounded-[6px] px-4 py-2 ${!watch('selectedFeel') ? 'bg-zinc-50 text-zinc-400' : 'bg-zinc-600 text-white'}`}
                >
                  {language === 'ko' ? '작성' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewModal
