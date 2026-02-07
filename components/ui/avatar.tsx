"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl" | "2xl"
  src?: string
  alt?: string
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  default: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  "2xl": "w-20 h-20 text-xl",
}

function Avatar({ size = "default", src, alt, className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-accent text-accent-foreground flex items-center justify-center font-medium",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          fill
          className="object-cover"
        />
      ) : (
        children
      )}
    </div>
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <span className={cn("font-medium", className)} {...props}>
      {children}
    </span>
  )
}

export { Avatar, AvatarFallback }
