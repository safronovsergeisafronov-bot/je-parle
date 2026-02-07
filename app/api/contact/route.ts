import { NextRequest, NextResponse } from "next/server"

interface ContactBody {
  name: string
  contactMethod: "telegram" | "whatsapp"
  contact: string
  message: string
  type: "question" | "help"
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
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

  // TODO: Here you would send email, save to DB, or forward to Telegram bot
  // For now, we log the submission (in production, replace with actual handler)
  if (process.env.NODE_ENV === "development") {
    console.log("Contact form submission:", {
      type: body.type,
      name: body.name,
      contactMethod: body.contactMethod,
      contact: body.contact,
      messageLength: body.message.length,
    })
  }

  return NextResponse.json({ success: true })
}
