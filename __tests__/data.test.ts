import { describe, it, expect } from "vitest"
import {
  advantageCards,
  expressionCards,
  topicSpheres,
  reviews,
  faqItems,
  miniCourseLessons,
  prices,
  whyItWorksPoints,
  pricingFeatures,
} from "@/lib/data"

describe("Static data integrity", () => {
  it("has 4 advantage cards", () => {
    expect(advantageCards).toHaveLength(4)
    advantageCards.forEach((card) => {
      expect(card.title).toBeTruthy()
      expect(card.description).toBeTruthy()
    })
  })

  it("has 4 expression cards with audio", () => {
    expect(expressionCards).toHaveLength(4)
    expressionCards.forEach((card) => {
      expect(card.theme).toBeTruthy()
      expect(card.audioSrc).toMatch(/^\/audio\//)
    })
  })

  it("has 9 topic spheres with valid colors", () => {
    expect(topicSpheres).toHaveLength(9)
    topicSpheres.forEach((sphere) => {
      expect(sphere.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(sphere.items.length).toBeGreaterThan(0)
    })
  })

  it("has 6 reviews", () => {
    expect(reviews).toHaveLength(6)
    reviews.forEach((review) => {
      expect(review.name).toBeTruthy()
      expect(review.text.length).toBeGreaterThan(10)
    })
  })

  it("has 9 FAQ items", () => {
    expect(faqItems).toHaveLength(9)
    faqItems.forEach((item) => {
      expect(item.question.length).toBeGreaterThan(5)
      // answer может быть строкой или JSX элементом (React.ReactNode)
      expect(item.answer).toBeTruthy()
    })
  })

  it("has 6 mini course lessons", () => {
    expect(miniCourseLessons).toHaveLength(6)
    miniCourseLessons.forEach((lesson) => {
      expect(lesson.title.length).toBeGreaterThan(5)
      expect(lesson.duration).toBeTruthy()
    })
  })

  it("has 4 currency prices", () => {
    expect(Object.keys(prices)).toEqual(["USD", "EUR", "UAH", "RUB"])
    Object.values(prices).forEach((price) => {
      expect(price.new).toBeLessThan(price.old)
      expect(price.symbol).toBeTruthy()
    })
  })

  it("has why it works points", () => {
    expect(whyItWorksPoints.length).toBeGreaterThan(0)
  })

  it("has pricing features", () => {
    expect(pricingFeatures.length).toBeGreaterThan(0)
  })
})
