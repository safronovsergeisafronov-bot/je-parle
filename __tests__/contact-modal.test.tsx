import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

vi.mock("@/components/ui/sheet", () => {
  const SheetContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
    open: false,
    setOpen: () => {},
  })

  function Sheet({ children, onOpenChange }: any) {
    const [open, setOpenState] = React.useState(false)
    const setOpen = (v: boolean) => {
      setOpenState(v)
      onOpenChange?.(v)
    }
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

beforeEach(() => {
  vi.clearAllMocks()
})

import { ContactModal } from "@/components/ContactModal"

describe("ContactModal", () => {
  it("renders the trigger button", () => {
    render(
      <ContactModal>
        <button>Open Contact</button>
      </ContactModal>
    )
    expect(screen.getAllByText("Open Contact").length).toBeGreaterThanOrEqual(1)
  })

  it("opens the modal when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <ContactModal>
        <button>Open Contact</button>
      </ContactModal>
    )

    const trigger = screen.getByTestId("sheet-trigger")
    await user.click(trigger)
    expect(screen.getAllByText("Напиши мне вопрос прямо здесь").length).toBeGreaterThanOrEqual(1)
  })

  it("shows the form fields when opened", async () => {
    const user = userEvent.setup()
    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Ваше имя")).toBeInTheDocument()
    expect(screen.getByLabelText(/Имя пользователя или телефон/)).toBeInTheDocument()
    expect(screen.getByLabelText("Напиши прямо сюда свой вопрос")).toBeInTheDocument()
  })

  it("shows radio buttons for contact method", async () => {
    const user = userEvent.setup()
    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument()
    expect(screen.getByLabelText("WhatsApp")).toBeInTheDocument()
  })

  it("submits the form successfully", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")
    await user.type(screen.getByLabelText("Напиши прямо сюда свой вопрос"), "Test question text")
    await user.click(screen.getByText("Отправить вопрос"))

    expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      method: "POST",
    }))
  })

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")
    await user.type(screen.getByLabelText("Напиши прямо сюда свой вопрос"), "Test question text")
    await user.click(screen.getByText("Отправить вопрос"))

    await waitFor(() => {
      expect(screen.getByText("Вопрос отправлен!")).toBeInTheDocument()
    })
  })

  it("shows error message on submission failure", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Server error" }),
    })

    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")
    await user.type(screen.getByLabelText("Напиши прямо сюда свой вопрос"), "Test question text")
    await user.click(screen.getByText("Отправить вопрос"))

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument()
    })
  })

  it("shows loading state during submission", async () => {
    const user = userEvent.setup()
    let resolvePromise: (value: any) => void
    global.fetch = vi.fn().mockImplementation(
      () => new Promise((resolve) => { resolvePromise = resolve })
    )

    render(
      <ContactModal>
        <button>Open</button>
      </ContactModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")
    await user.type(screen.getByLabelText("Напиши прямо сюда свой вопрос"), "Test question text")
    await user.click(screen.getByText("Отправить вопрос"))

    expect(screen.getByText("Отправка...")).toBeInTheDocument()

    resolvePromise!({ ok: true, json: () => Promise.resolve({ success: true }) })
  })
})
