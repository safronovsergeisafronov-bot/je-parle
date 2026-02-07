import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-accent/20 mb-4">404</p>
        <h1 className="text-2xl font-light mb-3">Страница не найдена</h1>
        <p className="text-muted-foreground mb-8">
          Возможно, эта страница была перемещена или удалена.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#faq">Часто задаваемые вопросы</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
