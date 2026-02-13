import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockPause = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, className, style }: any, ref: any) => (
      <div ref={ref} className={className} style={style}>{children}</div>
    )),
  },
  useReducedMotion: () => false,
}))

afterEach(cleanup)

beforeEach(() => {
  vi.clearAllMocks()
  global.Audio = vi.fn().mockImplementation(function (this: any, src: string) {
    this.play = mockPlay
    this.pause = mockPause
    this.currentTime = 0
    this.addEventListener = mockAddEventListener
    this.removeEventListener = mockRemoveEventListener
  }) as any
})

import { FlipCard } from "@/components/FlipCard"

const defaultProps = {
  theme: "Les relations",
  themeRu: "Отношения",
  topic: "La 1ère rencontre",
  topicRu: "Первая встреча",
  audioSrc: "/audio/test.mp3",
  iconSrc: "/images/test.svg",
}

describe("FlipCard", () => {
  it("renders without errors", () => {
    render(<FlipCard {...defaultProps} />)
    expect(screen.getAllByText("Les relations").length).toBeGreaterThanOrEqual(1)
  })

  it("renders theme and topic on the front", () => {
    render(<FlipCard {...defaultProps} />)
    expect(screen.getAllByText("Les relations").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("(Отношения)").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/La 1ère rencontre \/ Первая встреча/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders the flip button with ARIA label", () => {
    render(<FlipCard {...defaultProps} />)
    expect(screen.getAllByLabelText("Узнать как переводится").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the audio play button with ARIA label", () => {
    render(<FlipCard {...defaultProps} />)
    expect(screen.getAllByLabelText("Прослушать аудио").length).toBeGreaterThanOrEqual(1)
  })

  it("creates Audio instance with provided src", () => {
    render(<FlipCard {...defaultProps} />)
    expect(global.Audio).toHaveBeenCalledWith("/audio/test.mp3")
  })

  it("plays audio when play button is clicked", { timeout: 15000 }, async () => {
    const user = userEvent.setup()
    render(<FlipCard {...defaultProps} />)

    const buttons = screen.getAllByLabelText("Прослушать аудио")
    await user.click(buttons[0])
    expect(mockPlay).toHaveBeenCalled()
  })

  it("stops audio when playing and play button is clicked again", async () => {
    const user = userEvent.setup()
    render(<FlipCard {...defaultProps} />)

    const playButtons = screen.getAllByLabelText("Прослушать аудио")
    await user.click(playButtons[0])
    const stopButtons = screen.getAllByLabelText("Остановить аудио")
    await user.click(stopButtons[0])
    expect(mockPause).toHaveBeenCalled()
  })

  it("flips to show the back side on click", async () => {
    const user = userEvent.setup()
    render(<FlipCard {...defaultProps} />)

    const flipButtons = screen.getAllByLabelText("Узнать как переводится")
    await user.click(flipButtons[0])
    expect(screen.getAllByText("Перевод").length).toBeGreaterThanOrEqual(1)
  })

  it("flips back to front when back button is clicked", async () => {
    const user = userEvent.setup()
    render(<FlipCard {...defaultProps} />)

    const flipButtons = screen.getAllByLabelText("Узнать как переводится")
    await user.click(flipButtons[0])
    const backButtons = screen.getAllByLabelText("Вернуться к оригиналу")
    await user.click(backButtons[0])
    expect(screen.getAllByText("Les relations").length).toBeGreaterThanOrEqual(1)
  })

  it("renders icon image when iconSrc is provided", () => {
    const { container } = render(<FlipCard {...defaultProps} />)
    const iconImg = container.querySelector('img[src="/images/test.svg"]')
    expect(iconImg).toBeInTheDocument()
  })

  it("does not render audio button when no audioSrc", () => {
    render(<FlipCard {...defaultProps} audioSrc={undefined} />)
    expect(screen.queryAllByLabelText("Прослушать аудио")).toHaveLength(0)
  })
})
