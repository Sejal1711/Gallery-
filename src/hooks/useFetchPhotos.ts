import { useEffect, useState } from "react"

export type Photo = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

type FetchState = {
  photos: Photo[]
  loading: boolean
  error: string | null
}

export function useFetchPhotos(): FetchState {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetch("https://picsum.photos/v2/list?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Photo[]>
      })
      .then((data) => {
        if (!cancelled) {
          setPhotos(data)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong")
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading, error }
}
