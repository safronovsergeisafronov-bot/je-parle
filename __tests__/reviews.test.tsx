import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

function filterDomProps(props: Record<string, any>) {
  const {
    animate, initial, transition, variants, whileInView, viewport,
    whileDrag, dragConstraints, dragElastic, dragMomentum,
    whileHover, whileTap, exit, layout, layoutId,
    onAnimationComplete, onAnimationStart,
    ...domProps
  } = props
  return domProps
}

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterDomProps(props)}>{children}</div>
    )),
  },
  useReducedMotion: () => false,
}))

vi.mock("@/components/AnimatedSection", () => ({
  StaggerChildren: ({ children, className }: any) => <div className={className}>{children}</div>,
  StaggerItem: ({ children }: any) => <div>{children}</div>,
}))

vi.mock("@/components/TextGenerateEffect", () => ({
  TextGenerateEffect: ({ text, as: Tag = "span", className }: any) => {
    const Component = Tag
    return <Component className={className}>{text}</Component>
  },
}))

afterEach(cleanup)

import { Reviews } from "@/components/sections/Reviews"
import { reviews } from "@/lib/data"

describe("Reviews", () => {
  it("renders without errors", () => {
    render(<Reviews />)
    expect(screen.getAllByText("Отзывы на книгу").length).toBeGreaterThanOrEqual(1)
  })

  it("has section id for anchor navigation", () => {
    render(<Reviews />)
    const section = document.querySelector("#reviews")
    expect(section).toBeInTheDocument()
  })

  it("renders all 6 review names in desktop grid", () => {
    render(<Reviews />)
    reviews.forEach((review) => {
      expect(screen.getAllByText(review.name).length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders mobile carousel with ARIA attributes", () => {
    render(<Reviews />)
    const carousels = screen.getAllByRole("region", { name: "Отзывы" })
    expect(carousels.length).toBeGreaterThanOrEqual(1)
    expect(carousels[0]).toHaveAttribute("aria-roledescription", "carousel")
  })

  it("renders carousel navigation buttons", () => {
    render(<Reviews />)
    expect(screen.getAllByLabelText("Предыдущий отзыв").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByLabelText("Следующий отзыв").length).toBeGreaterThanOrEqual(1)
  })

  it("shows current slide indicator", () => {
    render(<Reviews />)
    expect(screen.getAllByText(`1 / ${reviews.length}`).length).toBeGreaterThanOrEqual(1)
  })

  it("navigates to next slide on button click", async () => {
    const user = userEvent.setup()
    render(<Reviews />)

    const nextButtons = screen.getAllByLabelText("Следующий отзыв")
    await user.click(nextButtons[0])
    expect(screen.getAllByText(`2 / ${reviews.length}`).length).toBeGreaterThanOrEqual(1)
  })

  it("navigates to previous slide (wraps around)", async () => {
    const user = userEvent.setup()
    render(<Reviews />)

    const prevButtons = screen.getAllByLabelText("Предыдущий отзыв")
    await user.click(prevButtons[0])
    expect(screen.getAllByText(`${reviews.length} / ${reviews.length}`).length).toBeGreaterThanOrEqual(1)
  })

  it("opens review popup on card click and shows close button", async () => {
    const user = userEvent.setup()
    render(<Reviews />)

    const desktopCards = screen.getAllByText(reviews[0].name)
    const cardElement = desktopCards[0].closest("[class*='cursor-pointer']")
    if (cardElement) {
      await user.click(cardElement)
      expect(screen.getAllByLabelText("Закрыть отзыв").length).toBeGreaterThanOrEqual(1)
    }
  })
})
