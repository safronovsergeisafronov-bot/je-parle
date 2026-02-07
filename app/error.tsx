"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: Send to error tracking service (Sentry, etc.)
    if (process.env.NODE_ENV === "development") {
      console.error("App error:", error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-accent mx-auto mb-6" />
        <h1 className="text-2xl font-light mb-3">Что-то пошло не так</h1>
        <p className="text-muted-foreground mb-8">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            Попробовать снова
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
