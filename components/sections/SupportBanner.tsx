"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { MessageCircle, AlarmClock, Filter, GraduationCap, Info } from "lucide-react"
import { darkCards } from "@/lib/data"
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection"

const iconMap: Record<string, React.ReactNode> = {
  "message-circle": <MessageCircle className="w-5 h-5 text-white/80" />,
  "alarm-clock": <AlarmClock className="w-5 h-5 text-white/80" />,
  "filter": <Filter className="w-5 h-5 text-white/80" />,
  "graduation-cap": <GraduationCap className="w-5 h-5 text-white/80" />,
}

let tooltipCounter = 0

function Tooltip({ children, text }: { children: React.ReactNode; text: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<"top" | "bottom">("top")
  const triggerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`tooltip-${++tooltipCounter}`)

  const handleToggle = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition(rect.top < 120 ? "bottom" : "top")
    }
    setVisible((v) => !v)
  }, [])

  return (
    <div
      ref={triggerRef}
      className="relative cursor-pointer"
      onMouseEnter={() => { handleToggle(); setVisible(true) }}
      onMouseLeave={() => setVisible(false)}
      onClick={handleToggle}
      aria-describedby={idRef.current}
    >
      {children}
      <div
        id={idRef.current}
        role="tooltip"
        className={`pointer-events-none absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-64 rounded-xl bg-white p-3 text-xs text-foreground transition-opacity z-20 shadow-lg ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {text}
      </div>
    </div>
  )
}

export function SupportBanner() {
  return (
    <section className="py-3 md:py-4">
      <div className="w-full px-3 lg:px-4">
        <div className="bg-gradient-to-r from-[#2a1f1a] via-[#1c1614] to-[#2a1f1a] rounded-3xl p-5 sm:p-6 md:p-8">

          {/* Top banner row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5 lg:gap-0 mb-6 md:mb-8">

            {/* Left: Title */}
            <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-semibold text-white leading-tight shrink-0 lg:flex-1 text-center lg:text-left">
              При поддержке<br />French Tech &amp; CopyFrog
            </h3>

            {/* Center: Logo icons */}
            <div className="flex items-center gap-3 shrink-0 lg:flex-1 justify-center">
              <Tooltip
                text={
                  <><span className="font-semibold">French Tech</span> — национальная программа Франции по&nbsp;развитию стартапов и&nbsp;технологий.</>
                }
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden"
                  aria-label="French Tech"
                >
                  <Image
                    src="/images/french-tech.svg"
                    alt="French Tech"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Tooltip>
              <Tooltip
                text={
                  <><span className="font-semibold">CopyFrog</span> — платформа на&nbsp;базе искусственного интеллекта для создания уникальных изображений, рекламных текстов, видеокреативов, превращая идеи в&nbsp;готовый результат.</>
                }
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden"
                  aria-label="CopyFrog"
                >
                  <Image
                    src="/images/copy-frog.svg"
                    alt="CopyFrog"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Tooltip>
            </div>

            {/* Right: Info icon + description */}
            <div className="flex items-start gap-3 lg:flex-1 justify-center lg:justify-end max-w-md lg:max-w-none text-center lg:text-left">
              <Tooltip
                text={
                  <>
                    <p className="mb-2"><span className="font-semibold">French Tech</span> — национальная программа Франции по&nbsp;развитию стартапов и&nbsp;технологий.</p>
                    <p><span className="font-semibold">CopyFrog</span> — платформа на&nbsp;базе искусственного интеллекта для создания уникальных изображений, рекламных текстов, видеокреативов, превращая идеи в&nbsp;готовый результат.</p>
                  </>
                }
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 text-white" />
                </div>
              </Tooltip>
              <p className="text-sm text-white/70">
                Французская инновационная экосистема и&nbsp;AI-платформа, которая помогает нам развивать наш проект и&nbsp;делать его доступным для всех людей
              </p>
            </div>
          </div>

          {/* Bottom: 4 dark cards */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.08}>
            {darkCards.map((card) => (
              <StaggerItem key={card.id}>
                <div className="bg-[#2a2220] rounded-2xl p-5 md:p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#3a3230] flex items-center justify-center mb-4">
                    {iconMap[card.icon]}
                  </div>
                  <h4 className="font-semibold text-white text-base md:text-lg leading-tight mb-2 whitespace-pre-line">
                    {card.title}
                  </h4>
                  <p className="text-sm text-white/55 whitespace-pre-line">
                    {card.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  )
}
