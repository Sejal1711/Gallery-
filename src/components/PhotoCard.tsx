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

// Variants are driven by the parent stagger container in App.tsx
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
      className="group relative overflow-hidden rounded-xl bg-muted"
    >
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div className="aspect-[4/3] w-full animate-pulse bg-muted-foreground/10" />
      )}

      <img
        src={thumb}
        alt={photo.author}
        onLoad={() => setLoaded(true)}
        className={cn(
          "aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105",
          !loaded && "hidden"
        )}
      />

      {/* Overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Author name */}
      <p className="absolute bottom-2 left-3 translate-y-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {photo.author}
      </p>

      {/* Fav button */}
      <button
        onClick={() => onToggle(photo.id)}
        aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        className="absolute right-2 top-2 cursor-pointer rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/40 hover:scale-110"
      >
        <motion.div
          animate={isFavourite ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors duration-200",
              isFavourite ? "fill-rose-500 stroke-rose-500" : "stroke-white"
            )}
          />
        </motion.div>
      </button>
    </motion.div>
  )
}
