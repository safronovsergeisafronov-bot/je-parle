"use client"

import { useState, useEffect } from "react"

interface VideoPlayerModalProps {
  children: React.ReactNode
  videoId: string
  title: string
}

export function VideoPlayerModal({ children, videoId, title }: VideoPlayerModalProps) {
  const [open, setOpen] = useState(false)

  // Блокировка скролла
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Закрытие по Escape
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop - как в отзывах */}
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[4px]" />

          {/* Modal */}
          <div
            className="relative bg-background rounded-2xl p-6 md:p-8 max-w-4xl w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия - скромная */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              aria-label="Закрыть видео"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Заголовок */}
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 pr-8">
              {title}
            </h2>

            {/* Видеоплеер */}
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
