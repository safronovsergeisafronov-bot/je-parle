import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"

vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: any) => <img {...props} />,
}))

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

afterEach(cleanup)

import { Footer } from "@/components/sections/Footer"
import { footerNavColumns } from "@/lib/data"

describe("Footer", () => {
  it("renders without errors", () => {
    render(<Footer />)
    expect(screen.getAllByText(/Держи способы/).length).toBeGreaterThanOrEqual(1)
  })

  it("has footer id for anchor navigation", () => {
    render(<Footer />)
    const footer = document.querySelector("footer#contact")
    expect(footer).toBeInTheDocument()
  })

  it("renders the logo", () => {
    render(<Footer />)
    expect(screen.getAllByAltText("French.Super").length).toBeGreaterThanOrEqual(1)
  })

  it("renders social links for Instagram, Telegram, YouTube", () => {
    render(<Footer />)
    expect(screen.getAllByText("Личный блог").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Польза").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Учись со мной").length).toBeGreaterThanOrEqual(1)
  })

  it("renders all footer navigation links", () => {
    render(<Footer />)
    const allLinks = footerNavColumns.flatMap(col => col.links)
    allLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders Оплатить CTA button", () => {
    render(<Footer />)
    expect(screen.getAllByText("Оплатить").length).toBeGreaterThanOrEqual(1)
  })

  it("renders copyright text", () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    const copyrightElements = screen.getAllByText(new RegExp(`© ${year} FrenchSuper`))
    expect(copyrightElements.length).toBeGreaterThanOrEqual(1)
  })

  it("renders partner logos", () => {
    render(<Footer />)
    expect(screen.getAllByAltText("French Tech").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByAltText("CopyFrog").length).toBeGreaterThanOrEqual(1)
  })

  it("opens social links in new tab", () => {
    render(<Footer />)
    const instagramLinks = screen.getAllByLabelText("Instagram — Личный блог")
    expect(instagramLinks[0]).toHaveAttribute("target", "_blank")
    expect(instagramLinks[0]).toHaveAttribute("rel", "noopener noreferrer")
  })
})
