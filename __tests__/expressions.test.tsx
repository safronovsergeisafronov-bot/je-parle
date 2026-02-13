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

vi.mock("@/components/FlipCard", () => ({
  FlipCard: ({ theme, themeRu, topic, topicRu }: any) => (
    <div data-testid="flip-card">
      <span data-testid="flip-theme">{theme}</span>
      <span data-testid="flip-topicRu">{topicRu}</span>
    </div>
  ),
}))

afterEach(cleanup)

import { Expressions } from "@/components/sections/Expressions"
import { expressionCards } from "@/lib/data"

describe("Expressions", () => {
  it("renders without errors", () => {
    render(<Expressions />)
    expect(screen.getAllByText(/Поймёшь ли/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the section heading", () => {
    render(<Expressions />)
    expect(screen.getAllByText(/что сказали/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 4 flip cards", () => {
    render(<Expressions />)
    const cards = screen.getAllByTestId("flip-card")
    expect(cards.length).toBeGreaterThanOrEqual(expressionCards.length)
  })

  it("passes correct topic data to FlipCards", () => {
    render(<Expressions />)
    expressionCards.forEach((card) => {
      expect(screen.getAllByText(card.topicRu).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders the description text", () => {
    render(<Expressions />)
    expect(screen.getAllByText(/Сейчас ты услышишь французскую речь/).length).toBeGreaterThanOrEqual(1)
  })
})
