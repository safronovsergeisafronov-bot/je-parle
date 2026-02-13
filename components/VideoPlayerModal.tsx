"use client"

import { useState } from "react"
import { CinematicModal } from "@/components/CinematicModal"

interface VideoPlayerModalProps {
  children: React.ReactNode
  videoId: string
  title: string
}

export function VideoPlayerModal({ children, videoId, title }: VideoPlayerModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <CinematicModal
      trigger={children}
      open={open}
      onOpenChange={setOpen}
      title={title}
      className="max-w-5xl"
    >
      <p className="mb-3 text-sm text-white/70 font-medium">{title}</p>
      {open && (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}
    </CinematicModal>
  )
}
