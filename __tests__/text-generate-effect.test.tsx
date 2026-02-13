import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

beforeEach(() => {
  vi.restoreAllMocks()

  // Mock matchMedia for reduced motion check
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Mock IntersectionObserver that immediately reports intersection
  const mockIntersectionObserver = vi.fn().mockImplementation(function (this: any, cb: any) {
    this.observe = vi.fn().mockImplementation(() => {
      cb([{ isIntersecting: true }])
    })
    this.unobserve = vi.fn()
    this.disconnect = vi.fn()
  })

  global.IntersectionObserver = mockIntersectionObserver as any
})

import { TextGenerateEffect } from "@/components/TextGenerateEffect"

describe("TextGenerateEffect", () => {
  it("renders without errors", () => {
    render(<TextGenerateEffect text="Hello World" />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
    expect(screen.getByText("World")).toBeInTheDocument()
  })

  it("splits text into individual words", () => {
    render(<TextGenerateEffect text="One Two Three" />)
    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("Two")).toBeInTheDocument()
    expect(screen.getByText("Three")).toBeInTheDocument()
  })

  it("renders as the specified element tag", () => {
    const { container } = render(<TextGenerateEffect text="Heading" as="h2" />)
    expect(container.querySelector("h2")).toBeInTheDocument()
  })

  it("defaults to span element", () => {
    const { container } = render(<TextGenerateEffect text="Default" />)
    expect(container.querySelector("span.text-generate")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<TextGenerateEffect text="Styled" className="custom-style" />)
    expect(container.querySelector(".custom-style")).toBeInTheDocument()
  })

  it("creates IntersectionObserver", () => {
    render(<TextGenerateEffect text="Observed" />)
    expect(global.IntersectionObserver).toHaveBeenCalled()
  })

  it("adds in-view class when element is intersecting", () => {
    const { container } = render(<TextGenerateEffect text="Visible" />)
    expect(container.querySelector(".in-view")).toBeInTheDocument()
  })

  it("renders word spans with word class", () => {
    const { container } = render(<TextGenerateEffect text="First Second" />)
    const words = container.querySelectorAll(".word")
    expect(words.length).toBe(2)
  })

  it("sets isInView immediately when reduced motion is preferred", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { container } = render(<TextGenerateEffect text="Reduced" />)
    expect(container.querySelector(".in-view")).toBeInTheDocument()
  })
})
