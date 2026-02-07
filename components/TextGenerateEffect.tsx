"use client"

import { useEffect, useRef, useState, ElementType } from "react"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
}

export function TextGenerateEffect({
  text,
  className,
  as: Component = "span"
}: TextGenerateEffectProps) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const words = text.split(" ")

  // Cast Component to work with ref
  const Tag = Component as ElementType

  return (
    <Tag
      ref={ref}
      className={cn("text-generate", isInView && "in-view", className)}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="word"
          style={{ "--word-index": i } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
