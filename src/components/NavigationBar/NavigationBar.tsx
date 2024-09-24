import { History, Plus, RotateCw, User } from 'lucide-react'
import { variants } from './style'

type Color = 'zinc' | 'so_hot' | 'hot' | 'fresh' | 'cloud' | 'cold' | 'so_cold'

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
      className={`flex h-fit w-full items-center justify-between rounded-[40px] px-14 py-4 shadow-base ${variants[color].bg}`}
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
