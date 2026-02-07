"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: "default" | "success" | "warning" | "accent"
  size?: "sm" | "default" | "lg"
  showValue?: boolean
}

function Progress({
  value,
  max = 100,
  variant = "default",
  size = "default",
  showValue = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: "h-1.5",
    default: "h-2.5",
    lg: "h-4",
  }

  const variantClasses = {
    default: "bg-accent",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    accent: "bg-accent",
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-secondary",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="absolute right-0 -top-6 text-sm text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

export { Progress }
