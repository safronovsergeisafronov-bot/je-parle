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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface HelpModalProps {
  children: React.ReactNode
}

export function HelpModal({ children }: HelpModalProps) {
  const [contactMethod, setContactMethod] = useState("telegram")

  return (
    <Sheet>
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

        <form className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="help-name">Ваше имя</Label>
            <Input
              id="help-name"
              placeholder="Например, Гаврилов Илья"
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
              placeholder={contactMethod === "telegram" ? "@username" : "+7 000 000 00 00"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Какая у вас возникла проблема?</Label>
            <Textarea
              id="problem"
              placeholder="Напишите здесь, что именно произошло"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Отправить вопрос
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Ответ придёт на указанный контакт
          </p>
        </form>
      </SheetContent>
    </Sheet>
  )
}
