import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Photo } from "@/hooks/useFetchPhotos"

type Props = {
  photo: Photo | null
  isFavourite: boolean
  onToggle: (id: string) => void
  onClose: () => void
}

export function Lightbox({ photo, isFavourite, onToggle, onClose }: Props) {
  useEffect(() => {
    if (!photo) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            layoutId={`photo-${photo.id}`}
            className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-card shadow-2xl"
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="relative">
              <img
                src={`https://picsum.photos/id/${photo.id}/1200/800`}
                alt={photo.author}
                className="w-full object-cover max-h-[70vh]"
              />

              {/* Top controls */}
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  onClick={() => onToggle(photo.id)}
                  className="rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
                >
                  <motion.div
                    animate={isFavourite ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ duration: 0.28 }}
                  >
                    <Heart
                      size={18}
                      className={cn(
                        "transition-colors duration-200",
                        isFavourite ? "fill-primary stroke-primary" : "stroke-white"
                      )}
                    />
                  </motion.div>
                </button>

                <button
                  onClick={onClose}
                  className="rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
                >
                  <X size={18} className="stroke-white" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-card-foreground">{photo.author}</p>
                <p className="text-xs text-muted-foreground">Photo #{photo.id}</p>
              </div>
              <a
                href={photo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ExternalLink size={12} />
                View source
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
