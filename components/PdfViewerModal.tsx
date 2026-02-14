"use client"

import { useState, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { CinematicModal } from "@/components/CinematicModal"

const Document = dynamic(
  () => import("react-pdf").then((mod) => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent/90 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Предыдущая страница"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <span className="min-w-[140px] text-center text-sm font-medium text-white">
              Страница {pageNumber} из {numPages || "..."}
            </span>

            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent/90 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Следующая страница"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <a
              href={pdfUrl}
              download
              className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent/90 hover:scale-105"
              aria-label="Скачать PDF"
            >
              <Download className="h-6 w-6" />
            </a>
          </div>

          {/* PDF */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex h-[400px] items-center justify-center" style={{ width: pageWidth }}>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
                </div>
              }
              error={
                <div className="flex h-[400px] flex-col items-center justify-center gap-4" style={{ width: pageWidth }}>
                  <p className="text-muted-foreground text-sm">Не удалось загрузить PDF</p>
                  <a
                    href={pdfUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Скачать файл
                  </a>
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
