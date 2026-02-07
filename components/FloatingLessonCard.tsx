"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function FloatingLessonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      className="hidden lg:block absolute top-8 right-8 xl:right-12"
    >
      <div className="bg-foreground/90 backdrop-blur-sm rounded-2xl p-4 w-[220px] shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <Play className="w-3.5 h-3.5 text-white ml-0.5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">Урок 1: Приветствия</p>
            <p className="text-white/50 text-[10px]">3:24</p>
          </div>
        </div>
        {/* Decorative progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-accent rounded-full" />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-white/40 text-[9px]">2:13</span>
          <span className="text-white/40 text-[9px]">3:24</span>
        </div>
      </div>
    </motion.div>
  )
}
