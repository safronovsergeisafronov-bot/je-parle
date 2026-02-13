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

vi.mock("@/components/AnimatedSection", () => ({
  StaggerChildren: ({ children, className }: any) => <div className={className}>{children}</div>,
  StaggerItem: ({ children }: any) => <div>{children}</div>,
}))

afterEach(cleanup)

import { AuthorStory } from "@/components/sections/AuthorStory"

describe("AuthorStory", () => {
  it("renders without errors", () => {
    render(<AuthorStory />)
    const headings = screen.getAllByRole("heading", { level: 2 })
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 3 story card titles", () => {
    render(<AuthorStory />)
    expect(screen.getAllByText("Начало пути").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Мечта").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Сегодня").length).toBeGreaterThanOrEqual(1)
  })

  it("renders story images", () => {
    render(<AuthorStory />)
    expect(screen.getAllByAltText(/Начало пути/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByAltText(/Мечта/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByAltText(/Аудиоплеер/).length).toBeGreaterThanOrEqual(1)
  })

  it("has section id for anchor navigation", () => {
    render(<AuthorStory />)
    const section = document.querySelector("#story")
    expect(section).toBeInTheDocument()
  })

  it("renders Instagram link with ARIA label", () => {
    render(<AuthorStory />)
    const links = screen.getAllByLabelText("Читать историю автора в Instagram актуальном")
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
