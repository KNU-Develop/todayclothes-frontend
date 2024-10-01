import { History, Plus, RotateCw, User } from 'lucide-react'
import { variants } from './style'
import { useRouter } from 'next/navigation'

type Color = 'zinc' | 'so_hot' | 'hot' | 'fresh' | 'cloud' | 'cold' | 'so_cold'

interface NavigationBarProps {
  color: Color
  openModal: () => void // Ensure this prop is defined
}

const NavigationBar: React.FC<NavigationBarProps> = ({ color, openModal }) => {
  const router = useRouter()

  const handleHistoryClick = () => {
    router.push('/history')
  }

  const handlePlusClick = () => {
    openModal()
  }

  const handleUserClick = () => {
    // User 클릭 시 동작
  }

  const handleRotateClick = () => {}

  return (
    <div
      className={`flex h-fit w-full items-center justify-between rounded-[40px] px-14 py-2 shadow-base ${variants[color].bg}`}
    >
      <History
        size={'2.5em'}
        className={`cursor-pointer ${variants[color].text}`}
        onClick={handleHistoryClick}
      />
      {color === 'zinc' ? (
        <RotateCw
          size={'2.5em'}
          className="cursor-pointer text-zinc-600"
          onClick={handleRotateClick}
        />
      ) : (
        <Plus
          size={'3em'}
          className={`cursor-pointer ${variants[color].text}`}
          onClick={handlePlusClick}
        />
      )}
      <User
        size={'2.5em'}
        className={`cursor-pointer ${variants[color].text} ${variants[color].fill}`}
        onClick={handleUserClick}
      />
    </div>
  )
}

export default NavigationBar
