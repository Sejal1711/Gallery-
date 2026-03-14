import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Photo } from "@/hooks/useFetchPhotos"

type Props = {
  photo: Photo
  isFavourite: boolean
  onToggle: (id: string) => void
}

export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export function PhotoCard({ photo, isFavourite, onToggle }: Props) {
  const [loaded, setLoaded] = useState(false)

  const thumb = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-shadow duration-300 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {!loaded && (
          <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
        )}

        <img
          src={thumb}
          alt={photo.author}
          onLoad={() => setLoaded(true)}
          className={cn(
            "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105",
            !loaded && "hidden"
          )}
        />

        {/* Fav button */}
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="absolute right-2.5 top-2.5 cursor-pointer rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-background"
        >
          <motion.div
            animate={isFavourite ? { scale: [1, 1.45, 1] } : { scale: 1 }}
            transition={{ duration: 0.28 }}
          >
            <Heart
              size={15}
              className={cn(
                "transition-colors duration-200",
                isFavourite
                  ? "fill-primary stroke-primary"
                  : "stroke-muted-foreground"
              )}
            />
          </motion.div>
        </button>
      </div>

      {/* Footer */}
      <div className="px-3 py-2.5">
        <p className="truncate text-xs font-semibold text-card-foreground">{photo.author}</p>
        <p className="text-[11px] text-muted-foreground">#{photo.id}</p>
      </div>
    </motion.div>
  )
}
