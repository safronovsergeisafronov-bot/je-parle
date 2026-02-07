"use client"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PurchaseModalProps {
  children: React.ReactNode
  currency?: string
}

export function PurchaseModal({ children, currency = "EUR" }: PurchaseModalProps) {
  const [contactMethod, setContactMethod] = useState("telegram")

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Книга «Je parle!»</SheetTitle>
          <SheetDescription>
            Оставьте контакты и получите доступ к книге. После формы вы попадёте на страницу оплаты
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="purchase-name">Ваше имя</Label>
            <Input
              id="purchase-name"
              placeholder="Например, Гаврилов Илья"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Ваш email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@site.com"
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
                <RadioGroupItem value="telegram" id="purchase-telegram" />
                <Label htmlFor="purchase-telegram" className="cursor-pointer">Telegram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="purchase-whatsapp" />
                <Label htmlFor="purchase-whatsapp" className="cursor-pointer">WhatsApp</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase-contact">
              {contactMethod === "telegram" ? "Имя пользователя или телефон" : "Номер телефона"}
            </Label>
            <Input
              id="purchase-contact"
              placeholder={contactMethod === "telegram" ? "@username" : "+7 000 000 00 00"}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Оплатить ({currency})
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Отправляя заявку, вы соглашаетесь с{" "}
            <a
              href="https://frenchsuper.getcourse.ru/privacypolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </SheetContent>
    </Sheet>
  )
}
