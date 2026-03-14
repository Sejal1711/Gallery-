import { motion } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"

type Props = { onExplore: () => void }

export function Hero({ onExplore }: Props) {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background">

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[22vw] font-black uppercase leading-none tracking-tighter text-muted"
      >
        PICASA
      </span>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl text-6xl font-black leading-[1.1] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          Discover the World,
          <br />
          One Frame at a Time
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          Browse 30 curated photos with{" "}
          <span className="font-semibold text-primary">Picasa</span> — search
          by author and save your favourites.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExplore}
          className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-full bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          <ArrowRight size={17} />
          Explore Photos
        </motion.button>
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
        <span className="text-xs tracking-widest uppercase">scroll</span>
      </motion.div>

    </section>
  )
}
