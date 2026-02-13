import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

function filterDomProps(props: Record<string, any>) {
  const {
    animate, initial, transition, variants, whileInView, viewport,
    whileDrag, dragConstraints, dragElastic, dragMomentum,
    whileHover, whileTap, exit, layout, layoutId,
    onAnimationComplete, onAnimationStart,
    onDrag, onDragEnd, onDragStart, drag,
    ...domProps
  } = props
  return domProps
}

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterDomProps(props)}>{children}</div>
    )),
  },
  useReducedMotion: () => false,
}))

vi.mock("@/components/AnimatedSection", () => ({
  StaggerChildren: ({ children, className }: any) => <div className={className}>{children}</div>,
  StaggerItem: ({ children }: any) => <div>{children}</div>,
}))

afterEach(cleanup)

import { TopicSpheres } from "@/components/sections/TopicSpheres"
import { topicSpheres } from "@/lib/data"

describe("TopicSpheres", () => {
  it("renders without errors", () => {
    render(<TopicSpheres />)
    expect(screen.getAllByText(/И.вот в.этот момент/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the section heading", () => {
    render(<TopicSpheres />)
    expect(screen.getAllByText(/в.голове тишина/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 9 topic sphere titles", () => {
    render(<TopicSpheres />)
    topicSpheres.forEach((sphere) => {
      expect(screen.getAllByText(sphere.title).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders topic items as badges", () => {
    render(<TopicSpheres />)
    expect(screen.getAllByText("Заказать еду").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Познакомиться").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Спросить дорогу").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Купить билет в кино").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the CTA card text", () => {
    render(<TopicSpheres />)
    expect(screen.getAllByText(/Это твой быстрый доступ/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the subtitle text", () => {
    render(<TopicSpheres />)
    expect(screen.getAllByText(/Для всех уровней/).length).toBeGreaterThanOrEqual(1)
  })

  it("applies background colors to sphere cards", () => {
    const { container } = render(<TopicSpheres />)
    const styledCard = container.querySelector(`[style*="background-color"]`)
    expect(styledCard).toBeInTheDocument()
  })
})
