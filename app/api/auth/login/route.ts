import { NextRequest, NextResponse } from "next/server"

// TODO: Replace with real authentication (database lookup, password hashing)
// This is a placeholder that demonstrates the auth flow
const DEMO_CREDENTIALS = {
  email: process.env.AUTH_DEMO_EMAIL || "demo@french-super.com",
  password: process.env.AUTH_DEMO_PASSWORD || "demo2026",
}

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Неверный формат запроса" }, { status: 400 })
  }

  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: "Введите email и пароль" }, { status: 400 })
  }

  // TODO: Replace with real auth check (bcrypt compare, DB lookup)
  if (email !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 })
  }

  // TODO: Replace with JWT or secure session token
  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

  const response = NextResponse.json({ success: true })

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  return response
}
