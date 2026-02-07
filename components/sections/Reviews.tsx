"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { reviews } from "@/lib/data"

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center text-foreground mb-12">
          Отзывы на книгу
        </h2>

        {/* Desktop: Grid of cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover-card border-border">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-accent/30 mb-4" aria-hidden="true" />
                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-medium" aria-hidden="true">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden" role="region" aria-label="Отзывы" aria-roledescription="carousel">
          <Card className="border-border">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-accent/30 mb-4" aria-hidden="true" />
              <p className="text-muted-foreground text-sm mb-4">
                {reviews[currentIndex].text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-medium" aria-hidden="true">
                    {reviews[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {reviews[currentIndex].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {reviews[currentIndex].subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Предыдущий отзыв">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {currentIndex + 1} / {reviews.length}
            </span>
            <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Следующий отзыв">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
