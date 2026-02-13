import { describe, it, expect, vi, afterEach, beforeEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(cleanup)

beforeEach(() => {
  vi.clearAllMocks()
})

import { CurrencySelector } from "@/components/CurrencySelector"

describe("CurrencySelector", () => {
  const onSelect = vi.fn()

  it("renders without errors", () => {
    render(<CurrencySelector selected="USD" onSelect={onSelect} />)
    expect(screen.getAllByText("USD").length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 4 currency buttons", () => {
    render(<CurrencySelector selected="USD" onSelect={onSelect} />)
    expect(screen.getAllByText("USD").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("EUR").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("UAH").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("RUB").length).toBeGreaterThanOrEqual(1)
  })

  it("highlights the selected currency", () => {
    render(<CurrencySelector selected="EUR" onSelect={onSelect} />)
    const eurButtons = screen.getAllByText("EUR")
    expect(eurButtons[0].className).toContain("bg-accent")
  })

  it("calls onSelect when a currency is clicked", async () => {
    const user = userEvent.setup()
    render(<CurrencySelector selected="USD" onSelect={onSelect} />)

    const rubButtons = screen.getAllByText("RUB")
    await user.click(rubButtons[0])
    expect(onSelect).toHaveBeenCalledWith("RUB")
  })

  it("calls onSelect with correct value for each currency", async () => {
    const user = userEvent.setup()
    const mockOnSelect = vi.fn()
    render(<CurrencySelector selected="USD" onSelect={mockOnSelect} />)

    const eurButtons = screen.getAllByText("EUR")
    await user.click(eurButtons[0])
    expect(mockOnSelect).toHaveBeenCalledWith("EUR")

    const uahButtons = screen.getAllByText("UAH")
    await user.click(uahButtons[0])
    expect(mockOnSelect).toHaveBeenCalledWith("UAH")
  })

  it("accepts custom className", () => {
    const { container } = render(
      <CurrencySelector selected="USD" onSelect={onSelect} className="custom-class" />
    )
    expect(container.querySelector(".custom-class")).toBeInTheDocument()
  })
})
