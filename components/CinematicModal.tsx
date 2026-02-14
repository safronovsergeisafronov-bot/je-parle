"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CinematicModalProps {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  titleHidden?: boolean
  className?: string
}

export function CinematicModal({
  trigger,
  children,
  open,
  onOpenChange,
  title,
  titleHidden = false,
  className,
}: CinematicModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title
            className={cn(titleHidden && "sr-only")}
          >
            {title}
          </DialogPrimitive.Title>

          <div className={cn("relative mx-auto", className)}>
            {children}
          </div>

          <DialogPrimitive.Close
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl hover:bg-accent hover:text-white"
            aria-label="Закрыть видео"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
