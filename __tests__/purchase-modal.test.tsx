import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

vi.mock("@/components/ui/sheet", () => {
  const SheetContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
    open: false,
    setOpen: () => {},
  })

  function Sheet({ children }: any) {
    const [open, setOpen] = React.useState(false)
    return (
      <SheetContext.Provider value={{ open, setOpen }}>
        {children}
      </SheetContext.Provider>
    )
  }

  function SheetTrigger({ children, asChild }: any) {
    const { setOpen } = React.useContext(SheetContext)
    return <div data-testid="sheet-trigger" onClick={() => setOpen(true)}>{children}</div>
  }

  function SheetContent({ children }: any) {
    const { open } = React.useContext(SheetContext)
    if (!open) return null
    return <div data-testid="sheet-content">{children}</div>
  }

  return {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader: ({ children }: any) => <div>{children}</div>,
    SheetTitle: ({ children, className }: any) => <h2 className={className}>{children}</h2>,
    SheetDescription: ({ children }: any) => <p>{children}</p>,
  }
})

const RadioContext = React.createContext<{ value: string; onChange: (v: string) => void }>({ value: "", onChange: () => {} })

vi.mock("@radix-ui/react-radio-group", () => ({
  Root: ({ children, className, defaultValue, onValueChange, ...props }: any) => {
    const [value, setValue] = React.useState(defaultValue || "")
    const onChange = (v: string) => { setValue(v); onValueChange?.(v) }
    return (
      <RadioContext.Provider value={{ value, onChange }}>
        <div role="radiogroup" className={className}>{children}</div>
      </RadioContext.Provider>
    )
  },
  Item: ({ children, value, id, ...props }: any) => {
    const ctx = React.useContext(RadioContext)
    return (
      <button
        type="button"
        role="radio"
        id={id}
        aria-checked={ctx.value === value}
        onClick={() => ctx.onChange(value)}
        data-state={ctx.value === value ? "checked" : "unchecked"}
      >
        {children}
      </button>
    )
  },
  Indicator: ({ children }: any) => <span>{children}</span>,
}))

afterEach(cleanup)

import { PurchaseModal } from "@/components/PurchaseModal"

describe("PurchaseModal", () => {
  it("renders the trigger button", () => {
    render(
      <PurchaseModal>
        <button>Buy Now</button>
      </PurchaseModal>
    )
    expect(screen.getAllByText("Buy Now").length).toBeGreaterThanOrEqual(1)
  })

  it("opens the modal when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Buy</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getAllByText(/Книга «Je parle!»/).length).toBeGreaterThanOrEqual(1)
  })

  it("shows the form fields when opened", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Ваше имя")).toBeInTheDocument()
    expect(screen.getByLabelText("Ваш email")).toBeInTheDocument()
  })

  it("shows contact method radio buttons", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument()
    expect(screen.getByLabelText("WhatsApp")).toBeInTheDocument()
  })

  it("renders the submit button with default EUR currency", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getAllByText("Оплатить (EUR)").length).toBeGreaterThanOrEqual(1)
  })

  it("renders the submit button with custom currency", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal currency="USD">
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getAllByText("Оплатить (USD)").length).toBeGreaterThanOrEqual(1)
  })

  it("renders privacy policy link", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    const links = screen.getAllByText("политикой конфиденциальности")
    expect(links[0].closest("a")).toHaveAttribute("href", "https://frenchsuper.getcourse.ru/privacypolicy")
    expect(links[0].closest("a")).toHaveAttribute("target", "_blank")
  })

  it("changes contact label when switching to WhatsApp", async () => {
    const user = userEvent.setup()
    render(
      <PurchaseModal>
        <button>Open</button>
      </PurchaseModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText(/Имя пользователя или телефон/)).toBeInTheDocument()

    await user.click(screen.getByLabelText("WhatsApp"))
    expect(screen.getByLabelText("Номер телефона")).toBeInTheDocument()
  })
})
