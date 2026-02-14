"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { topicSpheres } from "@/lib/data"
import { Plus, Keyboard, Languages, PenLine, BookOpen, MessageSquare } from "lucide-react"
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection"

function isDarkColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  // Warm yellows/golds need white text even at higher luminance
  if (luminance < 0.78 && b < g * 0.6) return true
  return luminance < 0.70
}

const ctaIcons = [
  { Icon: Keyboard, bg: "bg-white/15" },
  { Icon: Languages, bg: "bg-white/25" },
  { Icon: PenLine, bg: "bg-white/20" },
  { Icon: BookOpen, bg: "bg-white/15" },
  { Icon: MessageSquare, bg: "bg-white/25" },
]

export function TopicSpheres() {
  const ctaRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-10 md:py-15 relative overflow-hidden">
      {/* Decorative accent dots */}
      <div className="accent-dot" style={{ top: "12%", left: "5%" }} aria-hidden="true" />
      <div className="accent-dot" style={{ top: "28%", right: "8%", width: 8, height: 8 }} aria-hidden="true" />
      <div className="accent-dot" style={{ bottom: "15%", left: "12%", width: 4, height: 4 }} aria-hidden="true" />
      <div className="w-full px-3 lg:px-4 relative">
        {/* Title & subtitle */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
            И&nbsp;вот в&nbsp;этот момент
            <br />
            в&nbsp;голове тишина...
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Для всех уровней.
            <br />
            Даже если уже что-то знаешь,
            <br />
            книга помогает звучать естественно и&nbsp;«своим» для французов.
          </p>
        </div>

        {/* 5-column grid: 9 topic cards + 1 CTA card */}
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" staggerDelay={0.06}>
          {topicSpheres.map((sphere) => {
            const dark = isDarkColor(sphere.color)
            const textColor = sphere.textColor ?? (dark ? "#ffffff" : "var(--foreground)")
            const badgeBg = dark
              ? "rgba(255,255,255,0.15)"
              : "rgba(0,0,0,0.08)"

            return (
              <StaggerItem key={sphere.id}>
                <div
                  className="rounded-2xl p-5 flex flex-col gap-3 h-full"
                  style={{ backgroundColor: sphere.color }}
                >
                  <h3
                    className="text-base md:text-lg font-semibold leading-tight"
                    style={{ color: textColor }}
                  >
                    {sphere.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {sphere.items.map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 w-fit"
                        style={{ backgroundColor: badgeBg }}
                      >
                        <Plus
                          className="w-3 h-3 flex-shrink-0"
                          style={{ color: textColor }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-xs leading-tight"
                          style={{ color: textColor }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )
          })}

          {/* 10th card: CTA with draggable icons */}
          <StaggerItem>
            <div
              ref={ctaRef}
              className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden h-full"
              style={{ backgroundColor: "#57041B" }}
            >
              {/* Icon tiles — draggable (decorative) */}
              <div className="flex flex-wrap gap-2 mb-4" aria-hidden="true">
                {ctaIcons.map(({ Icon, bg }, i) => (
                  <motion.div
                    key={i}
                    drag
                    dragConstraints={ctaRef}
                    dragElastic={0.15}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.15, zIndex: 10 }}
                    className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center cursor-grab active:cursor-grabbing`}
                  >
                    <Icon className="w-4 h-4 text-white/80 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-white font-medium">
                Это твой быстрый доступ к&nbsp;живому французскому, который
                реально работает в&nbsp;жизни.
              </p>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
