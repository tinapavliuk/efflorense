import { useEffect, useState } from 'react'

export function useFetchFlowers() {
  const [flowers, setFlowers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3000/flowers')
        if (!res.ok) throw new Error('Failed to fetch flowers')
        const data = await res.json()
        setFlowers(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { flowers, loading, error }
}
