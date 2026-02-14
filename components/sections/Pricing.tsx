"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Users, FileDown, Wallet, KeyRound, FolderDown, ShieldCheck } from "lucide-react"
import { CountdownTimer } from "@/components/CountdownTimer"
import { CurrencySelector, type Currency } from "@/components/CurrencySelector"
import { PurchaseModal } from "@/components/PurchaseModal"
import { HelpModal } from "@/components/HelpModal"
import { prices, saleEndDate, pricingFeatures } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD")
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentPrice = prices[currency]

  // Lazy load video: play only when visible
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked, that's OK
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 } // Play when 25% visible
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="buy" className="py-10 md:py-15">
      <div className="w-full px-3 lg:px-4">
        <TextGenerateEffect
          as="h2"
          text="Сколько стоит книга?"
          className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-center text-foreground mb-8 md:mb-12"
        />

        {/* Bento Grid: Image + Pricing */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left: Premium Book Video */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#56051B] via-[#7a1a35] to-[#56051B] min-h-[300px] md:min-h-[unset]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                poster="/video/pricing-hero-poster.jpg"
                aria-label="Видео презентация книги Je Parle"
              >
                <source src="/video/pricing-hero-optimized.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>

            {/* Right: Pricing Card */}
            <div className="relative rounded-2xl border-2 border-accent bg-background p-6 md:p-8 flex flex-col">
              {/* Currency Tabs */}
              <div className="flex justify-center mb-6">
                <CurrencySelector selected={currency} onSelect={setCurrency} />
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-5xl md:text-6xl font-bold text-accent">
                  {currentPrice.symbol}{currentPrice.price}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Одна цена, всё просто.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#56051B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Purchase Button */}
              <div className="space-y-3">
                {currency === "RUB" ? (
                  <Button size="lg" className="w-full text-base h-16 shadow-none hover:shadow-none hover:scale-100 hover:opacity-90 cursor-pointer transition-all duration-250" asChild>
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
                    <Button size="lg" className="w-full text-base h-16 shadow-none hover:shadow-none hover:scale-100 hover:opacity-90 cursor-pointer transition-all duration-250">
                      Приобрести книгу ({currency})
                    </Button>
                  </PurchaseModal>
                )}

                {/* Trust signal */}
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Безопасная оплата
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Спеццена Card — СКРЫТ (hidden), НЕ УДАЛЯТЬ! Блок используется для промоакций.
            Чтобы включить: убрать className="hidden" с внешнего div.
            Также обновить saleEndDate в lib/data.tsx и текст даты ниже. */}
        <div className="hidden mb-4 md:mb-6">
          <div className="rounded-2xl bg-secondary p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-5 md:gap-6 lg:gap-8">
              {/* Title — left */}
              <div className="text-center lg:text-left lg:flex-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-tight">
                  Спеццена
                  <br />
                  действует до:
                </span>
              </div>

              {/* Timer — center */}
              <div className="flex justify-center lg:flex-1">
                <CountdownTimer targetDate={saleEndDate} variant="minimal" />
              </div>

              {/* Info Card — right */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:flex-1">
                <p className="text-sm md:text-base text-foreground lg:text-left">
                  <span className="font-semibold text-accent">Успейте получить книгу</span>{" "}
                  {/* TODO: "12 февраля" is hardcoded here — saleEndDate from data.ts should be used for consistency */}
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
                  Оставьте заявку,
                  <br />
                  если у&nbsp;вас возникли проблемы с&nbsp;оплатой
                </span>
              </div>

              {/* Button */}
              <HelpModal>
                <Button
                  size="lg"
                  className="shrink-0 px-10 md:px-14 py-5 md:py-7 text-base md:text-lg rounded-full whitespace-nowrap hover:scale-100 hover:opacity-90 shadow-none hover:shadow-none transition-all duration-250"
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

          <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-center text-foreground mb-8">
            Как оплатить книгу
            <br />и получить доступ?
          </h2>

          <Tabs defaultValue="international" className="w-full">
            <TabsList className="w-full grid grid-cols-2 max-w-lg mx-auto mb-6">
              <TabsTrigger value="international">Международные карты</TabsTrigger>
              <TabsTrigger value="russia">Банковские карты РФ</TabsTrigger>
            </TabsList>

            <TabsContent value="international" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: CreditCard, title: "Оплата", desc: "Стоимость указана в\u00A0евро, но оплатить можно в\u00A0любой валюте. Конвертация пройдёт автоматически по\u00A0выгодному курсу банка.", step: 1 },
                  { icon: Users, title: "Инструкция и\u00A0доступ", desc: "Сразу после успешной оплаты на\u00A0e-mail придёт письмо с\u00A0инструкцией, а\u00A0также откроется страница со\u00A0следующими шагами.", step: 2 },
                  { icon: FileDown, title: "Материалы", desc: "Вам откроется доступ к\u00A0книге «Je\u00A0Parle!» в\u00A0формате PDF и\u00A0к\u00A0аудиоозвучке. Всё сразу готово к\u00A0изучению.", step: 3 },
                ].map((card) => (
                  <div key={card.step} className="group rounded-2xl bg-card p-6 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="text-xs font-semibold text-accent/50 uppercase tracking-wider">Шаг {card.step}</span>
                    </div>
                    <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="russia" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Wallet, title: "Оплата", desc: "Можно оплатить картой любого российского банка или через сервисы: СБП, СберПэй, Яндекс.Пэй и\u00A0др.", step: 1 },
                  { icon: KeyRound, title: "Доступ в\u00A0личный кабинет", desc: "Сразу после успешной оплаты вы\u00A0получаете письмо на\u00A0e-mail с\u00A0кнопкой входа в\u00A0личный кабинет и\u00A0инструкцией.", step: 2 },
                  { icon: FolderDown, title: "Материалы внутри", desc: "В\u00A0кабинете сразу доступны книга «Je\u00A0Parle!» (PDF) и\u00A0аудиоозвучка. Всё готово к\u00A0изучению!", step: 3 },
                ].map((card) => (
                  <div key={card.step} className="group rounded-2xl bg-card p-6 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="text-xs font-semibold text-accent/50 uppercase tracking-wider">Шаг {card.step}</span>
                    </div>
                    <h4 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
