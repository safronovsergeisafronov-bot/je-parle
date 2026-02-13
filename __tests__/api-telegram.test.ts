import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { escapeMarkdown, sendToTelegram } from "../app/api/contact/route"

const VALID_BODY = {
  name: "Тест Тестов",
  contactMethod: "telegram" as const,
  contact: "@testuser",
  message: "Тестовое сообщение для проверки",
  type: "question" as const,
}

describe("escapeMarkdown", () => {
  it("escapes MarkdownV2 special characters", () => {
    expect(escapeMarkdown("hello_world")).toBe("hello\\_world")
    expect(escapeMarkdown("*bold*")).toBe("\\*bold\\*")
    expect(escapeMarkdown("[link](url)")).toBe("\\[link\\]\\(url\\)")
    expect(escapeMarkdown("a~b`c>d#e")).toBe("a\\~b\\`c\\>d\\#e")
    expect(escapeMarkdown("1+2=3")).toBe("1\\+2\\=3")
    expect(escapeMarkdown("a|b{c}d")).toBe("a\\|b\\{c\\}d")
    expect(escapeMarkdown("end.")).toBe("end\\.")
    expect(escapeMarkdown("a!b")).toBe("a\\!b")
    expect(escapeMarkdown("a\\b")).toBe("a\\\\b")
    expect(escapeMarkdown("a-b")).toBe("a\\-b")
  })

  it("leaves plain text unchanged", () => {
    expect(escapeMarkdown("hello world")).toBe("hello world")
    expect(escapeMarkdown("Привет мир")).toBe("Привет мир")
    expect(escapeMarkdown("abc123")).toBe("abc123")
  })
})

describe("sendToTelegram", () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  it("returns false when TELEGRAM_BOT_TOKEN is not set", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN
    delete process.env.TELEGRAM_CHAT_ID

    const result = await sendToTelegram(VALID_BODY)
    expect(result).toBe(false)
  })

  it("returns false when TELEGRAM_CHAT_ID is not set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token"
    delete process.env.TELEGRAM_CHAT_ID

    const result = await sendToTelegram(VALID_BODY)
    expect(result).toBe(false)
  })
})
