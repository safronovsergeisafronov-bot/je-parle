"use client"

import { useState, useEffect, useRef } from "react"
import { PdfViewerModal } from "@/components/PdfViewerModal"

function useResponsiveVideo() {
  const [source, setSource] = useState<{ src: string; poster: string } | null>(null)

  useEffect(() => {
    const w = window.innerWidth
    if (w >= 1024) {
      setSource({ src: "/video/desktop-book.mp4", poster: "/video/desktop-book-poster.jpg" })
    } else if (w >= 768) {
      setSource({ src: "/video/planshet-book.mp4", poster: "/video/planshet-book-poster.jpg" })
    } else {
      setSource({ src: "/video/mobile-book.mp4", poster: "/video/mobile-book-poster.jpg" })
    }
  }, [])

  return source
}

export function WhatInside() {
  const video = useResponsiveVideo()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure video plays after source is set
  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [video])

  return (
    <section id="inside" className="py-3 md:py-4">
      <div className="w-full px-3 lg:px-4">
        {/* Main card — dark cinematic gradient as fallback behind video */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d0002] via-[#56051B] to-[#8b1a3a]">

          {/* Video — full width background, gradient visible until loaded */}
          {video && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={video.poster}
              className="absolute inset-0 w-full h-full object-cover z-0"
              aria-hidden="true"
            >
              <source src={video.src} type="video/mp4" />
            </video>
          )}

          <div className="relative z-10 grid lg:grid-cols-[2fr_1fr] min-h-[480px] lg:min-h-[580px]">

            {/* Left: Badges over video */}
            {/* TODO: Add a static fallback image for when video is not loaded or unavailable */}
            <div className="relative min-h-[320px] lg:min-h-full">
              {/* Top-left badge */}
              <span className="absolute top-5 left-5 md:top-8 md:left-8 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                Бесплатный фрагмент
              </span>

              {/* Bottom-left badge */}
              <span className="absolute bottom-5 left-5 md:bottom-8 md:left-8 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                PDF 16 страниц
              </span>
            </div>

            {/* Right: Compact content aligned to top, in the gradient area */}
            <div className="relative flex flex-col justify-start px-6 py-6 pt-5 md:px-8 md:pt-8 lg:px-10 lg:pt-8">
              {/* Top badge */}
              <span className="inline-block self-start px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-4">
                Весь продукт в 6,7 раз больше
              </span>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-white mb-4">
                Интересно,<br />что внутри?
              </h2>

              <p className="text-white/75 text-sm md:text-base mb-5 max-w-sm">
                Небольшой фрагмент бесплатно&nbsp;— чтобы понять, насколько это удобно.
                В&nbsp;предпросмотре&nbsp;— только малая часть книги.
              </p>

              {/* CTA Button — warm gold */}
              <PdfViewerModal
                pdfUrl="/docs/fragment.pdf"
                title="Фрагмент книги «Je parle!»"
              >
                <button
                  className="inline-flex items-center justify-center gap-3 bg-[#E8D5A3] hover:bg-[#dcc88e] hover:shadow-lg text-foreground font-semibold text-base md:text-lg px-10 py-4 md:px-12 md:py-5 rounded-full transition-all duration-250 w-full max-w-xs"
                >
                  {/* Book icon */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Читать фрагмент
                </button>
              </PdfViewerModal>

              <p className="text-xs text-white/40 mt-4 max-w-xs text-center mx-auto">
                Фрагмент откроется прямо здесь&nbsp;— не&nbsp;нужно никуда уходить.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
