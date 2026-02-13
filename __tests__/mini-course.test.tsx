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
  },
  useReducedMotion: () => false,
}))

vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: any) => <img {...props} />,
}))

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock("@/components/AnimatedSection", () => ({
  StaggerChildren: ({ children, className }: any) => <div className={className}>{children}</div>,
  StaggerItem: ({ children }: any) => <div>{children}</div>,
}))

afterEach(cleanup)

import { MiniCourse } from "@/components/sections/MiniCourse"
import { miniCourseLessons } from "@/lib/data"

describe("MiniCourse", () => {
  it("renders without errors", () => {
    render(<MiniCourse />)
    expect(screen.getAllByText(/Хочешь читать без/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 6 lesson titles", () => {
    render(<MiniCourse />)
    miniCourseLessons.forEach((lesson) => {
      expect(screen.getAllByText(lesson.title).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders all 6 lesson durations", () => {
    render(<MiniCourse />)
    miniCourseLessons.forEach((lesson) => {
      expect(screen.getAllByText(lesson.duration).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders 6 watch buttons with ARIA labels", () => {
    render(<MiniCourse />)
    miniCourseLessons.forEach((lesson) => {
      expect(screen.getAllByLabelText(`Смотреть ${lesson.title}`).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders 6 progress indicators with progressbar role", () => {
    render(<MiniCourse />)
    const progressbars = screen.getAllByRole("progressbar")
    expect(progressbars.length).toBeGreaterThanOrEqual(6)
  })

  it("has section id for anchor navigation", () => {
    render(<MiniCourse />)
    const section = document.querySelector("#mini-course")
    expect(section).toBeInTheDocument()
  })

  it("renders the YouTube badge", () => {
    render(<MiniCourse />)
    expect(screen.getAllByText("youtube").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the description text", () => {
    render(<MiniCourse />)
    expect(screen.getAllByText(/Если чтение кажется головоломкой/).length).toBeGreaterThanOrEqual(1)
  })
})
