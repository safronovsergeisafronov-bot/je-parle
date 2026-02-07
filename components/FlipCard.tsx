"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AudioButton } from "./AudioButton"
import { Button } from "./ui/button"
import { RotateCcw } from "lucide-react"

interface FlipCardProps {
  theme: string
  themeRu: string
  topic: string
  topicRu: string
  audioSrc?: string
  className?: string
}

export function FlipCard({ theme, themeRu, topic, topicRu, audioSrc, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={cn("flip-card w-full h-[320px] md:h-[380px]", className)}>
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="flip-card-front absolute w-full h-full bg-card rounded-2xl p-6 flex flex-col justify-between border border-border shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full mb-4">
              {theme}
            </span>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              {themeRu}
            </h3>
            <p className="text-muted-foreground text-sm">
              Тема: {topic}
            </p>
            <p className="text-muted-foreground text-sm">
              {topicRu}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {audioSrc && (
              <AudioButton src={audioSrc} duration={2000} />
            )}
            <Button
              variant="outline"
              onClick={() => setIsFlipped(true)}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Узнать перевод
            </Button>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute w-full h-full bg-accent rounded-2xl p-6 flex flex-col justify-between shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-4">
              Перевод
            </span>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {themeRu}
            </h3>
            <p className="text-white/80 text-sm">
              {topicRu}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => setIsFlipped(false)}
            className="w-full bg-white text-accent hover:bg-white/90"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Вернуться
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
