"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw } from "lucide-react"

interface FlipCardProps {
  theme: string
  themeRu: string
  topic: string
  topicRu: string
  audioSrc?: string
  className?: string
}

export function FlipCard({
  theme,
  themeRu,
  topic,
  topicRu,
  audioSrc,
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioSrc) return
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [audioSrc])

  const handlePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  return (
    <div className={cn("flip-card w-full h-[210px]", className)}>
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="flip-card-front absolute w-full h-full bg-white rounded-2xl p-5 flex flex-col justify-between border border-border/50"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header: icon placeholder + theme */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-accent/30" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base lg:text-lg leading-tight text-foreground">
                {theme}
              </h3>
              <p className="text-muted-foreground text-sm">({themeRu})</p>
            </div>
          </div>

          {/* Topic bar */}
          <div className="bg-foreground rounded-xl px-5 py-3.5">
            <span className="text-[11px] text-white/50 block mb-0.5">
              Тема:
            </span>
            <p className="text-sm text-white font-medium">
              {topic} / {topicRu}
            </p>
          </div>

          {/* Action buttons — centered */}
          <div className="flex items-center justify-center gap-4 lg:gap-6">
            {audioSrc && (
              <button
                onClick={handlePlay}
                className="flex items-center gap-3 group"
                aria-label={
                  isPlaying ? "Остановить аудио" : "Прослушать аудио"
                }
              >
                <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  )}
                </div>
                <span className="text-[11px] lg:text-xs text-muted-foreground leading-tight text-left">
                  Прослушать аудио
                  <br />
                  на 2 секунды
                </span>
              </button>
            )}

            <button
              onClick={() => setIsFlipped(true)}
              className="flex items-center gap-3 group"
              aria-label="Узнать как переводится"
            >
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <RotateCcw className="w-4 h-4 text-accent" />
              </div>
              <span className="text-[11px] lg:text-xs text-muted-foreground leading-tight text-left">
                Узнать как
                <br />
                переводится
              </span>
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute w-full h-full bg-accent rounded-2xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-white/40" />
            </div>
            <div>
              <h3 className="font-bold text-base lg:text-lg leading-tight text-white">
                {themeRu}
              </h3>
              <p className="text-white/60 text-sm">Перевод</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl px-5 py-3.5">
            <span className="text-[11px] text-white/50 block mb-0.5">
              Тема:
            </span>
            <p className="text-sm text-white font-medium">
              {topicRu}
            </p>
          </div>

          <button
            onClick={() => setIsFlipped(false)}
            className="flex items-center gap-3 group"
            aria-label="Вернуться к оригиналу"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <RotateCcw className="w-4 h-4 text-accent" />
            </div>
            <span className="text-xs text-white/80 leading-tight text-left">
              Вернуться
              <br />
              назад
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
