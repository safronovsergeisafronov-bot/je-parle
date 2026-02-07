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

interface ContactModalProps {
  children: React.ReactNode
}

export function ContactModal({ children }: ContactModalProps) {
  const [contactMethod, setContactMethod] = useState("telegram")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      contactMethod,
      contact: formData.get("contact") as string,
      message: formData.get("question") as string,
      type: "question" as const,
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
    <Sheet onOpenChange={() => { setStatus("idle"); setErrorMessage("") }}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Напиши мне вопрос прямо здесь</SheetTitle>
          <SheetDescription>
            Не стесняйся, спрашивай
          </SheetDescription>
        </SheetHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
            <p className="text-lg font-medium mb-2">Вопрос отправлен!</p>
            <p className="text-muted-foreground text-sm">Ответ придёт на указанный контакт</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                name="name"
                placeholder="Например, Гаврилов Илья"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-3">
              <Label>Куда мне ответить?</Label>
              <RadioGroup
                defaultValue="telegram"
                onValueChange={setContactMethod}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telegram" id="telegram" />
                  <Label htmlFor="telegram" className="cursor-pointer">Telegram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="cursor-pointer">WhatsApp</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">
                {contactMethod === "telegram" ? "Имя пользователя или телефон" : "Номер телефона"}
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder={contactMethod === "telegram" ? "@username" : "+7 000 000 00 00"}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">Напиши прямо сюда свой вопрос</Label>
              <Textarea
                id="question"
                name="question"
                placeholder="Можете задать вопрос по книге «Je Parle!», покупке или любому другому уточнению"
                rows={4}
                required
                minLength={5}
                maxLength={2000}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить вопрос"
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
