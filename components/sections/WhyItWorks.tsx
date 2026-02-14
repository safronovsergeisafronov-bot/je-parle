"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion"
import Image from "next/image"
import { whyItWorksPoints } from "@/lib/data"

function ProgressDots({ count }: { count: number }) {
  return (
    <div className="flex gap-1.5 mb-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] rounded-full ${
            i < count ? "bg-accent" : "bg-accent/25"
          }`}
        />
      ))}
    </div>
  )
}

// Desktop checkpoint positions as % of the card dimensions.
// These form a zigzag path the croissant follows on scroll:
//   1 (top-left) → 2 (mid-left) → 3 (bottom-left) → 4 (bottom-right) → 5 (mid-right)
const checkpoints = [
  { x: 9, y: 35 },
  { x: 27, y: 52 },
  { x: 19, y: 70 },
  { x: 58, y: 70 },
  { x: 76, y: 55 },
]

const textPlacement: Array<"above" | "below"> = [
  "above", "above", "below", "below", "below",
]

function MobileWhyItWorks({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // Reuse the same scrollYProgress from parent section
  // Each card fades in at 20% intervals, croissant moves vertically
  const mobileOpacities = whyItWorksPoints.map((_, i) => {
    const start = i * 0.18
    const end = start + 0.12
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0, 1])
  })

  const mobileTranslateYs = whyItWorksPoints.map((_, i) => {
    const start = i * 0.18
    const end = start + 0.12
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [30, 0])
  })

  // Croissant vertical position (0% to 100% of the card area)
  const croissantY = useTransform(scrollYProgress, [0, 0.85], [0, 100])
  const croissantTop = useMotionTemplate`${croissantY}%`

  return (
    <div className="lg:hidden">
      <div className="sticky top-0 h-screen flex flex-col px-3 pt-4">
        <div className="relative w-full bg-card rounded-2xl overflow-hidden flex-1 p-5 pb-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-2">
              Почему это работает?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Записал для вас озвучку&nbsp;&mdash; чтобы вы&nbsp;слышали
              правильное произношение и&nbsp;интонации.
            </p>
          </div>

          {/* Cards with vertical line and croissant */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

            {/* Croissant moving along the line */}
            <motion.div
              className="absolute left-0 z-20 select-none will-change-transform -translate-y-1/2"
              style={{ top: croissantTop }}
            >
              <Image
                src="/images/croissant.png"
                alt="Круассан"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </motion.div>

            {/* Cards */}
            <div className="space-y-3 pl-10">
              {whyItWorksPoints.map((text, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-xl p-3.5"
                  style={{
                    opacity: mobileOpacities[i],
                    y: mobileTranslateYs[i],
                  }}
                >
                  <ProgressDots count={i + 1} />
                  <p className="text-sm text-muted-foreground leading-snug">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhyItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const inputRange = [0, 0.2, 0.4, 0.6, 0.8, 1]
  const cx = useTransform(scrollYProgress, inputRange, [
    checkpoints[0].x, checkpoints[1].x, checkpoints[2].x,
    checkpoints[3].x, checkpoints[4].x, checkpoints[4].x,
  ])
  const cy = useTransform(scrollYProgress, inputRange, [
    checkpoints[0].y, checkpoints[1].y, checkpoints[2].y,
    checkpoints[3].y, checkpoints[4].y, checkpoints[4].y,
  ])
  const croissantLeft = useMotionTemplate`${cx}%`
  const croissantTop = useMotionTemplate`${cy}%`

  const segmentAngles = checkpoints.slice(0, -1).map((cp, i) => {
    const next = checkpoints[i + 1]
    return Math.atan2((next.y - cp.y) / 2, next.x - cp.x) * (180 / Math.PI)
  })
  const croissantRotate = useTransform(scrollYProgress, inputRange, [
    segmentAngles[0], segmentAngles[1], segmentAngles[2],
    segmentAngles[3], segmentAngles[3], segmentAngles[3],
  ])

  const op1 = useTransform(scrollYProgress, [0, 0.01], [1, 1])
  const op2 = useTransform(scrollYProgress, [0.12, 0.22], [0, 1])
  const op3 = useTransform(scrollYProgress, [0.32, 0.42], [0, 1])
  const op4 = useTransform(scrollYProgress, [0.52, 0.62], [0, 1])
  const op5 = useTransform(scrollYProgress, [0.72, 0.82], [0, 1])
  const opacities = [op1, op2, op3, op4, op5]

  const ty1 = useTransform(scrollYProgress, [0, 0.01], [0, 0])
  const ty2 = useTransform(scrollYProgress, [0.12, 0.22], [15, 0])
  const ty3 = useTransform(scrollYProgress, [0.32, 0.42], [15, 0])
  const ty4 = useTransform(scrollYProgress, [0.52, 0.62], [15, 0])
  const ty5 = useTransform(scrollYProgress, [0.72, 0.82], [15, 0])
  const translateYs = [ty1, ty2, ty3, ty4, ty5]

  return (
    <section id="why" ref={sectionRef} className="relative h-[300vh]">
      {/* Desktop: scroll-driven animated path */}
      <div className="hidden lg:block h-full">
        <div className="sticky top-0 h-screen flex flex-col pt-3 lg:pt-4 px-3 lg:px-4">
          <div className="relative w-full bg-card rounded-t-3xl overflow-hidden flex-1">
            {/* Title & subtitle — top right */}
            <div className="absolute right-[4%] top-[10%] max-w-[320px] xl:max-w-[400px] z-10">
              <h2 className="text-3xl xl:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
                Почему это
                <br />
                работает?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Записал для вас озвучку&nbsp;&mdash; чтобы вы&nbsp;слышали правильное произношение и&nbsp;интонации.
              </p>
            </div>

            {/* SVG path lines connecting checkpoints */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {checkpoints.map((cp, i) => {
                if (i >= checkpoints.length - 1) return null
                const next = checkpoints[i + 1]
                return (
                  <line
                    key={i}
                    x1={cp.x}
                    y1={cp.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="var(--border)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {/* Checkpoint circles */}
            {checkpoints.map((cp, i) => (
              <div
                key={`cp-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${cp.x}%`, top: `${cp.y}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-accent ring-[3px] ring-accent/20" />
              </div>
            ))}

            {/* Text blocks with progress dots */}
            {whyItWorksPoints.map((text, i) => {
              const above = textPlacement[i] === "above"
              return (
                <motion.div
                  key={`text-${i}`}
                  className="absolute z-10"
                  style={{
                    left: `${checkpoints[i].x}%`,
                    top: `${checkpoints[i].y}%`,
                    marginLeft: -10,
                    opacity: opacities[i],
                    y: translateYs[i],
                  }}
                >
                  <div
                    className="w-[180px] xl:w-[220px] text-left"
                    style={
                      above
                        ? { transform: "translateY(calc(-100% - 28px))" }
                        : { paddingTop: 28 }
                    }
                  >
                    <ProgressDots count={i + 1} />
                    <p className="text-sm xl:text-[15px] text-muted-foreground leading-snug">
                      {text}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* Animated croissant */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 select-none will-change-transform"
              style={{
                left: croissantLeft,
                top: croissantTop,
                rotate: croissantRotate,
              }}
            >
              <Image
                src="/images/croissant.png"
                alt="Круассан"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: scroll-driven vertical animation */}
      <MobileWhyItWorks scrollYProgress={scrollYProgress} />
    </section>
  )
}
