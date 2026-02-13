"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Plus } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"
import { mobileNavLinks, advantageCards } from "@/lib/data"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="p-3 lg:p-4 flex flex-col gap-3 lg:gap-4">
      {/* Top row — two panels */}
      <div className="flex flex-col lg:flex-row lg:h-[clamp(550px,70vh,750px)] gap-3 lg:gap-4">
        {/* Left Panel — Burgundy */}
        <div className="lg:w-1/2 bg-accent rounded-2xl flex flex-col p-6 md:p-8 md:pt-6 lg:p-10 xl:p-12 relative overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between">
            {/* Logo / Author */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden">
                <Image
                  src="/images/author-avatar.jpg"
                  alt="Гаврилов Илья"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-white">French.Super</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="#inside"
                className="text-sm text-white hover:bg-white hover:text-foreground transition-colors px-4 py-2 rounded-full border hover:border-white"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                Что внутри
              </Link>
              <Link
                href="#why"
                className="text-sm text-white hover:bg-white hover:text-foreground transition-colors px-4 py-2 rounded-full border hover:border-white"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                Почему это работает
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-b border-white/10">
              <nav className="flex flex-col gap-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2 px-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <ContactModal>
                  <button className="py-2 px-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left w-full">
                    Связаться
                  </button>
                </ContactModal>
              </nav>
            </div>
          )}

          {/* Heading + Description — centered between header and buttons */}
          <div className="flex-1 flex flex-col items-center justify-center text-center pt-6 md:pt-8 lg:pt-0">
            <h1 className="mb-3 lg:mb-4">
              <TextGenerateEffect
                as="span"
                text="Книга, собранная"
                className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-white leading-none tracking-[-0.02em]"
              />
              <TextGenerateEffect
                as="span"
                text="не за день — а за 7 лет"
                className="block text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-white leading-none tracking-[-0.02em]"
                delay={200}
              />
              <TextGenerateEffect
                as="span"
                text="преподавания французского."
                className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-white/50 leading-none tracking-[-0.02em]"
                delay={400}
              />
            </h1>

            <p className="text-sm md:text-base text-white/70 max-w-md">
              Внутри — живые выражения, которые используют французы каждый день. 300+ фраз с&nbsp;озвучкой.
            </p>
          </div>

          {/* CTA Buttons — pinned to bottom */}
          <div className="flex flex-col gap-3 w-full pt-4 md:pt-6 lg:pt-0">
            <Link
              href="#buy"
              className="bg-white text-foreground rounded-full px-8 py-4 text-base font-medium hover:bg-white/90 transition-colors text-center"
            >
              Получить книгу &laquo;Je Parle!&raquo;
            </Link>
            <Link
              href="#inside"
              className="bg-white/15 text-white rounded-full px-8 py-4 text-base font-medium hover:bg-white/20 transition-colors text-center"
            >
              Посмотреть бесплатный фрагмент
            </Link>
          </div>
        </div>

        {/* Right Panel — Hero Image */}
        <div className="min-h-[300px] md:min-h-[400px] lg:min-h-0 lg:w-1/2 bg-secondary rounded-2xl relative overflow-hidden">
          <Image
            src="/images/Hero-section.jpg"
            alt="Je Parle! — книга для изучения французского языка"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* "Связаться" button — top right on desktop */}
          <div className="hidden md:block absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 xl:top-12 xl:right-12 z-10">
            <ContactModal>
              <button className="cursor-pointer text-sm bg-white text-foreground hover:bg-white/85 transition-colors px-4 py-2 rounded-full border border-white">
                Связаться
              </button>
            </ContactModal>
          </div>
        </div>
      </div>

      {/* Bottom row — Advantage Cards (bento grid, same gaps) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {advantageCards.map((card) => (
          <div key={card.id} className="bg-card rounded-2xl p-6 transition-colors duration-200 hover:bg-card/70 cursor-default">
            <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center mb-4">
              <Plus className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-semibold leading-tight text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
