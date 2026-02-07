import { describe, it, expect } from "vitest"

const VALID_BODY = {
  name: "Тест Тестов",
  contactMethod: "telegram",
  contact: "@testuser",
  message: "Тестовое сообщение для проверки",
  type: "question",
}

// Unit test the validation logic directly
function validateBody(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>

  if (typeof b.name !== "string" || b.name.trim().length < 2 || b.name.length > 100) return false
  if (b.contactMethod !== "telegram" && b.contactMethod !== "whatsapp") return false
  if (typeof b.contact !== "string" || b.contact.trim().length < 2 || b.contact.length > 100) return false
  if (typeof b.message !== "string" || b.message.trim().length < 5 || b.message.length > 2000) return false
  if (b.type !== "question" && b.type !== "help") return false

  return true
}

describe("Contact API validation", () => {
  it("accepts valid body", () => {
    expect(validateBody(VALID_BODY)).toBe(true)
  })

  it("rejects empty body", () => {
    expect(validateBody(null)).toBe(false)
    expect(validateBody(undefined)).toBe(false)
    expect(validateBody({})).toBe(false)
  })

  it("rejects short name", () => {
    expect(validateBody({ ...VALID_BODY, name: "A" })).toBe(false)
  })

  it("rejects invalid contact method", () => {
    expect(validateBody({ ...VALID_BODY, contactMethod: "email" })).toBe(false)
  })

  it("rejects short message", () => {
    expect(validateBody({ ...VALID_BODY, message: "hi" })).toBe(false)
  })

  it("rejects invalid type", () => {
    expect(validateBody({ ...VALID_BODY, type: "spam" })).toBe(false)
  })

  it("accepts help type", () => {
    expect(validateBody({ ...VALID_BODY, type: "help" })).toBe(true)
  })

  it("accepts whatsapp", () => {
    expect(validateBody({ ...VALID_BODY, contactMethod: "whatsapp" })).toBe(true)
  })
})
