import { History, Plus, RotateCw, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'rose' | 'zinc'

const NavigationBar = ({ variant }: { variant: Variant }) => {
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
      className={cn(
        'flex h-[72px] items-center justify-between rounded-[40px] px-14 py-2 shadow-base',
        {
          'bg-red-500': variant === 'rose',
          'bg-zinc-200': variant !== 'rose',
        },
      )}
    >
      <History
        size={40}
        className={cn('cursor-pointer', {
          'text-rose-100': variant === 'rose',
          'text-zinc-600': variant !== 'rose',
        })}
        onClick={handleHistoryClick}
        aria-label="History"
      />
      {variant === 'rose' ? (
        <Plus
          size={56}
          className="cursor-pointer text-rose-100"
          onClick={handlePlusClick}
          aria-label="Add"
        />
      ) : (
        <RotateCw
          size={40}
          className="cursor-pointer text-zinc-600"
          onClick={handleRotateClick}
          aria-label="Rotate"
        />
      )}
      <User
        size={40}
        className={cn('cursor-pointer', {
          'fill-rose-100 text-rose-100': variant === 'rose',
          'fill-zinc-200 text-zinc-600': variant !== 'rose',
        })}
        onClick={handleUserClick}
        aria-label="User"
      />
    </div>
  )
}

export default NavigationBar
