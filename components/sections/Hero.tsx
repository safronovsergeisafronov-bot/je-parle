import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Monitor, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="py-12 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground mb-6">
              Книга, собранная не за день — а за 7 лет преподавания французского.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Внутри — живые выражения, которые используют французы каждый день.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <Link href="#buy">
                  <Monitor className="w-5 h-5 mr-2" />
                  Получить книгу «Je Parle!»
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#inside">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Посмотреть фрагмент
                </Link>
              </Button>
            </div>
          </div>

          {/* Book Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg hover-card">
              <div className="aspect-[4/3] bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
                <Image
                  src="/images/book-cover.jpg"
                  alt="Книга Je Parle! - Руководство, чтобы говорить, как настоящий француз"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Placeholder overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/80">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold text-accent mb-2">Je parle!</h3>
                    <p className="text-sm text-muted-foreground">
                      Руководство, чтобы говорить, как настоящий француз
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Гаврилов Илья</p>
                    <p className="text-xs text-muted-foreground mt-4">
                      300+ фраз • Произношение • Грамматика • Озвучка
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
