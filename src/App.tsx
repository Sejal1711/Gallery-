import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, ImageOff } from "lucide-react"
import { useFetchPhotos } from "@/hooks/useFetchPhotos"
import { useFavourites } from "@/hooks/useFavourites"
import { PhotoCard } from "@/components/PhotoCard"
import { Spinner } from "@/components/Spinner"

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggle } = useFavourites()
  const [query, setQuery] = useState("")

  // useCallback — stable reference so PhotoCard doesn't re-render
  // unless the toggle function identity changes (it won't, dispatch is stable)
  const handleToggleFav = useCallback((id: string) => {
    toggle(id)
  }, [toggle])

  // useCallback — keeps onChange identity stable across renders driven
  // by unrelated state updates (e.g. favourites changing)
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  // useMemo — recomputes only when the photos array or query string changes,
  // avoiding a fresh .filter() pass on every unrelated render
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading
              ? "Fetching photos…"
              : `${photos.length} photos · ${favourites.size} favourited`}
          </p>
        </motion.div>

        {/* Search — only shown once photos are loaded */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative mb-8 max-w-sm"
          >
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search by author…"
              className="w-full rounded-lg border border-input bg-transparent py-2 pl-9 pr-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </motion.div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-24 text-center text-muted-foreground"
          >
            <ImageOff size={36} strokeWidth={1.5} />
            <p className="font-medium">Failed to load photos</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        {/* Empty search result */}
        {!loading && !error && filtered.length === 0 && (
          <motion.p
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-sm text-muted-foreground"
          >
            No photos match &ldquo;{query}&rdquo;
          </motion.p>
        )}

        {/* Photo grid — 1 col mobile / 2 col tablet / 4 col desktop */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div
            layout
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence>
              {filtered.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.has(photo.id)}
                  onToggle={handleToggleFav}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  )
}
