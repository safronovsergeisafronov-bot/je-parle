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
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[4px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title
            className={cn(titleHidden && "sr-only")}
          >
            {title}
          </DialogPrimitive.Title>

          {/* Close button — always visible at top */}
          <div className="w-full flex justify-end mb-2" style={{ maxWidth: className?.includes("max-w") ? undefined : "100%" }}>
            <DialogPrimitive.Close
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-secondary text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl hover:bg-accent hover:text-white"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
            </DialogPrimitive.Close>
          </div>

          <div className={cn("relative mx-auto w-full max-h-[calc(100dvh-6rem)] overflow-y-auto", className)}>
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
