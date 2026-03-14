import { motion } from "framer-motion"

export function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        className="block h-9 w-9 rounded-full border-[3px] border-border border-t-primary"
      />
      <p className="text-sm">Loading photos…</p>
    </div>
  )
}
