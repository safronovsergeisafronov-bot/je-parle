"use client"

import { useState, type FormEvent } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CheckCircle2 } from "lucide-react"

interface HelpModalProps {
  children: React.ReactNode
}

export function HelpModal({ children }: HelpModalProps) {
  const [contactMethod, setContactMethod] = useState("telegram")
  const [problemType, setProblemType] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    // Формируем сообщение: если "other" - берём текст из textarea, иначе - выбранный вариант
    let message = ""
    if (problemType === "other") {
      message = formData.get("problem") as string
    } else if (problemType === "card") {
      message = "Не проходит оплата картой"
    } else if (problemType === "paid") {
      message = "Деньги списались, но книга не пришла"
    } else if (problemType === "access") {
      message = "Не пришли данные для входа в личный кабинет"
    }

    const data = {
      name: formData.get("help-name") as string,
      contactMethod,
      contact: formData.get("help-contact") as string,
      message,
      type: "help" as const,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Ошибка отправки")
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Ошибка отправки")
    }
  }

  return (
    <Sheet onOpenChange={() => { setStatus("idle"); setErrorMessage(""); setProblemType("") }}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Нужна помощь?</SheetTitle>
          <SheetDescription>
            Напишите сюда. Мы на связи и поможем
          </SheetDescription>
        </SheetHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
            <p className="text-lg font-medium mb-2">Сообщение отправлено!</p>
            <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="help-name">Ваше имя</Label>
              <Input
                id="help-name"
                name="help-name"
                placeholder="Например, Гаврилов Илья"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-3">
              <Label>Куда вам ответить?</Label>
              <RadioGroup
                defaultValue="telegram"
                onValueChange={setContactMethod}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telegram" id="help-telegram" />
                  <Label htmlFor="help-telegram" className="cursor-pointer">Telegram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="help-whatsapp" />
                  <Label htmlFor="help-whatsapp" className="cursor-pointer">WhatsApp</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="help-contact">
                {contactMethod === "telegram" ? "Имя пользователя или телефон" : "Номер телефона"}
              </Label>
              <Input
                id="help-contact"
                name="help-contact"
                placeholder={contactMethod === "telegram" ? "@username" : "+7 000 000 00 00"}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-3">
              <Label>Возможные варианты проблем (на выбор 1 из 4)</Label>
              <RadioGroup
                onValueChange={setProblemType}
                className="space-y-3"
                required
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="card" id="problem-card" className="mt-1" />
                  <Label htmlFor="problem-card" className="cursor-pointer font-normal leading-tight">
                    Не проходит оплата картой
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="paid" id="problem-paid" className="mt-1" />
                  <Label htmlFor="problem-paid" className="cursor-pointer font-normal leading-tight">
                    Деньги списались, но книга не пришла
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="access" id="problem-access" className="mt-1" />
                  <Label htmlFor="problem-access" className="cursor-pointer font-normal leading-tight">
                    Не пришли данные для входа в личный кабинет
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="other" id="problem-other" className="mt-1" />
                  <Label htmlFor="problem-other" className="cursor-pointer font-normal leading-tight">
                    Другая проблема (опишу ниже)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {problemType === "other" && (
              <div className="space-y-2">
                <Label htmlFor="problem">Какая у вас возникла проблема?</Label>
                <Textarea
                  id="problem"
                  name="problem"
                  placeholder="Напишите здесь, что именно произошло"
                  rows={4}
                  required
                  minLength={5}
                  maxLength={2000}
                />
              </div>
            )}

            {status === "error" && (
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full hover:scale-100" size="lg" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить запрос"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ответ придёт на указанный контакт
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
