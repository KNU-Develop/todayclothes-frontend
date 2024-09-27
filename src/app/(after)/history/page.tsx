import { server } from '@/api/mocks/worker/server'
import Header from '@/components/Header/Header'

export default async function HistoryPage() {
  const data = await ServerSide()

  return (
    <div>
      <Header />
      {data ? <p>Data fetched successfully!</p> : <p>Loading...</p>}
    </div>
  )
}
const ServerSide = async () => {
  if (typeof window === 'undefined') {
    server.listen()
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, {
      cache: 'no-store',
    })
    return response.json()
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return null
  }
}
