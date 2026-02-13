"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
  variant?: "default" | "minimal"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, className, variant = "default" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  if (!mounted) {
    if (variant === "minimal") {
      return (
        <div className={cn("flex items-start justify-center gap-1 sm:gap-2 md:gap-3", className)}>
          {["дней", "часов", "минут", "секунд"].map((label, i) => (
            <div key={i} className="flex items-start gap-1 sm:gap-2 md:gap-3">
              {i > 0 && <span className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground/30 leading-none">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground tabular-nums leading-none">0</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{label}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className={cn("flex items-center justify-center gap-2 md:gap-4", className)}>
        {[0, 0, 0, 0].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-accent text-white text-2xl md:text-4xl font-bold rounded-xl px-4 py-3 min-w-[60px] md:min-w-[80px] text-center">
              00
            </div>
            <span className="text-xs md:text-sm text-muted-foreground mt-2">
              {["дней", "часов", "минут", "секунд"][i]}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-start justify-center gap-1 sm:gap-2 md:gap-3", className)}>
        <MinimalTimeBlock value={timeLeft.days} label="дней" />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.hours} label="часов" />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.minutes} label="минут" />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.seconds} label="секунд" />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center gap-2 md:gap-4", className)}>
      <TimeBlock value={timeLeft.days} label="дней" />
      <Separator />
      <TimeBlock value={timeLeft.hours} label="часов" />
      <Separator />
      <TimeBlock value={timeLeft.minutes} label="минут" />
      <Separator />
      <TimeBlock value={timeLeft.seconds} label="секунд" />
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-accent text-white text-2xl md:text-4xl font-bold rounded-xl px-4 py-3 min-w-[60px] md:min-w-[80px] text-center">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2">{label}</span>
    </div>
  )
}

function Separator() {
  return <span className="text-2xl md:text-4xl font-bold text-accent">:</span>
}

function MinimalTimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{label}</span>
    </div>
  )
}

function MinimalSeparator() {
  return (
    <span className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground/30 leading-none">
      :
    </span>
  )
}
