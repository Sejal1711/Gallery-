import { useReducer } from "react"

type FavState = { ids: Set<string> }
type FavAction = { type: "TOGGLE"; id: string }

const STORAGE_KEY = "gallery_favourites"

function init(): FavState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (Array.isArray(parsed)) return { ids: new Set(parsed as string[]) }
  } catch {
    // ignore
  }
  return { ids: new Set() }
}

function reducer(state: FavState, action: FavAction): FavState {
  switch (action.type) {
    case "TOGGLE": {
      const next = new Set(state.ids)
      next.has(action.id) ? next.delete(action.id) : next.add(action.id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return { ids: next }
    }
    default:
      return state
  }
}

export function useFavourites() {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  function toggle(id: string) {
    dispatch({ type: "TOGGLE", id })
  }

  return { favourites: state.ids, toggle }
}
