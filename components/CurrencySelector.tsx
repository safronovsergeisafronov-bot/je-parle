"use client"

import { cn } from "@/lib/utils"

type Currency = "USD" | "EUR" | "UAH" | "RUB"

interface CurrencySelectorProps {
  selected: Currency
  onSelect: (currency: Currency) => void
  className?: string
}

const currencies: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "UAH", label: "UAH" },
  { value: "RUB", label: "RUB" }
]

export function CurrencySelector({ selected, onSelect, className }: CurrencySelectorProps) {
  return (
    <div className={cn("inline-flex rounded-xl bg-secondary p-1", className)}>
      {currencies.map((currency) => (
        <button
          key={currency.value}
          onClick={() => onSelect(currency.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            selected === currency.value
              ? "bg-accent text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {currency.label}
        </button>
      ))}
    </div>
  )
}

export type { Currency }
