import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function WhatInside() {
  return (
    <section id="inside" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-secondary p-8 md:p-12">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-accent text-white text-sm rounded-full">
                Бесплатный фрагмент
              </span>
              <span className="inline-block px-3 py-1 bg-foreground text-background text-sm rounded-full">
                PDF 16 страниц
              </span>
            </div>

            <TextGenerateEffect
              as="h2"
              text="Интересно, что внутри?"
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-none tracking-[-0.02em] text-foreground mb-4"
            />
            <p className="text-muted-foreground mb-8 max-w-xl">
              Небольшой фрагмент бесплатно — чтобы понять, насколько это удобно. В предпросмотре — только малая часть книги.
            </p>

            <Button size="lg" asChild>
              <Link
                href="https://drive.google.com/file/d/1CwZf42BbZ7gZsE5rhJ5lA7S_kAm7chRW/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Читать фрагмент
              </Link>
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Ждать загрузку не нужно — фрагмент откроется сразу через Google Диск по ссылке.
            </p>

            {/* Decorative badge */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-2 shadow-lg">
              <p className="text-xs text-muted-foreground">Весь продукт в</p>
              <p className="text-lg font-bold text-accent">6,7 раз больше</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
