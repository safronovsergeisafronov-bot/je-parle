import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockPause = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

afterEach(cleanup)

beforeEach(() => {
  vi.clearAllMocks()
  global.Audio = vi.fn().mockImplementation(function (this: any) {
    this.play = mockPlay
    this.pause = mockPause
    this.currentTime = 0
    this.addEventListener = mockAddEventListener
    this.removeEventListener = mockRemoveEventListener
  }) as any
})

import { AudioButton } from "@/components/AudioButton"

describe("AudioButton", () => {
  it("renders without errors", () => {
    render(<AudioButton src="/audio/test.mp3" />)
    const buttons = screen.getAllByLabelText("Прослушать аудио")
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it("shows play state initially", () => {
    render(<AudioButton src="/audio/test.mp3" />)
    expect(screen.getAllByText("Прослушать аудио").length).toBeGreaterThanOrEqual(1)
  })

  it("creates Audio instance with provided src", () => {
    render(<AudioButton src="/audio/test.mp3" />)
    expect(global.Audio).toHaveBeenCalledWith("/audio/test.mp3")
  })

  it("plays audio on click", async () => {
    const user = userEvent.setup()
    render(<AudioButton src="/audio/test.mp3" />)

    const buttons = screen.getAllByLabelText("Прослушать аудио")
    await user.click(buttons[0])
    expect(mockPlay).toHaveBeenCalled()
  })

  it("shows stop state after clicking play", async () => {
    const user = userEvent.setup()
    render(<AudioButton src="/audio/test.mp3" />)

    const buttons = screen.getAllByLabelText("Прослушать аудио")
    await user.click(buttons[0])
    expect(screen.getAllByText("Остановить").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByLabelText("Остановить аудио").length).toBeGreaterThanOrEqual(1)
  })

  it("stops audio on second click", async () => {
    const user = userEvent.setup()
    render(<AudioButton src="/audio/test.mp3" />)

    const playBtns = screen.getAllByLabelText("Прослушать аудио")
    await user.click(playBtns[0])
    const stopBtns = screen.getAllByLabelText("Остановить аудио")
    await user.click(stopBtns[0])
    expect(mockPause).toHaveBeenCalled()
  })

  it("registers ended event listener", () => {
    render(<AudioButton src="/audio/test.mp3" />)
    expect(mockAddEventListener).toHaveBeenCalledWith("ended", expect.any(Function))
  })

  it("accepts custom className", () => {
    const { container } = render(<AudioButton src="/audio/test.mp3" className="custom-audio" />)
    const button = container.querySelector("button")
    expect(button?.className).toContain("custom-audio")
  })
})
