"use client"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface AudioButtonProps {
  src: string
  duration?: number // in milliseconds
  className?: string
}

export function AudioButton({ src, duration = 2000, className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handlePlay = () => {
    if (isPlaying) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsPlaying(false)
    } else {
      // Start playing
      if (!audioRef.current) {
        audioRef.current = new Audio(src)
      }

      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)

      // Stop after duration
      timeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
        setIsPlaying(false)
      }, duration)
    }
  }

  return (
    <Button
      variant="default"
      onClick={handlePlay}
      className={className}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 mr-2" />
          Остановить
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 mr-2" />
          Прослушать аудио на 2 секунды
        </>
      )}
    </Button>
  )
}
