import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"

vi.mock("@/components/PdfViewerModal", () => ({
  PdfViewerModal: ({ children, pdfUrl, title }: any) => (
    <div data-testid="pdf-viewer-modal" data-pdf-url={pdfUrl} data-title={title}>
      {children}
    </div>
  ),
}))

afterEach(cleanup)

beforeEach(() => {
  Object.defineProperty(window, "innerWidth", { writable: true, value: 1280 })
  HTMLMediaElement.prototype.load = vi.fn()
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
  HTMLMediaElement.prototype.pause = vi.fn()
})

import { WhatInside } from "@/components/sections/WhatInside"

describe("WhatInside", () => {
  it("renders without errors", () => {
    render(<WhatInside />)
    expect(screen.getAllByText(/Интересно,/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the section heading", () => {
    render(<WhatInside />)
    expect(screen.getAllByText(/что внутри\?/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the free fragment CTA button", () => {
    render(<WhatInside />)
    const buttons = screen.getAllByText("Читать фрагмент")
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it("renders the PdfViewerModal with correct pdf url", () => {
    render(<WhatInside />)
    const modal = screen.getByTestId("pdf-viewer-modal")
    expect(modal).toHaveAttribute("data-pdf-url", "/docs/fragment.pdf")
  })

  it("renders the free fragment badge", () => {
    render(<WhatInside />)
    expect(screen.getAllByText("Бесплатный фрагмент").length).toBeGreaterThanOrEqual(1)
  })

  it("renders PDF badge", () => {
    render(<WhatInside />)
    expect(screen.getAllByText("PDF 16 страниц").length).toBeGreaterThanOrEqual(1)
  })

  it("renders product size badge", () => {
    render(<WhatInside />)
    expect(screen.getAllByText(/Весь продукт в 6,7 раз больше/).length).toBeGreaterThanOrEqual(1)
  })

  it("has section id for anchor navigation", () => {
    render(<WhatInside />)
    const section = document.querySelector("#inside")
    expect(section).toBeInTheDocument()
  })
})
