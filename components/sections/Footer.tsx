"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { TelegramIcon } from "@/components/icons/TelegramIcon"
import { InstagramIcon } from "@/components/icons/InstagramIcon"
import { YoutubeIcon } from "@/components/icons/YoutubeIcon"
import { footerNavColumns } from "@/lib/data"

let tooltipCounter = 0

function Tooltip({ children, text }: { children: React.ReactNode; text: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<"top" | "bottom">("top")
  const triggerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`footer-tooltip-${++tooltipCounter}`)

  const handleEnter = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition(rect.top < 120 ? "bottom" : "top")
    }
    setVisible(true)
  }, [])

  return (
    <div
      ref={triggerRef}
      className="relative cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setVisible(false)}
      aria-describedby={idRef.current}
    >
      {children}
      <div
        id={idRef.current}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-64 rounded-xl bg-white p-3 text-xs text-foreground transition-opacity z-20 shadow-lg ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {text}
      </div>
    </div>
  )
}

export function Footer() {
  const leftNavLinks = [
    ...footerNavColumns[0].links,
    ...footerNavColumns[1].links,
  ]
  const rightNavLinks = footerNavColumns[2].links

  return (
    <footer id="contact" className="py-10 md:py-15">
      <div className="w-full px-3 lg:px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left column */}
          <div className="lg:w-[35%] lg:flex-shrink-0">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-dark.svg"
                  alt="French.Super"
                  className="h-7 w-auto"
                />
              </Link>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
              Держи способы,
              <br />
              чтобы написать мне
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mb-8 max-w-[300px]">
              Сразу после оплаты на&nbsp;ваш e-mail приходят логин
              и&nbsp;пароль для входа в&nbsp;личный кабинет.
            </p>

            {/* CTA Button */}
            <Link
              href="#buy"
              className="inline-flex items-center justify-center px-16 py-5 bg-accent text-white rounded-full text-lg font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-250"
            >
              Оплатить
            </Link>
          </div>

          {/* Right column */}
          <div className="lg:w-[65%]">
            {/* Partners */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Tooltip
                  text={
                    <><span className="font-semibold">French Tech</span> — национальная программа Франции по&nbsp;развитию стартапов и&nbsp;технологий.</>
                  }
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/images/french-tech-beige.svg"
                      alt="French Tech"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                </Tooltip>
                <Tooltip
                  text={
                    <><span className="font-semibold">CopyFrog</span> — платформа на&nbsp;базе искусственного интеллекта для создания уникальных изображений, рекламных текстов, видеокреативов, превращая идеи в&nbsp;готовый результат.</>
                  }
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/images/copy-frog-beige.svg"
                      alt="CopyFrog"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                </Tooltip>
              </div>
              <span className="text-sm text-foreground font-medium leading-tight">
                При поддержке
                <br />
                French Tech &amp; CopyFrog
              </span>
            </div>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="https://www.instagram.com/french_super"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — Личный блог"
                className="group flex items-center gap-2.5 px-5 py-2.5 border border-accent/10 rounded-full hover:bg-accent hover:border-transparent transition-all duration-250 shadow-none"
              >
                <InstagramIcon className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-250" />
                <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors duration-250">
                  Личный блог
                </span>
              </Link>
              <Link
                href="https://t.me/frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram — Польза"
                className="group flex items-center gap-2.5 px-5 py-2.5 border border-accent/10 rounded-full hover:bg-accent hover:border-transparent transition-all duration-250 shadow-none"
              >
                <TelegramIcon className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-250" />
                <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors duration-250">
                  Польза
                </span>
              </Link>
              <Link
                href="https://www.youtube.com/@frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube — Учись со мной"
                className="group flex items-center gap-2.5 px-5 py-2.5 border border-accent/10 rounded-full hover:bg-accent hover:border-transparent transition-all duration-250 shadow-none"
              >
                <YoutubeIcon className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-250" />
                <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors duration-250">
                  Учись со мной
                </span>
              </Link>
            </div>

            {/* Navigation + Copyright */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Left nav */}
              <ul className="space-y-3">
                {leftNavLinks.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-250 link-animate"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-250 link-animate"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Right nav + copyright */}
              <div className="space-y-3">
                {rightNavLinks.map((link, i) => (
                  <div key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-250 link-animate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
                <p className="text-sm text-foreground/70 pt-2">
                  © {new Date().getFullYear()} FrenchSuper / Гаврилов Илья
                </p>
                <p className="text-xs text-muted-foreground">
                  Все материалы сайта защищены авторским правом. Любое
                  использование без письменного согласия правообладателя
                  запрещено.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
