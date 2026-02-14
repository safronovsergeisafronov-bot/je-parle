"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react"
import { reviews } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection"

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openReview, setOpenReview] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [])

  useEffect(() => {
    if (openReview !== null) {
      document.body.style.overflow = "hidden"
      // Focus close button when modal opens
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [openReview])

  // Close modal on Escape
  useEffect(() => {
    if (openReview === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenReview(null)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [openReview])

  // Carousel keyboard navigation
  const handleCarouselKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prevSlide()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      nextSlide()
    }
  }, [prevSlide, nextSlide])

  return (
    <section id="reviews" className="py-10 md:py-15 bg-secondary/30">
      <div className="w-full px-3 lg:px-4">
        <TextGenerateEffect
          as="h2"
          text="Отзывы на книгу"
          className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-center text-foreground mb-12"
        />

        {/* Desktop: Grid of cards */}
        <StaggerChildren className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <Card
                className="border-border shadow-none hover:shadow-none hover:bg-card/70 transition-colors duration-200 cursor-pointer h-full"
                onClick={() => setOpenReview(review.id)}
              >
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
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Mobile: Carousel */}
        <div className="md:hidden" role="region" aria-label="Отзывы" aria-roledescription="carousel" tabIndex={0} onKeyDown={handleCarouselKeyDown}>
          <Card
            className="border-border shadow-none cursor-pointer"
            onClick={() => setOpenReview(reviews[currentIndex].id)}
          >
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
            <Button variant="outline" size="icon" className="shadow-none" onClick={prevSlide} aria-label="Предыдущий отзыв">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {currentIndex + 1} / {reviews.length}
            </span>
            <Button variant="outline" size="icon" className="shadow-none" onClick={nextSlide} aria-label="Следующий отзыв">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Review popup overlay */}
      {openReview !== null && (() => {
        const review = reviews.find(r => r.id === openReview)
        if (!review) return null
        const labelId = `review-dialog-name-${review.id}`
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            onClick={() => setOpenReview(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[4px]" />

            {/* Modal */}
            <div
              className="relative bg-background rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setOpenReview(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                aria-label="Закрыть отзыв"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              <Quote className="w-10 h-10 text-accent/30 mb-4" aria-hidden="true" />
              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-medium text-lg" aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p id={labelId} className="font-medium text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </section>
  )
}
