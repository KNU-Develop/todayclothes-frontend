import './globals.css'
import type { Metadata } from 'next'
import { MSWComponent } from '@/api/MSWComponent'
import { cn } from '@/lib/utils'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ReduxProvider from '@/providers/ReduxProvider'
import { WeatherProvider } from '@/providers/WeatherProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-zinc-50 antialiased')}>
        {process.env.NEXT_PUBLIC_MSW === 'enable' ? (
          <MSWComponent>
            <ReactQueryProvider>
              <ReduxProvider>
                <WeatherProvider>
                  <div className="container">{children}</div>
                </WeatherProvider>
              </ReduxProvider>
            </ReactQueryProvider>
          </MSWComponent>
        ) : (
          <ReactQueryProvider>
            <ReduxProvider>
              <WeatherProvider>
                <div className="container">{children}</div>
              </WeatherProvider>
            </ReduxProvider>
          </ReactQueryProvider>
        )}
      </body>
    </html>
  )
}
