'use client'

import { server } from '@/api/mocks/worker/server'
import { useActivityHistory } from '@/api/services/recommend/quries'
import { ActivityService } from '@/api/services/recommend/service'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import { HistoryCard } from '@/components/Card/Card'
import Header from '@/components/Header/Header'
import { ActivityWeather } from '@/components/Info/ActivityWeather'
import { QueryClient } from '@tanstack/react-query'

export default function HistoryPage() {
  const history = useActivityHistory().data?.result

  return (
    <div className="scrollbar-hide flex min-h-screen min-w-[600px] flex-col gap-9 overflow-y-scroll p-9">
      {history ? (
        <>
          <Header />
          {history.map((item, idx) => (
            <HistoryCard key={idx} {...item} />
          ))}
        </>
      ) : (
        <LoadingAvatar />
      )}
    </div>
  )
}
