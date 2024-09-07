'use client'

import { useEffect, useState } from 'react'

export const initMsw = async () => {
  if (
    process.env.NEXT_RUNTIME !== 'nodejs' &&
    process.env.NEXT_PUBLIC_MSW === 'enable'
  ) {
    const { worker } = await import('./mocks/worker/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initMsw()
      setMswReady(true)
    }

    init()
  }, [])

  if (!mswReady) return null

  return <>{children}</>
}
