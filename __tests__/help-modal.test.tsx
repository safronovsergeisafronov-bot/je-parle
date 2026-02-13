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

import { HelpModal } from "@/components/HelpModal"

describe("HelpModal", () => {
  it("renders the trigger button", () => {
    render(
      <HelpModal>
        <button>Get Help</button>
      </HelpModal>
    )
    expect(screen.getAllByText("Get Help").length).toBeGreaterThanOrEqual(1)
  })

  it("opens the modal when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <HelpModal>
        <button>Get Help</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getAllByText("Нужна помощь?").length).toBeGreaterThanOrEqual(1)
  })

  it("shows the form fields when opened", async () => {
    const user = userEvent.setup()
    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Ваше имя")).toBeInTheDocument()
    expect(screen.getByText(/Возможные варианты проблем/)).toBeInTheDocument()
  })

  it("shows radio buttons for contact method", async () => {
    const user = userEvent.setup()
    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument()
    expect(screen.getByLabelText("WhatsApp")).toBeInTheDocument()
  })

  it("submits the form successfully and shows success", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")

    // Выбираем "Другая проблема", чтобы появилось текстовое поле
    await user.click(screen.getByLabelText(/Другая проблема/))
    await user.type(screen.getByLabelText("Какая у вас возникла проблема?"), "Payment issue test")

    await user.click(screen.getByText("Отправить запрос"))

    await waitFor(() => {
      expect(screen.getByText("Сообщение отправлено!")).toBeInTheDocument()
    })
  })

  it("shows error message on failure", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Network error" }),
    })

    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")

    // Выбираем "Другая проблема", чтобы появилось текстовое поле
    await user.click(screen.getByLabelText(/Другая проблема/))
    await user.type(screen.getByLabelText("Какая у вас возникла проблема?"), "Payment issue test")

    await user.click(screen.getByText("Отправить запрос"))

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument()
    })
  })

  it("sends data with type help", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")

    // Выбираем "Другая проблема", чтобы появилось текстовое поле
    await user.click(screen.getByLabelText(/Другая проблема/))
    await user.type(screen.getByLabelText("Какая у вас возникла проблема?"), "Payment issue test")

    await user.click(screen.getByText("Отправить запрос"))

    const fetchCall = (global.fetch as any).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.type).toBe("help")
  })

  it("shows problem type radio buttons", async () => {
    const user = userEvent.setup()
    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    expect(screen.getByLabelText(/Не проходит оплата картой/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Деньги списались, но книга не пришла/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Не пришли данные для входа в личный кабинет/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Другая проблема/)).toBeInTheDocument()
  })

  it("shows textarea only when 'Другая проблема' is selected", async () => {
    const user = userEvent.setup()
    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))

    // Изначально textarea не видна
    expect(screen.queryByLabelText("Какая у вас возникла проблема?")).not.toBeInTheDocument()

    // Выбираем "Другая проблема"
    await user.click(screen.getByLabelText(/Другая проблема/))

    // Теперь textarea видна
    expect(screen.getByLabelText("Какая у вас возникла проблема?")).toBeInTheDocument()
  })

  it("submits predefined problem type without textarea", async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(
      <HelpModal>
        <button>Open</button>
      </HelpModal>
    )

    await user.click(screen.getByTestId("sheet-trigger"))
    await user.type(screen.getByLabelText("Ваше имя"), "Test User")
    await user.type(screen.getByLabelText(/Имя пользователя или телефон/), "@testuser")

    // Выбираем готовый вариант проблемы
    await user.click(screen.getByLabelText(/Не проходит оплата картой/))

    await user.click(screen.getByText("Отправить запрос"))

    await waitFor(() => {
      const fetchCall = (global.fetch as any).mock.calls[0]
      const body = JSON.parse(fetchCall[1].body)
      expect(body.message).toBe("Не проходит оплата картой")
    })
  })
})
