import { useEffect, useState } from "react"

export type Photo = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: Photo[] }

export function usePhotos() {
  const [state, setState] = useState<State>({ status: "loading" })

  useEffect(() => {
    let cancelled = false

    fetch("https://picsum.photos/v2/list?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Photo[]>
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Something went wrong"
          setState({ status: "error", message: msg })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
