"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, BookOpen, CreditCard, Users, FileDown, Wallet, KeyRound, FolderDown } from "lucide-react"
import { CountdownTimer } from "@/components/CountdownTimer"
import { CurrencySelector, type Currency } from "@/components/CurrencySelector"
import { PurchaseModal } from "@/components/PurchaseModal"
import { HelpModal } from "@/components/HelpModal"
import { prices, saleEndDate, pricingFeatures } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD")

  const currentPrice = prices[currency]

  return (
    <section id="buy" className="py-12 md:py-20">
      <div className="w-full px-3 lg:px-4">
        <TextGenerateEffect
          as="h2"
          text="Сколько стоит книга?"
          className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-center text-foreground mb-8 md:mb-12"
        />

        {/* Bento Grid: Image + Pricing */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left: Image Card */}
            <div className="relative overflow-hidden rounded-2xl bg-secondary min-h-[300px] md:min-h-[unset]">
              {/* Placeholder — replace with real image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <BookOpen className="w-16 h-16 text-accent/30" />
                <p className="text-sm text-muted-foreground text-center">
                  Изображение книги
                </p>
              </div>
              {/* Uncomment when image is ready:
              <Image
                src="/images/book-pricing.jpg"
                alt="Книга Je Parle!"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              */}
            </div>

            {/* Right: Pricing Card */}
            <div className="rounded-2xl border-2 border-accent bg-background p-6 md:p-8 flex flex-col">
              {/* Currency Tabs */}
              <div className="flex justify-center mb-6">
                <CurrencySelector selected={currency} onSelect={setCurrency} />
              </div>

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
              <ul className="space-y-3 mb-8 flex-1">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Purchase Button */}
              <div>
                {currency === "RUB" ? (
                  <Button size="lg" className="w-full hover:scale-100" asChild>
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
                    <Button size="lg" className="w-full hover:scale-100">
                      Приобрести книгу ({currency})
                    </Button>
                  </PurchaseModal>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Спеццена Card */}
        <div className="mb-4 md:mb-6">
          <div className="rounded-2xl bg-secondary p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-5 md:gap-6 text-center">
              {/* Title */}
              <div>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-tight">
                  Спеццена
                  <br />
                  действует до:
                </span>
              </div>

              {/* Timer */}
              <div className="flex justify-center">
                <CountdownTimer targetDate={saleEndDate} variant="minimal" />
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 w-full max-w-md">
                <p className="text-sm md:text-base text-foreground">
                  <span className="font-semibold text-accent">Успейте получить книгу</span>{" "}
                  по&nbsp;лучшим условиям до&nbsp;23:59 (по&nbsp;Парижу) 12&nbsp;февраля.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Оставьте заявку Card */}
        <div className="mb-12">
          <div className="rounded-2xl bg-secondary p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
              {/* Text */}
              <div className="text-center md:text-left flex-1">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground">
                  Оставьте заявку, если у&nbsp;вас возникли проблемы с&nbsp;оплатой
                </span>
              </div>

              {/* Button */}
              <HelpModal>
                <Button
                  size="lg"
                  className="shrink-0 px-10 md:px-14 py-5 md:py-7 text-base md:text-lg rounded-full whitespace-nowrap"
                  aria-label="Оставить заявку при проблемах с оплатой"
                >
                  Оставить заявку
                </Button>
              </HelpModal>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div id="delivery">
          {/* Animated Clock Icon */}
          <div className="flex justify-center mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              className="text-accent"
            >
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              {/* Minute hand — slow rotation */}
              <line
                x1="10" y1="10" x2="10" y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="origin-center animate-[spin_3s_linear_infinite]"
              />
              {/* Hour hand — slower rotation */}
              <line
                x1="10" y1="10" x2="14" y2="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="origin-center animate-[spin_12s_linear_infinite]"
              />
            </svg>
          </div>

          <TextGenerateEffect
            as="h2"
            text="Как оплатить книгу и получить доступ?"
            className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-center text-foreground mb-8"
          />

          <Tabs defaultValue="international" className="w-full">
            <TabsList className="w-full grid grid-cols-2 max-w-lg mx-auto mb-6">
              <TabsTrigger value="international">Международные карты</TabsTrigger>
              <TabsTrigger value="russia">Банковские карты РФ</TabsTrigger>
            </TabsList>

            <TabsContent value="international" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <CreditCard className="w-5 h-5 text-foreground animate-icon-card" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Оплата</h4>
                  <p className="text-sm text-muted-foreground">
                    Стоимость указана в&nbsp;евро, но оплатить можно в&nbsp;любой валюте. Конвертация пройдёт автоматически по&nbsp;выгодному курсу банка.
                  </p>
                </div>
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-foreground animate-icon-users" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Инструкция и&nbsp;доступ</h4>
                  <p className="text-sm text-muted-foreground">
                    Сразу после успешной оплаты на&nbsp;e-mail придёт письмо с&nbsp;инструкцией, а&nbsp;также откроется страница со&nbsp;следующими шагами.
                  </p>
                </div>
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <FileDown className="w-5 h-5 text-foreground animate-icon-download" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Материалы</h4>
                  <p className="text-sm text-muted-foreground">
                    Вам откроется доступ к&nbsp;книге «Je&nbsp;Parle!» в&nbsp;формате PDF и&nbsp;к&nbsp;аудиоозвучке. Всё сразу готово к&nbsp;изучению.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="russia" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <Wallet className="w-5 h-5 text-foreground animate-icon-wallet" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Оплата</h4>
                  <p className="text-sm text-muted-foreground">
                    Можно оплатить картой любого российского банка или через сервисы: СБП, СберПэй, Яндекс.Пэй и&nbsp;др.
                  </p>
                </div>
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <KeyRound className="w-5 h-5 text-foreground animate-icon-key" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Доступ в&nbsp;личный кабинет</h4>
                  <p className="text-sm text-muted-foreground">
                    Сразу после успешной оплаты вы&nbsp;получаете письмо на&nbsp;e-mail с&nbsp;кнопкой входа в&nbsp;личный кабинет и&nbsp;инструкцией.
                  </p>
                </div>
                <div className="rounded-2xl bg-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-4">
                    <FolderDown className="w-5 h-5 text-foreground animate-icon-download" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">Материалы внутри</h4>
                  <p className="text-sm text-muted-foreground">
                    В&nbsp;кабинете сразу доступны книга «Je&nbsp;Parle!» (PDF) и&nbsp;аудиоозвучка. Всё готово к&nbsp;изучению!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
