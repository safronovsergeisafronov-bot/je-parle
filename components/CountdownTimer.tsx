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

/**
 * Склонение русских числительных.
 * Возвращает правильную форму слова в зависимости от числа.
 * forms: [1, 2-4, 5-20] — например ["день", "дня", "дней"]
 */
function pluralize(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n)
  const lastTwo = abs % 100
  const lastOne = abs % 10

  if (lastTwo >= 11 && lastTwo <= 19) return forms[2]
  if (lastOne === 1) return forms[0]
  if (lastOne >= 2 && lastOne <= 4) return forms[1]
  return forms[2]
}

const dayForms: [string, string, string] = ["день", "дня", "дней"]
const hourForms: [string, string, string] = ["час", "часа", "часов"]
const minuteForms: [string, string, string] = ["минута", "минуты", "минут"]
const secondForms: [string, string, string] = ["секунда", "секунды", "секунд"]

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

  if (!mounted) {
    if (variant === "minimal") {
      return (
        <div className={cn("flex items-start justify-center gap-1 sm:gap-2 md:gap-3", className)}>
          {[dayForms, hourForms, minuteForms, secondForms].map((forms, i) => (
            <div key={i} className="flex items-start gap-1 sm:gap-2 md:gap-3">
              {i > 0 && <span className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground/30 leading-none relative top-[-2px]">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground tabular-nums leading-none">0</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{forms[2]}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className={cn("flex items-center justify-center gap-2 md:gap-4", className)}>
        {[dayForms, hourForms, minuteForms, secondForms].map((forms, i) => (
          <div key={i} className="flex items-center gap-2 md:gap-4">
            {i > 0 && <Separator />}
            <div className="flex flex-col items-center">
              <div className="bg-accent text-white text-2xl md:text-4xl font-bold rounded-xl px-4 py-3 min-w-[60px] md:min-w-[80px] text-center">
                00
              </div>
              <span className="text-xs md:text-sm text-muted-foreground mt-2">
                {forms[2]}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-start justify-center gap-1 sm:gap-2 md:gap-3", className)}>
        <MinimalTimeBlock value={timeLeft.days} forms={dayForms} />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.hours} forms={hourForms} />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.minutes} forms={minuteForms} />
        <MinimalSeparator />
        <MinimalTimeBlock value={timeLeft.seconds} forms={secondForms} />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center gap-2 md:gap-4", className)}>
      <TimeBlock value={timeLeft.days} forms={dayForms} />
      <Separator />
      <TimeBlock value={timeLeft.hours} forms={hourForms} />
      <Separator />
      <TimeBlock value={timeLeft.minutes} forms={minuteForms} />
      <Separator />
      <TimeBlock value={timeLeft.seconds} forms={secondForms} />
    </div>
  )
}

function TimeBlock({ value, forms }: { value: number; forms: [string, string, string] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-accent text-white text-2xl md:text-4xl font-bold rounded-xl px-4 py-3 min-w-[60px] md:min-w-[80px] text-center">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2">{pluralize(value, forms)}</span>
    </div>
  )
}

function Separator() {
  return <span className="text-2xl md:text-4xl font-bold text-accent relative top-[-10px]">:</span>
}

function MinimalTimeBlock({ value, forms }: { value: number; forms: [string, string, string] }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{pluralize(value, forms)}</span>
    </div>
  )
}

function MinimalSeparator() {
  return (
    <span className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground/30 leading-none relative top-[-2px]">
      :
    </span>
  )
}
