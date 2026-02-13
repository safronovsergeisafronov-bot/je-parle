import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"

vi.mock("@/components/ContactModal", () => ({
  ContactModal: ({ children }: any) => <div data-testid="contact-modal">{children}</div>,
}))

vi.mock("@/components/TextGenerateEffect", () => ({
  TextGenerateEffect: ({ text, as: Tag = "span", className }: any) => {
    const Component = Tag
    return <Component className={className}>{text}</Component>
  },
}))

// Mock Radix Accordion to avoid jsdom timeouts
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children, className }: any) => <div className={className} data-testid="accordion">{children}</div>,
  AccordionItem: ({ children, className, value }: any) => <div className={className} data-state="closed" data-value={value}>{children}</div>,
  AccordionTrigger: ({ children, className }: any) => <button className={className}>{children}</button>,
  AccordionContent: ({ children, className }: any) => <div className={className}>{children}</div>,
}))

afterEach(cleanup)

import { FAQ } from "@/components/sections/FAQ"
import { faqItems } from "@/lib/data"

describe("FAQ", () => {
  it("renders without errors", () => {
    render(<FAQ />)
    expect(screen.getAllByText("Ответы на вопросы").length).toBeGreaterThanOrEqual(1)
  })

  it("has section id for anchor navigation", () => {
    render(<FAQ />)
    const section = document.querySelector("section#faq")
    expect(section).toBeInTheDocument()
  })

  it("renders all 9 FAQ questions", () => {
    render(<FAQ />)
    faqItems.forEach((item) => {
      expect(screen.getAllByText(item.question).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders the Задать вопрос button within ContactModal", () => {
    render(<FAQ />)
    expect(screen.getAllByText("Задать вопрос").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByTestId("contact-modal").length).toBeGreaterThanOrEqual(1)
  })

  it("renders accordion items", () => {
    const { container } = render(<FAQ />)
    const items = container.querySelectorAll("[data-state]")
    expect(items.length).toBeGreaterThanOrEqual(9)
  })
})
