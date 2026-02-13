import Link from "next/link"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function WhatInside() {
  return (
    <section id="inside" className="py-12 md:py-20">
      <div className="w-full px-3 lg:px-4">
        {/* Main card — dark cinematic gradient */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d0002] via-[#56051B] to-[#8b1a3a]">
          <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-[480px] lg:min-h-[580px]">

            {/* Left: Atmospheric image area */}
            <div className="relative min-h-[320px] lg:min-h-full">

              {/* Top-left badge */}
              <span className="absolute top-5 left-5 md:top-8 md:left-8 z-20 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                Бесплатный фрагмент
              </span>

              {/* Bottom-left badge */}
              <span className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-20 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                PDF 16 страниц
              </span>
            </div>

            {/* Right: Content */}
            <div className="relative flex flex-col justify-start p-8 md:p-12 lg:p-14">
              {/* Top badge */}
              <span className="inline-block self-start px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-6">
                Весь продукт в 6,7 раз больше
              </span>

              <TextGenerateEffect
                as="h2"
                text="Интересно, что внутри?"
                className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-white mb-6"
              />

              <p className="text-white/75 text-base md:text-lg mb-8 max-w-md">
                Небольшой фрагмент бесплатно&nbsp;— чтобы понять, насколько это удобно.
                В&nbsp;предпросмотре&nbsp;— только малая часть книги.
              </p>

              {/* CTA Button — warm gold */}
              <Link
                href="https://drive.google.com/file/d/1CwZf42BbZ7gZsE5rhJ5lA7S_kAm7chRW/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 self-start bg-[#E8D5A3] hover:bg-[#dcc88e] text-foreground font-semibold text-lg md:text-xl px-10 py-5 md:px-12 md:py-6 rounded-full transition-all duration-200 hover:scale-100"
              >
                {/* Link icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Читать фрагмент
              </Link>

              <p className="text-xs md:text-sm text-white/40 mt-6 max-w-xs text-center">
                Ждать загрузку не&nbsp;нужно&nbsp;— фрагмент откроется сразу через Google Диск по&nbsp;ссылке.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
