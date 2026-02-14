import { describe, it, expect, vi, afterEach, beforeAll } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

// Mock IntersectionObserver for video lazy-loading
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

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

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock("@/components/TextGenerateEffect", () => ({
  TextGenerateEffect: ({ text, as: Tag = "span", className }: any) => {
    const Component = Tag
    return <Component className={className}>{text}</Component>
  },
}))

vi.mock("@/components/CountdownTimer", () => ({
  CountdownTimer: ({ variant }: any) => <div data-testid="countdown-timer">Timer ({variant})</div>,
}))

vi.mock("@/components/CurrencySelector", () => ({
  CurrencySelector: ({ selected, onSelect }: any) => (
    <div data-testid="currency-selector">
      {["USD", "EUR", "UAH", "RUB"].map((c: string) => (
        <button key={c} onClick={() => onSelect(c)} data-selected={c === selected}>
          {c}
        </button>
      ))}
    </div>
  ),
}))

vi.mock("@/components/PurchaseModal", () => ({
  PurchaseModal: ({ children }: any) => <div data-testid="purchase-modal">{children}</div>,
}))

vi.mock("@/components/HelpModal", () => ({
  HelpModal: ({ children }: any) => <div data-testid="help-modal">{children}</div>,
}))

afterEach(cleanup)

import { Pricing } from "@/components/sections/Pricing"
import { prices, pricingFeatures } from "@/lib/data"

describe("Pricing", () => {
  it("renders without errors", () => {
    render(<Pricing />)
    expect(screen.getAllByText("Сколько стоит книга?").length).toBeGreaterThanOrEqual(1)
  })

  it("has section id for anchor navigation", () => {
    render(<Pricing />)
    const section = document.querySelector("#buy")
    expect(section).toBeInTheDocument()
  })

  it("renders the pricing card with default USD price", () => {
    render(<Pricing />)
    expect(screen.getAllByText(`$${prices.USD.price}`).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all pricing features", () => {
    render(<Pricing />)
    pricingFeatures.forEach((feature) => {
      // Use regex to handle non-breaking spaces
      const regex = new RegExp(feature.replace(/\u00A0/g, ".").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\./g, "."))
      expect(screen.getAllByText(regex).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders the countdown timer", () => {
    render(<Pricing />)
    expect(screen.getAllByTestId("countdown-timer").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the currency selector", () => {
    render(<Pricing />)
    expect(screen.getAllByTestId("currency-selector").length).toBeGreaterThanOrEqual(1)
  })

  it("switches currency and updates price on currency change", async () => {
    const user = userEvent.setup()
    render(<Pricing />)

    await user.click(screen.getByText("EUR"))
    expect(screen.getAllByText(`€${prices.EUR.price}`).length).toBeGreaterThanOrEqual(1)
  })

  it("shows RUB link instead of PurchaseModal when RUB selected", async () => {
    const user = userEvent.setup()
    render(<Pricing />)

    await user.click(screen.getByText("RUB"))
    expect(screen.getAllByText(/Приобрести книгу \(RUB\)/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders spetscena section", () => {
    render(<Pricing />)
    expect(screen.getAllByText(/Спеццена/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/действует до/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders help request section", () => {
    render(<Pricing />)
    expect(screen.getAllByText(/Оставьте заявку/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByTestId("help-modal").length).toBeGreaterThanOrEqual(1)
  })

  it("renders payment methods tabs", () => {
    render(<Pricing />)
    expect(screen.getAllByText("Международные карты").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Банковские карты РФ").length).toBeGreaterThanOrEqual(1)
  })

  it("renders secure payment text", () => {
    render(<Pricing />)
    expect(screen.getAllByText(/Безопасная оплата/).length).toBeGreaterThanOrEqual(1)
  })
})
