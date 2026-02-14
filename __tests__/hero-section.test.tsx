import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: any) => children,
}))

vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: any) => <img {...props} />,
}))

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock("@/components/ContactModal", () => ({
  ContactModal: ({ children }: any) => <div data-testid="contact-modal">{children}</div>,
}))

vi.mock("@/components/TextGenerateEffect", () => ({
  TextGenerateEffect: ({ text, as: Tag = "span", className }: any) => {
    const Component = Tag
    return <Component className={className}>{text}</Component>
  },
}))

afterEach(cleanup)

import { HeroSection } from "@/components/sections/HeroSection"
import { advantageCards, mobileNavLinks } from "@/lib/data"

describe("HeroSection", () => {
  it("renders without errors", () => {
    render(<HeroSection />)
    expect(screen.getAllByRole("img", { name: /French\.Super/i }).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the main heading text", () => {
    render(<HeroSection />)
    expect(screen.getAllByText("Книга, собранная").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("не за день — а за 7 лет").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("преподавания французского.").length).toBeGreaterThanOrEqual(1)
  })

  it("renders CTA buttons", () => {
    render(<HeroSection />)
    expect(screen.getAllByText(/Получить книгу/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Посмотреть фрагмент").length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 4 advantage cards", () => {
    render(<HeroSection />)
    advantageCards.forEach((card) => {
      // Use regex to handle non-breaking spaces from fixOrphans
      const regex = new RegExp(card.title.replace(/\u00A0/g, ".").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\./g, "."))
      expect(screen.getAllByText(regex).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders desktop navigation links", () => {
    render(<HeroSection />)
    expect(screen.getAllByText("Что внутри").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Почему это работает").length).toBeGreaterThanOrEqual(1)
  })

  it("has mobile menu button with aria-label", () => {
    render(<HeroSection />)
    const menuButtons = screen.getAllByLabelText("Открыть меню")
    expect(menuButtons.length).toBeGreaterThanOrEqual(1)
  })

  it("toggles mobile menu on click", async () => {
    const user = userEvent.setup()
    render(<HeroSection />)

    const menuButtons = screen.getAllByLabelText("Открыть меню")
    await user.click(menuButtons[0])

    mobileNavLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThanOrEqual(1)
    })

    expect(screen.getAllByLabelText("Закрыть меню").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the hero image with alt text", () => {
    render(<HeroSection />)
    const images = screen.getAllByRole("img")
    const heroImage = images.find((img) => img.getAttribute("alt")?.includes("Je Parle!"))
    expect(heroImage).toBeTruthy()
  })

  it("renders Связаться button within ContactModal", () => {
    render(<HeroSection />)
    const modals = screen.getAllByTestId("contact-modal")
    expect(modals.length).toBeGreaterThanOrEqual(1)
  })
})
