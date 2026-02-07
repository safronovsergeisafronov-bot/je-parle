"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { CountdownTimer } from "@/components/CountdownTimer"
import { CurrencySelector, type Currency } from "@/components/CurrencySelector"
import { PurchaseModal } from "@/components/PurchaseModal"
import { HelpModal } from "@/components/HelpModal"
import { prices, saleEndDate, pricingFeatures } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("EUR")

  const currentPrice = prices[currency]

  return (
    <section id="buy" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Author Card */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-secondary" />
          <div>
            <p className="font-medium text-foreground">Гаврилов Илья</p>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="flex justify-center mb-8">
          <CurrencySelector selected={currency} onSelect={setCurrency} />
        </div>

        <TextGenerateEffect
          as="h2"
          text="Сколько стоит книга?"
          className="text-2xl md:text-3xl lg:text-4xl font-light text-center text-foreground mb-8"
        />

        {/* Price Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-accent border-2">
            <CardContent className="p-6 md:p-8">
              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground line-through text-lg">
                  {currentPrice.symbol}{currentPrice.old}
                </p>
                <p className="text-5xl md:text-6xl font-bold text-accent">
                  {currentPrice.symbol}{currentPrice.new}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Одна цена, всё просто.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Purchase Buttons */}
              <div className="space-y-3">
                {currency === "RUB" ? (
                  <Button size="lg" className="w-full" asChild>
                    <Link
                      href="http://french-super.com/book-je-parle-oplata-ru"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Приобрести книгу (RUB)
                    </Link>
                  </Button>
                ) : (
                  <PurchaseModal currency={currency}>
                    <Button size="lg" className="w-full">
                      Приобрести книгу ({currency})
                    </Button>
                  </PurchaseModal>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-4">Спеццена действует до:</p>
          <CountdownTimer targetDate={saleEndDate} />
          <p className="text-sm text-muted-foreground mt-4">
            Успейте получить книгу по лучшим условиям до 23:59 (по Парижу) 12 февраля.
          </p>
        </div>

        {/* Help Link */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-2">
            Оставьте заявку, если у вас возникли проблемы с оплатой
          </p>
          <HelpModal>
            <Button variant="outline">Оставить заявку</Button>
          </HelpModal>
        </div>

        {/* Payment Methods Tabs */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-medium text-center text-foreground mb-6">
            Как оплатить книгу и получить доступ?
          </h3>

          <Tabs defaultValue="international" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="international">Международные карты</TabsTrigger>
              <TabsTrigger value="russia">Банковские карты РФ</TabsTrigger>
            </TabsList>

            <TabsContent value="international" className="mt-4">
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Оплата</h4>
                    <p className="text-sm text-muted-foreground">
                      Стоимость указана в евро, но оплатить можно в любой валюте. Конвертация пройдёт автоматически по выгодному курсу банка.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Инструкция и доступ</h4>
                    <p className="text-sm text-muted-foreground">
                      Сразу после успешной оплаты на e-mail придёт письмо с инструкцией, а также откроется страница со следующими шагами.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Материалы</h4>
                    <p className="text-sm text-muted-foreground">
                      Вам откроется доступ к книге «Je Parle!» в формате PDF и к аудиоозвучке. Всё сразу готово к изучению.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="russia" className="mt-4">
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Оплата</h4>
                    <p className="text-sm text-muted-foreground">
                      Можно оплатить картой любого российского банка или через сервисы: СБП, СберПэй, Яндекс.Пэй и др.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Доступ в личный кабинет</h4>
                    <p className="text-sm text-muted-foreground">
                      Сразу после успешной оплаты вы получаете письмо на e-mail с кнопкой входа в личный кабинет и инструкцией.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Материалы внутри</h4>
                    <p className="text-sm text-muted-foreground">
                      В кабинете сразу доступны книга «Je Parle!» (PDF) и аудиоозвучка. Всё готово к изучению!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
