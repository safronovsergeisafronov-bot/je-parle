"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface AudioButtonProps {
  src: string
  className?: string
}

export function AudioButton({ src, className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const handlePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  return (
    <Button
      variant="default"
      onClick={handlePlay}
      className={className}
      aria-label={isPlaying ? "Остановить аудио" : "Прослушать аудио"}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 mr-2" aria-hidden="true" />
          Остановить
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 mr-2" aria-hidden="true" />
          Прослушать аудио
        </>
      )}
    </Button>
  )
}
