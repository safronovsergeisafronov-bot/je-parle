import { NextRequest, NextResponse } from "next/server"

interface ContactBody {
  name: string
  contactMethod: "telegram" | "whatsapp"
  contact: string
  message: string
  type: "question" | "help"
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 1000 // 1 minute
let rateLimitRequestCount = 0

function checkRateLimit(ip: string): boolean {
  const now = Date.now()

  // Periodically clean up stale entries every ~100 requests
  rateLimitRequestCount++
  if (rateLimitRequestCount >= 100) {
    rateLimitRequestCount = 0
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

function validateBody(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>

  if (typeof b.name !== "string" || b.name.trim().length < 2 || b.name.length > 100) return false
  if (b.contactMethod !== "telegram" && b.contactMethod !== "whatsapp") return false
  if (typeof b.contact !== "string" || b.contact.trim().length < 2 || b.contact.length > 100) return false
  if (typeof b.message !== "string" || b.message.trim().length < 5 || b.message.length > 2000) return false
  if (b.type !== "question" && b.type !== "help") return false

  return true
}

export function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, "\\$&")
}

export async function sendToTelegram(body: ContactBody): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured, skipping send")
    return false
  }

  const typeLabel = body.type === "question" ? "Вопрос" : "Нужна помощь"

  // Формируем кликабельную ссылку на контакт
  let contactLink = ""
  if (body.contactMethod === "whatsapp") {
    // WhatsApp формат: https://wa.me/79991234567 (без +, пробелов, дефисов)
    const cleanPhone = body.contact.replace(/[^\d]/g, "")
    contactLink = `[${escapeMarkdown(body.contact)}](https://wa.me/${cleanPhone})`
  } else {
    // Telegram формат: https://t.me/username (без @)
    const username = body.contact.replace(/^@/, "")
    contactLink = `[${escapeMarkdown(body.contact)}](https://t.me/${escapeMarkdown(username)})`
  }

  const text = [
    `\u{1F4E9} *${escapeMarkdown(typeLabel)}*`,
    "",
    `\u{1F464} *Имя:* ${escapeMarkdown(body.name)}`,
    `\u{1F4F1} *Контакт:* ${contactLink} \\(${escapeMarkdown(body.contactMethod)}\\)`,
    "",
    `\u{1F4AC} *Сообщение:*`,
    escapeMarkdown(body.message),
  ].join("\n")

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    }
  )

  return res.ok
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте через минуту." },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Неверный формат запроса." },
      { status: 400 }
    )
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: "Пожалуйста, заполните все поля корректно." },
      { status: 400 }
    )
  }

  try {
    const sent = await sendToTelegram(body)

    if (!sent && TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      // Telegram API returned an error
      return NextResponse.json(
        { error: "Не удалось отправить сообщение. Напишите напрямую в Telegram: @frenchsuper" },
        { status: 500 }
      )
    }

    // If credentials not configured (sent === false without token), still return success in dev
    if (!sent) {
      if (process.env.NODE_ENV === "development") {
        console.log("Contact form submission (Telegram not configured):", {
          type: body.type,
          name: body.name,
          contactMethod: body.contactMethod,
          contact: body.contact,
          messageLength: body.message.length,
        })
      }
    }
  } catch (error) {
    console.error("Failed to send to Telegram:", error)
    return NextResponse.json(
      { error: "Не удалось отправить сообщение. Напишите напрямую в Telegram: @frenchsuper" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
