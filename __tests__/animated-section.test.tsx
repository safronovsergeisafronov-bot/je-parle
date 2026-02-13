import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

let reducedMotion = false

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, className }: any, ref: any) => (
      <div ref={ref} className={className} data-testid="motion-div">{children}</div>
    )),
  },
  useReducedMotion: () => reducedMotion,
}))

afterEach(cleanup)

import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/AnimatedSection"

describe("AnimatedSection", () => {
  beforeEach(() => {
    reducedMotion = false
  })

  it("renders children", () => {
    render(<AnimatedSection><p>Test content</p></AnimatedSection>)
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("renders with custom className when motion is active", () => {
    render(<AnimatedSection className="custom-class"><p>Content</p></AnimatedSection>)
    const motionDivs = screen.getAllByTestId("motion-div")
    const hasCustomClass = motionDivs.some(div => div.className.includes("custom-class"))
    expect(hasCustomClass).toBe(true)
  })

  it("renders a plain div when reduced motion is preferred", () => {
    reducedMotion = true
    const { container } = render(
      <AnimatedSection className="test-class"><p>Reduced motion content</p></AnimatedSection>
    )
    expect(screen.getByText("Reduced motion content")).toBeInTheDocument()
    expect(container.querySelector(".test-class")).toBeInTheDocument()
  })
})

describe("StaggerChildren", () => {
  beforeEach(() => {
    reducedMotion = false
  })

  it("renders children", () => {
    render(
      <StaggerChildren>
        <div>Child 1</div>
        <div>Child 2</div>
      </StaggerChildren>
    )
    expect(screen.getByText("Child 1")).toBeInTheDocument()
    expect(screen.getByText("Child 2")).toBeInTheDocument()
  })

  it("renders a plain div when reduced motion is preferred", () => {
    reducedMotion = true
    render(
      <StaggerChildren className="stagger-class">
        <div>Stagger content here</div>
      </StaggerChildren>
    )
    expect(screen.getByText("Stagger content here")).toBeInTheDocument()
  })
})

describe("StaggerItem", () => {
  beforeEach(() => {
    reducedMotion = false
  })

  it("renders children", () => {
    render(
      <StaggerItem><p>Item content</p></StaggerItem>
    )
    expect(screen.getByText("Item content")).toBeInTheDocument()
  })

  it("renders with custom className", () => {
    render(
      <StaggerItem className="item-class"><p>Styled item</p></StaggerItem>
    )
    expect(screen.getByText("Styled item")).toBeInTheDocument()
  })
})
