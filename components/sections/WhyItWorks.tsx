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

// Desktop checkpoint positions (% of the card)
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
    <section id="why" ref={sectionRef} className="relative">
      {/* Desktop: scroll-driven animated path */}
      <div className="hidden lg:block h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col pt-3 lg:pt-4 px-3 lg:px-4">
          <div className="relative w-full bg-card rounded-t-3xl overflow-hidden flex-1">
            {/* Title & subtitle — top right */}
            <div className="absolute right-[4%] top-[10%] max-w-[320px] xl:max-w-[400px] z-10">
              <h2 className="text-3xl xl:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
                Почему это
                <br />
                работает?
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground">
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
                src="/images/круасан.png"
                alt="Круассан"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: simplified vertical layout */}
      <div className="lg:hidden py-10 md:py-15 bg-secondary/30">
        <div className="w-full px-3 lg:px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-3">
              Почему это работает?
            </h2>
            <p className="text-muted-foreground">
              Записал для вас озвучку&nbsp;&mdash; чтобы вы&nbsp;слышали
              правильное произношение и&nbsp;интонации.
            </p>
          </div>
          <div className="space-y-4">
            {whyItWorksPoints.map((text, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 text-left">
                <ProgressDots count={i + 1} />
                <p className="text-sm text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 select-none">
            <Image
              src="/images/круасан.png"
              alt="Круассан"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
