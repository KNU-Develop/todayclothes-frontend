'use client'

import { useActivityHistory } from '@/api/services/recommend/quries'
import { LoadingAvatar } from '@/components/Avatar/Avatar'
import { HistoryCard } from '@/components/Card/Card'
import Header from '@/components/Header/Header'

export default function HistoryPage() {
  const history = useActivityHistory({ refetchOnMount: true }).data?.result

  return (
    <div className="flex min-h-screen min-w-[600px] flex-col gap-9 overflow-y-scroll bg-white p-9 scrollbar-hide">
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
