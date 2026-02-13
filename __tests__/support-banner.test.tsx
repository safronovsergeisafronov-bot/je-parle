import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import React from "react"

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, className, style }: any, ref: any) => (
      <div ref={ref} className={className} style={style}>{children}</div>
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

import { SupportBanner } from "@/components/sections/SupportBanner"
import { darkCards } from "@/lib/data"

describe("SupportBanner", () => {
  it("renders without errors", () => {
    render(<SupportBanner />)
    expect(screen.getAllByText(/При поддержке/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the section title mentioning French Tech and CopyFrog", () => {
    render(<SupportBanner />)
    const headings = screen.getAllByRole("heading", { level: 3 })
    const matchingHeading = headings.find(h => h.textContent?.includes("French Tech") && h.textContent?.includes("CopyFrog"))
    expect(matchingHeading).toBeTruthy()
  })

  it("renders French Tech and CopyFrog logo images", () => {
    render(<SupportBanner />)
    expect(screen.getAllByAltText("French Tech").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByAltText("CopyFrog").length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 4 dark cards with titles", () => {
    render(<SupportBanner />)
    darkCards.forEach((card) => {
      // Titles may contain \n (rendered with whitespace-pre-line) and \u00A0
      // Use regex to match allowing any whitespace
      const titleRegex = new RegExp(card.title.replace(/\n/g, ".").replace(/\u00A0/g, ".").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\./g, "."))
      expect(screen.getAllByText(titleRegex).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders all 4 dark cards with descriptions", () => {
    render(<SupportBanner />)
    darkCards.forEach((card) => {
      const descRegex = new RegExp(card.description.replace(/\n/g, ".").replace(/\u00A0/g, ".").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\./g, "."))
      expect(screen.getAllByText(descRegex).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders the info description text", () => {
    render(<SupportBanner />)
    expect(screen.getAllByText(/Французская инновационная экосистема/).length).toBeGreaterThanOrEqual(1)
  })

  it("has ARIA labels on logo circles", () => {
    render(<SupportBanner />)
    expect(screen.getAllByLabelText("French Tech").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByLabelText("CopyFrog").length).toBeGreaterThanOrEqual(1)
  })
})
