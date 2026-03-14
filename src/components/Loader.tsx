import { motion } from "framer-motion"

function Blade({ index }: { index: number }) {
  const angle = (360 / 6) * index

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[38px] w-[10px] origin-bottom rounded-full bg-primary"
      style={{ rotate: angle, translateX: "-50%", translateY: "-100%" }}
      animate={{ scaleY: [1, 0.3, 1], opacity: [0.9, 0.3, 0.9] }}
      transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.1, ease: "easeInOut" }}
    />
  )
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl bg-card ring-1 ring-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/40 to-transparent"
          animate={{ translateX: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.4, delay, ease: "linear" }}
        />
      </div>
      <div className="space-y-1.5 px-3 py-2.5">
        <div className="h-2.5 w-2/3 rounded-full bg-muted" />
        <div className="h-2 w-1/3 rounded-full bg-muted/60" />
      </div>
    </motion.div>
  )
}

export function Loader() {
  return (
    <div className="w-full">
      <div className="mb-14 flex flex-col items-center gap-5">
        <div className="relative h-20 w-20">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full bg-primary/10"
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Blade key={i} index={i} />
          ))}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Developing photos</span>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            >
              .
            </motion.span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} delay={i * 0.07} />
        ))}
      </div>
    </div>
  )
}
