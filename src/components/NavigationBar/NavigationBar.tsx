import { History, Plus, RotateCw, User } from 'lucide-react'
import { variants } from './style'

type Color = 'zinc' | 'rose' | 'amber' | 'lime' | 'emerald' | 'blue' | 'violet'

const NavigationBar = ({ color }: { color: Color }) => {
  const handleHistoryClick = () => {
    // History 클릭 시 동작
  }

  const handlePlusClick = () => {
    // Plus 클릭 시 동작
  }

  const handleUserClick = () => {
    // User 클릭 시 동작
  }

  const handleRotateClick = () => {
    // Rotate 클릭 시 동작
  }

  return (
    <div
      className={`flex h-[72px] w-[528px] items-center justify-between rounded-[40px] px-14 py-2 shadow-base ${variants[color].bg}`}
    >
      <History
        size={40}
        className={`cursor-pointer ${variants[color].text}`}
        onClick={handleHistoryClick}
      />
      {color === 'zinc' ? (
        <RotateCw
          size={40}
          className="cursor-pointer text-zinc-600"
          onClick={handleRotateClick}
        />
      ) : (
        <Plus
          size={56}
          className={`cursor-pointer ${variants[color].text}`}
          onClick={handlePlusClick}
        />
      )}
      <User
        size={40}
        className={`cursor-pointer ${variants[color].text} ${variants[color].fill}`}
        onClick={handleUserClick}
      />
    </div>
  )
}

export default NavigationBar
