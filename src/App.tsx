import { useCallback, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, ImageOff, Heart, LayoutGrid } from "lucide-react"
import { useFetchPhotos } from "@/hooks/useFetchPhotos"
import { useFavourites } from "@/hooks/useFavourites"
import { PhotoCard } from "@/components/PhotoCard"
import { Loader } from "@/components/Loader"
import { Hero } from "@/components/Hero"
import { cn } from "@/lib/utils"

type Tab = "all" | "favourites"

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggle } = useFavourites()
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<Tab>("all")
  const galleryRef = useRef<HTMLDivElement>(null)

  function scrollToGallery() {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleToggleFav = useCallback((id: string) => {
    toggle(id)
  }, [toggle])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const filtered = useMemo(() => {
    const pool = tab === "favourites" ? photos.filter((p) => favourites.has(p.id)) : photos
    const q = query.trim().toLowerCase()
    if (!q) return pool
    return pool.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query, tab, favourites])

  const isEmpty = !loading && !error && filtered.length === 0

  return (
    <div className="bg-background">
      <Hero onExplore={scrollToGallery} />

      <section ref={galleryRef} className="min-h-screen px-5 pb-20 pt-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">Picasa Gallery</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                {loading ? "Loading…" : `${photos.length} photos`}
                {!loading && (
                  <>
                    <span>·</span>
                    <Heart size={11} className="fill-primary stroke-primary" />
                    {favourites.size} favourited
                  </>
                )}
              </p>
            </div>

            {!loading && !error && (
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search by author…"
                  className="w-full rounded-full border border-input bg-card py-2 pl-8 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>
            )}
          </motion.div>

          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8 flex w-fit gap-1 rounded-full border border-border bg-muted p-1"
            >
              {(["all", "favourites"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200",
                    tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {t === "all" ? <LayoutGrid size={13} /> : <Heart size={13} />}
                    {t === "all" ? "All Photos" : `Favourites${favourites.size > 0 ? ` (${favourites.size})` : ""}`}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
              <Loader />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-24 text-center text-muted-foreground"
            >
              <ImageOff size={36} strokeWidth={1.5} />
              <p className="font-semibold text-foreground">Failed to load photos</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {isEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-24 text-muted-foreground"
            >
              {tab === "favourites" ? (
                <>
                  <Heart size={36} strokeWidth={1.5} />
                  <p className="font-semibold text-foreground">No favourites yet</p>
                  <p className="text-sm">Hit the heart on any photo to save it here.</p>
                </>
              ) : (
                <p className="text-sm">No photos match &ldquo;{query}&rdquo;</p>
              )}
            </motion.div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={i}
                    isFavourite={favourites.has(photo.id)}
                    onToggle={handleToggleFav}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
