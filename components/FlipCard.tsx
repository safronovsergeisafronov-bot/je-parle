"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw, Mic, Pencil, Search } from "lucide-react"

interface FlipCardProps {
  theme: string
  themeRu: string
  topic: string
  topicRu: string
  audioSrc?: string
  iconSrc?: string
  frenchPhrase?: string
  translation?: string
  explanation?: string
  className?: string
}

export function FlipCard({
  theme,
  themeRu,
  topic,
  topicRu,
  audioSrc,
  iconSrc,
  frenchPhrase,
  translation,
  explanation,
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const flipTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Автоматический возврат карточки через 5 секунд
  useEffect(() => {
    if (isFlipped) {
      flipTimerRef.current = setTimeout(() => {
        setIsFlipped(false)
      }, 5000)
    }
    return () => {
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current)
        flipTimerRef.current = null
      }
    }
  }, [isFlipped])

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
          className="flip-card-front absolute w-full h-full bg-white rounded-2xl p-4 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header: icon + theme */}
          <div className="flex items-center gap-2.5">
            {iconSrc ? (
              <div className="w-[45px] h-[45px] rounded-xl overflow-hidden flex-shrink-0">
                <img src={iconSrc} alt="" className="w-full h-full object-cover" aria-hidden="true" />
              </div>
            ) : (
              <div className="w-[45px] h-[45px] rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-accent/30" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-sm leading-tight text-foreground truncate">
                {theme}
              </h3>
              <p className="text-muted-foreground text-xs truncate">({themeRu})</p>
            </div>
          </div>

          {/* Topic bar */}
          <div className="bg-foreground rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-white/50 block mb-0.5">
              Тема:
            </span>
            <p className="text-xs text-white font-medium leading-snug truncate">
              {topic} / {topicRu}
            </p>
          </div>

          {/* Action buttons — aligned to edges */}
          <div className="flex items-center justify-between gap-2">
            {audioSrc && (
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 group"
                aria-label={
                  isPlaying ? "Остановить аудио" : "Прослушать аудио"
                }
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white relative top-px" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
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
              className="flex items-center gap-2 group"
              aria-label="Узнать как переводится"
            >
              <span className="text-[11px] lg:text-xs text-muted-foreground leading-tight text-right">
                Узнать как
                <br />
                переводится
              </span>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <RotateCcw className="w-4 h-4 text-accent" />
              </div>
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute w-full h-full bg-accent rounded-2xl p-4 flex flex-col gap-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 1. En français */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Mic className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/70 mb-1">En français :</p>
              <p className="text-sm text-white leading-snug">{frenchPhrase}</p>
            </div>
          </div>

          {/* 2. Перевод */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Pencil className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/70 mb-1">Перевод:</p>
              <p className="text-sm text-white leading-snug">{translation}</p>
            </div>
          </div>

          {/* 3. Объяснение */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/70 mb-1">Объяснение:</p>
              <p className="text-sm text-white leading-snug">{explanation}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
