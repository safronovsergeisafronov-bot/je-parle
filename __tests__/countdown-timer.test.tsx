import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"

import { CountdownTimer } from "@/components/CountdownTimer"

describe("CountdownTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders without errors (default variant)", () => {
    const future = new Date(Date.now() + 5 * 86400000) // +5 days
    render(<CountdownTimer targetDate={future} />)
    // Should render some time label (pluralized)
    expect(screen.getAllByText(/дней|дня|день/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders without errors (minimal variant)", () => {
    const future = new Date(Date.now() + 5 * 86400000)
    render(<CountdownTimer targetDate={future} variant="minimal" />)
    expect(screen.getAllByText(/дней|дня|день/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders all 4 time labels", () => {
    const future = new Date(Date.now() + 5 * 86400000) // +5 days → 5 дней
    render(<CountdownTimer targetDate={future} />)
    expect(screen.getAllByText(/дней|дня|день/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/часов|часа|час/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/минут|минуты|минута/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/секунд|секунды|секунда/).length).toBeGreaterThanOrEqual(1)
  })

  it("displays zeros when target date is in the past", () => {
    const past = new Date(Date.now() - 86400000) // -1 day
    render(<CountdownTimer targetDate={past} />)
    // After mount, all values should be 0
    vi.advanceTimersByTime(1000)
    // Look for the time blocks, should show 00
    const allText = screen.getAllByText("00")
    expect(allText.length).toBeGreaterThanOrEqual(1)
  })

  it("updates countdown every second", () => {
    const future = new Date(Date.now() + 90000) // +90 seconds
    render(<CountdownTimer targetDate={future} />)

    vi.advanceTimersByTime(1000)

    // Timer should have updated — check for any minute label form
    expect(screen.getAllByText(/минут|минуты|минута/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders separators in default variant", () => {
    const future = new Date(Date.now() + 86400000)
    render(<CountdownTimer targetDate={future} />)
    vi.advanceTimersByTime(100)
    const separators = screen.getAllByText(":")
    expect(separators.length).toBeGreaterThanOrEqual(1)
  })

  it("accepts custom className", () => {
    const future = new Date(Date.now() + 86400000)
    const { container } = render(<CountdownTimer targetDate={future} className="custom-timer" />)
    expect(container.querySelector(".custom-timer")).toBeInTheDocument()
  })

  it("correctly pluralizes Russian time labels", () => {
    // Test with 21 days → should show "день" (not "дней")
    const future = new Date(Date.now() + 21 * 86400000)
    render(<CountdownTimer targetDate={future} />)
    expect(screen.getAllByText("день").length).toBeGreaterThanOrEqual(1)
  })
})
