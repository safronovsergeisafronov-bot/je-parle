"use client"

import { useState, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { CinematicModal } from "@/components/CinematicModal"

const Document = dynamic(
  () => import("react-pdf").then((mod) => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`
    return { default: mod.Document }
  }),
  { ssr: false }
)

const Page = dynamic(
  () => import("react-pdf").then((mod) => ({ default: mod.Page })),
  { ssr: false }
)

interface PdfViewerModalProps {
  children: React.ReactNode
  pdfUrl: string
  title?: string
}

export function PdfViewerModal({
  children,
  pdfUrl,
  title = "Фрагмент книги",
}: PdfViewerModalProps) {
  const [open, setOpen] = useState(false)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageWidth, setPageWidth] = useState(600)

  useEffect(() => {
    function updateWidth() {
      // Leave some padding on each side
      const maxWidth = Math.min(window.innerWidth - 48, 900)
      setPageWidth(maxWidth)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }, [])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setPageNumber((p) => Math.max(1, p - 1))
      } else if (e.key === "ArrowRight") {
        setPageNumber((p) => Math.min(numPages, p + 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, numPages])

  return (
    <CinematicModal
      trigger={children}
      open={open}
      onOpenChange={setOpen}
      title={title}
      titleHidden
      className="max-w-4xl"
    >
      {open && (
        <div className="flex flex-col items-center gap-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10"
              aria-label="Предыдущая страница"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="min-w-[120px] text-center text-sm text-white/70">
              Страница {pageNumber} из {numPages || "..."}
            </span>

            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10"
              aria-label="Следующая страница"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <a
              href={pdfUrl}
              download
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Скачать PDF"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>

          {/* PDF */}
          <div className="overflow-hidden rounded-2xl bg-white">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex h-[400px] items-center justify-center" style={{ width: pageWidth }}>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      )}
    </CinematicModal>
  )
}
