import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

function filterDomProps(props: Record<string, any>) {
  const {
    animate, initial, transition, variants, whileInView, viewport,
    whileDrag, dragConstraints, dragElastic, dragMomentum,
    whileHover, whileTap, exit, layout, layoutId,
    onAnimationComplete, onAnimationStart,
    ...domProps
  } = props
  return domProps
}

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterDomProps(props)}>{children}</div>
    )),
    span: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <span ref={ref} {...filterDomProps(props)}>{children}</span>
    )),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useMotionTemplate: () => "0%",
  useReducedMotion: () => false,
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  AnimatePresence: ({ children }: any) => children,
}))

vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: any) => <img {...props} />,
}))

afterEach(cleanup)

import { WhyItWorks } from "@/components/sections/WhyItWorks"
import { whyItWorksPoints } from "@/lib/data"

describe("WhyItWorks", () => {
  it("renders without errors", () => {
    render(<WhyItWorks />)
    expect(screen.getAllByText("Почему это работает?").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the section heading and subtitle", () => {
    render(<WhyItWorks />)
    expect(screen.getAllByText(/правильное произношение/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 5 why-it-works points", () => {
    render(<WhyItWorks />)
    whyItWorksPoints.forEach((point) => {
      const regex = new RegExp(point.replace(/\u00A0/g, ".").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\./g, "."))
      expect(screen.getAllByText(regex).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders the croissant image", { timeout: 15000 }, () => {
    render(<WhyItWorks />)
    const images = screen.getAllByRole("img", { name: "Круассан" })
    expect(images.length).toBeGreaterThanOrEqual(1)
  })

  it("has section with id why", () => {
    render(<WhyItWorks />)
    const section = document.querySelector("#why")
    expect(section).toBeInTheDocument()
  })
})
